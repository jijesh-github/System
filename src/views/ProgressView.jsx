import React, { useState } from 'react';
import { 
  BarChart2, 
  Target, 
  TrendingUp, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { SUBJECTS_CONFIG } from '../utils/rotationHelper';

export const ProgressView = () => {
  const { topicStats, user } = useSystem();
  const [selectedSubject, setSelectedSubject] = useState('aptitude');

  const activeStats = topicStats[selectedSubject] || topicStats.aptitude;
  const activeConfig = SUBJECTS_CONFIG[selectedSubject] || SUBJECTS_CONFIG.aptitude;

  // SVG Area Line Chart Points for 30-day trend
  const chartPoints = [
    { day: '1 Sep', val: 15 },
    { day: '5 Sep', val: 35 },
    { day: '8 Sep', val: 28 },
    { day: '12 Sep', val: 52 },
    { day: '15 Sep', val: 48 },
    { day: '20 Sep', val: 75 },
    { day: '25 Sep', val: 68 },
    { day: '30 Sep', val: 92 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Panel 4 Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.1 }}>
            Your Progress
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Steady effort. Real improvement.
          </p>
        </div>

        <select 
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '9999px', 
            background: '#ffffff', 
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-dark)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>All Time</option>
        </select>
      </div>

      {/* 4 Top Stat Cards (Exact Panel 4 Match) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <div className="warm-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>
            <BarChart2 size={18} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Questions Solved</span>
          </div>
          <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            {activeStats.totalSolved}
          </div>
        </div>

        <div className="warm-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', marginBottom: '0.5rem' }}>
            <Target size={18} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Overall Accuracy</span>
          </div>
          <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            {activeStats.accuracy}%
          </div>
        </div>

        <div className="warm-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', marginBottom: '0.5rem' }}>
            <TrendingUp size={18} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>vs. previous month</span>
          </div>
          <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            +12%
          </div>
        </div>

        <div className="warm-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>
            <CalendarIcon size={18} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Days Active</span>
          </div>
          <div className="font-sans" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            28
          </div>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['aptitude', 'sql', 'python'].map((sKey) => {
          const conf = SUBJECTS_CONFIG[sKey];
          const isSelected = selectedSubject === sKey;
          return (
            <button
              key={sKey}
              onClick={() => setSelectedSubject(sKey)}
              className={isSelected ? 'btn-dark' : 'btn-light'}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1.2rem' }}
            >
              {conf.name}
            </button>
          );
        })}
      </div>

      {/* Main Analytics Card (Exact Panel 4 Match) */}
      <div className="warm-card" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="font-sans" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            {activeConfig.name} Progress
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {activeStats.totalSolved} questions &nbsp;·&nbsp; {activeStats.accuracy}% accuracy
          </p>
        </div>

        {/* SVG Purple Area Line Chart */}
        <div style={{ width: '100%', height: '180px', margin: '2rem 0', position: 'relative' }}>
          <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Horizontal Grid lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />

            {/* Gradient Fill */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Path */}
            <path
              d="M 0,110 Q 70,80 140,95 T 280,40 T 420,55 T 500,20 L 500,140 L 0,140 Z"
              fill="url(#chartGradient)"
            />

            {/* Smooth Curve Line */}
            <path
              d="M 0,110 Q 70,80 140,95 T 280,40 T 420,55 T 500,20"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Glowing Points */}
            <circle cx="0" cy="110" r="4" fill="#8b5cf6" />
            <circle cx="140" cy="95" r="4" fill="#8b5cf6" />
            <circle cx="280" cy="40" r="4" fill="#8b5cf6" />
            <circle cx="420" cy="55" r="4" fill="#8b5cf6" />
            <circle cx="500" cy="20" r="4" fill="#8b5cf6" />
          </svg>

          {/* X Axis Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
            <span>1 Sep</span>
            <span>8 Sep</span>
            <span>15 Sep</span>
            <span>22 Sep</span>
            <span>30 Sep</span>
          </div>
        </div>

        {/* Topic Breakdown Section (Exact Panel 4 Match) */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-sans" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '1.25rem' }}>
            Topic Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeStats.topics.map((t) => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                <div style={{ minWidth: '180px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  {t.name}
                </div>

                <div style={{ flex: 1, height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${t.accuracy}%`, height: '100%', background: '#8b5cf6', borderRadius: '4px' }} />
                </div>

                <div className="font-sans" style={{ minWidth: '40px', textAlign: 'right', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  {t.accuracy}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
