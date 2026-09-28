import { Router } from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import { createProductController, deleteProductController, getAllProductsController, getSingleProductController, updateProductController } from "../controllers/product.controller.js";
import { productValidation, idValidation } from "../validations/product.validation.js";
import { upload } from "../config/multer.config.js";
const router = Router();

router.post("/", isAuthenticated, upload.single('image'), productValidation, createProductController);
router.get("/", getAllProductsController);
router.get("/:id", idValidation, getSingleProductController );
router.put("/:id", isAuthenticated, idValidation, productValidation, updateProductController );
router.delete("/:id", isAuthenticated, idValidation, deleteProductController );

export default router;