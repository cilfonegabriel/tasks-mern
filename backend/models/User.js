import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },
        token: {
            type: String,
        },
        confirm: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);