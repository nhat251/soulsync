import React from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Leaf, Calendar, Brain, ArrowRight } from "lucide-react";

const data = [
  { name: "T2", value: 60 },
  { name: "T3", value: 70 },
  { name: "T4", value: 65 },
  { name: "T5", value: 85 },
  { name: "T6", value: 80 },
  { name: "T7", value: 90 },
  { name: "CN", value: 85 },
];

const Insights: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans">
      <Sidebar />
      <main className="flex-1 max-w-7xl mx-auto overflow-y-auto p-4 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-muted dark:text-gray-400">
              <Link to="/" className="hover:text-primary transition-colors">
                <ArrowLeft size={24} />
              </Link>
              <div className="flex items-center gap-2 font-semibold text-lg text-text-main dark:text-white">
                <Leaf className="text-primary" size={24} />
                SoulSync{" "}
                <span className="text-text-muted dark:text-gray-500 font-normal">
                  Insights
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-surface-light dark:bg-card-dark rounded-full shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-2 text-sm font-medium text-text-muted dark:text-gray-400">
              <Calendar size={16} />
              Tháng 10, 2023
            </div>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-surface-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 z-10 relative">
              <div>
                <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                  Xu hướng cảm xúc tuần này
                </h2>
                <p className="text-sm text-text-muted dark:text-gray-400">
                  Bạn đang có một tuần khá ổn định
                </p>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Tích
                  cực
                </div>
                <div className="flex items-center gap-1 text-text-muted dark:text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>{" "}
                  Bình lặng
                </div>
              </div>
            </div>

            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B9080" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6B9080" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    itemStyle={{ color: "#6B9080", fontWeight: "bold" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6B9080"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888", fontSize: 12 }}
                    dy={10}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="lg:col-span-1 bg-gray-900 dark:bg-black rounded-2xl p-6 shadow-lg text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Brain size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">AI Phân tích</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm mb-6">
                <p className="text-sm leading-relaxed text-gray-300 italic">
                  "Bạn có xu hướng cảm thấy tích cực nhất vào buổi sáng sau khi
                  tập thở. Sự lo âu thường xuất hiện vào chiều tối Thứ Năm."
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">
                Chủ đề tuần này
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Sự tập trung", "Biết ơn", "Sáng tạo"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium border border-white/5 hover:bg-white/20 transition cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Heatmap (Simplified visual representation) */}
        <div className="bg-surface-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                Lịch sử cảm xúc tháng 10
              </h2>
              <p className="text-sm text-text-muted dark:text-gray-400">
                Ghi nhận liên tiếp:{" "}
                <span className="font-semibold text-primary">12 ngày</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div
                key={d}
                className="text-xs text-text-muted dark:text-gray-500 uppercase mb-2"
              >
                {d}
              </div>
            ))}

            {/* Dummy Calendar Days */}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              // Mocking some data states
              const isToday = day === 4; // Mocking today is the 4th displayed
              const hasData = [1, 2, 4].includes(day);
              const moodColor = day === 2 ? "bg-accent-blue" : "bg-primary";
              const opacity = day === 3 ? "bg-primary/40" : moodColor;

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative group hover:ring-2 hover:ring-primary/20 transition cursor-pointer text-sm font-medium
                             ${hasData ? "bg-primary/5 dark:bg-primary/10" : "bg-background-light dark:bg-gray-800/50 text-gray-400 dark:text-gray-500"}
                             ${isToday ? "bg-white dark:bg-gray-700 shadow-md border-2 border-primary/20 text-primary font-bold" : ""}
                        `}
                >
                  {day}
                  {hasData && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${opacity}`}
                    ></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 z-0"></div>
          <div className="relative z-10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
                <Leaf size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-text-muted dark:text-gray-400 uppercase tracking-wider mb-1">
                  Khuyến nghị của SoulSync
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Dành riêng cho hôm nay
                </h3>
                <p className="text-sm text-text-muted dark:text-gray-400 mt-1">
                  Dựa trên cảm xúc hiện tại, hãy dành 5 phút để thư giãn hơi
                  thở.
                </p>
              </div>
            </div>
            <Link
              to="/breathing"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/20 transition-all flex items-center gap-2 whitespace-nowrap group"
            >
              Bắt đầu ngay
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
        <div className="h-8"></div>
      </main>
    </div>
  );
};

export default Insights;
