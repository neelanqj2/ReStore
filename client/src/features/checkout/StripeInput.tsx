import { InputBaseComponentProps } from '@mui/material';
import { forwardRef, useRef, useImperativeHandle, Ref } from 'react';

// You could use the react CardElement
type Props = InputBaseComponentProps;

export const StripeInput = forwardRef(function StripeInput({component: Component, ...props}: Props,
    ref: Ref<unknown>){
        const elementRef = useRef<any>();
        useImperativeHandle(ref, () => ({
            focus:() => elementRef.current.focus
        }));

        return (
            <Component 
                onReady={(element:any) => elementRef.current = element}
                {...props}
                />
        )
});
