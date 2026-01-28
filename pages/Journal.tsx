import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, Leaf, Search, Smile, Meh, Clock, MapPin, Share2, MoreHorizontal, Bold, Italic, Sparkles, Save } from 'lucide-react';

const Journal: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans">
      <Sidebar />
      <main className="flex-1 flex gap-6 p-4 h-full overflow-hidden">
        
        {/* Left List Panel */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4 hidden lg:flex">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-muted dark:text-gray-400">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span className="text-primary dark:text-primary"><Leaf size={20} fill="currentColor" /></span>
              <span className="dark:text-white">SoulSync</span>
            </div>
          </div>
          
          <div className="bg-surface-light dark:bg-card-dark rounded-2xl p-4 shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-1 focus:ring-primary dark:text-white placeholder-gray-400 outline-none" placeholder="Tìm kiếm nhật ký..." type="text"/>
            </div>
            
            <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="text-xs font-semibold text-text-muted dark:text-gray-400 uppercase tracking-wider">Lịch sử ghi chép</h3>
                <button className="text-xs text-primary font-medium hover:underline">Gần đây nhất</button>
            </div>

            <div className="overflow-y-auto hide-scrollbar flex-1 space-y-3 pr-1">
                {/* Entry 1 */}
                <div className="group bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl cursor-pointer transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-text-muted dark:text-gray-400">Hôm nay, 09:30 AM</span>
                        <Smile size={16} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-text-main dark:text-white mb-1">Buổi sáng bình yên</h4>
                    <p className="text-sm text-text-muted dark:text-gray-400 line-clamp-2 mb-3">Sáng nay mình dậy sớm, uống một tách trà và ngắm bình minh...</p>
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-[10px] font-bold text-blue-500 uppercase">Biết ơn</span>
                        <span className="px-2 py-0.5 rounded-md bg-green-50 dark:bg-green-900/30 text-[10px] font-bold text-green-500 uppercase">Yên bình</span>
                    </div>
                </div>
                 {/* Entry 2 */}
                 <div className="group bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl cursor-pointer transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-text-muted dark:text-gray-400">Hôm qua, 10:15 PM</span>
                        <Meh size={16} className="text-gray-400" />
                    </div>
                    <h4 className="font-semibold text-text-main dark:text-white mb-1">Sau một ngày dài làm việc</h4>
                    <p className="text-sm text-text-muted dark:text-gray-400 line-clamp-2 mb-3">Có một chút mệt mỏi nhưng mọi thứ đã hoàn thành tốt đẹp...</p>
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-900/30 text-[10px] font-bold text-orange-500 uppercase">Công việc</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Main Editor Panel */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
             <header className="flex justify-between items-center mb-4 px-2 py-2">
                <Link to="/" className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-muted dark:text-gray-400">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex items-center gap-3 bg-surface-light dark:bg-card-dark px-4 py-2 rounded-full shadow-sm text-sm font-medium text-text-muted dark:text-gray-400 ml-auto">
                    <Clock size={16} />
                    Thứ Ba, 24 Tháng 10, 2023
                </div>
            </header>

            <div className="flex-1 bg-surface-light dark:bg-card-dark rounded-2xl p-8 shadow-sm flex flex-col relative overflow-hidden">
                 <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-text-main dark:text-white mb-2">Viết cho chính mình</h1>
                        <p className="text-text-muted dark:text-gray-400">Hãy để cảm xúc dẫn lối cho những dòng chữ của bạn.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-text-muted dark:text-gray-400 transition-colors">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-text-muted dark:text-gray-400 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pb-24">
                     <input className="text-2xl font-semibold bg-transparent border-none p-0 placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 text-text-main dark:text-white outline-none" placeholder="Tiêu đề ngày hôm nay..." type="text" />
                     <div className="flex items-center gap-4 text-sm text-text-muted dark:text-gray-400">
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                            <Clock size={14} />
                            Ghi chú lúc 14:45
                        </div>
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                            <MapPin size={14} />
                            Hà Nội
                        </div>
                    </div>
                    <textarea className="w-full flex-1 resize-none bg-transparent border-none p-0 mt-4 text-lg leading-relaxed text-text-main dark:text-gray-300 placeholder-gray-200 dark:placeholder-gray-700 focus:ring-0 outline-none" placeholder="Bắt đầu chia sẻ câu chuyện của bạn ở đây..."></textarea>
                </div>

                {/* Floating Action Bar */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 pl-4 pr-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 z-10 transition-transform duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-1 pr-4 border-r border-gray-200 dark:border-gray-600">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                            <Bold size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                            <Italic size={20} />
                        </button>
                    </div>
                     <div className="flex items-center gap-2 pl-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors group">
                            <Sparkles size={18} className="group-hover:animate-pulse" />
                            <span className="font-semibold text-sm">Trợ lý AI</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white shadow-md hover:bg-primary-dark transition-all hover:shadow-lg transform active:scale-95">
                            <span className="font-semibold text-sm">Lưu</span>
                            <Save size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;
