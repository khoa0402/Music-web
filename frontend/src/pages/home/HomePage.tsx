import Navbar from "@/components/Navbar.tsx";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import GridSection from "./components/GridSection.tsx";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";
import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  const { user } = useUser();
  const {
    fetchTrendingSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchNewSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    newSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchTrendingSongs();
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchNewSongs();
  }, [
    fetchTrendingSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchNewSongs,
  ]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      trendingSongs.length > 0 &&
      featuredSongs.length > 0 &&
      newSongs.length > 0
    ) {
      const totalSongs = [
        ...madeForYouSongs,
        ...trendingSongs,
        ...featuredSongs,
        ...newSongs,
      ];
      initializeQueue(totalSongs);
    }
  }, [
    initializeQueue,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    newSongs,
  ]);

  console.log({
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    newSongs,
  });

  return (
    <main className="overflow-hidden h-full">
      <Navbar />
      <ScrollArea className="h-[calc(100vh-150px)] bg-gradient-to-b from-cyan-400/70 to-zinc-900">
        <div className="p-3 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Have a good day, {user?.firstName}!
          </h1>
          <FeaturedSection />
        </div>
        <div className="space-y-8 p-3 sm:p-6 bg-black/35">
          <GridSection
            title="Made for You"
            songs={madeForYouSongs}
            isLoading={isLoading}
          />
          <GridSection
            title="Trending"
            songs={trendingSongs}
            isLoading={isLoading}
          />
          <GridSection
            title="New Songs"
            songs={newSongs}
            isLoading={isLoading}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
