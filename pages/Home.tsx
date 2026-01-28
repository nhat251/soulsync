import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Home/Header";
import MoodTracker from "../components/Home/MoodTracker";
import JournalSummary from "../components/Home/JournalSummary";
import BreathingWidget from "../components/Home/BreathingWidget";
import EnergyStats from "../components/Home/EnergyStats";
import QuoteFooter from "../components/Home/QuoteFooter";

const Home: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 relative">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <MoodTracker />
            <JournalSummary />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <BreathingWidget />
            <EnergyStats />
          </div>
        </div>

        <QuoteFooter />
      </main>
    </div>
  );
};

export default Home;
