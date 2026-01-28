import React, { useState } from "react";
import { Frown, Meh, Smile, Heart, Cloud } from "lucide-react";

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number>(3);

  const moods = [
    { level: 1, label: "Awful", Icon: Frown },
    { level: 2, label: "Sad", Icon: Cloud },
    { level: 3, label: "Okay", Icon: Meh },
    { level: 4, label: "Good", Icon: Smile },
    { level: 5, label: "Great", Icon: Heart },
  ];

  return (
    <div className="bg-surface-light dark:bg-card-dark rounded-3xl p-8 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Mood Tracker
          </h2>
          <p className="text-sm text-text-muted dark:text-gray-400 mt-1">
            Record your current vibe
          </p>
        </div>
        <span className="text-sm text-primary bg-accent-light dark:bg-primary/20 px-3 py-1 rounded-full">
          Today
        </span>
      </div>
      <div className="flex justify-between gap-4 mb-8 overflow-x-auto py-2">
        {moods.map((m, idx) => {
          const isSelected = selectedMood === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedMood(idx)}
              className="flex flex-col items-center gap-3 group min-w-[60px]"
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected
                    ? "w-16 h-16 md:w-20 md:h-20 -mt-2 bg-mood-happy dark:bg-primary text-primary dark:text-white shadow-lg shadow-primary/20 scale-105 ring-4 ring-white dark:ring-card-dark"
                    : "bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/10"
                }`}
              >
                <m.Icon size={isSelected ? 32 : 24} />
              </div>
              <span
                className={`text-xs font-medium ${
                  isSelected
                    ? "font-bold text-primary dark:text-primary-light"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {m.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="relative mt-6">
        <input
          className="w-full bg-gray-50 dark:bg-background-dark border-none outline-none rounded-2xl py-4 px-6 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
          placeholder="What's on your mind?..."
          type="text"
        />
        <button className="absolute right-2 top-2 bottom-2 bg-gray-900 dark:bg-white text-white dark:text-black px-6 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          Save
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;
