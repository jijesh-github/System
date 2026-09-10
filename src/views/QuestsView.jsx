import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Brain, 
  Database, 
  Terminal, 
  Network,
  ChevronRight,
  AlertCircle,
  Zap
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { SUBJECTS_CONFIG } from '../utils/rotationHelper';
import { format } from 'date-fns';

export const QuestsView = () => {
  const { todayQuests, updateQuestProgress, completeQuest, currentDate, recoveryQuests, completeRecoveryQuest } = useSystem();
  const [customInput, setCustomInput] = useState({ aptitude: '', sql: '', python: '', dsa: '' });

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Database': return Database;
      case 'Terminal': return Terminal;
      case 'Network': return Network;
      default: return Zap;
    }
  };

  const handleCustomLog = (subId) => {
    const val = parseInt(customInput[subId], 10);
    if (!isNaN(val) && val > 0) {
      updateQuestProgress(subId, val);
      setCustomInput((prev) => ({ ...prev, [subId]: '' }));
    }
  };

  // Calculate overall task completion percentage
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

  // SVG Circular progress gauge math
  const strokeDashoffset = 180 - (180 * overallPercent) / 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Panel 2 Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {format(currentDate, 'EEE, d MMMM yyyy')}
          </div>
          <h1 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '2px', lineHeight: 1.1 }}>
            Today's Tasks
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Focus. Practice. Improve.
          </p>
        </div>

        {/* Circular Progress Gauge (Exact Panel 2 Match) */}
        <div 
          style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div className="font-sans" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1 }}>
            {overallPercent}%
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Completed
          </div>
        </div>
      </div>

      {/* Today's Task Cards (Exact Panel 2 Match) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {Object.entries(todayQuests).map(([subId, quest]) => {
          const config = SUBJECTS_CONFIG[subId];
          if (!config) return null;

          const Icon = getSubjectIcon(config.icon);
          const isMain = quest.role === 'main';
          const isSecondary = quest.role === 'secondary';
          const isRest = quest.role === 'rest';

          const tagClass = isMain ? 'tag-main-focus' : isSecondary ? 'tag-light-practice' : 'tag-rest-day';
          const roleLabel = isMain ? 'Main Focus' : isSecondary ? 'Light Practice' : 'Rest Day';
          const isDone = quest.solved >= quest.target && quest.target > 0;
          const percent = quest.target > 0 ? Math.min(100, Math.round((quest.solved / quest.target) * 100)) : 100;

          return (
            <div key={subId} className="warm-card" style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isRest ? 0 : '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                
                {/* Left Icon + Title + Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div 
                    style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      background: isMain ? '#FFF3E0' : isSecondary ? '#F3E8FF' : '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isMain ? '#D97706' : isSecondary ? '#9333EA' : '#64748B'
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <h2 className="font-sans" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                        {config.name}
                      </h2>
                      <span className={tagClass}>{roleLabel}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {isRest ? 'No task required today. Use this time to revise or relax.' : `Solve ${quest.target} ${config.unit.toLowerCase()} today.`}
                    </p>
                  </div>
                </div>

                {/* Right Counter + Chevron */}
                {!isRest ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="font-sans" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {quest.solved} / {quest.target}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button onClick={() => updateQuestProgress(subId, 1)} className="btn-light" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}>
                        +1
                      </button>
                      <button onClick={() => updateQuestProgress(subId, 5)} className="btn-light" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}>
                        +5
                      </button>
                      <button onClick={() => completeQuest(subId)} className={isDone ? 'btn-light' : 'btn-dark'} style={{ padding: '0.4rem 1rem', fontSize: '0.78rem' }} disabled={isDone}>
                        {isDone ? 'Done' : 'Complete'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <ChevronRight size={20} style={{ color: 'var(--text-dim)' }} />
                )}
              </div>

              {/* Progress Line */}
              {!isRest && (
                <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginTop: '0.5rem' }}>
                  <div 
                    style={{ 
                      width: `${percent}%`, 
                      height: '100%', 
                      background: isDone ? 'var(--color-green)' : isMain ? '#10b981' : '#8b5cf6',
                      transition: 'width 0.4s var(--ease-smooth)'
                    }} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recovery Task Card (Exact Panel 2 Match) */}
      {recoveryQuests.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <div className="warm-card" style={{ border: '1px solid rgba(244, 63, 94, 0.25)', background: '#FEF2F2' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div 
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#FEE2E2', color: '#DC2626',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <AlertCircle size={20} />
                </div>
                <div>
                  <div className="font-sans" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#991B1B' }}>
                    Recovery Task
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#B91C1C' }}>
                    <strong>SQL:</strong> Complete 2 additional problems (from yesterday).
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="font-sans" style={{ fontSize: '1rem', fontWeight: 700, color: '#991B1B' }}>
                  0 / 2
                </span>
                <button onClick={() => completeRecoveryQuest(recoveryQuests[0].id)} className="btn-dark">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
