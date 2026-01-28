import React from "react";
import { RotateCcw, Pause, Play, Volume2 } from "lucide-react";

interface PlayerControlsProps {
  isBreathing: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onVolumeClick?: () => void;
  className?: string;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isBreathing,
  onPlayPause,
  onReset,
  onVolumeClick,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-8 mt-8 ${className}`}>
      <button
        className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shadow-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        onClick={onReset}
        aria-label="Reset timer"
      >
        <RotateCcw size={20} />
      </button>
      <button
        className="w-16 h-16 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        onClick={onPlayPause}
        aria-label={isBreathing ? "Pause" : "Play"}
      >
        {isBreathing ? (
          <Pause size={32} fill="currentColor" />
        ) : (
          <Play size={32} fill="currentColor" className="ml-1" />
        )}
      </button>
      <button
        className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shadow-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        onClick={onVolumeClick}
        aria-label="Volume control"
      >
        <Volume2 size={20} />
      </button>
    </div>
  );
};

export default PlayerControls;
