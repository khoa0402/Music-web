import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-3 mb-8">
      <div className="flex items-center gap-2">
        <Link to="/" className="rounded-lg">
          <img
            src="/music_icon.jpg"
            alt="Music Logo"
            className="size-10 text-black rounded-full"
          />
        </Link>
        <h1 className="text-xl font-bold">Music Manager</h1>
      </div>
      <UserButton />
    </div>
  );
};
export default Header;
