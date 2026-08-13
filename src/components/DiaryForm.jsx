import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Send, X, Calendar, Heart } from 'lucide-react';
import { formatDateStamp, WRITING_PROMPTS, CATEGORIES, MOODS } from '../utils/storage';

export default function DiaryForm({ initialData = null, onSave, onCancel, isModal = false }) {
  const nowIso = new Date().toISOString();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState(initialData?.mood || '⚡ Focused');
  const [category, setCategory] = useState(initialData?.category || 'Protocols');
  const [color, setColor] = useState(initialData?.color || 'rose');
  const [sticker, setSticker] = useState(initialData?.sticker || '🌸');
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [createdAt, setCreatedAt] = useState(initialData?.createdAt || nowIso);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setMood(initialData.mood || '⚡ Focused');
      setCategory(initialData.category || 'Protocols');
      setColor(initialData.color || 'rose');
      setSticker(initialData.sticker || '🌸');
      setCreatedAt(initialData.createdAt || nowIso);
    }
  }, [initialData]);

  const handleInsertPrompt = () => {
    const randomPrompt = WRITING_PROMPTS[Math.floor(Math.random() * WRITING_PROMPTS.length)];
    if (!title) {
      setTitle(randomPrompt);
    } else {
      setContent(prev => prev ? `${prev}\n\n[PROMPT: ${randomPrompt}]\n` : `[PROMPT: ${randomPrompt}]\n`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const timestampToSave = useCustomDate ? new Date(createdAt).toISOString() : (initialData?.createdAt || new Date().toISOString());

    const entryData = {
      id: initialData?.id || `log-${Date.now()}`,
      title: title.trim() || 'Kenangan Hari Ini ✨',
      content: content.trim(),
      createdAt: timestampToSave,
      updatedAt: new Date().toISOString(),
      mood,
      category,
      color,
      sticker,
      isPinned: initialData?.isPinned || false,
    };

    onSave(entryData);
  };

  const stickers = ['🌸', '🌿', '☕', '✨', '📖', '🌅', '⚡', '🧠', '🛡️', '🚀'];

  return (
    <div className={`glass-panel ${isModal ? 'animate-pop-in' : 'animate-fade-in'}`} style={{
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem',
      position: 'relative'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        borderBottom: '1px solid var(--border-tech)',
        paddingBottom: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.6rem' }}>{sticker}</span>
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-bright)' }}>
              {initialData ? 'KEMASKINI TULISAN DIARI' : 'TULIS DIARI HARI INI'}
            </h2>
            
            {/* Automatic Date Stamp Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              marginTop: '0.15rem'
            }}>
              <Clock size={12} color="var(--rose-accent)" />
              <span>{formatDateStamp(useCustomDate ? createdAt : (initialData?.createdAt || nowIso))}</span>
              <span className="hud-badge rose" style={{ padding: '0.05rem 0.35rem', fontSize: '0.65rem' }}>
                AUTO TARIKH
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleInsertPrompt}
            className="btn-secondary-tech"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', fontFamily: 'var(--font-mono)' }}
            title="Dapatkan Idea Cadangan Tulisan"
          >
            <Sparkles size={13} color="var(--amber-accent)" />
            <span>IDE CADANGAN</span>
          </button>

          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-ghost-tech"
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
          <label className="font-mono" style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '0.4rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}>
            // TAJUK DIARI
          </label>
          <input
            type="text"
            placeholder="Contoh: Secawan Kopi Pagi, Cerita Petang Yang Indah..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-tech font-heading"
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              padding: '0.6rem 1rem'
            }}
            autoFocus
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
            <label className="font-mono" style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em'
            }}>
              // PERASAAN HARI INI (MOOD)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {MOODS.map((m) => {
                const isSelected = mood.includes(m.label);
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMood(`${m.emoji} ${m.label}`)}
                    className="hud-badge"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--primary-accent)' : '1px solid var(--border-tech)',
                      backgroundColor: isSelected ? 'var(--rose-glow)' : 'var(--bg-cyber-subtle)',
                      color: isSelected ? 'var(--rose-accent)' : 'var(--text-main)',
                      fontSize: '0.78rem'
                    }}
                  >
                    {m.emoji} {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="font-mono" style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em'
            }}>
              // KATEGORI DIARI
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
                    className={`hud-badge ${cat.color}`}
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid var(--text-bright)' : '1px solid transparent',
                      opacity: isSelected ? 1 : 0.7
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
          backgroundColor: 'var(--bg-cyber-subtle)',
          padding: '0.6rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-tech)'
        }}>
          {/* Sticker Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pilih Ikon:</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {stickers.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSticker(s)}
                  style={{
                    border: 'none',
                    background: sticker === s ? 'var(--rose-glow)' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    padding: '0.1rem 0.25rem'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Date Override Option */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={useCustomDate}
                onChange={(e) => setUseCustomDate(e.target.checked)}
              />
              <span>TETAPKAN TARIKH LAIN</span>
            </label>
          </div>
        </div>

        {useCustomDate && (
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={15} color="var(--rose-accent)" />
            <input
              type="datetime-local"
              value={createdAt.slice(0, 16)}
              onChange={(e) => setCreatedAt(new Date(e.target.value).toISOString())}
              className="input-tech font-mono"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
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
            <label className="font-mono" style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              letterSpacing: '0.05em'
            }}>
              // ISI KANDUNGAN DIARI
            </label>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {content.length} AKSARA
            </span>
          </div>

          <textarea
            rows={7}
            placeholder="Tuliskan apa yang berlaku hari ini, perkara yang anda syukuri, atau impian anda..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-tech font-body"
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Actions */}
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
              className="btn-secondary-tech"
            >
              Batal
            </button>
          )}

          <button
            type="submit"
            className="btn-primary-tech"
            disabled={!title.trim() && !content.trim()}
            style={{
              opacity: (!title.trim() && !content.trim()) ? 0.6 : 1,
              cursor: (!title.trim() && !content.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={16} />
            <span>{initialData ? 'KEMASKINI TULISAN' : 'SIMPAN DIARI'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
