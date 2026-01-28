import React from "react";
import { Bell } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-start mb-8 pl-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          SoulSync –{" "}
          <span className="text-primary font-medium">
            Gently listen to yourself
          </span>
        </h1>
        <p className="text-text-muted dark:text-gray-400">
          Hello Minh, let's take care of your soul.
        </p>
      </div>
      <div className="flex items-center gap-4 mr-12 md:mr-0">
        <button className="p-2 rounded-full bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-white dark:border-surface-dark"></span>
        </button>
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-800 dark:text-white">
            Minh Anh
          </p>
          <p className="text-xs text-primary font-medium uppercase tracking-wide">
            Premium User
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
