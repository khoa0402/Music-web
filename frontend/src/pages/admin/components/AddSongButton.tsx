import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong {
  title: string;
  artist: string;
  album: string;
  duration: string;
  category: string;
}

const AddSongButton = () => {
  const { albums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    duration: "0",
    category: "",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!files.audio || !files.image)
        return toast.error("Please upload all needed files");

      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration.toString());
      formData.append("category", newSong.category);

      if (newSong.album && newSong.album !== "none")
        formData.append("albumId", newSong.album);

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
        category: "",
      });

      setFiles({ audio: null, image: null });
      toast.success("Song added successfully");
    } catch (error: any) {
      toast.error("Error in adding song:" + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-4">
          {/* tải lên file audio */}
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />
          {/* tải lên file image */}
          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* Khu vực tải file image lên */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Image uploaded</div>
                  <div className="text-xs text-zinc-400/70">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-1">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-4">
                    Upload file image here
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs hover:text-green-500"
                  >
                    Choose file
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* Khu vực tải file audio lên */}
          <div className="flex items-center gap-3 space-y-2">
            <label className="text-sm font-medium pt-2">Audio File:</label>
            <Button
              variant="outline"
              onClick={() => audioInputRef.current?.click()}
              className="size-auto hover:text-green-500"
            >
              {files.audio ? files.audio.name.slice(0, 30) : "Choose file"}
            </Button>
          </div>

          {/* các trường khác của bài hát */}
          <div className="space-y-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium pt-1">Title:</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="bg-zinc-800 border-gray-700 w-[85%]"
            />
          </div>
          <div className="space-y-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium pt-1">Artist:</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="bg-zinc-800 border-gray-700 w-[85%]"
            />
          </div>
          <div className="space-y-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium">Duration (s):</label>
            <Input
              type="number"
              min="0"
              value={newSong.duration}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  duration: e.target.value || "0",
                })
              }
              className="bg-zinc-800 border-gray-700 w-[85%]"
            />
          </div>
          <div className="space-y-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium pt-1">Category:</label>
            <Input
              value={newSong.category}
              onChange={(e) =>
                setNewSong({ ...newSong, category: e.target.value })
              }
              className="bg-zinc-800 border-gray-700 w-[85%]"
            />
          </div>
          <div className="space-y-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium">Album (optional):</label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="bg-zinc-800 border-gray-700">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-gray-700">
                <SelectItem value="none">None</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
            className="hover:bg-red-500 text-zinc-400"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600/90 hover:text-white"
          >
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongButton;
