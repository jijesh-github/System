import React from 'react';
import { 
  Menu, 
  Flame, 
  Volume2, 
  VolumeX, 
  ShieldAlert
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { format } from 'date-fns';

export const Header = ({ setMobileOpen }) => {
  const { 
    user, 
    levelData, 
    currentDate, 
    toggleAudio, 
    setActiveModal
  } = useSystem();

  return (
    <header className="top-header">
      <div className="header-left">
        <button 
          onClick={() => setMobileOpen(true)}
          className="btn-cyber-secondary"
          style={{ display: 'none', padding: '0.4rem 0.6rem' }}
          id="mobile-menu-btn"
        >
          <Menu size={18} />
        </button>

        <div className="system-status-indicator">
          <span className="status-dot animate-pulse-glow"></span>
          <span>SYSTEM // ONLINE</span>
        </div>

        <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {format(currentDate, 'EEEE, MMM d, yyyy')}
        </div>
      </div>

      <div className="header-right">
        {/* Quick Streak Counter */}
        <div className="quick-streak-badge">
          <Flame size={18} fill="currentColor" />
          <span>{user.currentStreak} DAY STREAK</span>
        </div>

        {/* Level Badge */}
        <div className="badge-cyan font-mono" style={{ padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem' }}>
          LEVEL {levelData.level}
        </div>

        {/* Audio Toggle */}
        <button 
          onClick={toggleAudio} 
          className="btn-cyber-secondary" 
          title={user.soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
          style={{ padding: '0.45rem' }}
        >
          {user.soundEnabled ? <Volume2 size={18} style={{ color: 'var(--cyan-primary)' }} /> : <VolumeX size={18} />}
        </button>

        {/* Test Exemption/Failure trigger */}
        <button 
          onClick={() => setActiveModal('exemption')}
          className="btn-cyber-red"
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
          title="Test Exemption or Failure Penalty flow"
        >
          <ShieldAlert size={14} />
          <span>TEST EXEMPTION</span>
        </button>
      </div>
    </header>
  );
};
