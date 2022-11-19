import express from "express";
const app = express();
import userRoutes from "./routers/users.js";
import postsRoutes from "./routers/posts.js";
import likesRoutes from "./routers/likes.js";
import commentsRoutes from "./routers/comments.js";
import authRoutes from "./routers/auth.js";
import relationshipRouters from "./routers/relationships.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/public/upload");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/api/delete", (req, res) => {
  if (
    req.body.image == "dummy-img.png" ||
    req.body.image == "dummy-profile-pic-male1.jpg"
  ) {
    return;
  }
  let path = `./public/upload/${req.body.image}`;
  fs.unlinkSync(path);
});

/////////////////////////

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/relationships", relationshipRouters);
app.use(express.static("public"));

app.listen(8800, () => {
  console.log("API working!");
});
