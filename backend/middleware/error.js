import errorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //wrong mongoDB ID error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new errorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success: false,
        err: err.message
    })

}