import { body, param } from "express-validator";
import validate from "../middlewares/validate.middleware.js";

const productValidation = [
    body('title')
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim().notEmpty().withMessage("Title can't be empty").bail()
        .isLength({ min: 10, max: 50 }).withMessage("Title must be between 10 and 50 characters"),
    body('description')
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim().notEmpty().withMessage("Description can't be empty").bail()
        .isLength({ min: 30, max: 200 }).withMessage("Description must be between 30 and 200 characters"),
    body('stock')
        .exists().withMessage("Stock is required").bail()
        .isNumeric().withMessage("Stock must be a number").bail()
        .isInt({ min: 0 }).withMessage("Stock can't be less than 0"),
    body('price')
        .exists().withMessage("Price is required").bail()
        .isNumeric().withMessage("Price must be a number").bail()
        .isFloat({ min: 0 }).withMessage("Price can't be less than 0"),
    validate
];

const idValidation = [
    param('id').isMongoId().withMessage("Invalid ID format"),
    validate
];

export { productValidation, idValidation };