import React, { useState, useMemo } from 'react';
import EntryCard from './EntryCard';
import { CATEGORIES, MOODS } from '../utils/storage';
import { Search, Filter, ArrowUpDown, LayoutGrid, List, Sparkles, Plus, BookOpen, Star, RefreshCw } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title, pinned
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Filter & Sort Entries logic
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // 1. Search Query Filter (Title or Content)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        item => item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // 3. Mood Filter
    if (selectedMood !== 'All') {
      result = result.filter(item => item.mood && item.mood.includes(selectedMood));
    }

    // 4. Sort
    result.sort((a, b) => {
      // Pinned items always float to top if sorting by newest/default
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }

      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // default 'newest'
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
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Search & Filter Header Toolbar */}
      <div style={{
        backgroundColor: 'var(--bg-cream-paper)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-soft)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* Category Pills Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-medium)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginRight: '0.25rem'
          }}>
            Filter:
          </span>

          <button
            onClick={() => setSelectedCategory('All')}
            className={`pastel-badge ${selectedCategory === 'All' ? 'rose' : ''}`}
            style={{
              cursor: 'pointer',
              border: selectedCategory === 'All' ? '2px solid var(--primary-accent)' : '1px solid var(--border-soft)',
              backgroundColor: selectedCategory === 'All' ? 'var(--pastel-rose)' : 'var(--bg-cream-base)',
              color: selectedCategory === 'All' ? '#8A4B4E' : 'var(--text-medium)'
            }}
          >
            ✨ All ({entries.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = entries.filter(e => e.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`pastel-badge ${cat.color}`}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--text-dark)' : '1px solid transparent',
                  opacity: isSelected ? 1 : 0.75
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls Row: Mood, Sort, View Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--border-soft)'
        }}>
          {/* Left: Mood & Active filter clear */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Filter size={15} color="var(--text-medium)" />
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="input-pastel"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}
              >
                <option value="All">All Moods</option>
                {MOODS.map(m => (
                  <option key={m.label} value={m.label}>
                    {m.emoji} {m.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="btn-ghost"
                style={{ fontSize: '0.8rem', color: 'var(--primary-accent)' }}
              >
                <RefreshCw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Right: Sort options & View mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <ArrowUpDown size={15} color="var(--text-medium)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-pastel"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* View layout toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-cream-subtle)',
              padding: '0.2rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  border: 'none',
                  background: viewMode === 'grid' ? 'var(--bg-cream-paper)' : 'transparent',
                  padding: '0.3rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: viewMode === 'grid' ? 'var(--primary-accent)' : 'var(--text-medium)'
                }}
                title="Grid Card View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  border: 'none',
                  background: viewMode === 'list' ? 'var(--bg-cream-paper)' : 'transparent',
                  padding: '0.3rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: viewMode === 'list' ? 'var(--primary-accent)' : 'var(--text-medium)'
                }}
                title="Compact List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Entries List / Grid */}
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
        <div className="tape-top animate-fade-in" style={{
          backgroundColor: 'var(--bg-cream-paper)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px dashed var(--border-soft)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--pastel-butter)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            📖
          </div>

          <div>
            <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {hasActiveFilters ? 'No Matching Entries Found' : 'Your Diary is Quiet & Peaceful'}
            </h3>
            <p style={{ maxWidth: '420px', margin: '0 auto', fontSize: '0.95rem' }}>
              {hasActiveFilters 
                ? 'Try adjusting your search keywords or clearing active filters to view your memories.' 
                : 'Write your very first entry above to record your feelings, quiet thoughts, and special moments!'}
            </p>
          </div>

          {hasActiveFilters ? (
            <button onClick={resetFilters} className="btn-secondary">
              <RefreshCw size={16} />
              <span>Clear All Filters</span>
            </button>
          ) : (
            <button onClick={onOpenNewForm} className="btn-primary">
              <Plus size={18} />
              <span>Write Your First Memory</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
