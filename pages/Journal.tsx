import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  ArrowLeft,
  Leaf,
  Search,
  Smile,
  Meh,
  Clock,
  MapPin,
  Share2,
  MoreHorizontal,
  Bold,
  Italic,
  Sparkles,
  Save,
  Image as ImageIcon,
  Frown,
  Heart,
  CloudRain,
  Tag,
  X,
  Plus,
  Link2,
  Download,
  Trash2,
  Copy,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
} from "lucide-react";
import { useJournal, JournalTag, MoodType } from "@/contexts/journalContext";
import { message, notification } from "antd";

// Available moods with icons and colors
const MOODS = [
  {
    value: "happy" as MoodType,
    label: "Happy",
    icon: Smile,
    color: "text-green-500",
  },
  {
    value: "grateful" as MoodType,
    label: "Grateful",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    value: "excited" as MoodType,
    label: "Excited",
    icon: Sparkles,
    color: "text-purple-500",
  },
  {
    value: "neutral" as MoodType,
    label: "Neutral",
    icon: Meh,
    color: "text-gray-400",
  },
  {
    value: "sad" as MoodType,
    label: "Sad",
    icon: Frown,
    color: "text-blue-500",
  },
  {
    value: "anxious" as MoodType,
    label: "Anxious",
    icon: CloudRain,
    color: "text-orange-500",
  },
  {
    value: "loved" as MoodType,
    label: "Loved",
    icon: Heart,
    color: "text-red-500",
  },
];

// Predefined tags that users can choose from
const PREDEFINED_TAGS: JournalTag[] = [
  { label: "Grateful", color: "blue" },
  { label: "Peaceful", color: "green" },
  { label: "Work", color: "orange" },
  { label: "Creative", color: "purple" },
  { label: "Family", color: "pink" },
  { label: "Health", color: "green" },
  { label: "Travel", color: "indigo" },
  { label: "Learning", color: "yellow" },
  { label: "Reflection", color: "purple" },
  { label: "Achievement", color: "blue" },
];

