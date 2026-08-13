import React from 'react';
import { X, Clock, Edit2, Trash2, Star, Terminal, FileText, Cpu, ShieldCheck } from 'lucide-react';
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
    color = 'cyan',
    sticker = '⚡',
    isPinned = false
  } = entry;

  const stats = getStats(content);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} className="animate-fade-in" onClick={onClose}>
      
      <div
        className="glass-panel animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          borderColor: 'var(--border-tech-glow)',
          boxShadow: 'var(--shadow-tech-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-tech)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
          {/* Category & Mood Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className={`hud-badge ${color}`}>
              <span>{sticker}</span>
              <span>{category || 'Log'}</span>
            </span>

            {mood && (
              <span className="hud-badge purple">
                {mood}
              </span>
            )}

            <span className="hud-badge emerald" style={{ fontSize: '0.7rem' }}>
              <FileText size={11} style={{ marginRight: '0.2rem' }} />
              {stats.words} WORDS // {stats.readTimeMinutes} MIN READ
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Pin Button */}
            <button
              onClick={() => onTogglePin(id)}
              className="btn-ghost-tech"
              title={isPinned ? "Unpin log" : "Pin log"}
            >
              <Star size={18} fill={isPinned ? "var(--neon-amber)" : "none"} color={isPinned ? "var(--neon-amber)" : "var(--text-muted)"} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="btn-ghost-tech"
              style={{ padding: '0.35rem' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
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
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            marginBottom: '0.75rem'
          }}>
            <Clock size={14} color="var(--primary-accent)" />
            <span style={{ fontWeight: 600 }}>{formatDateStamp(createdAt)}</span>
          </div>

          {/* Title */}
          <h2 className="font-heading" style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '1.25rem',
            color: 'var(--text-bright)'
          }}>
            {title}
          </h2>

          {/* Main Text Body */}
          <div className="font-body" style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--text-main)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            opacity: 0.95
          }}>
            {content || 'No detailed text recorded for this log entry.'}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.75rem',
          borderTop: '1px solid var(--border-tech)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
          <button
            onClick={() => {
              onDelete(id);
              onClose();
            }}
            className="btn-ghost-tech"
            style={{ color: 'var(--neon-pink)' }}
          >
            <Trash2 size={15} />
            <span>DELETE LOG</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="btn-secondary-tech"
            >
              CLOSE
            </button>

            <button
              onClick={() => {
                onEdit(entry);
                onClose();
              }}
              className="btn-primary-tech"
            >
              <Edit2 size={15} />
              <span>EDIT LOG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
