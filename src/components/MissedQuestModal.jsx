import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const MissedQuestModal = () => {
  const { activeModal, setActiveModal, submitExemption, triggerPenalty } = useSystem();
  const [selectedReason, setSelectedReason] = useState('College examination');
  const [customNote, setCustomNote] = useState('');
  const [viewState, setViewState] = useState('initial');

  if (activeModal !== 'exemption') return null;

  const reasonCategories = [
    { id: 'College examination', label: 'College Examination' },
    { id: 'Assignment / project', label: 'Assignment / Project Deadline' },
    { id: 'Family responsibility', label: 'Family Responsibility' },
    { id: 'Emergency / health', label: 'Emergency / Health Issue' },
    { id: 'Other valid reason', label: 'Other Valid Exemption' },
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: '#09090b',
          padding: '2.5rem 2rem',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
        }}
        className="animate-fade-in"
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-line)', paddingBottom: '1rem' }}>
          <div>
            <div className="font-display" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>
              SYSTEM WARNING // QUEST INCOMPLETE
            </div>
            <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#ffffff', marginTop: '2px' }}>
              EXEMPTION EVALUATION
            </h2>
          </div>
          <button 
            onClick={() => setActiveModal(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* View State 1: Initial Question */}
        {viewState === 'initial' && (
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              The daily system reset recorded incomplete quest targets. Accountability ensures continuous long-term progress.
            </p>

            <div style={{ padding: '1.25rem', border: '1px solid var(--border-line)', borderRadius: '8px', marginBottom: '2rem' }}>
              <div className="font-display" style={{ fontSize: '0.9rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                DO YOU HAVE A VALID REASON FOR EXEMPTION?
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Valid reasons (exams, deadlines, emergencies) prevent streak breakdown and XP deduction.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                onClick={() => setViewState('exemptionForm')}
                className="btn-system-action-white"
                style={{ justifyContent: 'center' }}
              >
                <CheckCircle size={16} />
                <span>SUBMIT REASON</span>
              </button>

              <button
                onClick={() => setViewState('confirmPenalty')}
                className="btn-system-action-red"
                style={{ justifyContent: 'center' }}
              >
                <XCircle size={16} />
                <span>ACCEPT FAILURE</span>
              </button>
            </div>
          </div>
        )}

        {/* View State 2: Exemption Reason Form */}
        {viewState === 'exemptionForm' && (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Select exemption reason. Status will be recorded as <strong style={{ color: '#ffffff' }}>EXCUSED</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {reasonCategories.map((cat) => (
                <label
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    border: `1px solid ${selectedReason === cat.id ? '#ffffff' : 'var(--border-line)'}`,
                    background: selectedReason === cat.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    color: selectedReason === cat.id ? '#ffffff' : 'var(--text-secondary)'
                  }}
                >
                  <input
                    type="radio"
                    name="reasonGroup"
                    checked={selectedReason === cat.id}
                    onChange={() => setSelectedReason(cat.id)}
                    style={{ accentColor: '#ffffff' }}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setViewState('initial')}
                className="btn-system-action"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                BACK
              </button>
              <button
                onClick={() => submitExemption(selectedReason, customNote)}
                className="btn-system-action-white"
                style={{ flex: 2, justifyContent: 'center' }}
              >
                CONFIRM EXCUSED
              </button>
            </div>
          </div>
        )}

        {/* View State 3: Confirm Unjustified Failure & Penalty */}
        {viewState === 'confirmPenalty' && (
          <div>
            <div style={{ padding: '1.25rem', border: '1px solid rgba(255, 59, 92, 0.3)', background: 'rgba(255, 59, 92, 0.05)', borderRadius: '8px', marginBottom: '2rem' }}>
              <div className="font-display" style={{ fontSize: '0.9rem', color: '#ff3b5c', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} />
                PENALTY ACTIVATION
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                · <strong>-50 XP</strong> Penalty Deduction<br />
                · <strong>Streak Reset</strong> to 0 Days<br />
                · <strong>Recovery Quest Created</strong> (+2 extra problems)
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setViewState('initial')}
                className="btn-system-action"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                CANCEL
              </button>
              <button
                onClick={() => triggerPenalty('SQL')}
                className="btn-system-action-red"
                style={{ flex: 2, justifyContent: 'center' }}
              >
                ACCEPT FAILURE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
