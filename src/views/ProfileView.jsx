import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  CheckSquare, 
  TrendingUp, 
  Sparkles, 
  Save, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Unlock, 
  Lock,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Quote,
  RotateCw
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { EditProfileModal } from '../components/EditProfileModal';
import { getDailyQuote, getRandomQuote } from '../utils/quotesHelper';

export const ProfileView = ({ setActiveTab }) => {
  const { user, levelData, topicStats, currentDate, toggleSubjectDSA, toggleAudio, resetSystemData } = useSystem();
  const [resetTime, setResetTime] = useState(user.resetTime || '23:59');
  const [savedNotice, setSavedNotice] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Daily Quote State
  const [displayedQuote, setDisplayedQuote] = useState(() => getDailyQuote(currentDate));

  // Automatically update quote whenever currentDate changes (e.g. advance day)
  useEffect(() => {
    setDisplayedQuote(getDailyQuote(currentDate));
  }, [currentDate]);

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good Morning,' : hour < 18 ? 'Good Afternoon,' : 'Good Evening,';

  // Calculate overall tasks completed & accuracy
  let totalSolvedAll = 0;
  let totalCorrectAll = 0;
  Object.values(topicStats).forEach((stat) => {
    totalSolvedAll += stat.totalSolved || 0;
    totalCorrectAll += stat.correct || 0;
  });
  const overallAccuracy = totalSolvedAll > 0 ? (totalCorrectAll / totalSolvedAll * 100).toFixed(0) : '86';

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleShuffleQuote = () => {
    setDisplayedQuote(getRandomQuote());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Panel 1 Hero Card with Embedded Cozy Window Image */}
      <div 
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          background: 'url(/cozy_desk_bg.jpg) center/cover no-repeat',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          color: '#ffffff',
        }}
      >
        {/* Dark Vignette Overlay */}
        <div 
          style={{
            background: 'linear-gradient(180deg, rgba(12, 14, 20, 0.65) 0%, rgba(10, 12, 18, 0.92) 100%)',
            padding: '2.5rem 2.5rem 2rem 2.5rem',
            backdropFilter: 'blur(2px)',
          }}
        >
          {/* Header Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1rem' }}>
            <button 
              onClick={() => setIsEditModalOpen(true)} 
              className="btn-purple-pill"
              style={{
                fontSize: '0.8rem',
                padding: '0.45rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              title="Edit Profile Name, Bio & Picture"
            >
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Profile Name & Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={user.avatar || "/avatar.jpg"} 
                alt={user.name || "Profile Avatar"} 
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                  background: '#1e293b'
                }}
              />
              <button
                onClick={() => setIsEditModalOpen(true)}
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                }}
                title="Change Avatar"
              >
                <Edit3 size={12} />
              </button>
            </div>

            <div style={{ flex: 1, minWidth: '220px' }}>
              <div className="font-serif" style={{ fontSize: '1.4rem', color: '#e2e8f0', fontStyle: 'italic' }}>
                {timeGreeting}
              </div>
              <h1 className="font-sans" style={{ fontSize: '2.6rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                {user.name}
              </h1>
              <p className="font-serif" style={{ fontSize: '0.95rem', color: '#cbd5e1', fontStyle: 'italic', marginTop: '6px' }}>
                "{user.bio || 'Discipline today, a better tomorrow.'}"
              </p>
            </div>
          </div>

          {/* Equipped Title Box */}
          {user.equippedTitle && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', borderRadius: '14px', padding: '0.85rem 1.25rem', marginBottom: '2rem', border: '1px solid rgba(255, 255, 255, 0.12)', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div className="font-sans" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--color-cyan)' }} />
                  <span>{user.equippedTitle}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  "The one who seeks answers within data."
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('achievements')}
                className="btn-secondary-pill"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.85rem'
                }}
              >
                Change Title
              </button>
            </div>
          )}

          {/* 4 Stat Boxes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(10px)', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Level</div>
              <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1 }}>
                {levelData.level}
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${levelData.progressPercent}%`, height: '100%', background: '#8b5cf6' }} />
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                {levelData.totalXP.toLocaleString()} / {((levelData.level) * 500).toLocaleString()} XP
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(10px)', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                <Flame size={14} style={{ color: '#f59e0b' }} />
                <span>Streak</span>
              </div>
              <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1 }}>
                {user.currentStreak}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '10px' }}>
                Day Streak
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(10px)', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                <CheckSquare size={14} style={{ color: '#10b981' }} />
                <span>Completed</span>
              </div>
              <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1 }}>
                {totalSolvedAll}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '10px' }}>
                Tasks Completed
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(10px)', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                <TrendingUp size={14} style={{ color: '#06b6d4' }} />
                <span>Accuracy</span>
              </div>
              <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1 }}>
                {overallAccuracy}%
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '10px' }}>
                Overall Accuracy
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Daily Motivational Quote Card */}
      <div 
        className="warm-card"
        style={{
          padding: '2rem 2rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(139, 92, 246, 0.12)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Quote size={20} style={{ color: 'var(--color-purple-light)' }} />
            <span className="font-mono" style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              DAILY MOTIVATIONAL QUOTE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {displayedQuote.category && (
              <span style={{ fontSize: '0.72rem', fontWeight: 700, background: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                {displayedQuote.category}
              </span>
            )}
            <button
              onClick={handleShuffleQuote}
              className="btn-light"
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.78rem',
                gap: '0.35rem'
              }}
              title="Get another random quote"
            >
              <RotateCw size={13} />
              <span>Shuffle</span>
            </button>
          </div>
        </div>

        <p className="font-serif" style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.4, margin: '0.5rem 0' }}>
          "{displayedQuote.quote}"
        </p>

        {displayedQuote.author && (
          <div style={{ textAlign: 'right', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            — {displayedQuote.author}
          </div>
        )}
      </div>

      {/* Extensible Subject Modules Card */}
      <div className="warm-card">
        <h3 className="font-sans" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
          Extensible Subject Modules
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Unlock additional subject disciplines into daily task rotations.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              Data Structures & Algorithms (DSA)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Arrays, Linked Lists, Trees, Graph Algorithms
            </div>
          </div>
          <button onClick={toggleSubjectDSA} className="btn-dark">
            {user.unlockedDSA ? <Lock size={15} /> : <Unlock size={15} />}
            <span>{user.unlockedDSA ? 'DSA ACTIVE' : 'UNLOCK DSA'}</span>
          </button>
        </div>
      </div>

      {/* Preferences & Data Reset */}
      <div className="warm-card">
        <h3 className="font-sans" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1.25rem' }}>
          System Preferences
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-dark)' }}>Audio Synthesizer</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sci-fi UI chime sound effects</div>
            </div>
            <button onClick={toggleAudio} className="btn-light">
              {user.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{user.soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
            <button onClick={handleSave} className="btn-dark">
              <Save size={15} />
              <span>SAVE PREFERENCES</span>
            </button>

            {savedNotice && (
              <span style={{ fontSize: '0.85rem', color: 'var(--color-green)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} /> Saved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Factory Reset */}
      <div className="warm-card" style={{ border: '1px solid rgba(244, 63, 94, 0.25)', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.03) 0%, rgba(255, 255, 255, 1) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <RefreshCw size={18} style={{ color: 'var(--color-rose)' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-rose)' }}>
            System Factory Reset
          </h4>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
          Reset your progress completely to <strong>Level 1 (0 XP, 0 Streak, Clean Slate)</strong> to start your daily discipline journey from tomorrow, or restore demo seed data.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              resetSystemData(true);
              setSavedNotice('Clean Slate Activated! Starting fresh from Level 1.');
              setTimeout(() => setSavedNotice(false), 4000);
            }} 
            className="btn-dark"
            style={{ background: 'var(--color-rose)', borderColor: 'var(--color-rose)', color: '#ffffff' }}
          >
            <RefreshCw size={15} />
            <span>START FRESH (CLEAN SLATE FROM TOMORROW)</span>
          </button>

          <button 
            onClick={() => {
              resetSystemData(false);
              setSavedNotice('Demo seed data restored.');
              setTimeout(() => setSavedNotice(false), 4000);
            }} 
            className="btn-light"
          >
            <span>RESTORE DEMO DATA</span>
          </button>
        </div>

        {savedNotice && (
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} />
            <span>{typeof savedNotice === 'string' ? savedNotice : 'Preferences Saved'}</span>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />

    </div>
  );
};
