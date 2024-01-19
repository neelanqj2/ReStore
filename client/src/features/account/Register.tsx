import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    function handleApiErrors(error: string) {
        if(error.includes('Password')) {
            setError('password',{message: error});
        } else if(error.includes('Email')) {
            setError('email',{message:error});
        } else if(error.includes('Username')){
            setError('username', { message: error });
        }
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" 
                        onSubmit={handleSubmit(data => agent.Account.register(data)
                            .then(()=>{
                                toast.success('Registration successful - you can now login.')
                                navigate('/login');
                            })
                            .catch(error => handleApiErrors(error)))} 
                        noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            autoFocus
                            {...register('username', { required: 'Username is required' })}
                            error={!!errors.username}
                            helperText={errors?.username?.message as string}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            {...register('email', 
                                { 
                                    required: 'Email is required' ,
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Not a valid email address'
                                    }
                                }
                            )}
                            error={!!errors.email}
                            helperText={errors?.email?.message as string}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            {...register('password', 
                                { 
                                    required: 'Password is required' ,
                                    pattern: {
                                        value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                        message: 'The password expects atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters.'
                                        }
                                }
                            )}
                            error={!!errors.password}
                            helperText={errors?.password?.message as string}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            disabled={!isValid}
                            loading={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/login'>
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
function setError(arg0: string, arg1: { message: string; }) {
    throw new Error('Function not implemented.');
}

