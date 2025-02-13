import { Router } from "express";
import { addBlog,getallBlogs,getBlog } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.get("", getallBlogs);

router.get("/:id", getBlog);

router.post("/add", verifyJWT, upload.single('image'), async (req, res, next) => {
    if (req.file.filename) {
        req.body.image = req.file.filename;
    }
    next();
}, addBlog);

// router.put("/update", verifyJWT, updateBlog);

// router.put("/like", verifyJWT, likeBlog);

export default router;