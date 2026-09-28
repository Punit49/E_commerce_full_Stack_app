import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name should contain minimum 3 characters"],
        maxLength: [30, "Maximum number of characters in name can be 30"],
        match: [/^[a-zA-Z\s-]+$/, 'Name can only contain letters, spaces, and hyphens'],
        validate: {
            validator: (value) => {
                const forbiddenNames = ["admin", "root", "superadmin", "moderator"];
                return !forbiddenNames.includes(value.toLowerCase());
            }, 
            message: props => `${props.value} is a reserved system name`
        }
    }, 
    email: {
        type: String, 
        required: [true, "Email address is required"],
        trim: true, 
        unique: true, 
        lowercase: true, 
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    }, 
    passwordHash: {
        type: String, 
        required: [true, "Password Is Required"],
        select: false,
    }, 
    role: {
        type: String, 
        default: "user"
    },
    refreshToken: {
        type: String, 
    },
})

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
