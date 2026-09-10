import React from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const RecoveryCard = ({ quest }) => {
  const { completeRecoveryQuest } = useSystem();

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.25rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.03)',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
      className="animate-fade-in"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <RefreshCw size={16} className="animate-pulse" style={{ color: '#ffffff' }} />
        <span className="font-display" style={{ fontSize: '0.8rem', color: '#ffffff', letterSpacing: '0.12em' }}>
          RECOVERY PROTOCOL
        </span>
        <span style={{ color: 'var(--text-muted)' }}>//</span>
        <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {quest.subject?.toUpperCase()}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          +30 XP AVAILABLE
        </span>
      </div>

      <button
        onClick={() => completeRecoveryQuest(quest.id)}
        className="btn-system-action-white"
        style={{ padding: '0.35rem 1rem', fontSize: '0.75rem' }}
      >
        <CheckCircle2 size={14} />
        <span>RECLAIM</span>
      </button>
    </div>
  );
};
