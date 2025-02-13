import AsyncHandler from "../utils/AsyncHandler.js";
import { Blog } from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addBlog = AsyncHandler(async (req, res) => {
    const { title, content, description, image, category } = req.body;

    const blog = await Blog.create({
        userId: req.user._id,
        title,
        content,
        description,
        image,
        category
    });

    if (!blog) {
        throw new ApiError(500, "Something went wrong while inserting blog")
    }

    return res.json(
        new ApiResponse(200, blog, "Blog added successfully")
    )
});

const getallBlogs = AsyncHandler(async (req, res) => {

    const blogs = await Blog.find().populate('userId', 'username profile');

    // if (blogs.length == 0) {
    //     throw new ApiError(404, "No blogs found");
    // }

    return res.json(
        new ApiResponse(200, blogs, "Blogs fetched successfully")
    );

});

const getBlog = AsyncHandler(async (req, res) => {

    const id = req.params?.id;

    if (!id) {
        throw new ApiError("Pleas eprovide blog id", 404);
    }

    const blog = await Blog.findById(req.params?.id).populate('userId', 'username profile');

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.json(
        new ApiResponse(200, blog, "Blog fetched successfully")
    );
});


const updateBlog = AsyncHandler(async (req, res) => {

});

const likeBlog = AsyncHandler(async (req, res) => {

});

export {
    addBlog,
    updateBlog,
    getBlog,
    getallBlogs,
    likeBlog
}