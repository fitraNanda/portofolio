import express from "express";
import { login, register, logout, verification } from "../controller/auth.js";
import auth from "../helper/authToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.patch("/verified", auth, verification);

export default router;
