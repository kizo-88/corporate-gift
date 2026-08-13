import React from 'react';
import { X, BookOpen, ShieldCheck, Download, Music, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HelpModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(20, 14, 23, 0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="animate-fade-in" onClick={onClose}>
      
      <div className="glass-panel animate-pop-in" style={{
        borderRadius: 'var(--radius-lg)',
        borderColor: 'var(--border-tech-glow)',
        boxShadow: 'var(--shadow-tech-lg)',
        padding: '2rem',
        maxWidth: '520px',
        width: '100%',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button
          onClick={onClose}
          className="btn-ghost-tech"
          style={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--rose-glow)',
            color: 'var(--rose-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-bright)' }}>
              Quick User Guide ✨
            </h3>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              HOW TO USE YOUR DIARY
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} color="var(--rose-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Auto Save & Date Stamp:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Every time you write a diary entry, date and time are stamped automatically. All entries are saved safely in your browser (Local Storage).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Music size={20} color="var(--lavender-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Background Music Player:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Listen to songs by Jennie & Rosé while typing! Click the Playlist button to select your favorite track anytime.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <ShieldCheck size={20} color="var(--mint-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Passcode Security Lock:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Click the lock icon 🔒 at the top to set a 4-digit security PIN so your diary remains private and protected.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Download size={20} color="var(--amber-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--text-bright)' }}>Export & Backup Data:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Click the download button 📥 to save a JSON backup copy of your diary to your device whenever you want.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-primary-tech" style={{ padding: '0.5rem 1.25rem' }}>
            Got it, Start Writing ✨
          </button>
        </div>
      </div>
    </div>
  );
}
