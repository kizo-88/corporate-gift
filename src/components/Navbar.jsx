import React, { useState } from 'react';
import { Terminal, Plus, Shield, Lock, Unlock, Download, Cpu, Search, Activity } from 'lucide-react';

export default function Navbar({
  entryCount,
  onOpenNewForm,
  currentTheme,
  onSelectTheme,
  isLocked,
  onToggleLock,
  onExportData,
  searchTerm,
  onSearchChange
}) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themes = [
    { id: 'obsidian', name: 'Cyber Obsidian', color: '#0B0E17', accent: '#00F2FE' },
    { id: 'matrix', name: 'Matrix Terminal', color: '#05130B', accent: '#10B981' },
    { id: 'quantum-light', name: 'Quantum Glass', color: '#F8FAFC', accent: '#2563EB' },
    { id: 'solar-flare', name: 'Solar Flare', color: '#140D07', accent: '#F97316' }
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid var(--border-tech)'
    }}>
      <div className="app-container" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary-accent), var(--neon-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 0 15px var(--primary-glow)'
            }}>
              <Terminal size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 className="font-heading" style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.1,
                  color: 'var(--text-bright)'
                }}>
                  CipherLog OS
                </h1>
                <span className="pulse-dot" title="Local DB Active" />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                marginTop: '0.15rem'
              }}>
                <span>NEURAL DIARY</span>
                <span>•</span>
                <span className="hud-badge cyan" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                  {entryCount} {entryCount === 1 ? 'LOG' : 'LOGS'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap'
          }}>
            {/* High-Tech Search Bar */}
            <div style={{ position: 'relative', minWidth: '200px' }}>
              <Search size={14} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search logs & keywords..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="input-tech font-mono"
                style={{
                  paddingLeft: '2.2rem',
                  paddingTop: '0.45rem',
                  paddingBottom: '0.45rem',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-full)'
                }}
              />
            </div>

            {/* Tech Theme Selector */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="btn-secondary-tech"
                title="Switch Cyber Theme"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
              >
                <Cpu size={16} />
                <span style={{ display: 'none' }}>Theme</span>
              </button>

              {isThemeMenuOpen && (
                <div className="glass-panel animate-pop-in" style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  width: '190px',
                  zIndex: 50
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    THEME ENGINE
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTheme(t.id);
                        setIsThemeMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.45rem 0.6rem',
                        border: 'none',
                        background: currentTheme === t.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.825rem',
                        color: 'var(--text-bright)',
                        fontWeight: currentTheme === t.id ? 700 : 500
                      }}
                    >
                      <span style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: t.accent,
                        boxShadow: `0 0 8px ${t.accent}`
                      }} />
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Backup */}
            <button
              onClick={onExportData}
              className="btn-secondary-tech"
              title="Backup JSON Data"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              <Download size={16} />
            </button>

            {/* Lock Security Toggle */}
            <button
              onClick={onToggleLock}
              className="btn-secondary-tech"
              title={isLocked ? "Diary Encrypted & Protected" : "Set Passcode Lock"}
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              {isLocked ? <Lock size={16} color="var(--neon-cyan)" /> : <Unlock size={16} />}
            </button>

            {/* New Entry Primary CTA Button */}
            <button
              onClick={onOpenNewForm}
              className="btn-primary-tech"
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
            >
              <Plus size={18} />
              <span>Create Log</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
