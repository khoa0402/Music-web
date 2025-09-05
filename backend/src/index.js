import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";

import authRoutes from "./route/auth.route.js";
import adminRoutes from "./route/admin.route.js";
import songRoutes from "./route/song.route.js";
import albumRoutes from "./route/album.route.js";
import statusRoutes from "./route/status.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //max file size is 10MB
    },
  })
);

//tạo một cron job chạy mỗi đầu giờ dọn file trong thư mục temp
const tempDirectory = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDirectory)) {
    fs.readdir(tempDirectory, (error, files) => {
      if (error) {
        console.log("error", error);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDirectory, file), (error) => {});
      }
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/status", statusRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

//handler middleware / error-handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Interval server error"
        : error.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});

//todo: socket.io
