import React, { useState } from 'react';
import { Terminal, Plus, Lock, Unlock, Download, Sun, Moon, Palette, Search, Sparkles } from 'lucide-react';

export default function Navbar({
  entryCount,
  onOpenNewForm,
  currentTheme,
  onSelectTheme,
  isDarkMode,
  onToggleDarkMode,
  isLocked,
  onToggleLock,
  onExportData,
  searchTerm,
  onSearchChange
}) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themes = [
    { id: 'cream-rose', name: 'Cream Rose (Light)', color: '#FAF6F0', accent: '#E88D9E' },
    { id: 'midnight-rose', name: 'Midnight Rose (Dark)', color: '#140E17', accent: '#FF9EAE' },
    { id: 'matcha-cream', name: 'Matcha Cream', color: '#F4F7F4', accent: '#52B788' },
    { id: 'lavender-cream', name: 'Lavender Quartz', color: '#F7F5FC', accent: '#A093E2' }
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
          {/* Logo & Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--rose-accent), var(--lavender-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 0 15px var(--rose-glow)'
            }}>
              <Sparkles size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 className="font-heading" style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.1,
                  color: 'var(--text-bright)'
                }}>
                  Mmorkleyyy's Little Journal
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
                <span>FEMININE TECH DIARY</span>
                <span>•</span>
                <span className="hud-badge rose" style={{ padding: '0.1rem 0.45rem', fontSize: '0.7rem' }}>
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
            {/* Search Input Bar */}
            <div style={{ position: 'relative', minWidth: '190px' }}>
              <Search size={14} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search logs..."
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

            {/* Direct Dark Mode / Light Mode Toggle Switch */}
            <button
              onClick={onToggleDarkMode}
              className="btn-secondary-tech"
              title={isDarkMode ? "Switch to Cream Light Mode" : "Switch to Midnight Dark Mode"}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              {isDarkMode ? (
                <>
                  <Sun size={16} color="var(--amber-accent)" />
                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>Light</span>
                </>
              ) : (
                <>
                  <Moon size={16} color="var(--lavender-accent)" />
                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>Dark</span>
                </>
              )}
            </button>

            {/* Theme Dropdown Palette */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="btn-secondary-tech"
                title="Select Theme Palette"
                style={{ padding: '0.45rem 0.75rem' }}
              >
                <Palette size={16} />
              </button>

              {isThemeMenuOpen && (
                <div className="glass-panel animate-pop-in" style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  width: '200px',
                  zIndex: 50
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    COLOR PALETTES
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
                        background: currentTheme === t.id ? 'var(--bg-cyber-subtle)' : 'transparent',
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

            {/* Export Backup JSON */}
            <button
              onClick={onExportData}
              className="btn-secondary-tech"
              title="Backup JSON Data"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              <Download size={16} />
            </button>

            {/* Security Lock Toggle */}
            <button
              onClick={onToggleLock}
              className="btn-secondary-tech"
              title={isLocked ? "Diary Encrypted & Protected" : "Set Passcode Lock"}
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              {isLocked ? <Lock size={16} color="var(--rose-accent)" /> : <Unlock size={16} />}
            </button>

            {/* New Entry Button */}
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
