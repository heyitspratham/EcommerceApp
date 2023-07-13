import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter product Name"]
    },
    description:{
        type: String,
        required: [true, "Please enter product Description"]
    },
    price:{
        type: Number,
        required: [true, "Please enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },

            url: {
                type: String,
                required: true
            }

        }
    ],

    category: {
        type: String,
        required: [true , "Please enter the product category"],
    },

    stock: {
        type: Number,
        required: [true, "Please Enter the number of stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },

    numOfReviews: [
        {
            name: {
                type: String,
                required: true
            },

            rating: {
                type: Number,
                required: true,
            },

            comment: {
                type: String,
                required: [true, "Comment is necessary"]
            }

        }
    ],

    createdAt:{
        type: Date,
        default: Date.now()
    }

})

export const Product = mongoose.model("Product", productSchema);