import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
  {
    title: "ĐẦU MÈO ĐUÔI CHUỘT",
    artist: "Phương Ly, MAIQUINN, Tiên Tiên, Miu Lê",
    imageUrl: "/song-images/Emxinhsayhi.webp",
    audioUrl: "/song-audios/ĐẦU MÈO ĐUÔI CHUỘT.mp3",
    duration: 231,
    category: "Nhạc Việt",
  },
  {
    title: "HOURGLASS",
    artist: "LyHan, Juky San, Châu Bùi, Saabirose",
    imageUrl: "/song-images/Emxinhsayhi.webp",
    audioUrl: "/song-audios/HOURGLASS.mp3",
    duration: 227,
    category: "Nhạc Việt",
  },
  {
    title: "MORSE CODE",
    artist: "Phương Mỹ Chi, Orange, Pháo, LAMOON",
    imageUrl: "/song-images/Emxinhsayhi.webp",
    audioUrl: "/song-audios/MORSE CODE.mp3",
    duration: 289,
    category: "Nhạc Việt",
  },
  {
    title: "TADIDA",
    artist: "52Hz, Bích Phương, Lâm Bảo Ngọc, Bảo Anh",
    imageUrl: "/song-images/Emxinhsayhi.webp",
    audioUrl: "/song-audios/TADIDA.mp3",
    duration: 272,
    category: "Nhạc Việt",
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    //xóa những bài hát hiện có
    await Song.deleteMany({});

    //Thêm những bài hát mới
    await Song.insertMany(songs);
    console.log("Songs seeded successfully");
  } catch (error) {
    console.log("Error in seedSongs", error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
