import React, { useState, useEffect } from "react";

const quotes = [
  {
    text: "Happiness is not a destination, but a journey we are currently on.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
];

const QuoteFooter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] md:ml-12 bg-gray-900 dark:bg-card-dark text-white p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center z-40 transition-colors duration-300 pointer-events-none opacity-90 hover:opacity-100">
      <p
        className={`text-lg md:text-xl font-medium italic opacity-90 max-w-3xl leading-relaxed transition-opacity duration-500 ${fade ? "opacity-90" : "opacity-0"}`}
      >
        "{quotes[currentIndex].text}"
      </p>
      <div
        className={`mt-4 flex items-center gap-4 opacity-60 transition-opacity duration-500 ${fade ? "opacity-60" : "opacity-0"}`}
      >
        <div className="h-[1px] w-12 bg-white"></div>
        <span className="text-xs font-bold uppercase tracking-widest">
          {quotes[currentIndex].author}
        </span>
        <div className="h-[1px] w-12 bg-white"></div>
      </div>
    </div>
  );
};

export default QuoteFooter;
