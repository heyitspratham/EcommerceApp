import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../features/productFeatures/productSlice"


const store = configureStore({
    reducer: {product:productReducer},
})


export default store;