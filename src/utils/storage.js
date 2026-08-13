// Local Storage Key
const STORAGE_KEY = 'mmorkleyyy_journal_entries_v4';
const THEME_KEY = 'mmorkleyyy_journal_theme';
const LOCK_KEY = 'mmorkleyyy_journal_pin';

// Default Sample Entries
export const DEFAULT_ENTRIES = [
  {
    id: 'entry-1',
    title: 'Morning Coffee & Peaceful Thoughts',
    content: `There is something so peaceful about quiet morning hours. Enjoyed a warm cup of coffee by the window while watching the soft morning sunlight.

Today's goals:
1. Go slow and focus on deep, meaningful work.
2. Spend time outdoors for a 20-minute afternoon walk.
3. Remember to celebrate small daily progress!`,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    mood: 'Happy',
    category: 'Personal',
    color: 'rose',
    sticker: '🌸',
    isPinned: true,
  },
  {
    id: 'entry-2',
    title: 'Quiet Reflections & Books',
    content: `Spent the evening reading by warm candlelight and organizing my thoughts for the upcoming week. Gratitude is the key to inner peace.`,
    createdAt: new Date(Date.now() - 86400000 * 1 - 3600000 * 4).toISOString(), // Yesterday
    updatedAt: new Date(Date.now() - 86400000 * 1 - 3600000 * 4).toISOString(),
    mood: 'Reflective',
    category: 'Reflections',
    color: 'lavender',
    sticker: '📖',
    isPinned: false,
  },
  {
    id: 'entry-3',
    title: 'Growth & Daily Progress',
    content: `Achieved key milestones today! Remembering that balance between hard work and quiet recovery is essential for long-term happiness.`,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    mood: 'Motivated',
    category: 'Growth',
    color: 'emerald',
    sticker: '🌱',
    isPinned: false,
  }
];

// Writing Prompts
export const WRITING_PROMPTS = [
  "What made you smile or feel at peace today?",
  "List 3 simple things you are genuinely grateful for right now.",
  "What is one goal or dream you are working towards this week?",
  "Describe a quiet moment that brought you joy recently.",
  "What is a lesson you learned today that will help you grow tomorrow?"
];

// Clean Categories (No Emojis)
export const CATEGORIES = [
  { id: 'Personal', label: 'Personal', color: 'rose' },
  { id: 'Reflections', label: 'Reflections', color: 'lavender' },
  { id: 'Gratitude', label: 'Gratitude', color: 'amber' },
  { id: 'Growth', label: 'Growth', color: 'emerald' },
  { id: 'Work & Career', label: 'Work & Career', color: 'cyan' },
  { id: 'Relationships', label: 'Relationships', color: 'pink' },
  { id: 'Travel & Memories', label: 'Travel & Memories', color: 'sky' },
  { id: 'Goals & Dreams', label: 'Goals & Dreams', color: 'purple' }
];

// Clean Moods (No Emojis)
export const MOODS = [
  { label: 'Happy' },
  { label: 'Calm' },
  { label: 'Grateful' },
  { label: 'Sad' },
  { label: 'Frustrated' },
  { label: 'Tired' },
  { label: 'Reflective' },
  { label: 'Motivated' },
  { label: 'Anxious' },
  { label: 'Peaceful' }
];

// Storage Helpers
export function loadEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENTRIES));
      return DEFAULT_ENTRIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading entries from localStorage:', error);
    return DEFAULT_ENTRIES;
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries to localStorage:', error);
  }
}

// Theme storage
export function loadSavedTheme() {
  return localStorage.getItem(THEME_KEY) || 'cream-rose';
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

// PIN Lock helpers
export function loadSavedPin() {
  return localStorage.getItem(LOCK_KEY) || '';
}

export function savePin(pin) {
  if (!pin) {
    localStorage.removeItem(LOCK_KEY);
  } else {
    localStorage.setItem(LOCK_KEY, pin);
  }
}

// Automatic Date Formatting Helper
export function formatDateStamp(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  
  const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return `${dateStr} // ${timeStr}`;
}

export function formatRelativeTime(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'NOW';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return 'TODAY';
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

// Calculate Word & Character Count
export function getStats(text = '') {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
  return { words, chars, readTimeMinutes };
}
