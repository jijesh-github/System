import React from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Plus, 
  Brain, 
  Database, 
  Terminal, 
  Network, 
  ChevronRight,
  Zap,
  Sparkles
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { RecoveryCard } from '../components/RecoveryCard';
import { SUBJECTS_CONFIG } from '../utils/rotationHelper';

export const DashboardView = ({ setActiveTab }) => {
  const { 
    user, 
    levelData, 
    todayQuests, 
    recoveryQuests, 
    updateQuestProgress, 
    completeQuest 
  } = useSystem();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Database': return Database;
      case 'Terminal': return Terminal;
      case 'Network': return Network;
      default: return Zap;
    }
  };

  let totalRequiredTarget = 0;
  let totalSolvedCount = 0;

  Object.values(todayQuests).forEach((q) => {
    if (q.target > 0) {
      totalRequiredTarget += q.target;
      totalSolvedCount += Math.min(q.solved, q.target);
    }
  });

  const overallPercent = totalRequiredTarget > 0 
    ? Math.min(100, Math.round((totalSolvedCount / totalRequiredTarget) * 100))
    : 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Recovery Task Card (if active) */}
      {recoveryQuests.length > 0 && (
        <div>
          {recoveryQuests.map((rec) => (
            <RecoveryCard key={rec.id} quest={rec} />
          ))}
        </div>
      )}

      {/* Hero Header Card - Exactly matching screenshot style */}
      <div className="glass-card glass-card-purple" style={{ padding: '2.25rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
          {/* Operator Avatar Image */}
          <img 
            src={user.avatar || "/avatar.jpg"}
            alt={user.name}
            style={{
              width: '72px', 
              height: '72px', 
              borderRadius: '20px',
              objectFit: 'cover',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
              background: '#1e293b'
            }}
          />

          <div style={{ flex: 1, minWidth: '220px' }}>
            <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-purple-light)', letterSpacing: '0.08em', fontWeight: 700, textTransform: 'uppercase' }}>
              OPERATOR PROFILE
            </div>
            <h1 className="font-display" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginTop: '2px' }}>
              {user.name}
            </h1>
            {user.equippedTitle && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem', color: 'var(--color-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
                <Sparkles size={14} />
                <span>{user.equippedTitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* XP Progress Bar */}
        <div style={{ marginTop: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
            <span>XP PROGRESS &nbsp;·&nbsp; <strong style={{ color: '#ffffff' }}>{levelData.totalXP.toLocaleString()}</strong> / {((levelData.level) * 500).toLocaleString()} XP</span>
            <span style={{ color: 'var(--color-purple-light)', fontWeight: 700 }}>{levelData.progressPercent}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${levelData.progressPercent}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)',
                transition: 'width 0.4s var(--ease-smooth)'
              }} 
            />
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row - Exactly matching user screenshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem 1.25rem' }}>
          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
            TOTAL XP
          </div>
          <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', lineHeight: 1 }}>
            {levelData.totalXP.toLocaleString()}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem 1.25rem' }}>
          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
            CURRENT STREAK
          </div>
          <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-orange)', marginTop: '6px', lineHeight: 1 }}>
            {user.currentStreak} Days
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem 1.25rem' }}>
          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
            PERFECT DAYS
          </div>
          <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-green)', marginTop: '6px', lineHeight: 1 }}>
            {user.perfectDays} Days
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem 1.25rem' }}>
          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
            EXCUSED DAYS
          </div>
          <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-cyan)', marginTop: '6px', lineHeight: 1 }}>
            {user.excusedDays} Days
          </div>
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              Today's Tasks
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Workload targets automatically rotated for focus distribution.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-cyan)' }}>
              {overallPercent}%
            </div>
            <button onClick={() => setActiveTab('quests')} className="btn-purple-pill" style={{ padding: '0.45rem 1.1rem', fontSize: '0.78rem' }}>
              <span>TASK TERMINAL</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Task Cards Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {Object.entries(todayQuests).map(([subId, quest]) => {
            const config = SUBJECTS_CONFIG[subId];
            if (!config) return null;

            const Icon = getSubjectIcon(config.icon);
            const isMain = quest.role === 'main';
            const isSecondary = quest.role === 'secondary';
            const isRest = quest.role === 'rest';

            const roleLabel = isMain ? 'Main Focus' : isSecondary ? 'Light Practice' : 'Rest Day';
            const xpReward = isMain ? 50 : isSecondary ? 25 : 10;
            const isDone = quest.solved >= quest.target && quest.target > 0;
            const percent = quest.target > 0 ? Math.min(100, Math.round((quest.solved / quest.target) * 100)) : 100;

            return (
              <div 
                key={subId} 
                style={{ 
                  padding: '1.25rem',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isMain ? 'var(--border-purple)' : 'var(--border-subtle)'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div 
                      style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isMain ? 'var(--color-purple-light)' : '#ffffff'
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                        {config.name}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {roleLabel}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono" style={{ fontSize: '0.75rem', color: isMain ? 'var(--color-purple-light)' : 'var(--text-muted)', fontWeight: 600 }}>
                    +{xpReward} XP
                  </span>
                </div>

                {!isRest ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      <span>{quest.target} {config.unit}</span>
                      <span className="font-mono" style={{ color: isDone ? 'var(--color-green)' : '#ffffff', fontWeight: 600 }}>
                        {quest.solved} / {quest.target}
                      </span>
                    </div>

                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <div 
                        style={{ 
                          width: `${percent}%`, 
                          height: '100%', 
                          background: isDone ? 'var(--color-green)' : 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                          boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)',
                          transition: 'width 0.4s var(--ease-smooth)'
                        }} 
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '0.5rem 0', fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Rest day. No mandatory quota.
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {!isRest && (
                    <>
                      <button onClick={() => updateQuestProgress(subId, 1)} className="btn-secondary-pill" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                        <Plus size={13} /> 1
                      </button>
                      <button onClick={() => updateQuestProgress(subId, 5)} className="btn-secondary-pill" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                        <Plus size={13} /> 5
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => completeQuest(subId)}
                    className={isDone ? 'btn-secondary-pill' : 'btn-purple-pill'}
                    style={{ marginLeft: 'auto', padding: '0.4rem 1rem', fontSize: '0.75rem' }}
                    disabled={isDone}
                  >
                    <CheckCircle2 size={14} />
                    <span>{isDone ? 'COMPLETED' : 'COMPLETE'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
