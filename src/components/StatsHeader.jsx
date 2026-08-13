import React from 'react';
import { Sparkles, Terminal, Activity, ShieldCheck, Cpu, Database, Flame } from 'lucide-react';
import { formatDateStamp } from '../utils/storage';

export default function StatsHeader({ entries, onOpenNewForm }) {
  const hour = new Date().getHours();
  let timeEmoji = '☀️';
  if (hour >= 12 && hour < 17) timeEmoji = '🍵';
  else if (hour >= 17) timeEmoji = '🌙';

  const totalEntries = entries.length;
  
  // Mood count telemetry
  const moodCounts = entries.reduce((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    }
    return acc;
  }, {});

  const topMoods = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const tagline = "I'm always here to keep your diary safe.";

  return (
    <section className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      alignItems: 'center',
      marginBottom: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Cyber Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, var(--neon-cyan-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Left Greeting & Subtitle Tagline */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="hud-badge cyan" style={{ fontSize: '0.7rem' }}>
            <Activity size={12} style={{ marginRight: '0.2rem' }} /> SYSTEM ACTIVE
          </span>
          <span className="hud-badge purple" style={{ fontSize: '0.7rem' }}>
            <ShieldCheck size={12} style={{ marginRight: '0.2rem' }} /> LOCAL ENCRYPTED
          </span>
        </div>

        <h2 className="font-heading" style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          marginBottom: '0.4rem',
          color: 'var(--text-bright)'
        }}>
          Welcome back Friend {timeEmoji}.
        </h2>

        <p className="font-mono" style={{
          fontSize: '0.9rem',
          color: 'var(--text-main)',
          opacity: 0.9,
          lineHeight: 1.4,
          margin: 0
        }}>
          "{tagline}"
        </p>
      </div>

      {/* Right Tech Metrics & Telemetry Card */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--border-tech)',
        borderRadius: 'var(--radius-md)',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={16} color="var(--neon-cyan)" />
            <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-bright)' }}>
              {totalEntries} LOGS RECORDED
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--neon-amber)' }}>
            <Flame size={14} color="var(--neon-amber)" />
            <span className="font-mono">ONLINE STREAK</span>
          </div>
        </div>

        {/* Top Mood Telemetry Pills */}
        <div>
          <div className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
            NEURAL MOOD TELEMETRY:
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {topMoods.length > 0 ? topMoods.map(([moodStr, count]) => (
              <span key={moodStr} className="hud-badge purple" style={{ fontSize: '0.75rem' }}>
                {moodStr} [{count}]
              </span>
            )) : (
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Create your first log to initialize telemetry!
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
