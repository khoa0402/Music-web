import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import ListSongs from "./ListSongs.tsx";
import AddSongButton from "./AddSongButton.tsx";

const SongsContent = () => {
  return (
    <Card className="mt-5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Music className="size-5 text-emerald-500" />
            Songs Library
          </CardTitle>
          <AddSongButton />
        </div>
      </CardHeader>
      <CardContent>
        <ListSongs />
      </CardContent>
    </Card>
  );
};

export default SongsContent;
