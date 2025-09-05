import { Song } from "../models/song.model.js";
export const getAllSongs = async (req, res, next) => {
  try {
    //sắp xếp bài hát từ mới nhất -> cũ nhất
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    //console.log("Error in getAllSongs", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);
    res.json(songs);
  } catch (error) {
    //console.log("Error in getFeaturedSongs", error);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 5 },
      },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);
    res.json(songs);
  } catch (error) {
    //console.log("Error in getMadeForYouSongs", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 5 },
      },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);
    res.json(songs);
  } catch (error) {
    //console.log("Error in getTrendingSongs", error);
    next(error);
  }
};

export const getSearchSong = async (req, res, next) => {
  try {
    const { q } = req.query; // query param ?q=...
    if (!q) {
      return res.status(400).json({ message: "Missing search keywords" });
    }

    // Tìm kiếm theo tên bài hát, không phân biệt hoa thường
    const songs = await Song.find({
      title: { $regex: q, $options: "i" },
    }).select("_id title artist imageUrl audioUrl");

    if (songs.length === 0) {
      return res.status(404).json({ message: "Not Founded" });
    }

    res.status(200).json(songs);
  } catch (error) {
    //console.log("Error in getSearchSong", error);
    next(error);
  }
};

export const getNewSongs = async (req, res, next) => {
  try {
    // Lấy limit từ query param, mặc định 5 bài
    const limit = parseInt(req.query.limit) || 5;

    const newSongs = await Song.find()
      .sort({ createdAt: -1 }) // sắp xếp từ mới -> cũ
      .limit(limit)
      .select("_id title artist imageUrl audioUrl createdAt");

    res.status(200).json(newSongs);
  } catch (error) {
    //console.log("Error in getNewSong", error);
    next(error);
  }
};
