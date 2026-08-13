import React from 'react';
import { X, Clock, Edit2, Trash2, Star, BookOpen, Share2, Calendar, FileText } from 'lucide-react';
import { formatDateStamp, getStats } from '../utils/storage';

export default function EntryViewModal({ entry, onClose, onEdit, onDelete, onTogglePin }) {
  if (!entry) return null;

  const {
    id,
    title,
    content,
    createdAt,
    mood,
    category,
    color = 'sage',
    sticker = '🌿',
    isPinned = false
  } = entry;

  const stats = getStats(content);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(58, 50, 44, 0.45)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="animate-fade-in" onClick={onClose}>
      
      <div
        className="tape-top paper-lines animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-soft)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Navigation Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px dashed var(--border-soft)',
          backgroundColor: 'var(--bg-cream-paper)'
        }}>
          {/* Category & Mood Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className={`pastel-badge ${color}`}>
              <span>{sticker}</span>
              <span>{category || 'Journal'}</span>
            </span>

            {mood && (
              <span className="pastel-badge rose">
                {mood}
              </span>
            )}

            <span className="pastel-badge butter" style={{ fontSize: '0.75rem' }}>
              <FileText size={12} style={{ marginRight: '0.2rem' }} />
              {stats.words} words • {stats.readTimeMinutes} min read
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Pin Button */}
            <button
              onClick={() => onTogglePin(id)}
              className="btn-ghost"
              title={isPinned ? "Unpin entry" : "Pin entry"}
            >
              <Star size={18} fill={isPinned ? "#FEE440" : "none"} color={isPinned ? "#845B25" : "var(--text-medium)"} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="btn-ghost"
              style={{ padding: '0.35rem' }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div style={{
          padding: '1.75rem',
          overflowY: 'auto',
          flexGrow: 1
        }}>
          {/* Automatic Date Stamp Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-medium)',
            fontSize: '0.875rem',
            marginBottom: '0.75rem'
          }}>
            <Clock size={15} color="var(--primary-accent)" />
            <span style={{ fontWeight: 600 }}>{formatDateStamp(createdAt)}</span>
          </div>

          {/* Title in Clean Font */}
          <h2 className="font-heading" style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '1.25rem',
            color: 'var(--text-dark)'
          }}>
            {title}
          </h2>

          {/* Main Text Content */}
          <div className="font-body" style={{
            fontSize: '1.05rem',
            lineHeight: '2rem',
            color: 'var(--text-dark)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {content || 'This entry has no written text content yet.'}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.75rem',
          borderTop: '1px dashed var(--border-soft)',
          backgroundColor: 'var(--bg-cream-paper)'
        }}>
          <button
            onClick={() => {
              onDelete(id);
              onClose();
            }}
            className="btn-danger-ghost"
          >
            <Trash2 size={16} />
            <span>Delete Entry</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>

            <button
              onClick={() => {
                onEdit(entry);
                onClose();
              }}
              className="btn-primary"
            >
              <Edit2 size={16} />
              <span>Edit Entry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
