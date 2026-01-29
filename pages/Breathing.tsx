import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayerControls from "../components/PlayerControls";
import {
  ArrowLeft,
  Leaf,
  Play,
  SkipBack,
  SkipForward,
  Heart,
  List,
  Volume1,
  CloudRain,
  Wind,
  Flame,
  Moon,
  Volume2,
  Pause,
  RotateCcw,
} from "lucide-react";

/* ===================== CONFIG ===================== */
const TRACK_DURATION = 180; // 3 phút

const sounds = [
  { icon: Wind, name: "Rừng thông", desc: "Tiếng chim hót" },
  { icon: CloudRain, name: "Sóng biển", desc: "Êm dịu" },
  { icon: Flame, name: "Lửa trại", desc: "Ấm áp" },
  { icon: Moon, name: "Tiếng đêm", desc: "Côn trùng kêu" },
];

const Breathing: React.FC = () => {
  /* ===================== BREATHING ===================== */
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

  /* ===================== MUSIC ===================== */
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicTime, setMusicTime] = useState(TRACK_DURATION);

  const isFirstTrack = currentTrack === 0;
  const isLastTrack = currentTrack === sounds.length - 1;

  useEffect(() => {
    let interval: any;

    if (isPlaying && musicTime > 0) {
      interval = setInterval(() => {
        setMusicTime((prev) => prev - 1);
      }, 1000);
    }

    if (musicTime === 0) {
      if (!isLastTrack) {
        selectTrack(currentTrack + 1);
      } else {
        setIsPlaying(false);
      }
    }

    return () => clearInterval(interval);
  }, [isPlaying, musicTime]);

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setMusicTime(TRACK_DURATION);
    setIsPlaying(true);
  };

  const playPause = () => setIsPlaying((p) => !p);

  const replayTrack = () => {
    setMusicTime(TRACK_DURATION);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (!isLastTrack) selectTrack(currentTrack + 1);
  };

  const prevTrack = () => {
    if (!isFirstTrack) selectTrack(currentTrack - 1);
  };

  /* ===================== UTILS ===================== */
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="flex h-full gap-6">
<main className="flex-1 flex flex-col overflow-hidden">
        {/* BREATHING */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className={`w-72 h-72 rounded-full bg-white dark:bg-gray-800 shadow-glow flex flex-col items-center justify-center transition-colors ${
              isBreathing ? "animate-breathe" : ""
            }`}
          >
            <div className="text-6xl font-bold text-gray-900 dark:text-white">
              {formatTime(breathTime)}
            </div>
            <div className="text-primary dark:text-primary mt-2">{phase}</div>
          </div>

          <PlayerControls
            isBreathing={isBreathing}
            onPlayPause={() => setIsBreathing(!isBreathing)}
            onReset={() => setBreathTime(300)}
          ></PlayerControls>
        </div>

        {/* MUSIC PLAYER */}
        <div className="mx-8 mb-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow flex items-center gap-6 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-colors">
            {React.createElement(sounds[currentTrack].icon, {
              size: 24,
              className: "text-gray-700 dark:text-gray-300",
            })}
          </div>

          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white">
              {sounds[currentTrack].name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SoulSync Soundscape
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevTrack}
              disabled={isFirstTrack}
              className={`text-gray-700 dark:text-gray-300 ${
                isFirstTrack
                  ? "opacity-30"
                  : "hover:text-primary dark:hover:text-primary"
              }`}
            >
              <SkipBack />
            </button>

            <button
              onClick={playPause}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={nextTrack}
              disabled={isLastTrack}
              className={`text-gray-700 dark:text-gray-300 ${
                isLastTrack
                  ? "opacity-30"
                  : "hover:text-primary dark:hover:text-primary"
              }`}
            >
              <SkipForward />
            </button>

            <button
              onClick={replayTrack}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              <RotateCcw size={18} />
            </button>
          </div>
<div className="flex-1 hidden md:flex items-center gap-2">
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
              {formatTime(TRACK_DURATION - musicTime)}
            </span>
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${
                    ((TRACK_DURATION - musicTime) / TRACK_DURATION) * 100
                  }%`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
              {formatTime(TRACK_DURATION)}
            </span>
          </div>

          <Heart className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-400 cursor-pointer transition-colors" />
          <List className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 hidden lg:flex flex-col p-6 rounded-2xl h-full overflow-y-auto transition-colors">
        <div className="flex items-center gap-2 mb-6">
          <Volume1 className="text-gray-700 dark:text-gray-300" />
          <span className="font-bold text-sm uppercase text-gray-900 dark:text-white">
            Không gian âm thanh
          </span>
        </div>

        <div className="space-y-4">
          {sounds.map((s, i) => {
            const isActive = i === currentTrack;

            return (
              <div
                key={i}
                onClick={() => selectTrack(i)}
                className={`p-4 rounded-xl cursor-pointer flex gap-4 transition-all ${
                  isActive
                    ? "bg-primary/20 dark:bg-primary/30 border border-primary"
                    : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
                  <s.icon className="text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {s.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isActive ? "Đang phát" : s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Breathing;