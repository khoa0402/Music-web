import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar.tsx";
import AudioPlayer from "./components/AudioPlayer.tsx";
import PlaybackControl from "./components/PlaybackControl.tsx";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden"
      >
        <AudioPlayer />
        {/*Sidebar bên trái*/}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 13}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        {/* Nội dung chính bên phải */}
        <ResizablePanel
          defaultSize={isMobile ? 120 : 100}
          className="bg-zinc-900"
        >
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlaybackControl />
    </div>
  );
};

export default MainLayout;
