import { Frown, Meh, Smile, Heart, Cloud } from "lucide-react";

export const QUOTES = [
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

export const MOODS = [
  { level: 1, label: "Awful", Icon: Frown },
  { level: 2, label: "Sad", Icon: Cloud },
  { level: 3, label: "Okay", Icon: Meh },
  { level: 4, label: "Good", Icon: Smile },
  { level: 5, label: "Great", Icon: Heart },
];

export const JOURNAL_ENTRIES = [
  {
    id: 1,
    date: "Today, 14:20",
    icon: "heart",
    title: "An unexpectedly peaceful morning",
    content:
      "Today I woke up early, made a cup of hot tea and watched the city...",
    colorClass: "text-blue-300",
  },
  {
    id: 2,
    date: "Yesterday, 21:00",
    icon: "cloud",
    title: "Overcoming work pressure",
    content:
      "Even though there were many deadlines, I tried to complete them bit by bit...",
    colorClass: "text-gray-300",
  },
];
