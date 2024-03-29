import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import agent from '../api/agent';
import { getCookie } from '../util/util';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync, setBasket } from '../../features/basket/basketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import HomePage from '../../features/home/HomePage';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async ()=>{
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch(error: any) {
      console.log(error);
    }
  },[dispatch]);

  useEffect(()=> {
    const buyerId = getCookie('buyerId');
    dispatch(fetchCurrentUser());
    if(buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false));
      }
      else {
       setLoading(false); 
      }
  }, [dispatch])

  useEffect(()=>{
    initApp().then(()=>setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark': 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: { 
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });
  // if (loading) return <LoadingComponent message='Initializing app ...' />

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {
      loading ? <LoadingComponent message="Initializing app..." />
        : location.pathname === '/' ? <HomePage />
            : <Container sx={{ mt: 4 }}><Outlet /></Container>
      }
    </ThemeProvider>
  )
}

export default App
