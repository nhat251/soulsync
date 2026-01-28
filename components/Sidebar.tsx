import React from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Home, Book, BarChart2, Wind } from "lucide-react";

const Sidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-12 h-12 flex items-center justify-center rounded-xl transition-all mb-2 ${
      isActive
        ? "bg-primary text-white shadow-lg shadow-primary/30"
        : "text-text-muted hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-400"
    }`;

  return (
    <aside className="w-24 h-[95vh] my-auto ml-4 flex flex-col items-center py-8 bg-surface-light dark:bg-surface-dark rounded-3xl shadow-sm sticky top-4 z-50 transition-colors duration-300 hidden md:flex border border-white/20">
      <div className="mb-10 p-3 bg-accent-light dark:bg-primary/20 rounded-2xl text-primary">
        <Leaf size={24} />
      </div>
      <nav className="flex-1 flex flex-col gap-6 w-full px-4 items-center">
        <div className="flex flex-col items-center">
          <NavLink to="/" className={linkClass}>
            <Home size={24} />
          </NavLink>
          <span className="text-[10px] font-medium text-text-muted dark:text-gray-500 -mt-2">
            Home
          </span>
        </div>

        <div className="flex flex-col items-center">
          <NavLink to="/journal" className={linkClass}>
            <Book size={24} />
          </NavLink>
          <span className="text-[10px] font-medium text-text-muted dark:text-gray-500 -mt-2">
            Journal
          </span>
        </div>

        <div className="flex flex-col items-center">
          <NavLink to="/insights" className={linkClass}>
            <BarChart2 size={24} />
          </NavLink>
          <span className="text-[10px] font-medium text-text-muted dark:text-gray-500 -mt-2">
            Insights
          </span>
        </div>

        <div className="flex flex-col items-center">
          <NavLink to="/breathing" className={linkClass}>
            <Wind size={24} />
          </NavLink>
          <span className="text-[10px] font-medium text-text-muted dark:text-gray-500 -mt-2">
            Breathe
          </span>
        </div>
      </nav>
      <div className="mt-auto">
        <img
          alt="User Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer hover:scale-105 transition-transform"
          src="https://picsum.photos/200/200"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
