import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton.tsx";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { Home, Search } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const { albums, isLoading, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  console.log({ albums });

  return (
    <div className="h-screen flex flex-col gap-1 ">
      {/* Menu điều hướng */}
      <div className="bg-black p-4">
        <div className="">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <Home className="size-5 mr-1" />
            <span className="hidden md:inline text-xs">Home</span>
          </Link>
          <Link
            to="/search"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <Search className="size-5 mr-1" />
            <span className="hidden md:inline text-xs">Search</span>
          </Link>
        </div>
      </div>
      {/* Thư viện */}
      <div className="flex-1 bg-black pb-4 px-4 border-t border-white/20">
        <ScrollArea className="h-[calc(100vh-300px)] pt-2">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="pl-4 py-1 hover:bg-zinc-800 rounded-md flex items-center gap-1 group cursor-pointer"
                >
                  <div className="flex-1 max-w-[9rem] hidden md:block">
                    <p className="font-normal truncate text-xs">
                      Album: {album.title}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
