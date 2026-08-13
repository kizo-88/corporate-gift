import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsHeader from './components/StatsHeader';
import DiaryForm from './components/DiaryForm';
import EntryList from './components/EntryList';
import EntryViewModal from './components/EntryViewModal';
import LockModal from './components/LockModal';

import {
  loadEntries,
  saveEntries,
  loadSavedTheme,
  saveTheme,
  loadSavedPin,
  savePin
} from './utils/storage';

import { Check, Sparkles, BookOpen, Heart, Shield } from 'lucide-react';

export default function App() {
  // 1. Storage & State Management
  const [entries, setEntries] = useState(() => loadEntries());
  const [theme, setTheme] = useState(() => loadSavedTheme());
  const [savedPin, setSavedPinState] = useState(() => loadSavedPin());
  const [isLocked, setIsLocked] = useState(() => Boolean(loadSavedPin()));
  
  // UI Controls
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingEntry, setViewingEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Save entries to LocalStorage whenever updated
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  // Apply Theme Attribute to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Show temporary toast message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Add or Update Entry
  const handleSaveEntry = (entryData) => {
    setEntries((prevEntries) => {
      const existingIndex = prevEntries.findIndex(e => e.id === entryData.id);
      if (existingIndex >= 0) {
        // Update existing entry
        const updated = [...prevEntries];
        updated[existingIndex] = entryData;
        return updated;
      } else {
        // Add new entry to beginning of list
        return [entryData, ...prevEntries];
      }
    });

    setShowFormModal(false);
    setEditingEntry(null);
    showToast(entryData.id.includes('entry-') ? 'Entry saved to diary! ✨' : 'Entry updated! 🌿');
  };

  // Delete Entry
  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this diary entry? This action cannot be undone.')) {
      setEntries(prev => prev.filter(e => e.id !== entryId));
      if (viewingEntry?.id === entryId) setViewingEntry(null);
      showToast('Entry deleted from diary 🗑️');
    }
  };

  // Toggle Pinned Status
  const handleTogglePin = (entryId) => {
    setEntries(prev => prev.map(e => {
      if (e.id === entryId) {
        const nextPinned = !e.isPinned;
        showToast(nextPinned ? 'Entry pinned to top ⭐️' : 'Entry unpinned');
        return { ...e, isPinned: nextPinned };
      }
      return e;
    }));
  };

  // Export Diary Data to JSON File
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pastel_diary_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Diary backup downloaded! 💾');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Passcode Privacy Lock Screen */}
      {isLocked && (
        <LockModal
          savedPin={savedPin}
          onUnlock={() => setIsLocked(false)}
          onSetPin={(newPin) => {
            setSavedPinState(newPin);
            setIsLocked(false);
          }}
        />
      )}

      {/* Main Top Navigation Header */}
      <Navbar
        entryCount={entries.length}
        onOpenNewForm={() => {
          setEditingEntry(null);
          setShowFormModal(true);
        }}
        currentTheme={theme}
        onSelectTheme={(t) => setTheme(t)}
        isLocked={Boolean(savedPin)}
        onToggleLock={() => setShowLockModal(true)}
        onExportData={handleExportData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main App Workspace Layout */}
      <main className="app-container" style={{ flexGrow: 1 }}>
        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="animate-pop-in" style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: 'var(--text-dark)',
            color: '#FFFFFF',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            zIndex: 1000
          }}>
            <Sparkles size={16} color="var(--pastel-rose)" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Personal Sanctuary Dashboard Header Widget */}
        <StatsHeader
          entries={entries}
          onOpenNewForm={() => {
            setEditingEntry(null);
            setShowFormModal(true);
          }}
        />

        {/* Layout Grid: Inline Add Form & Entry List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: showFormModal ? '1fr' : '1fr',
          gap: '2rem'
        }}>
          
          {/* Main List of Past Entries */}
          <EntryList
            entries={entries}
            onViewEntry={(entry) => setViewingEntry(entry)}
            onEditEntry={(entry) => {
              setEditingEntry(entry);
              setShowFormModal(true);
            }}
            onDeleteEntry={handleDeleteEntry}
            onTogglePin={handleTogglePin}
            onOpenNewForm={() => {
              setEditingEntry(null);
              setShowFormModal(true);
            }}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </main>

      {/* Form Modal for Creating / Editing Entry */}
      {showFormModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(58, 50, 44, 0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflowY: 'auto'
        }} className="animate-fade-in">
          <div style={{ width: '100%', maxWidth: '680px', margin: 'auto' }}>
            <DiaryForm
              initialData={editingEntry}
              onSave={handleSaveEntry}
              onCancel={() => {
                setShowFormModal(false);
                setEditingEntry(null);
              }}
              isModal={true}
            />
          </div>
        </div>
      )}

      {/* Entry Notebook Reading Detail Modal */}
      {viewingEntry && (
        <EntryViewModal
          entry={viewingEntry}
          onClose={() => setViewingEntry(null)}
          onEdit={(entry) => {
            setViewingEntry(null);
            setEditingEntry(entry);
            setShowFormModal(true);
          }}
          onDelete={handleDeleteEntry}
          onTogglePin={handleTogglePin}
        />
      )}

      {/* Passcode Lock Settings Modal */}
      {showLockModal && (
        <LockModal
          savedPin={savedPin}
          onUnlock={() => setShowLockModal(false)}
          onSetPin={(newPin) => {
            setSavedPinState(newPin);
            setShowLockModal(false);
            showToast(newPin ? 'Passcode lock activated 🔒' : 'Passcode lock removed 🔓');
          }}
          onClose={() => setShowLockModal(false)}
        />
      )}

      {/* Clean Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-soft)',
        backgroundColor: 'var(--bg-cream-paper)',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        color: 'var(--text-medium)',
        fontSize: '0.85rem'
      }}>
        <div className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>
          Pastel Sanctuary • Whisper & Ink
        </div>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem' }}>
          Your quiet space for thoughts, memories, and daily reflections. Data stored safely in your browser.
        </p>
      </footer>
    </div>
  );
}