const Journal: React.FC = () => {
  const { entries, addEntry, updateEntry, deleteEntry } = useJournal();

  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(
    entries[0]?.id || null,
  );
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Hanoi");
  const [currentMood, setCurrentMood] = useState<MoodType>("neutral");
  const [currentTags, setCurrentTags] = useState<JournalTag[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Image upload states
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedEntry = entries.find((entry) => entry.id === selectedEntryId);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return `Today, ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (days === 1) {
      return `Yesterday, ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const formatFullDate = (): string => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMoodIcon = (mood: MoodType) => {
    const moodConfig = MOODS.find((m) => m.value === mood);
    if (!moodConfig) return <Meh size={16} className="text-gray-400" />;
    const Icon = moodConfig.icon;
    return <Icon size={16} className={moodConfig.color} />;
  };

  const getTagColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green:
        "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      orange:
        "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      purple:
        "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      pink: "bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
      yellow:
        "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      indigo:
        "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    };
    return colors[color] || colors.blue;
  };

  const handleSelectEntry = (entryId: number) => {
    setSelectedEntryId(entryId);
    setIsCreatingNew(false);
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      setCurrentTitle(entry.title);
      setCurrentContent(entry.content);
      setCurrentLocation(entry.location);
      setCurrentMood(entry.mood);
      setCurrentTags(entry.tags);
      setUploadedImages([]);
    }
  };

  const handleNewEntry = () => {
    setIsCreatingNew(true);
    setSelectedEntryId(null);
    setCurrentTitle("");
    setCurrentContent("");
    setCurrentLocation("Hanoi");
    setCurrentMood("neutral");
    setCurrentTags([]);
    setUploadedImages([]);
  };

  const handleToggleTag = (tag: JournalTag) => {
    const exists = currentTags.some((t) => t.label === tag.label);
    if (exists) {
      setCurrentTags(currentTags.filter((t) => t.label !== tag.label));
    } else {
      setCurrentTags([...currentTags, tag]);
    }
    setTimeout(() => setShowTagPicker(false), 150);
  };

  const handleRemoveTag = (tagLabel: string) => {
    setCurrentTags(currentTags.filter((t) => t.label !== tagLabel));
  };

  // Image upload handlers
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const files: File[] = Array.from(fileList); // ✅ File[] rõ ràng

    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxImages = 5;

    if (uploadedImages.length >= maxImages) {
      message.warning(
        `You can only upload up to ${maxImages} images per entry.`,
      );
      event.target.value = "";
      return;
    }

    files.forEach((file) => {
      if (file.size > maxSize) {
        message.error(`${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        message.error(`${file.name} is not an image file.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result !== "string") return;

        setUploadedImages((prev) => {
          if (prev.length >= maxImages) return prev;
          return [...prev, result];
        });
      };
      reader.readAsDataURL(file); // ✅ file là File => ok
    });

    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    alert("Link copied to clipboard!");
  };

  const handleExport = () => {
    if (selectedEntry) {
      const exportData = {
        title: selectedEntry.title,
        content: selectedEntry.content,
        date: selectedEntry.timestamp.toLocaleDateString(),
        mood: selectedEntry.mood,
        location: selectedEntry.location,
        tags: selectedEntry.tags.map((t) => t.label).join(", "),
      };
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `journal-${selectedEntry.id}.json`;
      link.click();
      setShowMoreMenu(false);
    }
  };

  const handleDelete = () => {
    if (
      selectedEntryId &&
      window.confirm("Are you sure you want to delete this entry?")
    ) {
      deleteEntry(selectedEntryId);
      setShowMoreMenu(false);
      setIsCreatingNew(true);
      setSelectedEntryId(null);
      setCurrentTitle("");
      setCurrentContent("");
      setCurrentLocation("Hanoi");
      setCurrentMood("neutral");
      setCurrentTags([]);
      setUploadedImages([]);
    }
  };

  const handleSaveEntry = () => {
    const title = currentTitle.trim();
    const content = currentContent.trim();

    if (!title && !content) {
      message.warning(
        "Please enter a title or content for your journal entry.",
      );
      return;
    }

    const payload = {
      title: title || "Untitled Entry",
      content,
      mood: currentMood,
      location: currentLocation,
      tags: currentTags,
    };

    if (isCreatingNew || !selectedEntryId) {
      addEntry(payload);

      setIsCreatingNew(false);
      setSelectedEntryId(entries[0]?.id || null);

      notification.success({
        message: "Journal entry saved",
        description: "Your new journal entry has been saved successfully.",
        placement: "topRight",
        duration: 2,
      });
    } else {
      updateEntry(selectedEntryId, payload);

      notification.success({
        message: "Journal entry updated",
        description: "Your journal entry has been updated successfully.",
        placement: "topRight",
        duration: 2,
      });
    }
  };

  React.useEffect(() => {
    if (selectedEntry && !isCreatingNew) {
      setCurrentTitle(selectedEntry.title);
      setCurrentContent(selectedEntry.content);
      setCurrentLocation(selectedEntry.location);
      setCurrentMood(selectedEntry.mood);
      setCurrentTags(selectedEntry.tags);
    }
  }, [selectedEntry, isCreatingNew]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 font-sans">
      <Sidebar />
      <main className="flex-1 flex gap-6 p-4 h-full overflow-hidden">
        {/* Left List Panel */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4 hidden lg:flex">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/"
              className="p-2 rounded-full hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span className="text-emerald-600 dark:text-emerald-500">
                <Leaf size={20} fill="currentColor" />
              </span>
              <span className="text-gray-900 dark:text-white">SoulSync</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col flex-1 overflow-hidden backdrop-blur-sm">
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300"
                size={16}
              />
              <input
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/50 dark:text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white dark:focus:bg-gray-800"
                placeholder="Search journals..."
                type="text"
              />
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Journal History
              </h3>
              <button
                onClick={handleNewEntry}
                className="text-xs text-emerald-600 dark:text-emerald-500 font-medium hover:underline transition-all duration-300"
              >
                + New Entry
              </button>
            </div>

            <div className="overflow-y-auto hide-scrollbar flex-1 space-y-2 pr-1">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  onClick={() => handleSelectEntry(entry.id)}
                  className={`group bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 border ${
                    selectedEntryId === entry.id
                      ? "border-emerald-500 dark:border-emerald-600 shadow-md"
                      : "border-gray-100 dark:border-gray-700/50"
                  } p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] transform`}
                  style={{
                    animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {formatDate(entry.timestamp)}
                    </span>
                    {getMoodIcon(entry.mood)}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {entry.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                    {entry.content}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {entry.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${getTagColor(
                          tag.color,
                        )} transition-all duration-300 hover:scale-105`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor Panel */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="flex justify-between items-center mb-4 px-2 py-2">
            <Link
              to="/"
              className="lg:hidden p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-gray-600 dark:text-gray-400"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900/50 px-5 py-2.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 ml-auto backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <Clock size={16} />
              {formatFullDate()}
            </div>
          </header>

          <div className="flex-1 bg-white dark:bg-gray-900/50 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden backdrop-blur-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in">
                  {isCreatingNew
                    ? "Create New Entry"
                    : selectedEntry
                      ? "Edit Your Entry"
                      : "Write for Yourself"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 animate-fade-in-delay">
                  {isCreatingNew || !selectedEntry
                    ? "Let your emotions guide the words you write."
                    : "Review and update your thoughts."}
                </p>
              </div>
              <div className="flex gap-2">
                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all duration-300 hover:scale-110 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <Share2 size={20} />
                  </button>

                  {/* Share Dropdown */}
                  {showShareMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowShareMenu(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-20 min-w-[200px] animate-scale-in">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                          Share Entry
                        </p>
                        <button
                          onClick={handleCopyLink}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <Link2 size={18} className="text-blue-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Copy Link
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.open(
                              `mailto:?subject=${encodeURIComponent(currentTitle)}&body=${encodeURIComponent(currentContent)}`,
                            );
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <Mail size={18} className="text-red-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            const text = `${currentTitle}\n\n${currentContent}`;
                            navigator.clipboard.writeText(text);
                            setShowShareMenu(false);
                            alert("Text copied to clipboard!");
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <Copy size={18} className="text-green-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Copy Text
                          </span>
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                        <button
                          onClick={() => {
                            window.open(
                              `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentTitle)}`,
                            );
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <Twitter size={18} className="text-sky-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Share on Twitter
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                            );
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <Facebook size={18} className="text-blue-600" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Share on Facebook
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* More Options Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all duration-300 hover:scale-110 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {/* More Options Dropdown */}
                  {showMoreMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMoreMenu(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-20 min-w-[200px] animate-scale-in">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                          Options
                        </p>
                        <button
                          onClick={handleExport}
                          disabled={!selectedEntry}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download size={18} className="text-blue-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Export as JSON
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.print();
                            setShowMoreMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                        >
                          <Copy size={18} className="text-purple-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Print Entry
                          </span>
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                        <button
                          onClick={handleDelete}
                          disabled={!selectedEntryId}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={18} className="text-red-500" />
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            Delete Entry
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pb-24"
              onFocus={() => setIsToolbarVisible(true)}
            >
              <input
                className="text-2xl font-semibold bg-transparent border-none p-0 placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 text-gray-900 dark:text-white outline-none transition-all duration-300"
                placeholder="Title for today..."
                type="text"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />

              {/* Mood and Tags Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Mood Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowMoodPicker(!showMoodPicker)}
                      className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      {getMoodIcon(currentMood)}
                      <span className="capitalize">{currentMood}</span>
                    </button>

                    {/* Mood Picker Dropdown */}
                    {showMoodPicker && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowMoodPicker(false)}
                        />
                        <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-20 min-w-[200px] animate-scale-in">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 py-1 mb-1">
                            Select Mood
                          </p>
                          {MOODS.map((mood) => {
                            const Icon = mood.icon;
                            return (
                              <button
                                key={mood.value}
                                onClick={() => {
                                  setCurrentMood(mood.value);
                                  setShowMoodPicker(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                  currentMood === mood.value
                                    ? "bg-emerald-50 dark:bg-emerald-900/20"
                                    : ""
                                }`}
                              >
                                <Icon size={18} className={mood.color} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {mood.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tag Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowTagPicker(!showTagPicker)}
                      className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      <Tag size={14} />
                      <span>Add Tags</span>
                    </button>

                    {/* Tag Picker Dropdown */}
                    {showTagPicker && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowTagPicker(false)}
                        />
                        <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-20 min-w-[280px] animate-scale-in">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1 mb-2">
                            Select Tags
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {PREDEFINED_TAGS.map((tag) => {
                              const isSelected = currentTags.some(
                                (t) => t.label === tag.label,
                              );
                              return (
                                <button
                                  key={tag.label}
                                  onClick={() => handleToggleTag(tag)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:scale-105 ${
                                    isSelected
                                      ? getTagColor(tag.color) +
                                        " ring-2 ring-offset-1 ring-emerald-500"
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                  }`}
                                >
                                  {tag.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Selected Tags Display */}
                {currentTags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {currentTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${getTagColor(
                          tag.color,
                        )} transition-all duration-300 hover:scale-105`}
                      >
                        {tag.label}
                        <button
                          onClick={() => handleRemoveTag(tag.label)}
                          className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Clock size={14} />
                  <span className="font-medium">
                    Noted at {getCurrentTime()}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MapPin size={14} />
                  <input
                    type="text"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="font-medium bg-transparent border-none outline-none w-20 text-gray-600 dark:text-gray-400"
                  />
                </div>
              </div>

              {/* Image Preview Section */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square animate-scale-in"
                    >
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transform hover:scale-110 active:scale-95"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {index + 1}/{uploadedImages.length}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <textarea
                className="w-full flex-1 resize-none bg-transparent border-none p-0 mt-4 text-lg leading-relaxed text-gray-800 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 outline-none transition-all duration-300"
                placeholder="Start sharing your story here..."
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
              ></textarea>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Floating Action Bar */}
            <div
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 pl-4 pr-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-gray-100 dark:border-gray-700 z-10 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.5)] ${
                isToolbarVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center gap-1 pr-4 border-r border-gray-200 dark:border-gray-600">
                <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <Bold size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <Italic size={20} />
                </button>
                <button
                  onClick={handleImageClick}
                  className={`p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 rounded-lg ${
                    uploadedImages.length > 0
                      ? "text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title="Add images (max 5)"
                >
                  <ImageIcon size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all duration-300 group transform hover:scale-105 active:scale-95 border border-blue-200 dark:border-blue-800">
                  <Sparkles
                    size={18}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span className="font-semibold text-sm">AI Assistant</span>
                </button>
                <button
                  onClick={handleSaveEntry}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 dark:bg-emerald-700 text-white shadow-md hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  <span className="font-semibold text-sm">Save Entry</span>
                  <Save size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-scale-in {
          animation: scale-in 0.15s ease-out;
        }

        .hide-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(209, 213, 219);
          border-radius: 10px;
        }

        .dark .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(75, 85, 99);
        }

        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(156, 163, 175);
        }

        .dark .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107, 114, 128);
        }

        textarea::placeholder,
        input::placeholder {
          transition: opacity 0.3s ease;
        }

        textarea:focus::placeholder,
        input:focus::placeholder {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default Journal;
