export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    date: string;
    mood: string;
    tags: string[];
}

export interface MoodOption {
    value: number;
    label: string;
    icon: string; // Mapping to Lucide icon name conceptually
}

export interface SoundScape {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
}
