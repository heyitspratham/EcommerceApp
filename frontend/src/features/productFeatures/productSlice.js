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

export const {ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS} = productSlice.actions;

export default productSlice.reducer