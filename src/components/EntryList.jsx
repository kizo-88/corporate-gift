import React, { useState, useMemo } from 'react';
import EntryCard from './EntryCard';
import { CATEGORIES, MOODS } from '../utils/storage';
import { Search, Filter, ArrowUpDown, LayoutGrid, List, Plus, RefreshCw, PenTool } from 'lucide-react';

export default function EntryList({
  entries,
  onViewEntry,
  onEditEntry,
  onDeleteEntry,
  onTogglePin,
  onOpenNewForm,
  searchTerm,
  onSearchChange
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMood, setSelectedMood] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const filteredEntries = useMemo(() => {
    let result = [...entries];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        item => item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (selectedMood !== 'All') {
      result = result.filter(item => item.mood && item.mood.includes(selectedMood));
    }

    result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [entries, searchTerm, selectedCategory, selectedMood, sortBy]);

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedMood !== 'All';

  const resetFilters = () => {
    onSearchChange('');
    setSelectedCategory('All');
    setSelectedMood('All');
    setSortBy('newest');
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
      
      {/* Floating Action Button (FAB) for Mobile & Quick Writing */}
      <button
        onClick={onOpenNewForm}
        className="btn-primary-tech animate-pop-in"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 80,
          padding: '0.85rem 1.4rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 30px var(--primary-glow)',
          fontSize: '0.95rem',
          fontWeight: 700
        }}
        title="Write New Entry"
      >
        <PenTool size={18} />
        <span>+ Write Entry</span>
      </button>

      {/* Search & Filter Header Toolbar */}
      <div className="glass-panel" style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* Category HUD Pills Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}>
          <span className="font-mono" style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            marginRight: '0.25rem'
          }}>
            CATEGORY:
          </span>

          <button
            onClick={() => setSelectedCategory('All')}
            className="hud-badge rose"
            style={{
              cursor: 'pointer',
              border: selectedCategory === 'All' ? '1px solid var(--primary-accent)' : '1px solid var(--border-tech)',
              backgroundColor: selectedCategory === 'All' ? 'var(--rose-glow)' : 'transparent',
              color: selectedCategory === 'All' ? 'var(--rose-accent)' : 'var(--text-muted)'
            }}
          >
            ALL ENTRIES ({entries.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = entries.filter(e => e.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`hud-badge ${cat.color}`}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--text-bright)' : '1px solid transparent',
                  opacity: isSelected ? 1 : 0.7
                }}
              >
                <span>{cat.label} [{count}]</span>
              </button>
            );
          })}
        </div>

        {/* Controls Row: Mood, Sort, View Layout */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-tech)'
        }}>
          {/* Mood Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
              <Filter size={14} color="var(--text-muted)" />
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="input-tech font-mono"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', width: 'auto' }}
              >
                <option value="All">ALL MOODS</option>
                {MOODS.map(m => (
                  <option key={m.label} value={m.label}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="btn-ghost-tech"
                style={{ fontSize: '0.78rem', color: 'var(--primary-accent)', fontFamily: 'var(--font-mono)' }}
              >
                <RefreshCw size={12} />
                <span>RESET FILTERS</span>
              </button>
            )}
          </div>

          {/* Sort & Layout toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
              <ArrowUpDown size={14} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-tech font-mono"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', width: 'auto' }}
              >
                <option value="newest">SORT: NEWEST</option>
                <option value="oldest">SORT: OLDEST</option>
                <option value="title">SORT: TITLE A-Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-cyber-subtle)',
              padding: '0.2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-tech)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  border: 'none',
                  background: viewMode === 'grid' ? 'var(--bg-cyber-card-hover)' : 'transparent',
                  padding: '0.3rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: viewMode === 'grid' ? 'var(--rose-accent)' : 'var(--text-muted)'
                }}
                title="Grid Card View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  border: 'none',
                  background: viewMode === 'list' ? 'var(--bg-cyber-card-hover)' : 'transparent',
                  padding: '0.3rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: viewMode === 'list' ? 'var(--rose-accent)' : 'var(--text-muted)'
                }}
                title="Compact List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Entry Cards */}
      {filteredEntries.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fill, minmax(300px, 1fr))' 
            : '1fr',
          gap: '1.25rem'
        }}>
          {filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onView={onViewEntry}
              onEdit={onEditEntry}
              onDelete={onDeleteEntry}
              onTogglePin={onTogglePin}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel animate-fade-in" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--rose-glow)',
            color: 'var(--rose-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 0 20px var(--rose-glow)'
          }}>
            🌸
          </div>

          <div>
            <h3 className="font-heading" style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-bright)' }}>
              {hasActiveFilters ? 'NO ENTRIES FOUND' : 'YOUR DIARY IS EMPTY'}
            </h3>
            <p className="font-mono" style={{ maxWidth: '420px', margin: '0 auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {hasActiveFilters 
                ? 'Adjust filter criteria or reset filters to view your entries.' 
                : 'Click below to write your very first memory today!'}
            </p>
          </div>

          {hasActiveFilters ? (
            <button onClick={resetFilters} className="btn-secondary-tech">
              <RefreshCw size={15} />
              <span>RESET FILTERS</span>
            </button>
          ) : (
            <button onClick={onOpenNewForm} className="btn-primary-tech">
              <Plus size={18} />
              <span>WRITE FIRST MEMORY</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
