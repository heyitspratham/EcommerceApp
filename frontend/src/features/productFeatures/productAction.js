import axios from "axios";

import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
} from "./productSlice";

import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from "./productSlice";

//outer function will return a promise if async is used outside and hence will give error as it expects a plain js object whereas an inner function can have a asynchronous behaviour
export const getProducts = () => async (dispatch) => {
  try {
    // console.log("here4");
    dispatch(ALL_PRODUCTS_REQUEST());
    // console.log("here2");

    const { data } = await axios.get("/api/v1/products");
    // console.log(data);

    dispatch(ALL_PRODUCTS_SUCCESS(data));
  } catch (error) {
    dispatch(ALL_PRODUCTS_FAIL(error.response.data.message));
  }
};


export const getProductDetails = () => async (dispatch) => {
  try {
    // console.log("here4");
    dispatch(PRODUCT_DETAILS_REQUEST());
    // console.log("here2");

    const { data } = await axios.get("/api/v1/products");
    // console.log(data);

    dispatch(ALL_PRODUCTS_SUCCESS(data));
  } catch (error) {
    dispatch(ALL_PRODUCTS_FAIL(error.response.data.message));
  }
};
