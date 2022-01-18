import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import categoryReducer from './categorySlice';

export default configureStore({
    reducer: {
        user: userReducer,
        categories: categoryReducer
    }
})