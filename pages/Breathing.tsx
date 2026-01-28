import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, Leaf, RotateCcw, Pause, Play, Volume2, SkipBack, SkipForward, Heart, List, Volume1, CloudRain, Wind, Flame, Moon } from 'lucide-react';

const Breathing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(260); // 4:20
  const [phase, setPhase] = useState("Hít vào chậm");

  useEffect(() => {
    let interval: any;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        // Simple phase logic for demo
        const mod = timeLeft % 16;
        if (mod > 12) setPhase("Hít vào");
        else if (mod > 8) setPhase("Giữ");
        else if (mod > 4) setPhase("Thở ra");
        else setPhase("Giữ");

      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const sounds = [
    { icon: Wind, name: 'Rừng thông', desc: 'Tiếng chim hót', color: 'green' },
    { icon: CloudRain, name: 'Sóng biển', desc: 'Êm dịu', color: 'blue' },
    { icon: Flame, name: 'Lửa trại', desc: 'Ấm áp', color: 'orange' },
    { icon: Moon, name: 'Tiếng đêm', desc: 'Côn trùng kêu', color: 'purple' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#f3f6f8] to-[#eef2f5] dark:from-[#111827] dark:to-[#1f2937]">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 z-10">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
              <ArrowLeft size={24} className="text-gray-500 dark:text-gray-400" />
            </Link>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
              <Leaf className="text-primary" size={24} />
              <span>SoulSync</span>
            </div>
          </div>
          <div className="bg-white dark:bg-card-dark px-4 py-2 rounded-full shadow-sm text-sm text-gray-500 dark:text-gray-300 font-medium border border-gray-100 dark:border-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Kỹ thuật: Box Breathing
          </div>
        </header>

        {/* Breathing Circle */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-0">
            {/* Background Blobs */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 blur-3xl opacity-50 -z-10 animate-pulse"></div>
          
          <div className="relative mb-12">
             {/* Ripples */}
            <div className={`absolute inset-0 rounded-full border border-gray-100 dark:border-gray-700 scale-150 opacity-50 ${isPlaying ? 'animate-ping' : ''}`} style={{animationDuration: '4s'}}></div>
            <div className={`absolute inset-0 rounded-full border border-gray-100 dark:border-gray-700 scale-[1.8] opacity-30 ${isPlaying ? 'animate-ping' : ''}`} style={{animationDuration: '4s', animationDelay: '1s'}}></div>
            
            <div className={`w-72 h-72 rounded-full bg-white dark:bg-card-dark shadow-glow flex flex-col items-center justify-center relative z-10 ${isPlaying ? 'animate-breathe' : ''}`}>
              <div className="text-6xl font-bold text-gray-800 dark:text-white tracking-tight tabular-nums">
                {formatTime(timeLeft)}
              </div>
              <div className="text-primary font-medium mt-2 text-lg">{phase}</div>
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle className="text-gray-100 dark:text-gray-700" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeWidth="2"></circle>
                <circle className="text-primary transition-all duration-1000" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset={289 - (289 * (timeLeft / 300))} strokeLinecap="round" strokeWidth="2"></circle>
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8 mt-8">
            <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shadow-sm flex items-center justify-center transition-all hover:scale-105" onClick={() => setTimeLeft(300)}>
              <RotateCcw size={20} />
            </button>
            <button 
                className="w-16 h-16 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button className="w-12 h-12 rounded-full bg-white dark:bg-card-dark text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shadow-sm flex items-center justify-center transition-all hover:scale-105">
              <Volume2 size={20} />
            </button>
          </div>
        </div>

        {/* Player Bar */}
        <div className="mx-8 mb-6 bg-white dark:bg-card-dark rounded-2xl p-4 shadow-sm flex items-center gap-6 z-20 border border-gray-50 dark:border-gray-700">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden relative group">
            <img alt="Album Art" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://picsum.photos/100/100" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800 dark:text-white truncate">Deep Relaxation</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">SoulSync Meditative Original</p>
          </div>
          <div className="flex items-center gap-4">
            <SkipBack size={20} className="text-gray-400 cursor-pointer hover:text-primary" />
            <button className="w-10 h-10 rounded-full bg-gray-800 dark:bg-white text-white dark:text-gray-800 flex items-center justify-center hover:scale-105 transition-transform">
               <Play size={16} fill="currentColor" />
            </button>
            <SkipForward size={20} className="text-gray-400 cursor-pointer hover:text-primary" />
          </div>
          <div className="flex-1 flex items-center gap-3 hidden md:flex">
            <span className="text-xs font-mono text-gray-400">02:15</span>
            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer group">
              <div className="w-1/3 h-full bg-primary rounded-full group-hover:bg-primary-dark transition-colors relative"></div>
            </div>
            <span className="text-xs font-mono text-gray-400">05:00</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Heart size={20} className="hover:text-red-400 cursor-pointer transition-colors" />
            <List size={20} className="hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer transition-colors" />
          </div>
        </div>
      </main>
      
      {/* Right Sidebar - Soundscapes */}
      <aside className="w-80 h-full bg-surface-light dark:bg-surface-dark shadow-sm z-20 hidden lg:flex flex-col border-l border-gray-100 dark:border-gray-700/50">
        <div className="p-6 pb-2">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
                <Volume1 size={18} />
                <span className="font-bold text-sm tracking-wide uppercase">Không gian âm thanh</span>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 space-y-4 hide-scrollbar pb-6">
            <div className="bg-primary/20 dark:bg-primary/10 rounded-2xl p-4 border border-primary/30 relative overflow-hidden group cursor-pointer transition-all hover:shadow-md">
                <div className="absolute right-2 top-2 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/60 dark:bg-white/10 flex items-center justify-center text-primary-dark dark:text-primary">
                        <CloudRain size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">Mưa nhẹ</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">Đang phát</p>
                    </div>
                </div>
                 <div className="mt-4 flex items-center gap-2">
                    <Volume1 size={14} className="text-gray-500"/>
                    <div className="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-primary rounded-full"></div>
                    </div>
                </div>
            </div>

            {sounds.map((sound, idx) => (
                 <div key={idx} className="bg-white dark:bg-card-dark rounded-2xl p-4 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors`}>
                            <sound.icon size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-700 dark:text-gray-200">{sound.name}</h3>
                            <p className="text-xs text-gray-400">{sound.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </aside>
    </div>
  );
};

export default Breathing;
