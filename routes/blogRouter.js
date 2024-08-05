import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/blogController.js';
const router=express.Router();
router.get("/",getAllBlogs)
router.post("/addBlog",addBlog)
router.put("/update/:id",updateBlog)
router.get("/:id",getBlogById)
router.delete("/:id",deleteBlog)

export default router