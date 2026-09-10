import React, { useState } from 'react';
import { 
  Award, 
  Check, 
  Lock, 
  Sparkles, 
  Flame, 
  Zap, 
  Database, 
  Terminal, 
  Shield 
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const AchievementsView = () => {
  const { achievements, user, equipTitle } = useSystem();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Aptitude', 'SQL', 'Python', 'Consistency', 'Special'];

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Database': return Database;
      case 'Terminal': return Terminal;
      case 'Flame': return Flame;
      case 'Shield': return Shield;
      case 'Zap': return Zap;
      default: return Award;
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Panel 5 Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.1 }}>
            Achievements
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Earn your place. Build your legacy.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div className="font-sans" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            {unlockedCount} / {achievements.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Unlocked</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'btn-dark' : 'btn-light'}
            style={{ fontSize: '0.82rem', padding: '0.4rem 1.1rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3x2 Grid of Achievement Cards (Exact Panel 5 Match) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {achievements.map((ach) => {
          const Icon = getBadgeIcon(ach.icon);
          const percent = Math.min(100, Math.round((ach.progress / ach.total) * 100));
          const isEquipped = user.equippedTitle === ach.title;

          return (
            <div
              key={ach.id}
              className="warm-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                padding: '1.75rem 1.25rem',
                opacity: ach.unlocked ? 1 : 0.65,
                background: ach.unlocked ? '#ffffff' : '#fafafa',
              }}
            >
              <div>
                {/* Badge Icon */}
                <div 
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: ach.unlocked ? '#F3E8FF' : '#F1F5F9',
                    color: ach.unlocked ? '#9333EA' : '#94A3B8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3 className="font-sans" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  {ach.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                  {ach.requirementText}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                {ach.unlocked ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="tag-unlocked">Unlocked</span>
                    <button
                      onClick={() => equipTitle(ach.title)}
                      className={isEquipped ? 'btn-light' : 'btn-dark'}
                      style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', marginTop: '4px' }}
                      disabled={isEquipped}
                    >
                      {isEquipped ? (
                        <>
                          <Check size={12} style={{ color: '#10b981' }} />
                          <span>Equipped</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} />
                          <span>Equip Title</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      <span>Progress</span>
                      <span className="font-mono">{ach.progress} / {ach.total}</span>
                    </div>
                    <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: '#8b5cf6' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Lock size={12} /> Locked
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
