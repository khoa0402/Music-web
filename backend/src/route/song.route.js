import { Router } from "express";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
  getSearchSong,
  getNewSongs,
} from "../controller/song.controller.js";

const router = Router();

router.get("/", protectRoute, requiredAdmin, getAllSongs); //dành cho admin
router.get("/search", getSearchSong);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get("/new", getNewSongs);

export default router;
