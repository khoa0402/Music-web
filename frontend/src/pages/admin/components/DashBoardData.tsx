import { useMusicStore } from "@/stores/useMusicStore.ts";
import { Library, ListMusic, User2, Users } from "lucide-react";
import StatusCard from "./StatusCard.tsx";

const DashBoardData = () => {
  const { status } = useMusicStore();

  const statusData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: status.totalSongs.toString(),
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: status.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users,
      label: "Total Artists",
      value: status.totalArtists.toString(),
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: User2,
      label: "Total Users",
      value: status.totalUsers.toLocaleString(),
      bgColor: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
      {statusData.map((state) => (
        <StatusCard
          key={state.label}
          icon={state.icon}
          label={state.label}
          value={state.value}
          bgColor={state.bgColor}
          iconColor={state.iconColor}
        />
      ))}
    </div>
  );
};
export default DashBoardData;
