
import { createStore } from "redux";
import counterReducer from "../../features/contact/counterReducer";
// import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export function configureStore (){
    return createStore(counterReducer);
}

// export const store = configureStore({
//     reducer: {
//         counter: counterSlice.reducer
//     }
// })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;