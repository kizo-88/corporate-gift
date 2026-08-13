import React from 'react';
import { Clock, Star, Edit2, Trash2, Terminal, Shield, ArrowUpRight } from 'lucide-react';
import { formatDateStamp, formatRelativeTime } from '../utils/storage';

export default function EntryCard({ entry, onView, onEdit, onDelete, onTogglePin }) {
  const {
    id,
    title,
    content,
    createdAt,
    mood,
    category,
    color = 'cyan',
    sticker = '⚡',
    isPinned = false
  } = entry;

  return (
    <article
      className="glass-panel glass-panel-hover animate-fade-in"
      style={{
        borderRadius: 'var(--radius-lg)',
        borderColor: isPinned ? 'var(--primary-accent)' : 'var(--border-tech)',
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: isPinned ? '0 0 20px var(--primary-glow)' : 'var(--shadow-tech-sm)'
      }}
      onClick={() => onView(entry)}
    >
      <div>
        {/* Top Badges & Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem'
        }}>
          {/* Category Tag & Mood Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className={`hud-badge ${color}`}>
              <span>{sticker}</span>
              <span>{category || 'Log'}</span>
            </span>

            {mood && (
              <span className="hud-badge rose">
                {mood}
              </span>
            )}
          </div>

          {/* Pin Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(id);
            }}
            title={isPinned ? "Unpin log" : "Pin log to top"}
            style={{
              border: 'none',
              background: isPinned ? 'var(--neon-amber-glow)' : 'transparent',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isPinned ? 'var(--neon-amber)' : 'var(--text-muted)',
              transition: 'var(--transition-fast)'
            }}
          >
            <Star size={16} fill={isPinned ? "var(--neon-amber)" : "none"} />
          </button>
        </div>

        {/* Title in Space Grotesk / High-Tech Font */}
        <h3
          className="font-heading"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            margin: '0.35rem 0 0.5rem 0',
            lineHeight: 1.3,
            color: 'var(--text-bright)',
            wordBreak: 'break-word'
          }}
        >
          {title}
        </h3>

        {/* Automatic Date Stamp Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.85rem'
        }}>
          <Clock size={12} color="var(--primary-accent)" />
          <span title={formatDateStamp(createdAt)}>
            {formatDateStamp(createdAt)} [{formatRelativeTime(createdAt)}]
          </span>
        </div>

        {/* Body Text Excerpt */}
        <p
          className="font-body"
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-main)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            margin: '0 0 1rem 0',
            opacity: 0.9
          }}
        >
          {content || 'No text content recorded for this log entry.'}
        </p>
      </div>

      {/* Footer Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-tech)',
        marginTop: 'auto'
      }}>
        {/* Read More Trigger */}
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          color: 'var(--primary-accent)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <Terminal size={14} />
          OPEN LOG <ArrowUpRight size={13} />
        </span>

        {/* Edit & Delete Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
            className="btn-ghost-tech"
            style={{ padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}
            title="Edit Log"
          >
            <Edit2 size={13} />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
            className="btn-ghost-tech"
            style={{ padding: '0.3rem 0.5rem', fontSize: '0.78rem', color: 'var(--neon-pink)' }}
            title="Delete Log"
          >
            <Trash2 size={13} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
}
