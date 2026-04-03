import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Manager", "Developer", "Tester"],
        default: "Developer"
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;