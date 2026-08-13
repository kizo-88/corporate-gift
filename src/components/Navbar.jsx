import React, { useState } from 'react';
import { BookOpen, Plus, Sparkles, Lock, Unlock, Download, Palette, Search } from 'lucide-react';

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
    { id: 'cream', name: 'Vanilla Cream', color: '#FBF8F3', accent: '#DDA7A5' },
    { id: 'lavender', name: 'Lavender Mist', color: '#F7F5FC', accent: '#B3A0D6' },
    { id: 'matcha', name: 'Matcha Tea', color: '#F4F7F4', accent: '#8DAA91' },
    { id: 'warm-candle', name: 'Cozy Parchment', color: '#F3EBDD', accent: '#C98A5B' }
  ];

  return (
    <header style={{
      backgroundColor: 'var(--bg-cream-paper)',
      borderBottom: '1px solid var(--border-soft)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: 'var(--shadow-sm)'
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
              backgroundColor: 'var(--pastel-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8A4B4E',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="font-heading" style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.1,
                color: 'var(--text-dark)'
              }}>
                Pastel Sanctuary
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-medium)'
              }}>
                <span>Personal Diary & Journal</span>
                <span>•</span>
                <span className="pastel-badge rose" style={{ padding: '0.1rem 0.5rem', fontSize: '0.75rem' }}>
                  {entryCount} {entryCount === 1 ? 'Entry' : 'Entries'}
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
            {/* Search Input Bar (Header Quick Search) */}
            <div style={{ position: 'relative', minWidth: '180px' }}>
              <Search size={15} style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-light)'
              }} />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="input-pastel"
                style={{
                  paddingLeft: '2rem',
                  paddingTop: '0.45rem',
                  paddingBottom: '0.45rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-full)'
                }}
              />
            </div>

            {/* Theme Selector Toggle */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="btn-secondary"
                title="Change Color Theme"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
              >
                <Palette size={16} />
                <span style={{ display: 'none', minWidth: '700px' }}>Theme</span>
              </button>

              {isThemeMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  backgroundColor: 'var(--bg-cream-paper)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  padding: '0.5rem',
                  width: '180px',
                  zIndex: 50
                }} className="animate-pop-in">
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.5rem', color: 'var(--text-light)' }}>
                    COLOR THEMES
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
                        background: currentTheme === t.id ? 'var(--bg-cream-subtle)' : 'transparent',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        color: 'var(--text-dark)',
                        fontWeight: currentTheme === t.id ? 700 : 500
                      }}
                    >
                      <span style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: t.accent,
                        border: '1px solid rgba(0,0,0,0.1)'
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
              className="btn-secondary"
              title="Backup Diary to JSON file"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              <Download size={16} />
            </button>

            {/* Lock Security Toggle */}
            <button
              onClick={onToggleLock}
              className="btn-secondary"
              title={isLocked ? "Diary Protected" : "Set Passcode Lock"}
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              {isLocked ? <Lock size={16} color="var(--primary-accent)" /> : <Unlock size={16} />}
            </button>

            {/* New Entry Primary CTA Button */}
            <button
              onClick={onOpenNewForm}
              className="btn-primary"
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.9rem' }}
            >
              <Plus size={18} />
              <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
