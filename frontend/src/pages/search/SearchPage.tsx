import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Song } from "@/types";
import toast from "react-hot-toast";
import PlayButton from "../home/components/PlayButton.tsx";
import { axiosInstance } from "@/lib/axios";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/songs/search", {
        params: { q: query },
      });
      setSongs(res.data);

      if (res.data.length === 0) {
        setError("Not Founded Song");
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setSongs([]);
        setError("Not Founded Song");
      } else {
        toast.error("Error in searching song: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Searching Song</h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter the song title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border-white/20"
        />
        <Button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600/80"
        >
          Search
        </Button>
      </div>

      {loading && <p className="text-green-500">Finding...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md overflow-hidden shadow-lg">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <PlayButton song={song} />
              </div>
            </div>
            <h3 className="text-sm font-medium truncate mb-2">{song.title}</h3>
            <p className="text-zinc-400 text-xs truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
