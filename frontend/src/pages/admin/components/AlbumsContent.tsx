import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";
import ListAlbums from "./ListAlbums.tsx";
import AddAlbumButton from "./AddAlbumButton.tsx";

const AlbumsContent = () => {
  return (
    <Card className="bg-black mt-5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Library className="h-5 w-5 text-teal-600" />
            Albums Library
          </CardTitle>
          <AddAlbumButton />
        </div>
      </CardHeader>

      <CardContent>
        <ListAlbums />
      </CardContent>
    </Card>
  );
};
export default AlbumsContent;
