import {body } from "express-validator"
import validate from "../middlewares/validate.middleware.js";

const registerValidation = [
    body('name')
        .exists().withMessage("Name field is required").bail()
        .isString().withMessage("Name must be a string").bail()
        .trim().notEmpty().withMessage("Name is required").bail()
        .isLength({min: 3}).withMessage("Minimum length of name must be 3 characters").bail()
        .isLength({max: 30}).withMessage("Maximum length of name must be 30 characters").bail()
        .matches(/^[a-zA-Z\s-]+$/).withMessage('Name can only contain letters, spaces, and hyphens'),
    body('email')
        .exists().withMessage("Email field is required").bail()
        .isString().withMessage("Email must be a string").bail()
        .trim().notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .exists().withMessage("Password field is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim().notEmpty().withMessage("Password is required").bail()
        .isLength({min: 8}).withMessage("Password should be at least 8 characters long").bail()
        .isLength({max: 30}).withMessage("Maximum length of password can be 30 characters").bail()
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/).withMessage("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."),
    body('confirmPassword')
        .exists().withMessage("Confirm Password field required").bail()
        .isString().withMessage("Confirm Password must be a string").bail()
        .trim().notEmpty().withMessage("Confirm Password is required").bail()
        .custom((val, meta) => {
            if(val !== meta.req.body.password){
                throw new Error("Passwords do not match!");
            }
            return true;
        }),

    validate
]

const loginValidation = [
    body('email')
        .exists().withMessage("Email field is required").bail()
        .isString().withMessage("Email must be a string").bail()
        .trim().notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .exists().withMessage("Password field is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim().notEmpty().withMessage("Password is required"),
        
    validate
]

export {
    registerValidation, loginValidation
}