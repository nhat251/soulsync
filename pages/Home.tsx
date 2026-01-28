import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, Frown, Meh, Smile, Play, Plus, Heart, Cloud, Zap, TrendingUp, Wind } from 'lucide-react';

const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number>(3);

  const moods = [
    { level: 1, label: 'Tệ', Icon: Frown },
    { level: 2, label: 'Buồn', Icon: Cloud },
    { level: 3, label: 'Ổn', Icon: Meh },
    { level: 4, label: 'Vui', Icon: Smile },
    { level: 5, label: 'Tuyệt', Icon: Heart }, // Using heart for "Love it/Great"
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 relative">
        {/* Header */}
        <header className="flex justify-between items-start mb-8 pl-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              SoulSync – <span className="text-primary font-medium">Nhẹ nhàng lắng nghe chính bạn</span>
            </h1>
            <p className="text-text-muted dark:text-gray-400">Chào Minh, hãy cùng chăm sóc tâm hồn mình nhé.</p>
          </div>
          <div className="flex items-center gap-4 mr-12 md:mr-0">
            <button className="p-2 rounded-full bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-white dark:border-surface-dark"></span>
            </button>
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-800 dark:text-white">Minh Anh</p>
              <p className="text-xs text-primary font-medium uppercase tracking-wide">Premium User</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6 pb-24">
          {/* Mood Tracker */}
          <div className="col-span-12 lg:col-span-8 bg-surface-light dark:bg-card-dark rounded-3xl p-8 shadow-sm transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theo dõi cảm xúc</h2>
                <p className="text-sm text-text-muted dark:text-gray-400 mt-1">Ghi lại rung động của bạn lúc này</p>
              </div>
              <span className="text-sm text-primary bg-accent-light dark:bg-primary/20 px-3 py-1 rounded-full">Hôm nay</span>
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
                          ? 'w-16 h-16 md:w-20 md:h-20 -mt-2 bg-mood-happy dark:bg-primary text-primary dark:text-white shadow-lg shadow-primary/20 scale-105 ring-4 ring-white dark:ring-card-dark'
                          : 'bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/10'
                      }`}
                    >
                      <m.Icon size={isSelected ? 32 : 24} />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? 'font-bold text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400'
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
                placeholder="Điều gì đang diễn ra trong lòng bạn?..."
                type="text"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-gray-900 dark:bg-white text-white dark:text-black px-6 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                Lưu lại
              </button>
            </div>
          </div>

          {/* Breathing Widget */}
          <div className="col-span-12 lg:col-span-4 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 relative overflow-hidden shadow-sm flex flex-col items-center justify-center text-center group">
            <div className="absolute top-0 right-0 p-6 opacity-30">
              <Wind size={32} />
            </div>
            <div className="absolute top-4 right-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
              Session 01
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
                <span className="text-4xl font-bold text-gray-800 dark:text-white">05:00</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">Hơi thở &amp; Thư giãn</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Cân bằng lại nhịp sống</p>
            <Link
              to="/breathing"
              className="bg-white dark:bg-primary text-gray-900 dark:text-white px-8 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <Play size={16} fill="currentColor" />
              Bắt đầu
            </Link>
          </div>

          {/* Recent Journal */}
          <div className="col-span-12 lg:col-span-8 bg-surface-light dark:bg-card-dark rounded-3xl p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Nhật ký tâm hồn</h2>
                <p className="text-sm text-text-muted dark:text-gray-400 mt-1">Nơi lưu giữ những mảnh ký ức</p>
              </div>
              <Link
                to="/journal"
                className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
              >
                <Plus size={18} />
                Viết bài mới
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-background-dark p-5 rounded-2xl hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Hôm nay, 14:20</span>
                  <Heart size={14} className="text-blue-300" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                  Một buổi sáng bình yên lạ thường
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  Hôm nay mình thức dậy sớm, pha một tách trà nóng và ngắm nhìn thành phố...
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-background-dark p-5 rounded-2xl hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hôm qua, 21:00</span>
                  <Cloud size={14} className="text-gray-300" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                  Vượt qua áp lực công việc
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  Dù deadline rất nhiều nhưng mình đã cố gắng hoàn thành từng chút một...
                </p>
              </div>
            </div>
          </div>

          {/* Energy Stats */}
          <Link
            to="/insights"
            className="col-span-12 lg:col-span-4 bg-surface-light dark:bg-card-dark rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Năng lượng cá nhân</h3>
                <Zap className="text-primary" size={24} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Dựa trên nhịp sinh học và tâm trạng của bạn trong 7 ngày qua.
              </p>
            </div>
            <div className="flex items-end justify-between mt-8 relative z-10">
              <div>
                <span className="text-5xl font-bold text-gray-800 dark:text-white">82%</span>
              </div>
              <div className="flex items-center text-primary text-xs font-bold gap-1 mb-2">
                <TrendingUp size={16} />
                +5%
              </div>
            </div>
            <div className="absolute bottom-4 left-8 text-[10px] text-gray-400 uppercase tracking-widest">Xu hướng</div>
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
        </div>

        {/* Quote Footer */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] md:ml-12 bg-gray-900 dark:bg-card-dark text-white p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center z-40 transition-colors duration-300 pointer-events-none opacity-90 hover:opacity-100">
            <p className="text-lg md:text-xl font-medium italic opacity-90 max-w-3xl leading-relaxed">
              "Hạnh phúc không phải là điểm đến, mà là hành trình chúng ta đang đi."
            </p>
            <div className="mt-4 flex items-center gap-4 opacity-60">
              <div className="h-[1px] w-12 bg-white"></div>
              <span className="text-xs font-bold uppercase tracking-widest">Thích Nhất Hạnh</span>
              <div className="h-[1px] w-12 bg-white"></div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Home;