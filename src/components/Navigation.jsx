import React, { useState, useEffect } from 'react';
import { 
  User, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Award, 
  BookOpen,
  Zap, 
  Volume2, 
  VolumeX, 
  Menu,
  X
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const Navigation = ({ activeTab, setActiveTab }) => {
  const { user, levelData, toggleAudio, setActiveModal } = useSystem();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'quests', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'notes', label: 'Scratchpad', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  // Mobile menu close handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 850) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Desktop Left Dark Sidebar */}
      <aside className="desktop-sidebar">
        <div>
          {/* SYSTEM Brand Logo */}
          <div className="sidebar-brand font-sans" onClick={() => setActiveTab('profile')}>
            <span className="brand-logo-text">SYSTEM</span>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (activeTab === 'dashboard' && item.id === 'profile');

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                  {isActive && <span className="active-dot">•</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls & Tagline */}
        <div className="sidebar-footer">
          <div className="sidebar-controls-row">
            <button
              onClick={toggleAudio}
              className="sidebar-icon-btn"
              title={user.soundEnabled ? 'Audio FX On' : 'Audio Muted'}
            >
              {user.soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
          </div>

          <div className="sidebar-tagline font-serif">
            One Day.<br />A Stronger You.
          </div>
        </div>
      </aside>

      {/* Mobile Top Header (screens <= 850px) */}
      <div className="mobile-header">
        <span className="brand-logo-text font-sans" onClick={() => setActiveTab('profile')}>
          SYSTEM
        </span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-trigger-btn"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-sheet animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="brand-logo-text font-sans">SYSTEM</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`mobile-sheet-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {isActive && <span>•</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
