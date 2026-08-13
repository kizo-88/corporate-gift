import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Send, X, RefreshCw, Tag, Heart, Check, Edit2 } from 'lucide-react';
import { formatDateStamp, WRITING_PROMPTS, CATEGORIES, MOODS } from '../utils/storage';

export default function DiaryForm({ initialData = null, onSave, onCancel, isModal = false }) {
  // Automatic date stamp logic
  const nowIso = new Date().toISOString();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState(initialData?.mood || '🧘 Serene');
  const [category, setCategory] = useState(initialData?.category || 'Reflections');
  const [color, setColor] = useState(initialData?.color || 'sage');
  const [sticker, setSticker] = useState(initialData?.sticker || '🌿');
  const [fontStyle, setFontStyle] = useState(initialData?.fontStyle || 'handwriting');
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [createdAt, setCreatedAt] = useState(initialData?.createdAt || nowIso);
  const [isLinedPaper, setIsLinedPaper] = useState(true);

  // Update initial data when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setMood(initialData.mood || '🧘 Serene');
      setCategory(initialData.category || 'Reflections');
      setColor(initialData.color || 'sage');
      setSticker(initialData.sticker || '🌿');
      setFontStyle(initialData.fontStyle || 'handwriting');
      setCreatedAt(initialData.createdAt || nowIso);
    }
  }, [initialData]);

  // Handle Prompt Insertion
  const handleInsertPrompt = () => {
    const randomPrompt = WRITING_PROMPTS[Math.floor(Math.random() * WRITING_PROMPTS.length)];
    if (!title) {
      setTitle(randomPrompt);
    } else {
      setContent(prev => prev ? `${prev}\n\n*Prompt: ${randomPrompt}*\n` : `*Prompt: ${randomPrompt}*\n`);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    // Automatically set current timestamp if not in custom edit mode
    const timestampToSave = useCustomDate ? new Date(createdAt).toISOString() : (initialData?.createdAt || new Date().toISOString());

    const entryData = {
      id: initialData?.id || `entry-${Date.now()}`,
      title: title.trim() || 'Untitled Moment ✨',
      content: content.trim(),
      createdAt: timestampToSave,
      updatedAt: new Date().toISOString(),
      mood,
      category,
      color,
      sticker,
      fontStyle,
      isPinned: initialData?.isPinned || false,
    };

    onSave(entryData);
  };

  const stickers = ['🌿', '🌸', '☕', '📖', '✨', '🌅', '🌙', '🎨', '✈️', '🍵'];

  return (
    <div className={`tape-top ${isModal ? 'animate-pop-in' : 'animate-fade-in'}`} style={{
      backgroundColor: 'var(--bg-cream-paper)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem',
      border: '1.5px solid var(--border-soft)',
      boxShadow: 'var(--shadow-md)',
      position: 'relative'
    }}>
      {/* Header bar of form */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        borderBottom: '1px dashed var(--border-soft)',
        paddingBottom: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.6rem' }}>{sticker}</span>
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.8rem', margin: 0 }}>
              {initialData ? 'Edit Diary Entry' : 'Write a New Entry'}
            </h2>
            
            {/* Automatic Date Stamp Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.825rem',
              color: 'var(--text-medium)',
              marginTop: '0.15rem'
            }}>
              <Clock size={13} color="var(--primary-accent)" />
              <span>{formatDateStamp(useCustomDate ? createdAt : (initialData?.createdAt || nowIso))}</span>
              <span className="pastel-badge butter" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                Auto Date Stamp
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Daily Prompt Generator */}
          <button
            type="button"
            onClick={handleInsertPrompt}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            title="Generate writing prompt inspiration"
          >
            <Sparkles size={14} color="var(--pastel-butter-accent)" />
            <span>Prompt</span>
          </button>

          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-ghost"
              style={{ padding: '0.35rem' }}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Title Input */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '0.4rem',
            color: 'var(--text-medium)'
          }}>
            ENTRY TITLE
          </label>
          <input
            type="text"
            placeholder="e.g. A Quiet Morning Coffee, Dream Log, Sunny Park Walk..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-pastel font-heading"
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              padding: '0.6rem 1rem'
            }}
          />
        </div>

        {/* Mood & Category Pickers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {/* Mood Picker */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
              color: 'var(--text-medium)'
            }}>
              HOW ARE YOU FEELING? (MOOD)
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem'
            }}>
              {MOODS.map((m) => {
                const isSelected = mood.includes(m.label);
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMood(`${m.emoji} ${m.label}`)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '2px solid var(--primary-accent)' : '1px solid var(--border-soft)',
                      backgroundColor: isSelected ? 'var(--pastel-rose)' : 'var(--bg-cream-base)',
                      color: isSelected ? '#8A4B4E' : 'var(--text-dark)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {m.emoji} {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tag Picker */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
              color: 'var(--text-medium)'
            }}>
              CATEGORY TAG
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      setColor(cat.color);
                    }}
                    className={`pastel-badge ${cat.color}`}
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--text-dark)' : '1px solid transparent',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                      opacity: isSelected ? 1 : 0.8
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticker & Custom Date Toggles */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-cream-subtle)',
          padding: '0.6rem 0.85rem',
          borderRadius: 'var(--radius-md)'
        }}>
          {/* Sticker Cover Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-medium)' }}>Sticker:</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {stickers.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSticker(s)}
                  style={{
                    border: 'none',
                    background: sticker === s ? 'rgba(0,0,0,0.08)' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    padding: '0.1rem 0.2rem'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Style & Date Override Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isLinedPaper}
                onChange={(e) => setIsLinedPaper(e.target.checked)}
              />
              <span>Lined Paper</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={useCustomDate}
                onChange={(e) => setUseCustomDate(e.target.checked)}
              />
              <span>Custom Date</span>
            </label>
          </div>
        </div>

        {useCustomDate && (
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} color="var(--primary-accent)" />
            <input
              type="datetime-local"
              value={createdAt.slice(0, 16)}
              onChange={(e) => setCreatedAt(new Date(e.target.value).toISOString())}
              className="input-pastel"
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
            />
          </div>
        )}

        {/* Content Body Textarea */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.4rem'
          }}>
            <label style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-medium)'
            }}>
              YOUR DIARY THOUGHTS
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
              {content.length} chars
            </span>
          </div>

          <textarea
            rows={7}
            placeholder="Write your heart out... what happened today? What are you grateful for?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`input-pastel ${isLinedPaper ? 'paper-lines' : ''} ${fontStyle === 'handwriting' ? 'font-heading' : 'font-body'}`}
            style={{
              fontSize: fontStyle === 'handwriting' ? '1.4rem' : '1rem',
              lineHeight: isLinedPaper ? '2rem' : '1.6',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Form Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={!title.trim() && !content.trim()}
            style={{
              opacity: (!title.trim() && !content.trim()) ? 0.6 : 1,
              cursor: (!title.trim() && !content.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={16} />
            <span>{initialData ? 'Update Entry' : 'Save Entry'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
