import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/LandingPage/ThemeToggle";
import { Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/LandingPageUI/avatar";



const Navbar = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-background border-b border-border sticky top-0 z-50">
      {/* Left - Logo or Brand */}
      <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        iNextAi
      </Link>

      {/* Right - Actions */}
      <div className="flex items-center gap-6">
        {/* Dashboard Link */}
        
        <Link
          to="/dashboard"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Dashboard
        </Link>

        {/* Notification Bell */}
        <button className="relative hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          {/* Notification dot */}
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=AI" alt="User Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;
