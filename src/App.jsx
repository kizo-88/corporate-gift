import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsHeader from './components/StatsHeader';
import MusicPlayer from './components/MusicPlayer';
import DiaryForm from './components/DiaryForm';
import EntryList from './components/EntryList';
import EntryViewModal from './components/EntryViewModal';
import LockModal from './components/LockModal';
import HelpModal from './components/HelpModal';

import {
  loadEntries,
  saveEntries,
  loadSavedTheme,
  saveTheme,
  loadSavedPin
} from './utils/storage';

import { Sparkles } from 'lucide-react';

export default function App() {
  const [entries, setEntries] = useState(() => loadEntries());
  const [theme, setTheme] = useState(() => loadSavedTheme());
  const [savedPin, setSavedPinState] = useState(() => loadSavedPin());
  const [isLocked, setIsLocked] = useState(() => Boolean(loadSavedPin()));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingEntry, setViewingEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Save entries to LocalStorage
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  // Apply Theme Attribute to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Dark mode status check
  const isDarkMode = theme === 'midnight-rose';

  const handleToggleDarkMode = () => {
    const nextTheme = isDarkMode ? 'cream-rose' : 'midnight-rose';
    setTheme(nextTheme);
    showToast(nextTheme === 'midnight-rose' ? 'Midnight Dark Mode Activated 🌙' : 'Cream Light Mode Activated ☀️');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSaveEntry = (entryData) => {
    setEntries((prevEntries) => {
      const existingIndex = prevEntries.findIndex(e => e.id === entryData.id);
      if (existingIndex >= 0) {
        const updated = [...prevEntries];
        updated[existingIndex] = entryData;
        return updated;
      } else {
        return [entryData, ...prevEntries];
      }
    });

    setShowFormModal(false);
    setEditingEntry(null);
    showToast('Diary saved safely! 🌸✨');
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this diary entry? This action cannot be undone.')) {
      setEntries(prev => prev.filter(e => e.id !== entryId));
      if (viewingEntry?.id === entryId) setViewingEntry(null);
      showToast('Diary entry deleted 🗑️');
    }
  };

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

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mmorkleyyy_journal_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Diary backup file downloaded! 💾');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Passcode Security Lock Modal */}
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

      {/* Main Top Navigation Bar */}
      <Navbar
        entryCount={entries.length}
        onOpenNewForm={() => {
          setEditingEntry(null);
          setShowFormModal(true);
        }}
        currentTheme={theme}
        onSelectTheme={(t) => setTheme(t)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isLocked={Boolean(savedPin)}
        onToggleLock={() => setShowLockModal(true)}
        onExportData={handleExportData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* Main App Container */}
      <main className="app-container" style={{ flexGrow: 1 }}>
        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="glass-panel animate-pop-in" style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.75rem 1.4rem',
            borderRadius: 'var(--radius-full)',
            borderColor: 'var(--border-tech-glow)',
            boxShadow: 'var(--shadow-tech-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-bright)',
            zIndex: 1000
          }}>
            <Sparkles size={16} color="var(--rose-accent)" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Background Music Player Widget */}
        <div style={{ marginBottom: '1.25rem' }}>
          <MusicPlayer />
        </div>

        {/* Dashboard Telemetry Header */}
        <StatsHeader
          entries={entries}
          onOpenNewForm={() => {
            setEditingEntry(null);
            setShowFormModal(true);
          }}
        />

        {/* Entry List Component */}
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
      </main>

      {/* Form Modal */}
      {showFormModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(20, 14, 23, 0.65)',
          backdropFilter: 'blur(8px)',
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

      {/* Entry Detail View Modal */}
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

      {/* Lock Settings Modal */}
      {showLockModal && (
        <LockModal
          savedPin={savedPin}
          onUnlock={() => setShowLockModal(false)}
          onSetPin={(newPin) => {
            setSavedPinState(newPin);
            setShowLockModal(false);
            showToast(newPin ? 'PIN Keselamatan Aktif 🔒' : 'PIN Keselamatan Dinyahaktif 🔓');
          }}
          onClose={() => setShowLockModal(false)}
        />
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}

      {/* Footer */}
      <footer className="glass-panel" style={{
        borderRadius: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        padding: '1.5rem 1rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <div className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--text-bright)', fontWeight: 800 }}>
          Mmorkleyyy's Little Journal // Diary
        </div>
        <p style={{ margin: '0.25rem 0 0 0', opacity: 0.85 }}>
          Local Database Persistent Storage • User-Friendly Experience
        </p>
      </footer>
    </div>
  );
}
