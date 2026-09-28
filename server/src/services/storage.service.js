import ImageKit, { toFile } from "@imagekit/nodejs"
import config from "../config/dotenv.config.js"

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
})

const uploadFile = async ({buffer, fileName}) => {
    try {
        const response = await client.files.upload({
            file: await toFile(buffer),
            fileName: fileName,
            folder: "ECommerceApp",
        })
        return response;
    } catch (error) {
        console.log(`Error uploading image to imageKit - ${error.message}`);
        throw error;
    }
}

export default uploadFile;