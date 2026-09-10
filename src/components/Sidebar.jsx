import React from 'react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Target, 
  TrendingUp, 
  Award, 
  User, 
  BookOpen,
  Zap,
  Flame,
  X
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) => {
  const { user, levelData } = useSystem();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'quests', label: 'Quests', icon: Target },
    { id: 'notes', label: 'Scratchpad', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div>
        {/* System Header Branding */}
        <div className="system-logo-area">
          <div className="system-logo-icon">
            <Zap size={22} className="animate-pulse-glow" />
          </div>
          <div>
            <h1 className="system-title">SYSTEM</h1>
            <div className="system-sub">PROGRESSION OS v1.0</div>
          </div>
          {mobileOpen && (
            <button 
              onClick={() => setMobileOpen(false)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', marginLeft: 'auto', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (mobileOpen) setMobileOpen(false);
                    }}
                    style={{ width: '100%' }}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer Operator Badge */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card hud-card">
          <img 
            src={user.avatar || "/avatar.jpg"}
            alt={user.name}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              background: '#1e293b'
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="user-meta-name">{user.name}</div>
            <div className="user-meta-level font-mono">
              {levelData.totalXP.toLocaleString()} XP
            </div>
            {/* XP mini bar */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${levelData.progressPercent}%`, 
                  height: '100%', 
                  background: 'var(--cyan-primary)',
                  boxShadow: '0 0 8px var(--cyan-glow)'
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
