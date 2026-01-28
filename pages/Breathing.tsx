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
            className={`w-72 h-72 rounded-full bg-white shadow-glow flex flex-col items-center justify-center ${
              isBreathing ? "animate-breathe" : ""
            }`}
          >
            <div className="text-6xl font-bold">{formatTime(breathTime)}</div>
            <div className="text-primary mt-2">{phase}</div>
          </div>

          <PlayerControls
            isBreathing={isBreathing}
            onPlayPause={() => setIsBreathing(!isBreathing)}
            onReset={() => setBreathTime(300)}
          ></PlayerControls>
        </div>

        {/* MUSIC PLAYER */}
        <div className="mx-8 mb-6 bg-white rounded-2xl p-4 shadow flex items-center gap-6">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            {React.createElement(sounds[currentTrack].icon, { size: 24 })}
          </div>

          <div className="flex-1">
            <h4 className="font-bold">{sounds[currentTrack].name}</h4>
            <p className="text-xs text-gray-500">SoulSync Soundscape</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevTrack}
              disabled={isFirstTrack}
              className={isFirstTrack ? "opacity-30" : ""}
            >
              <SkipBack />
            </button>

            <button
              onClick={playPause}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={nextTrack}
              disabled={isLastTrack}
              className={isLastTrack ? "opacity-30" : ""}
            >
              <SkipForward />
            </button>

            <button onClick={replayTrack}>
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="flex-1 hidden md:flex items-center gap-2">
            <span className="text-xs font-mono">
              {formatTime(TRACK_DURATION - musicTime)}
            </span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${
                    ((TRACK_DURATION - musicTime) / TRACK_DURATION) * 100
                  }%`,
                }}
              />
            </div>
            <span className="text-xs font-mono">
              {formatTime(TRACK_DURATION)}
            </span>
          </div>

          <Heart className="text-gray-400 hover:text-red-400 cursor-pointer" />
          <List className="text-gray-400 cursor-pointer" />
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-80 bg-white border-l hidden lg:flex flex-col p-6 rounded-2xl h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Volume1 />
          <span className="font-bold text-sm uppercase">
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
                className={`p-4 rounded-xl cursor-pointer flex gap-4 transition ${
                  isActive
                    ? "bg-primary/20 border border-primary"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <s.icon />
                </div>
                <div>
                  <h4 className="font-bold">{s.name}</h4>
                  <p className="text-xs text-gray-500">
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
