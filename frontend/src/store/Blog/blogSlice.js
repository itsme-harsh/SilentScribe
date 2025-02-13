import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBlogAPI, getAllBlogsAPI, getBlogAPI } from "./blogService";

export const addBlog = createAsyncThunk("blog/addBlog", async (data, { getState, rejectWithValue }) => {
    try {
        const { token } = getState().auth;
        const response = await addBlogAPI(data, token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
}
);

export const getAllBlogs = createAsyncThunk("blog/getAllBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await getAllBlogsAPI();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
})

export const getBlog = createAsyncThunk("blog/getBlog", async (id, { rejectWithValue }) => {
    try {
        const response = await getBlogAPI(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
})

const initialState = {
    blogs: [], // Store multiple blogs
    currentBlog: null,
    loading: true,
    error: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogs.push(action.payload); // Add new blog to the list
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get All Blogs
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogs = action.payload.data; // Replace with fetched blogs
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get Single Blog
        builder
            .addCase(getBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentBlog = action.payload.data; // Store the current blog data
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { } = blogSlice.actions;
export default blogSlice.reducer;
