import { createSlice, combineReducers } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  error: null,
};

export const productSlice = createSlice({
  name:'products',
  initialState,
  reducers:{
    ALL_PRODUCTS_REQUEST(state){
        return {
          ...state,
          loading:true,
          products:[],
        }
    },
    ALL_PRODUCTS_SUCCESS(state,action){
      return{
        ...state,
        loading:false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      }
    },
    ALL_PRODUCTS_FAIL(state, action){
      return{
        ...state,
        loading:false,
        error: action.payload
        // console.log("nnn");
      }
    },
    CLEAR_ERRORS(state){
      return {
        ...state,
        error: null
      }
    }

  }
})

export const productDetailsSlice = createSlice({
  name:'productDetails',
  initialState,
  reducers:{
    PRODUCT_DETAILS_REQUEST(state){
        return {
          ...state,
          loading:true,
          products:[],
        }
    },
    PRODUCT_DETAILS_SUCCESS(state,action){
      return{
        ...state,
        loading:false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      }
    },
    PRODUCT_DETAILS_FAIL(state, action){
      return{
        ...state,
        loading:false,
        error: action.payload
        // console.log("nnn");
      }
    }

  }
})

export const {ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS} = productSlice.actions;
export const {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS} = productDetailsSlice.actions;

const rootReducer = combineReducers({
  product: productSlice.reducer,
  productDetails: productDetailsSlice.reducer
});

export default rootReducer;