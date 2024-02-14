import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";


const stripePromise = loadStripe('pk_test_51Ohc9YBgKtl67Ldhu79wNLhBUwH31KjRtTLEAvK43vkGcj0Jy1HMCele5swjXRrygbEbguum6gZlr71aIUk5nuQw00AGRWALCn');
export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
            agent.Payments.createPaymentIntent()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
    }, [dispatch]);

    if(loading) return <LoadingComponent message='Loading checkout ...' />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
        );
}