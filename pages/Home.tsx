import React from "react";
import MoodTracker from "../components/Home/MoodTracker";
import JournalSummary from "../components/Home/JournalSummary";
import BreathingWidget from "../components/Home/BreathingWidget";
import EnergyStats from "../components/Home/EnergyStats";
import QuoteFooter from "../components/Home/QuoteFooter";

const Home: React.FC = () => {
  return (
    <div className="pb-32">
      <div className="mb-8 pl-2">
        <p className="text-text-muted dark:text-gray-400">
          Hello Minh, let's take care of your soul.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

export default Home;
