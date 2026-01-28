import React from "react";
import { Link } from "react-router-dom";
import { Plus, Heart, Cloud } from "lucide-react";

const JournalSummary: React.FC = () => {
  return (
    <div className="bg-surface-light dark:bg-card-dark rounded-3xl p-8 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Soul Journal
          </h2>
          <p className="text-sm text-text-muted dark:text-gray-400 mt-1">
            A place to keep your memories
          </p>
        </div>
        <Link
          to="/journal"
          className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          New Entry
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-background-dark p-5 rounded-2xl hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              Today, 14:20
            </span>
            <Heart size={14} className="text-blue-300" />
          </div>
          <h4 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
            An unexpectedly peaceful morning
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            Today I woke up early, made a cup of hot tea and watched the city...
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-background-dark p-5 rounded-2xl hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Yesterday, 21:00
            </span>
            <Cloud size={14} className="text-gray-300" />
          </div>
          <h4 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
            Overcoming work pressure
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            Even though there were many deadlines, I tried to complete them bit
            by bit...
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalSummary;
