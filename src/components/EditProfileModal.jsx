import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, Check, User } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

// Built-in cool preset avatar options
const PRESET_AVATARS = [
  { id: 'default', url: '/avatar.jpg', label: 'Default Cyber' },
  { 
    id: 'neon-cyber', 
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%238b5cf6"/><stop offset="100%" stop-color="%2306b6d4"/></linearGradient></defs><rect width="100" height="100" fill="%230f172a"/><circle cx="50" cy="40" r="22" fill="url(%23g)"/><path d="M 20 88 C 20 65, 80 65, 80 88 Z" fill="url(%23g)"/></svg>', 
    label: 'Neon Sentinel' 
  },
  { 
    id: 'emerald-hacker', 
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2310b981"/><stop offset="100%" stop-color="%233b82f6"/></linearGradient></defs><rect width="100" height="100" fill="%23090d16"/><circle cx="50" cy="40" r="22" fill="url(%23g)"/><path d="M 20 88 C 20 65, 80 65, 80 88 Z" fill="url(%23g)"/></svg>', 
    label: 'Emerald Coder' 
  },
  { 
    id: 'solar-flare', 
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f59e0b"/><stop offset="100%" stop-color="%23ef4444"/></linearGradient></defs><rect width="100" height="100" fill="%231a0b12"/><circle cx="50" cy="40" r="22" fill="url(%23g)"/><path d="M 20 88 C 20 65, 80 65, 80 88 Z" fill="url(%23g)"/></svg>', 
    label: 'Solar Phoenix' 
  },
  { 
    id: 'midnight-violet', 
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23c084fc"/><stop offset="100%" stop-color="%236366f1"/></linearGradient></defs><rect width="100" height="100" fill="%230c0a1d"/><circle cx="50" cy="40" r="22" fill="url(%23g)"/><path d="M 20 88 C 20 65, 80 65, 80 88 Z" fill="url(%23g)"/></svg>', 
    label: 'Midnight Void' 
  }
];

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUserProfile } = useSystem();
  
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(user.avatar || '/avatar.jpg');
  const [uploadError, setUploadError] = useState('');
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Image size should be less than 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setUploadError('Name cannot be empty.');
      return;
    }

    updateUserProfile({
      name: name.trim(),
      bio: bio.trim(),
      avatar
    });

    onClose();
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
        background: 'rgba(0, 0, 0, 0.75)',
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
          maxWidth: '480px',
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
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div 
              style={{ 
                background: 'rgba(139, 92, 246, 0.2)', 
                color: '#a855f7', 
                padding: '0.45rem', 
                borderRadius: '10px' 
              }}
            >
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-sans)' }}>
                Edit Profile
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                Customize your operator identity, avatar, and motto.
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

        {/* Modal Body Form - Scrollable if content height exceeds screen */}
        <form 
          onSubmit={handleSave} 
          style={{ 
            padding: '1.25rem 1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem',
            overflowY: 'auto'
          }}
        >
          
          {/* Avatar Selector Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={avatar} 
                alt="Avatar Preview" 
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid rgba(139, 92, 246, 0.6)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                  background: '#1e293b'
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  border: '2px solid #0d1017',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}
                title="Upload Custom Avatar Image"
              >
                <Upload size={13} />
              </button>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />

            {/* Presets Grid */}
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.4rem', textAlign: 'center', letterSpacing: '0.05em' }}>
                OR CHOOSE A PRESET AVATAR
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                {PRESET_AVATARS.map((p) => {
                  const isSelected = avatar === p.url;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setAvatar(p.url)}
                      style={{
                        padding: '2px',
                        borderRadius: '50%',
                        background: isSelected ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      title={p.label}
                    >
                      <img 
                        src={p.url} 
                        alt={p.label}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
              Operator Name
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Bio Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
              Bio / Personal Motto
            </label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              placeholder="Discipline today, a better tomorrow."
              rows={2}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.88rem',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {uploadError && (
            <div style={{ fontSize: '0.8rem', color: '#f43f5e', textAlign: 'center' }}>
              {uploadError}
            </div>
          )}

          {/* Modal Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.25rem', flexShrink: 0 }}>
            <button 
              type="button" 
              onClick={onClose}
              className="btn-light"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn-purple-pill"
              style={{ 
                padding: '0.55rem 1.35rem', 
                fontSize: '0.82rem'
              }}
            >
              <Check size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
