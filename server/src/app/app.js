import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import authRouter from "../routes/auth.router.js";
import productRouter from "../routes/product.routes.js";
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Working"
    })
})

app.use("/api/auth/", authRouter);
app.use("/api/products/", productRouter);

export default app;