import jwt from "jsonwebtoken";
import config from "../config/dotenv.config.js";

const generateTokens = (id, role) => {
    return {
        accessToken: jwt.sign({id, role}, config.ACCESS_TOKEN_SECERT, {expiresIn: "2m"}),
        refreshToken: jwt.sign({id, role}, config.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
    }
}

const verifyAccessToken = async (token) => {
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECERT);
    } catch (error) {
        return null;
    }
}

const verifyRefreshToken = async (token) => {
    try {
        return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}

export {
    generateTokens, 
    verifyRefreshToken, 
    verifyAccessToken
}