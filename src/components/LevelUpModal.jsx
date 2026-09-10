import React from 'react';
import { Award, Zap, ChevronRight, X } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const LevelUpModal = () => {
  const { activeModal, setActiveModal, levelUpData } = useSystem();

  if (activeModal !== 'levelUp' || !levelUpData) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 5, 10, 0.88)',
        backdropFilter: 'blur(20px)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div 
        className="glass-card glass-card-violet animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '3rem 2rem',
          textAlign: 'center',
          borderRadius: '24px',
          boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)',
        }}
      >
        <div 
          style={{
            width: '84px', height: '84px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 0 35px rgba(139, 92, 246, 0.6)'
          }}
        >
          <Award size={48} className="animate-pulse" />
        </div>

        <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '0.5rem' }}>
          LEVEL UP ACHIEVED
        </div>

        <h2 className="font-display" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
          LEVEL UP!
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.75rem 0' }}>
          <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--text-muted)' }}>
            LVL {levelUpData.oldLevel}
          </div>
          <ChevronRight size={24} style={{ color: 'var(--accent-violet)' }} />
          <div className="font-display" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', textShadow: '0 0 20px rgba(139, 92, 246, 0.8)' }}>
            LVL {levelUpData.newLevel}
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Your consistent preparation has elevated your System Rank. Keep pushing forward!
        </p>

        <button
          onClick={() => setActiveModal(null)}
          className="btn-primary"
          style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', fontSize: '0.95rem' }}
        >
          <Zap size={18} />
          <span>CONTINUE PROGRESSION</span>
        </button>
      </div>
    </div>
  );
};
