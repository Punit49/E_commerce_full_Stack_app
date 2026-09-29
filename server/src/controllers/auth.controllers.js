import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokens, verifyRefreshToken } from "../utils/token.utils.js";

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isUserExists = await UserModel.exists({ email });

        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            })
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, passwordHash });

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: {
                user: { id: user._id, name, email }
            }
        })

    } catch (error) {
        console.log(`Error in register controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email}).select("+passwordHash");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            })
        }

        const { accessToken, refreshToken } = generateTokens(user._id, user.role);
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
        await UserModel.findOneAndUpdate({ email }, { $set: { refreshToken } });

        return res.status(200).json({
            success: true, 
            message: "Logged in Successfully",
            data: {
                user: {id: user._id, name: user.name, email, role: user.role}, 
                accessToken
            }
        })

    } catch (error) {
        console.log(`Error in login controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const logoutController = async (req, res) => {
    try {
        const userId = req.user.id;

        await UserModel.findByIdAndUpdate(userId, {
            $unset: {
                refreshToken: 1
            }
        });

        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" });

        return res.status(200).json({
            success: true, 
            message: "Logged out successfully"
        })

    } catch (error) {
        console.log(`Error in logout controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken){
            return res.status(401).json({
                success: false, 
                message: "Refresh Token is required"
            })
        }

        const decoded = await verifyRefreshToken(refreshToken);

        if(!decoded){
            return res.status(401).json({
                success: false, 
                message: "Invalid or Expired refresh token"
            })
        }
        
        const user = await UserModel.findById(decoded.id);
        
        if(refreshToken !== user.refreshToken){
            await UserModel.findByIdAndUpdate(user._id, {
                $unset: {
                    refreshToken: true
                }
            })
            return res.status(401).json({
                success: false, 
                message: "Token Mismatch"
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id, user.role);
        await UserModel.findByIdAndUpdate(user._id, {refreshToken: newRefreshToken});
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "none" });

        res.status(200).json({
            success: true, 
            message: "Token refreshed successfully",
            accessToken
        })

    } catch (error) {
        console.log(`Error in Refresh token controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getMeController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false, 
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true, 
            message: "User Fetched Successfully",
            data: {
                user: {userId, name: user.name, email: user.email}
            }
        })

    } catch (error) {
        console.log(`Error in Get Me controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export {
    registerController, 
    loginController, 
    logoutController, 
    refreshTokenController, 
    getMeController
} 