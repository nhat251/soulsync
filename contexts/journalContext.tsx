import React, { createContext, useContext, useState, ReactNode } from "react";

export interface JournalTag {
  label: string;
  color: "blue" | "green" | "orange" | "purple" | "red" | "pink" | "yellow" | "indigo";
}

export type MoodType = "happy" | "neutral" | "sad" | "excited" | "grateful" | "anxious" | "loved";

export interface JournalEntry {
  id: number;
  timestamp: Date;
  title: string;
  content: string;
  mood: MoodType;
  location: string;
  tags: JournalTag[];
}

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, "id" | "timestamp">) => void;
  updateEntry: (id: number, entry: Partial<JournalEntry>) => void;
  deleteEntry: (id: number) => void;
  getEntryById: (id: number) => JournalEntry | undefined;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
};

interface JournalProviderProps {
  children: ReactNode;
}

export const JournalProvider: React.FC<JournalProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      timestamp: new Date(),
      title: "Peaceful Morning",
      content:
        "Woke up early this morning, had a cup of tea and watched the sunrise. The warm rays of the sun gradually covered the entire city, making me feel grateful for another new day. Life sometimes doesn't need to be too complicated, just simple things like this are enough to make us happy.",
      mood: "grateful",
      location: "Hanoi",
      tags: [
        { label: "Grateful", color: "blue" },
        { label: "Peaceful", color: "green" },
      ],
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 86400000),
      title: "After a Long Day at Work",
      content:
        "A bit tired but everything was completed beautifully. The project we've been working on for 3 months is finally finished. The team worked very well together, everyone contributed their best. Although tired, the feeling of accomplishment is very fulfilling.",
      mood: "neutral",
      location: "Hanoi",
      tags: [{ label: "Work", color: "orange" }],
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 172800000),
      title: "Excited About New Project",
      content:
        "The idea for SoulSync is becoming clearer than ever. Today we had a meeting with the team and everyone was very excited about the new direction. I believe this will be a product that can truly help many people in life.",
      mood: "excited",
      location: "Hanoi",
      tags: [{ label: "Creative", color: "purple" }],
    },
  ]);

  const addEntry = (entry: Omit<JournalEntry, "id" | "timestamp">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Math.max(...entries.map((e) => e.id), 0) + 1,
      timestamp: new Date(),
    };
    setEntries([newEntry, ...entries]);
  };

  const updateEntry = (id: number, updatedFields: Partial<JournalEntry>) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedFields } : entry
      )
    );
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const getEntryById = (id: number) => {
    return entries.find((entry) => entry.id === id);
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
        updateEntry,
        deleteEntry,
        getEntryById,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};