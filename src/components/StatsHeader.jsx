import React from 'react';
import { Sparkles, Calendar, Heart, Flame, BookOpen, Clock } from 'lucide-react';
import { formatDateStamp } from '../utils/storage';

export default function StatsHeader({ entries, onOpenNewForm }) {
  // Time of day emoji
  const hour = new Date().getHours();
  let timeEmoji = '☀️';
  if (hour >= 12 && hour < 17) timeEmoji = '🍵';
  else if (hour >= 17) timeEmoji = '🌙';

  // Calculate streak / entries
  const totalEntries = entries.length;
  
  // Collect mood stats count
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
    <section className="animate-fade-in" style={{
      backgroundColor: 'var(--bg-cream-paper)',
      borderRadius: 'var(--radius-lg)',
      border: '1.5px solid var(--border-soft)',
      padding: '1.75rem',
      boxShadow: 'var(--shadow-sm)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      alignItems: 'center',
      marginBottom: '1.5rem'
    }}>
      {/* Left Greeting & Daily Quote */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-accent)', letterSpacing: '0.05em' }}>
            MY DAILY SANCTUARY
          </span>
          <span className="pastel-badge rose" style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem' }}>
            <Sparkles size={11} style={{ marginRight: '0.2rem' }} /> Today
          </span>
        </div>

        <h2 className="font-heading" style={{
          fontSize: '2rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          color: 'var(--text-dark)'
        }}>
          Welcome back Friend {timeEmoji}.
        </h2>

        <p className="font-handwriting-alt" style={{
          fontSize: '1.05rem',
          color: 'var(--text-medium)',
          fontStyle: 'italic',
          lineHeight: 1.4,
          margin: 0
        }}>
          "{tagline}"
        </p>
      </div>

      {/* Right Stats & Mood Distribution Pill Box */}
      <div style={{
        backgroundColor: 'var(--bg-cream-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} color="var(--primary-accent)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              {totalEntries} Recorded Memories
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.825rem', fontWeight: 700, color: '#D97706' }}>
            <Flame size={15} fill="#F59E0B" color="#D97706" />
            <span>Active Streak</span>
          </div>
        </div>

        {/* Top Mood Badges */}
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.35rem' }}>
            FREQUENT MOODS:
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {topMoods.length > 0 ? topMoods.map(([moodStr, count]) => (
              <span key={moodStr} className="pastel-badge rose" style={{ fontSize: '0.78rem' }}>
                {moodStr} ({count})
              </span>
            )) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-medium)' }}>
                Write your first entry to see mood insights!
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
