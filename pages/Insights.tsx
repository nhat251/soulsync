import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Leaf, Calendar, Brain, ArrowRight } from "lucide-react";
import { useJournal, MoodType } from "@/contexts/journalContext";

const Insights: React.FC = () => {
  const { entries } = useJournal();

  // Phân loại cảm xúc thành tích cực và tiêu cực
  const moodCategories: Record<MoodType, "positive" | "neutral" | "negative"> = {
    happy: "positive",
    excited: "positive",
    grateful: "positive",
    loved: "positive",
    neutral: "neutral",
    sad: "negative",
    anxious: "negative",
  };

  // Tính toán dữ liệu cho biểu đồ tuần này
  const weeklyData = useMemo(() => {
    const now = new Date();
    const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const data = [];

    // Lấy 7 ngày gần nhất
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayName = weekDays[date.getDay()];

      // Lọc các entries trong ngày này
      const dayEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === date.getTime();
      });

      // Tính điểm cảm xúc cho ngày này
      let score = 50; // Mặc định là 50 nếu không có dữ liệu

      if (dayEntries.length > 0) {
        let positiveCount = 0;
        let negativeCount = 0;
        let neutralCount = 0;

        dayEntries.forEach((entry) => {
          const category = moodCategories[entry.mood];
          if (category === "positive") positiveCount++;
          else if (category === "negative") negativeCount++;
          else neutralCount++;
        });

        const total = dayEntries.length;
        // Tính điểm: positive = 100, neutral = 50, negative = 0
        score = Math.round(
          ((positiveCount * 100 + neutralCount * 50 + negativeCount * 0) / total)
        );
      }

      data.push({
        name: dayName,
        value: score,
        date: date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
        count: dayEntries.length,
      });
    }

    return data;
  }, [entries]);

  // Tính toán thống kê tổng quan
  const statistics = useMemo(() => {
    if (entries.length === 0) {
      return {
        positivePercent: 0,
        negativePercent: 0,
        neutralPercent: 0,
        averageScore: 50,
        totalEntries: 0,
        streak: 0,
      };
    }

    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    entries.forEach((entry) => {
      const category = moodCategories[entry.mood];
      if (category === "positive") positiveCount++;
      else if (category === "negative") negativeCount++;
      else neutralCount++;
    });

    const total = entries.length;
    const positivePercent = Math.round((positiveCount / total) * 100);
    const negativePercent = Math.round((negativeCount / total) * 100);
    const neutralPercent = 100 - positivePercent - negativePercent;

    const averageScore = Math.round(
      (positiveCount * 100 + neutralCount * 50 + negativeCount * 0) / total
    );

    // Tính streak (số ngày liên tiếp có ghi chép)
    let streak = 0;
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(now);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);

      const hasEntry = entries.some((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === checkDate.getTime();
      });

      if (hasEntry) {
        streak++;
      } else {
        break;
      }
    }

    return {
      positivePercent,
      negativePercent,
      neutralPercent,
      averageScore,
      totalEntries: total,
      streak,
    };
  }, [entries]);

  // Tìm các tags phổ biến nhất
  const popularTags = useMemo(() => {
    const tagCount: Record<string, number> = {};

    entries.forEach((entry) => {
      entry.tags.forEach((tag) => {
        tagCount[tag.label] = (tagCount[tag.label] || 0) + 1;
      });
    });

    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([label]) => label);
  }, [entries]);

  // Tạo insight text dựa trên dữ liệu
  const insightText = useMemo(() => {
    if (statistics.totalEntries === 0) {
      return "Bắt đầu ghi chép để nhận được phân tích cảm xúc từ AI.";
    }

    if (statistics.positivePercent >= 70) {
      return `Bạn đang có trạng thái cảm xúc rất tích cực với ${statistics.positivePercent}% ghi chép mang tâm trạng vui vẻ. Hãy tiếp tục duy trì!`;
    } else if (statistics.positivePercent >= 50) {
      return `Tâm trạng của bạn khá ổn định với ${statistics.positivePercent}% ghi chép tích cực. Một vài biến động là điều bình thường.`;
    } else if (statistics.negativePercent >= 50) {
      return `Bạn có vẻ đang trải qua giai đoạn khó khăn với ${statistics.negativePercent}% ghi chép tiêu cực. Hãy dành thời gian chăm sóc bản thân nhé.`;
    } else {
      return `Cảm xúc của bạn khá cân bằng giữa tích cực (${statistics.positivePercent}%) và các trạng thái khác. Đây là điều tốt!`;
    }
  }, [statistics]);

  // Tạo dữ liệu lịch cho tháng hiện tại
  const calendarData = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const calendar = [];
    const startDayOfWeek = firstDay.getDay();

    // Thêm các ngày trống ở đầu
    for (let i = 0; i < startDayOfWeek; i++) {
      calendar.push(null);
    }

    // Thêm các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);

      const dayEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === date.getTime();
      });

      let mood: "positive" | "neutral" | "negative" | null = null;
      if (dayEntries.length > 0) {
        let positiveCount = 0;
        let negativeCount = 0;

        dayEntries.forEach((entry) => {
          const category = moodCategories[entry.mood];
          if (category === "positive") positiveCount++;
          else if (category === "negative") negativeCount++;
        });

        if (positiveCount > negativeCount) mood = "positive";
        else if (negativeCount > positiveCount) mood = "negative";
        else mood = "neutral";
      }

      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      calendar.push({
        day,
        hasData: dayEntries.length > 0,
        mood,
        isToday,
        entryCount: dayEntries.length,
      });
    }

    return calendar;
  }, [entries]);

  const monthName = new Date().toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  });

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
              {monthName}
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
                  {statistics.totalEntries > 0
                    ? `${statistics.positivePercent}% tích cực, ${statistics.negativePercent}% tiêu cực, ${statistics.neutralPercent}% trung lập`
                    : "Chưa có dữ liệu ghi chép"}
                </p>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Tích
                  cực
                </div>
                <div className="flex items-center gap-1 text-text-muted dark:text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>{" "}
                  Trung lập
                </div>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-500">
                  <span className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500"></span>{" "}
                  Tiêu cực
                </div>
              </div>
            </div>

            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B9080" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6B9080" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {data.date}
                            </p>
                            <p className="text-sm font-bold text-primary">
                              Điểm cảm xúc: {data.value}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {data.count} ghi chép
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
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

            {/* Thống kê bổ sung */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                  {statistics.positivePercent}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Tích cực
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {statistics.neutralPercent}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Trung lập
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                  {statistics.negativePercent}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Tiêu cực
                </div>
              </div>
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
                  "{insightText}"
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">
                {popularTags.length > 0 ? "Chủ đề phổ biến" : "Bắt đầu ghi chép"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.length > 0 ? (
                  popularTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium border border-white/5 hover:bg-white/20 transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    Thêm tags vào journal để xem thống kê
                  </p>
                )}
              </div>
              {statistics.totalEntries > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Tổng ghi chép</div>
                  <div className="text-2xl font-bold">{statistics.totalEntries}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar Heatmap */}
        <div className="bg-surface-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                Lịch sử cảm xúc {monthName}
              </h2>
              <p className="text-sm text-text-muted dark:text-gray-400">
                Ghi nhận liên tiếp:{" "}
                <span className="font-semibold text-primary">
                  {statistics.streak} ngày
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center">
            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
              <div
                key={d}
                className="text-xs text-text-muted dark:text-gray-500 uppercase mb-2 font-medium"
              >
                {d}
              </div>
            ))}

            {calendarData.map((day, i) => {
              if (!day) {
                return <div key={`empty-${i}`} className="aspect-square"></div>;
              }

              const moodColor = day.mood === "positive"
                ? "bg-green-500"
                : day.mood === "negative"
                ? "bg-orange-500"
                : day.mood === "neutral"
                ? "bg-blue-500"
                : "bg-primary";

              return (
                <div
                  key={day.day}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative group hover:ring-2 hover:ring-primary/20 transition cursor-pointer text-sm font-medium
                             ${
                               day.hasData
                                 ? "bg-primary/5 dark:bg-primary/10"
                                 : "bg-background-light dark:bg-gray-800/50 text-gray-400 dark:text-gray-500"
                             }
                             ${
                               day.isToday
                                 ? "bg-white dark:bg-gray-700 shadow-md border-2 border-primary/20 text-primary font-bold"
                                 : ""
                             }
                        `}
                  title={
                    day.hasData
                      ? `${day.entryCount} ghi chép - ${
                          day.mood === "positive"
                            ? "Tích cực"
                            : day.mood === "negative"
                            ? "Tiêu cực"
                            : "Trung lập"
                        }`
                      : "Chưa có ghi chép"
                  }
                >
                  {day.day}
                  {day.hasData && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 ${moodColor}`}></span>
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
                  {statistics.negativePercent > 40
                    ? "Dựa trên cảm xúc hiện tại, hãy dành 5 phút để thư giãn hơi thở."
                    : "Bạn đang có tâm trạng tốt! Hãy duy trì bằng cách thực hành thở sâu."}
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