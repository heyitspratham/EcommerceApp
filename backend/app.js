import express from "express"
import {errorMiddleware} from "./middleware/error.js"
import { isAuthenticated } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
//route imports
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import cors from 'cors';



const app = express();


app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

//error Middleware
app.use(errorMiddleware)


export default app;