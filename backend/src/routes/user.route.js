import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, refreshAccessToken, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.post("/refresh-token", refreshAccessToken)

//secured routes
router.get("/current-user", verifyJWT, getCurrentUser)
router.post("/logout", verifyJWT, logoutUser)

export default router;

