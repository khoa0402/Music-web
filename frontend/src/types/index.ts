export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Status {
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalUsers: number;
}
