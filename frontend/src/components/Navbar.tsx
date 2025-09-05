import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButton.tsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { cn } from "@/lib/utils.ts";
import { buttonVariants } from "./ui/button.tsx";

const Navbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });
  return (
    <div className="flex justify-between items-center py-3 px-6 sticky top-0 bg-gray-700 z-10">
      <div className="flex gap-2 items-center text-base font-bold">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/music_icon.jpg"
            alt="Music Logo"
            className="size-8 rounded-full"
          />{" "}
          Music Player
        </Link>
      </div>
      <div className="flex gap-3 items-center text-sm">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboard className="size-4 mr-2" /> Admin Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
