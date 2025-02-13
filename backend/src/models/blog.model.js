import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
