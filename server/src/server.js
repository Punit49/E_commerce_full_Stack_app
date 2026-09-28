import app from "./app/app.js";
import connectDB from "./config/db.js";
import config from "./config/dotenv.config.js";

const PORT = config.PORT || 3000;
await connectDB();

app.listen(PORT, () => {
    console.log("Server is running on PORT -", PORT);
}) 