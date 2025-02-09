import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import {
  UserController,
  PostController,
  CommentController,
} from "./controllers/index.js";
configDotenv();



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("saccess conecting to Data Base!"))
  .catch((err) => console.log("DB error :", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.put(
  "/auth/update",
  checkAuth,
  handleValidationErrors,
  UserController.update
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/auth/:id", UserController.getById);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
app.post("/comment", checkAuth, CommentController.create);
app.get("/comment/:id", CommentController.getAll);
app.get("/lastcomment", CommentController.getLastComments);
app.delete("/comment/:id", CommentController.remove);
app.patch("/comment", CommentController.update);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started on 4444 PORT");
});
