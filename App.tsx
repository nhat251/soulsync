import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Breathing from './pages/Breathing';
import Journal from './pages/Journal';
import Insights from './pages/Insights';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
