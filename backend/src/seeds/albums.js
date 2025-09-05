import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Xóa những bài hát, album đã có
    await Album.deleteMany({});
    await Song.deleteMany({});

    // Tạo tất cả bài hát
    const createdSongs = await Song.insertMany([
      {
        title: "ĐẦU MÈO ĐUÔI CHUỘT",
        artist: "Phương Ly, MAIQUINN, Tiên Tiên, Miu Lê",
        imageUrl: "/song-images/Emxinhsayhi.webp",
        audioUrl: "/song-audios/ĐẦU MÈO ĐUÔI CHUỘT.mp3",
        plays: Math.floor(Math.random() * 5000), //Số lượt nghe
        duration: 231,
        category: "Nhạc Việt",
      },
      {
        title: "HOURGLASS",
        artist: "LyHan, Juky San, Châu Bùi, Saabirose",
        imageUrl: "/song-images/Emxinhsayhi.webp",
        audioUrl: "/song-audios/HOURGLASS.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 227,
        category: "Nhạc Việt",
      },
      {
        title: "MORSE CODE",
        artist: "Phương Mỹ Chi, Orange, Pháo, LAMOON",
        imageUrl: "/song-images/Emxinhsayhi.webp",
        audioUrl: "/song-audios/MORSE CODE.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 289,
        category: "Nhạc Việt",
      },
      {
        title: "TADIDA",
        artist: "52Hz, Bích Phương, Lâm Bảo Ngọc, Bảo Anh",
        imageUrl: "/song-images/Emxinhsayhi.webp",
        audioUrl: "/song-audios/TADIDA.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 272,
        category: "Nhạc Việt",
      },
    ]);

    // Tạo album và danh sách các bài hát trong album
    const albums = [
      {
        title: "LiveStage 5 - part 1",
        artist: 'Em Xinh "Say Hi"',
        imageUrl: "/song-images/Emxinhsayhi.webp",
        releaseYear: 2025,
        songs: createdSongs
          .sort(() => Math.random() - 0.5)
          .slice(0, 2)
          .map((song) => song._id),
      },
      {
        title: "LiveStage 5 - part 2",
        artist: 'Em Xinh "Say Hi"',
        imageUrl: "/song-images/Emxinhsayhi.webp",
        releaseYear: 2025,
        songs: createdSongs
          .sort(() => Math.random() - 0.5)
          .slice(0, 2)
          .map((song) => song._id),
      },
    ];

    // Thêm tất cả album
    const createdAlbums = await Album.insertMany(albums);

    // Cập nhật bài hát cho mỗi album
    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i];
      const albumSongs = albums[i].songs;

      await Song.updateMany(
        { _id: { $in: albumSongs } },
        { albumId: album._id }
      );
    }
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error in seedDatabase", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
