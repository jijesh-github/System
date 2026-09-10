import React, { useState } from 'react';
import { SystemProvider } from './context/SystemContext';
import { Navigation } from './components/Navigation';

import { MissedQuestModal } from './components/MissedQuestModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CalendarDetailModal } from './components/CalendarDetailModal';

import { DashboardView } from './views/DashboardView';
import { CalendarView } from './views/CalendarView';
import { QuestsView } from './views/QuestsView';
import { ProgressView } from './views/ProgressView';
import { AchievementsView } from './views/AchievementsView';
import { ProfileView } from './views/ProfileView';
import { NotesView } from './views/NotesView';

import './App.css';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileView setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      case 'calendar':
        return <CalendarView />;
      case 'quests':
        return <QuestsView />;
      case 'notes':
        return <NotesView />;
      case 'progress':
        return <ProgressView />;
      case 'achievements':
        return <AchievementsView />;
      default:
        return <ProfileView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Left Dark Sidebar Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Warm Off-White Canvas */}
      <main className="main-canvas">
        {renderActiveView()}
      </main>

      {/* Contextual Modals */}
      <MissedQuestModal />
      <LevelUpModal />
      <CalendarDetailModal />
    </div>
  );
}

export default function App() {
  return (
    <SystemProvider>
      <MainAppContent />
    </SystemProvider>
  );
}
