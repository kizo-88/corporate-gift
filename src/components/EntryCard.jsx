import React from 'react';
import { Clock, Star, Edit2, Trash2, BookOpen, Heart, Pin } from 'lucide-react';
import { formatDateStamp, formatRelativeTime } from '../utils/storage';

export default function EntryCard({ entry, onView, onEdit, onDelete, onTogglePin }) {
  const {
    id,
    title,
    content,
    createdAt,
    mood,
    category,
    color = 'sage',
    sticker = '🌿',
    isPinned = false,
    fontStyle = 'handwriting'
  } = entry;

  return (
    <article
      className="tape-top animate-fade-in"
      style={{
        backgroundColor: 'var(--bg-cream-paper)',
        borderRadius: 'var(--radius-lg)',
        border: isPinned ? '2px solid var(--primary-accent)' : '1px solid var(--border-soft)',
        padding: '1.4rem 1.4rem 1.1rem 1.4rem',
        boxShadow: isPinned ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'var(--transition-normal)',
        cursor: 'pointer'
      }}
      onClick={() => onView(entry)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isPinned ? 'var(--shadow-md)' : 'var(--shadow-sm)';
      }}
    >
      <div>
        {/* Top Badges & Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.65rem'
        }}>
          {/* Category Tag & Mood Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className={`pastel-badge ${color}`}>
              <span>{sticker}</span>
              <span>{category || 'Journal'}</span>
            </span>

            {mood && (
              <span className="pastel-badge rose" style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem' }}>
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
            title={isPinned ? "Unpin entry" : "Pin entry to top"}
            style={{
              border: 'none',
              background: isPinned ? 'var(--pastel-butter)' : 'transparent',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isPinned ? '#845B25' : 'var(--text-light)',
              transition: 'var(--transition-fast)'
            }}
          >
            <Star size={16} fill={isPinned ? "#FEE440" : "none"} />
          </button>
        </div>

        {/* Entry Title (Clean sans-serif font) */}
        <h3
          className="font-heading"
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            margin: '0.25rem 0 0.5rem 0',
            lineHeight: 1.3,
            color: 'var(--text-dark)',
            wordBreak: 'break-word'
          }}
        >
          {title}
        </h3>

        {/* Automatic Date Stamp Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.8rem',
          color: 'var(--text-medium)',
          marginBottom: '0.85rem'
        }}>
          <Clock size={13} color="var(--primary-accent)" />
          <span title={formatDateStamp(createdAt)}>
            {formatDateStamp(createdAt)} ({formatRelativeTime(createdAt)})
          </span>
        </div>

        {/* Body Text Excerpt (Clean readable font) */}
        <p
          className="font-body"
          style={{
            fontSize: '0.925rem',
            color: 'var(--text-medium)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            margin: '0 0 1rem 0'
          }}
        >
          {content || 'No text content written for this memory yet.'}
        </p>
      </div>

      {/* Footer Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px dashed var(--border-soft)',
        marginTop: 'auto'
      }}>
        {/* Read More Trigger */}
        <span style={{
          fontSize: '0.825rem',
          fontWeight: 700,
          color: 'var(--primary-accent)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <BookOpen size={14} />
          Read entry
        </span>

        {/* Edit & Delete Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
            className="btn-ghost"
            style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}
            title="Edit Entry"
          >
            <Edit2 size={14} />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
            className="btn-danger-ghost"
            style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}
            title="Delete Entry"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
}
