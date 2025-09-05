import { useAuthStore } from "@/stores/useAuthStore.ts";
import Header from "./components/Header.tsx";
import DashBoardData from "./components/DashBoardData.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Album, Music2 } from "lucide-react";
import SongsContent from "./components/SongsContent.tsx";
import AlbumsContent from "./components/AlbumsContent.tsx";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore.ts";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStatus } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStatus();
  }, [fetchAlbums, fetchSongs, fetchStatus]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-700 via-sky-900 to-black text-zinc-100 p-8">
      <Header />
      <DashBoardData />
      <Tabs defaultValue="songs" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="inline-flex p-1 bg-zinc-800/50">
            <TabsTrigger value="songs" className="data-[state=active]:bg-black">
              <Music2 className="mr-2 size-4" />
              Songs
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-black"
            >
              <Album className="mr-2 size-4" />
              Albums
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="songs">
          <SongsContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
