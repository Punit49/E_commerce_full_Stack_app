import { verifyAccessToken } from "../utils/token.utils.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if(!accessToken){
            return res.status(401).json({
                success: false, 
                message: "Access Token is required"
            })
        }

        const decoded = await verifyAccessToken(accessToken);

        if(!decoded){
            return res.status(401).json({
                success: false, 
                message: "Invalid or Expired access token"
            })
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.log(`Error in auth middleware - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export default isAuthenticated;