import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, getCurrentUserAPI, logoutUserAPI, refreshTokenAPI,registerUserAPI } from "./authService";

export const loginUser = createAsyncThunk("auth/loginUser", async (data, { rejectWithValue }) => {
    try {
        const response = await loginUserAPI(data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An unexpected error occurred" );
    }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (data, {rejectWithValue }) => {
    try {
        const response = await registerUserAPI(data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
});

export const currentUser = createAsyncThunk("auth/currentUser", async (_, { getState, rejectWithValue }) => {
    try {
        const { token } = getState().auth;
        return await getCurrentUserAPI(token);
    } catch (error) {
        return rejectWithValue(error.response?.data || "An unexpected error occurred" );
    }
}
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { getState, rejectWithValue }) => {
    try {
        const { token } = getState().auth;
        const response = await logoutUserAPI(token);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Logout failed");
    }
}
);

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
    try {
        const response = await refreshTokenAPI();
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Logout failed" );
    }
})

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.data.user;
                state.token = action.payload.data.accessToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            })

            .addCase(currentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(currentUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = "Failed to authenticate user";
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Logout failed";
            })

            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                // console.error("Refresh token failed:", action.payload);
            })
            
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = action.payload.data.user;
                state.token = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            })
    }
});

export const { } = authSlice.actions;
export default authSlice.reducer;
