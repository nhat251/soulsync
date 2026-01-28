import React from "react";
import { Link } from "react-router-dom";
import { Zap, TrendingUp } from "lucide-react";

const EnergyStats: React.FC = () => {
  return (
    <Link
      to="/insights"
      className="bg-surface-light dark:bg-card-dark rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-auto min-h-[200px]"
    >
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Personal Energy
          </h3>
          <Zap className="text-primary" size={24} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
          Based on your circadian rhythm and mood in the last 7 days.
        </p>
      </div>
      <div className="flex items-end justify-between mt-8 relative z-10">
        <div>
          <span className="text-5xl font-bold text-gray-800 dark:text-white">
            82%
          </span>
        </div>
        <div className="flex items-center text-primary text-xs font-bold gap-1 mb-2">
          <TrendingUp size={16} />
          +5%
        </div>
      </div>
      <div className="absolute bottom-4 left-8 text-[10px] text-gray-400 uppercase tracking-widest">
        Trends
      </div>
      <div className="absolute bottom-0 right-0 left-0 h-24 pointer-events-none">
        <svg
          className="w-full h-full text-blue-100 dark:text-primary/20 fill-current"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
        >
          <path d="M0,40 C30,40 30,10 50,20 C70,30 80,0 100,40 Z"></path>
        </svg>
        <svg
          className="w-full h-full text-blue-200 dark:text-primary/10 fill-current absolute top-2 left-4 opacity-50"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
        >
          <path d="M0,40 C20,40 40,20 60,30 C80,40 90,10 100,40 Z"></path>
        </svg>
      </div>
    </Link>
  );
};

export default EnergyStats;
