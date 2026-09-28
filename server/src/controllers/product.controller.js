import ProductModel from "../models/product.model.js";
import uploadFile from "../services/storage.service.js";

const createProductController = async (req, res) => {
    try {
        const { title, description, price, stock } = req.body;

        if (!req.file) {
            return res.status(422).json({
                success: false,
                message: "Image is required"
            });
        }

        const result = await uploadFile({
            buffer: req.file.buffer, 
            fileName: req.file.originalname
        });

        const product = await ProductModel.create({
            title, description, price, stock, image: result.url, user: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            data: {
                product: { id: product._id, title, description, price, stock, image: result.url }
            }
        });

    } catch (error) {
        console.log(`Error in Create product controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find();

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: { products }
        });

    } catch (error) {
        console.log(`Error in get product controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            data: { product }
        });

    } catch (error) {
        console.log(`Error in get single product controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, stock } = req.body;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        if (product.user?.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to update this product"
            });
        }

        await ProductModel.findByIdAndUpdate(id, { title, description, price, stock });

        return res.status(200).json({
            success: true, 
            message: "Product Updated Successfully"
        });

    } catch (error) {
        console.log(`Error in update product controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        if (product.user?.toString() !== req.user.id) {
            return res.status(403).json({
                success: false, 
                message: "You don't have permission to delete this product"
            });
        }

        await ProductModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (error) {
        console.log(`Error in delete product controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export {
    createProductController,
    getAllProductsController,
    getSingleProductController,
    updateProductController,
    deleteProductController
};