import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";

const router = Router();

//cả người đã và chưa đăng nhập đều dùng được
router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
