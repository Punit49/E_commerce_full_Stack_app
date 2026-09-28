import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Data Validation Failed",
            error: err.array()
        });
    }
    next();
}

export default validate;