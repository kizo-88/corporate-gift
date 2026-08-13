// Local Storage Key
const STORAGE_KEY = 'cipherlog_os_diary_entries_v2';
const THEME_KEY = 'cipherlog_os_theme';
const LOCK_KEY = 'cipherlog_os_pin';

// High-Tech Default Sample Entries
export const DEFAULT_ENTRIES = [
  {
    id: 'tech-entry-1',
    title: 'Quantum Coffee & Morning Neural Sync ⚡',
    content: `System status nominal. Started the morning session with black espresso and zero digital distractions. 

Today's core protocols:
1. Deep work block on project architecture.
2. Maintain high energy flow & focus integrity.
3. Review evening retrospective log.

Remember: Consistency beats intensity. Keep building step by step.`,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    mood: '⚡ Focused',
    category: 'Protocols',
    color: 'cyan',
    sticker: '⚡',
    isPinned: true,
  },
  {
    id: 'tech-entry-2',
    title: 'Late Night Code & Cyber Solitude 🌌',
    content: `There is immense clarity in late night sessions when ambient noise drops to zero. 

Calibrated the upcoming project roadmap and organized key thoughts into structured modules. Progress is steady, and local database sync is running smooth.`,
    createdAt: new Date(Date.now() - 86400000 * 1 - 3600000 * 4).toISOString(), // Yesterday
    updatedAt: new Date(Date.now() - 86400000 * 1 - 3600000 * 4).toISOString(),
    mood: '🧠 Analytical',
    category: 'Brain Dumps',
    color: 'purple',
    sticker: '🧠',
    isPinned: false,
  },
  {
    id: 'tech-entry-3',
    title: 'Daily Retrospective & Milestone Log 🛡️',
    content: `Achieved 3 major milestone tasks ahead of schedule today! 

Took a 30-minute evening walk under neon city lights to clear my mind. Balance between high-speed execution and quiet recovery is essential for long-term momentum.`,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    mood: '🛡️ Secure',
    category: 'Personal Logs',
    color: 'emerald',
    sticker: '🛡️',
    isPinned: false,
  }
];

// Tech Writing Prompts
export const WRITING_PROMPTS = [
  "System Audit: What was your biggest technical or personal win today?",
  "Brain Dump: What complex problem is currently on your mind?",
  "Protocol Check: What is one habit or workflow you want to optimize tomorrow?",
  "Data Log: What inspired or energized you during today's work?",
  "Retrospective: What mistake did you make today, and what is the patch/fix?",
  "Future Vision: Where do you see your goals 90 days from now?"
];

// Tech Categories
export const CATEGORIES = [
  { id: 'Protocols', label: 'Protocols', color: 'cyan', icon: '⚡' },
  { id: 'Brain Dumps', label: 'Brain Dumps', color: 'purple', icon: '🧠' },
  { id: 'Personal Logs', label: 'Personal Logs', color: 'emerald', icon: '🛡️' },
  { id: 'Ideas & Ops', label: 'Ideas & Ops', color: 'amber', icon: '🚀' },
  { id: 'Cosmos', label: 'Cosmos & Dreams', color: 'pink', icon: '🌌' },
  { id: 'Reflections', label: 'Reflections', color: 'cyan', icon: '🔮' }
];

// Tech Mood Options
export const MOODS = [
  { emoji: '⚡', label: 'Focused' },
  { emoji: '🧠', label: 'Analytical' },
  { emoji: '🛡️', label: 'Secure' },
  { emoji: '🚀', label: 'Inspired' },
  { emoji: '🧘', label: 'Calm' },
  { emoji: '☕', label: 'Energized' }
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
  return localStorage.getItem(THEME_KEY) || 'obsidian';
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
  
  // High-Tech Format: "2026-08-13 • 09:38:12 AM [UTC+8]"
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
