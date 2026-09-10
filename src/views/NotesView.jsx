import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Calendar,
  Save,
  RotateCcw
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { format } from 'date-fns';

const CHALK_COLORS = [
  { id: 'white', name: 'White Chalk', hex: '#f8fafc', shadow: '0 0 8px rgba(248, 250, 252, 0.4)' },
  { id: 'yellow', name: 'Yellow Chalk', hex: '#fef08a', shadow: '0 0 8px rgba(254, 240, 138, 0.4)' },
  { id: 'pink', name: 'Pink Chalk', hex: '#fbcfe8', shadow: '0 0 8px rgba(251, 207, 232, 0.4)' },
  { id: 'cyan', name: 'Cyan Chalk', hex: '#a5f3fc', shadow: '0 0 8px rgba(165, 243, 252, 0.4)' },
  { id: 'mint', name: 'Mint Chalk', hex: '#bbf7d0', shadow: '0 0 8px rgba(187, 247, 208, 0.4)' },
];

export const NotesView = () => {
  const { notes, updateNotes, currentDate } = useSystem();
  const [text, setText] = useState(notes || '');
  const [selectedColor, setSelectedColor] = useState(CHALK_COLORS[0]);
  const [copied, setCopied] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);

  // Sync state if notes change externally
  useEffect(() => {
    if (notes !== undefined && notes !== text) {
      setText(notes);
    }
  }, [notes]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateNotes(newText);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to erase the chalkboard?')) {
      setText('');
      updateNotes('');
    }
  };

  const handleInsertTimestamp = () => {
    const timeTag = `\n\n📌 [${format(currentDate, 'EEEE, MMM d, yyyy - hh:mm a')}]\n`;
    const newText = text + timeTag;
    setText(newText);
    updateNotes(newText);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div 
              style={{ 
                background: 'rgba(139, 92, 246, 0.15)', 
                color: '#8b5cf6', 
                padding: '0.45rem', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <BookOpen size={22} />
            </div>
            <h1 className="font-serif" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              Classroom Chalkboard
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Your personal school scratchpad. Auto-saved in real-time.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleInsertTimestamp} 
            className="btn-light" 
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}
            title="Insert Current Date Tag"
          >
            <Calendar size={14} />
            <span>Add Date Tag</span>
          </button>

          <button 
            onClick={handleCopy} 
            className="btn-light" 
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}
            title="Copy notes to clipboard"
          >
            {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Notes'}</span>
          </button>

          <button 
            onClick={handleClear} 
            className="btn-light" 
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.2)' }}
            title="Erase Chalkboard"
          >
            <Trash2 size={14} />
            <span>Erase Board</span>
          </button>
        </div>
      </div>

      {/* Classroom Blackboard Outer Frame */}
      <div 
        style={{
          borderRadius: '24px',
          background: '#78350f', // Rich Teak/Oak Wooden Frame
          padding: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), inset 0 2px 6px rgba(255, 255, 255, 0.2)',
          border: '1px solid #451a03',
          position: 'relative'
        }}
      >
        {/* Inner Wooden Bevel */}
        <div 
          style={{
            borderRadius: '16px',
            background: 'radial-gradient(circle at 50% 30%, #1e3328 0%, #122119 80%, #0d1712 100%)', // Deep Slate Green Chalkboard Surface
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 12px rgba(0, 0, 0, 0.9)',
            border: '2px solid #291409',
            padding: '2rem 2.25rem 1.5rem 2.25rem',
            position: 'relative',
            minHeight: '520px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Top Board Label Header */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px dashed rgba(255, 255, 255, 0.15)'
            }}
          >
            <div 
              style={{ 
                fontFamily: "'Caveat', cursive, sans-serif", 
                fontSize: '1.5rem', 
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.05em'
              }}
            >
              System Scratchpad // Room 101
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span 
                style={{ 
                  fontSize: '0.75rem', 
                  color: 'rgba(255, 255, 255, 0.45)', 
                  fontFamily: 'var(--font-mono)' 
                }}
              >
                {wordCount} words &nbsp;·&nbsp; {charCount} chars
              </span>

              {saveNotice && (
                <span 
                  style={{ 
                    fontSize: '0.72rem', 
                    color: '#bbf7d0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.3rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <Save size={12} /> Auto-Saved
                </span>
              )}
            </div>
          </div>

          {/* Authentic Chalk Handwriting Textarea */}
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Write your study notes, formulas, tasks, or ideas here..."
            spellCheck="false"
            style={{
              width: '100%',
              flex: 1,
              minHeight: '380px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: selectedColor.hex,
              fontFamily: "'Caveat', cursive, sans-serif",
              fontSize: '1.85rem',
              lineHeight: 1.5,
              letterSpacing: '0.03em',
              textShadow: selectedColor.shadow,
              caretColor: selectedColor.hex,
              padding: 0,
              margin: 0
            }}
          />

          {/* Chalk Tray Ledge at Bottom */}
          <div 
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            {/* Chalk Color Selection Tray */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                SELECT CHALK COLOR:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {CHALK_COLORS.map((c) => {
                  const isSelected = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: c.hex,
                        border: isSelected ? '2px solid #ffffff' : '1px solid rgba(0, 0, 0, 0.3)',
                        boxShadow: isSelected ? `0 0 12px ${c.hex}` : '0 2px 4px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 0.2s ease'
                      }}
                      title={c.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Eraser Indicator */}
            <div 
              style={{
                fontSize: '0.78rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Sparkles size={14} style={{ color: selectedColor.hex }} />
              <span>Chalkboard Scratchpad Ready</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
