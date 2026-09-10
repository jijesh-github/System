import React from 'react';
import { X, Calendar as CalendarIcon, Check, AlertCircle, ShieldAlert, Award, Flame } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { format, parseISO } from 'date-fns';

import { getDailyRotation, getQuestTarget } from '../utils/rotationHelper';

export const CalendarDetailModal = () => {
  const { selectedCalendarDay, setSelectedCalendarDay, calendarHistory, user } = useSystem();

  if (!selectedCalendarDay) return null;

  const dateObj = parseISO(selectedCalendarDay);
  const formattedDate = format(dateObj, 'MMMM d, yyyy');
  const dayName = format(dateObj, 'EEEE');

  const rotation = getDailyRotation(dateObj);
  const fallbackSubjects = {};
  const subjectsToInclude = ['aptitude', 'sql', 'python'];
  if (user?.unlockedDSA) {
    subjectsToInclude.push('dsa');
  }

  subjectsToInclude.forEach((subId) => {
    const role = rotation[subId] || 'rest';
    const target = getQuestTarget(subId, role);
    fallbackSubjects[subId] = {
      solved: 0,
      target,
      role
    };
  });

  const historyEntry = calendarHistory[selectedCalendarDay] || {
    date: selectedCalendarDay,
    status: 'FUTURE',
    xpEarned: 0,
    streak: 0,
    subjects: fallbackSubjects,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PERFECT':
        return <span className="badge-emerald font-mono">🟢 PERFECT DAY</span>;
      case 'PARTIAL':
        return <span className="badge-amber font-mono">🟡 PARTIAL COMPLETION</span>;
      case 'FAILED':
        return <span className="badge-red font-mono">🔴 UNJUSTIFIED FAILURE</span>;
      case 'EXCUSED':
        return <span className="badge-blue font-mono">🔵 EXCUSED EXEMPTION</span>;
      default:
        return <span className="badge-cyan font-mono">⚪ FUTURE DAY</span>;
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div 
        className="glass-panel hud-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          borderColor: 'rgba(0, 240, 255, 0.3)',
          background: 'linear-gradient(180deg, rgba(14, 18, 28, 0.98), rgba(8, 10, 16, 0.98))',
          padding: '2rem',
          borderRadius: '18px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', letterSpacing: '0.1em' }}>
              {dayName.toUpperCase()} // SYSTEM LOG
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2px' }}>
              {formattedDate}
            </h2>
          </div>
          <button 
            onClick={() => setSelectedCalendarDay(null)}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Status Badge */}
        <div style={{ marginBottom: '1.5rem' }}>
          {getStatusBadge(historyEntry.status)}
        </div>

        {/* Reason notice if excused or failed */}
        {historyEntry.reason && (
          <div 
            style={{ 
              background: historyEntry.status === 'EXCUSED' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 59, 92, 0.1)',
              border: `1px solid ${historyEntry.status === 'EXCUSED' ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 59, 92, 0.3)'}`,
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: historyEntry.status === 'EXCUSED' ? 'var(--blue-excused)' : 'var(--red-alert)',
            }}
          >
            <strong>Note / Reason:</strong> {historyEntry.reason}
          </div>
        )}

        {/* Subjects breakdown list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {Object.entries(historyEntry.subjects || {}).map(([subjectKey, data]) => {
            const isCompleted = data.solved >= data.target && data.target > 0;
            const isRest = data.role === 'rest';

            return (
              <div 
                key={subjectKey}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <div className="font-heading" style={{ fontSize: '0.95rem', color: '#fff', textTransform: 'capitalize' }}>
                    {subjectKey}
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    ROLE: {data.role?.toUpperCase()}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 600, color: isRest ? 'var(--text-dim)' : isCompleted ? 'var(--emerald-success)' : '#fff' }}>
                    {data.solved} / {data.target}
                  </span>
                  {isCompleted && <Check size={18} style={{ color: 'var(--emerald-success)' }} />}
                  {isRest && <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>REST</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="glass-panel" style={{ padding: '0.75rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <Award size={14} style={{ color: 'var(--cyan-primary)' }} />
              <span>XP EARNED</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cyan-primary)', marginTop: '2px' }}>
              +{historyEntry.xpEarned} XP
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '0.75rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <Flame size={14} style={{ color: 'var(--amber-warning)' }} />
              <span>STREAK RECORD</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--amber-warning)', marginTop: '2px' }}>
              {historyEntry.streak} DAYS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
