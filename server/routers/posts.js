import express from "express";
import { getPosts, addPost, deletePost } from "../controller/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.post("/:id", deletePost);

export default router;
