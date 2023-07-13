import express from "express"
import product from "./routes/productRoute.js"
import {errorMiddleware} from "./middleware/error.js"
import user from "./routes/userRoute.js"

const app = express();


app.use(express.json())

app.use("/api/v1", product)

app.use("/api/v1", user)

//error Middleware
app.use(errorMiddleware)


export default app;