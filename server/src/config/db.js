import mongoose from "mongoose"
import config from "./dotenv.config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("DataBase Connected");
    } catch (error) {
        console.error(`Error in Connecting to Database - ${error.message}`);
        throw error;
    }
}

export default connectDB;