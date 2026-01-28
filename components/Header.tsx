import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Clock, Leaf } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const now = new Date();

  // Format date for Journal page
  const formatFullDate = () =>
    now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Check if current page needs date badge
  const showDateBadge =
    location.pathname === "/journal" || location.pathname === "/insights";

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-transparent shrink-0">
      {/* App Name + Slogan */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
          <Leaf size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            SoulSync
          </h1>
          <p className="text-xs text-primary font-medium">
            Gently listen to yourself
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Date badge for Journal/Insights */}
        {showDateBadge && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Clock size={16} />
            {formatFullDate()}
          </div>
        )}

        <ThemeToggle />

        <button className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-white dark:border-gray-800"></span>
        </button>

        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-800 dark:text-white">
            Minh Anh
          </p>
          <p className="text-xs text-primary font-medium uppercase tracking-wide">
            Premium User
          </p>
        </div>

        <img
          alt="User Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer hover:scale-105 transition-transform"
          src="https://picsum.photos/200/200"
        />
      </div>
    </header>
  );
};

export default Header;
