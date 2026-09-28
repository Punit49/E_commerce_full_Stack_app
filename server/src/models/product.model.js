import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Product Title is required"], 
        minLength: [10, "Minimum Length of title must be 10 characters"],
        maxLength: [50, "Maximum Length of title can be 50 characters"],
        match: [/^[a-zA-Z\s-]+$/, 'Title can only contain letters, spaces, and hyphens'],
    }, 
    description: {
        type: String, 
        required: [true, "Product Description is required"], 
        minLength: [50, "Minimum Length of description must be 50 characters"],
        maxLength: [200, "Maximum Length of description can be 200 characters"],
    }, 
    stock: {
        type: Number, 
        required: [true, "Stock Count is required"], 
        min: 0,
        default: 0
    },
    price: {
        type: Number, 
        required: [true, "Product price is required"], 
        min: 0,
    }, 
    image: {
        type: String,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    }
})

const ProductModel = mongoose.model("Products", productSchema);
export default ProductModel;