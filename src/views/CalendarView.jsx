import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';

import { getDailyRotation, getQuestTarget } from '../utils/rotationHelper';

export const CalendarView = () => {
  const { calendarHistory, currentDate, user, selectedCalendarDay, setSelectedCalendarDay } = useSystem();
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const activeDateStr = selectedCalendarDay || format(currentDate, 'yyyy-MM-dd');
  const activeDateObj = new Date(activeDateStr + 'T00:00:00');
  const rotationForActiveDate = getDailyRotation(activeDateObj);
  const isFuture = activeDateObj > currentDate;
  const isToday = isSameDay(activeDateObj, currentDate);

  const fallbackSubjects = {};
  const subjectsToInclude = ['aptitude', 'sql', 'python'];
  if (user?.unlockedDSA) {
    subjectsToInclude.push('dsa');
  }

  subjectsToInclude.forEach((subId) => {
    const role = rotationForActiveDate[subId] || 'rest';
    const target = getQuestTarget(subId, role);
    fallbackSubjects[subId] = {
      solved: 0,
      target,
      role
    };
  });

  const activeLog = calendarHistory[activeDateStr] || {
    date: activeDateStr,
    status: isToday ? 'Active Today' : isFuture ? 'Scheduled' : 'Rest Day',
    xpEarned: 0,
    streak: user.currentStreak,
    subjects: fallbackSubjects,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Panel 3 Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-dark)' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="btn-light" style={{ padding: '0.4rem 0.8rem' }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="btn-light" style={{ padding: '0.4rem 0.8rem' }}>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => setCurrentMonth(currentDate)} className="btn-light" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid Card (Exact Panel 3 Match) */}
      <div className="warm-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          {weekDays.map((wd) => (
            <div key={wd} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {wd}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
          {days.map((day) => {
            const dStr = format(day, 'yyyy-MM-dd');
            const log = calendarHistory[dStr];
            const isToday = isSameDay(day, currentDate);
            const inMonth = isSameMonth(day, currentMonth);
            const isSelected = activeDateStr === dStr;

            let dotColor = '#cbd5e1';
            if (log) {
              if (log.status === 'Completed') dotColor = '#10b981';
              else if (log.status === 'Partial') dotColor = '#f59e0b';
              else if (log.status === 'Missed') dotColor = '#f43f5e';
              else if (log.status === 'Excused') dotColor = '#06b6d4';
            }

            return (
              <div
                key={dStr}
                onClick={() => setSelectedCalendarDay(dStr)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '50%',
                  background: isSelected ? '#121417' : 'transparent',
                  color: isSelected ? '#ffffff' : isToday ? '#121417' : 'var(--text-dark)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: inMonth ? 1 : 0.25,
                  fontWeight: isSelected || isToday ? 700 : 400,
                  fontSize: '0.95rem',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{format(day, 'd')}</span>
                <span 
                  style={{ 
                    width: '4px', height: '4px', borderRadius: '50%', background: dotColor,
                    position: 'absolute', bottom: '6px'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Legend Bar (Panel 3 Match) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Completed</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Partial</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }}></span> Missed</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }}></span> Excused</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }}></span> Rest</span>
        </div>
      </div>

      {/* Selected Day Inspector Card (Exact Panel 3 Match) */}
      <div className="warm-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h2 className="font-sans" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            {format(new Date(activeDateStr), 'EEE, d MMMM yyyy')}
          </h2>

          <span className="tag-completed">
            {activeLog.status}
          </span>
        </div>

        {/* Subjects list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
          {Object.entries(activeLog.subjects || {}).map(([sKey, data]) => {
            const isRest = data.role === 'rest';
            const percent = data.target > 0 ? Math.min(100, Math.round((data.solved / data.target) * 100)) : 0;

            return (
              <div key={sKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '120px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)', textTransform: 'capitalize' }}>
                  {sKey}
                </div>

                {!isRest ? (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '360px' }}>
                    <div style={{ flex: 1, height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: '#10b981' }} />
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {data.solved} / {data.target}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Rest Day &nbsp;·&nbsp; -
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Stats Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>XP Earned</div>
            <div className="font-sans" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-green)' }}>
              +{activeLog.xpEarned || 75}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Streak</div>
            <div className="font-sans" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {activeLog.streak || 14} days
            </div>
          </div>
        </div>

        <div className="font-serif" style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '1.25rem', textAlign: 'center' }}>
          "Good days build great months."
        </div>
      </div>

    </div>
  );
};
