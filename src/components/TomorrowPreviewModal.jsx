import React from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Brain, Database, Terminal, Network, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { format, addDays } from 'date-fns';
import { getDailyRotation, getQuestTarget, SUBJECTS_CONFIG } from '../utils/rotationHelper';

export const TomorrowPreviewModal = ({ isOpen, onClose }) => {
  const { currentDate, user } = useSystem();

  if (!isOpen) return null;

  const tomorrowDate = addDays(currentDate, 1);
  const tomorrowDateStr = format(tomorrowDate, 'EEEE, MMM d, yyyy');
  const tomorrowRotation = getDailyRotation(tomorrowDate);

  const subjectsToInclude = ['aptitude', 'sql', 'python'];
  if (user.unlockedDSA) {
    subjectsToInclude.push('dsa');
  }

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Database': return Database;
      case 'Terminal': return Terminal;
      case 'Network': return Network;
      default: return Zap;
    }
  };

  const modalContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      className="animate-fade-in"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #131722 0%, #0d1017 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#ffffff',
          margin: 'auto'
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{ 
                background: 'rgba(6, 182, 212, 0.18)', 
                color: '#06b6d4', 
                padding: '0.5rem', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Calendar size={22} />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '0.08em' }}>
                WORKLOAD ROTATION PREVIEW
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-sans)', color: '#ffffff' }}>
                Tomorrow's Tasks
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                {tomorrowDateStr}
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body - Tasks List */}
        <div 
          style={{ 
            padding: '1.5rem 1.75rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            overflowY: 'auto'
          }}
        >
          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.4' }}>
            Here is your scheduled focus distribution for tomorrow. Your active day progress remains untouched.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {subjectsToInclude.map((subId) => {
              const config = SUBJECTS_CONFIG[subId];
              if (!config) return null;

              const role = tomorrowRotation[subId] || 'rest';
              const target = getQuestTarget(subId, role);
              const Icon = getSubjectIcon(config.icon);

              const isMain = role === 'main';
              const isSecondary = role === 'secondary';
              const isRest = role === 'rest';

              const roleLabel = isMain ? 'Main Focus' : isSecondary ? 'Light Practice' : 'Rest Day';
              const tagBg = isMain ? 'rgba(245, 158, 11, 0.15)' : isSecondary ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.08)';
              const tagColor = isMain ? '#f59e0b' : isSecondary ? '#c084fc' : '#94a3b8';
              const xpReward = isMain ? 50 : isSecondary ? 25 : 10;

              return (
                <div
                  key={subId}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isMain ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: config.color || '#ffffff'
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        {config.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                        {!isRest ? `${target} ${config.unit} Target` : 'No mandatory quota'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 700, 
                        background: tagBg, 
                        color: tagColor, 
                        padding: '0.2rem 0.65rem', 
                        borderRadius: '9999px',
                        letterSpacing: '0.03em'
                      }}
                    >
                      {roleLabel}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600 }}>
                      +{xpReward} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div 
          style={{
            padding: '1.25rem 1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 0, 0, 0.2)',
            flexShrink: 0
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} style={{ color: '#06b6d4' }} />
            <span>Date & streak remain unchanged</span>
          </div>

          <button 
            type="button" 
            onClick={onClose}
            className="btn-purple-pill"
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.82rem' }}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
