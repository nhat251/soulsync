import React, { useState, useEffect } from "react";
import { Wind, Play } from "lucide-react";
import PlayerControls from "../PlayerControls";

const BreathingWidget: React.FC = () => {
  /* ===================== BREATHING ===================== */
  const [isStarted, setIsStarted] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathTime, setBreathTime] = useState(300);
  const [phase, setPhase] = useState("Hít vào chậm");

  useEffect(() => {
    let interval: any;
    if (isBreathing && breathTime > 0) {
      interval = setInterval(() => {
        setBreathTime((prev) => prev - 1);

        const mod = breathTime % 16;
        if (mod > 12) setPhase("Hít vào");
        else if (mod > 8) setPhase("Giữ");
        else if (mod > 4) setPhase("Thở ra");
        else setPhase("Giữ");
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 relative overflow-hidden shadow-sm flex flex-col items-center justify-center text-center group h-auto min-h-[400px]">
      <div className="absolute top-0 right-0 p-6 opacity-30">
        <Wind size={32} />
      </div>
      <div className="relative mb-6 mt-4">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            className="text-white dark:text-gray-600 opacity-50"
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="currentColor"
            strokeWidth="2"
          ></circle>
          <circle
            className="text-gray-800 dark:text-primary transition-all duration-1000"
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="currentColor"
            strokeDasharray="440"
            strokeDashoffset="100"
            strokeWidth="2"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800 dark:text-white">
            {formatTime(breathTime)}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
        Breathing &amp; Relaxation
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Rebalance your life rhythm
      </p>
      {!isStarted ? (
        <button
          onClick={() => {
            setIsStarted(true);
            setIsBreathing(true);
          }}
          className="bg-white dark:bg-primary text-gray-900 dark:text-white px-8 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Play size={16} fill="currentColor" />
          Start
        </button>
      ) : (
        <div className="animate-fade-in">
          <PlayerControls
            isBreathing={isBreathing}
            onPlayPause={() => setIsBreathing(!isBreathing)}
            breathTime={() => setBreathTime(300)}
            className="!mt-0 gap-6"
          />
        </div>
      )}
    </div>
  );
};

export default BreathingWidget;
