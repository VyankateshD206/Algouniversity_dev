import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import problemReducer from './problemSlice'
export const store = configureStore({
    reducer:{
        auth : authReducer,
        problem: problemReducer
    }
});

{/* reducers are nothing but pure js functions that takes the action and current state and 
    give the newstate according to the action

    // there can be many reducers and configure store combine all these reducers and form a 
    single store 
    */}
