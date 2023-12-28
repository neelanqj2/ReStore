import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, decrement, increment } from "./counterReducer";

export default function ContactPage() {
    const dispatch = useDispatch();
    const data = useSelector((state: CounterState) => state.data);
    const title = useSelector((state: CounterState) => state.title);
    return (
        <>
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="h5">
                {data}
            </Typography>
            <ButtonGroup>
                <Button variant='contained' color='error' onClick={() => dispatch(decrement()) }>Decrement</Button>
                <Button variant='contained' color='primary' onClick={() => dispatch(increment())}>Increment</Button>
                <Button variant='contained' color='secondary' onClick={() => dispatch(increment(5))}>Increment by 5</Button>
            </ButtonGroup>
        </>
    )
}