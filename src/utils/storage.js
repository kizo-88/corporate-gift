// Local Storage Key
const STORAGE_KEY = 'pastel_sanctuary_diary_entries_v1';
const THEME_KEY = 'pastel_sanctuary_theme';
const LOCK_KEY = 'pastel_sanctuary_pin';

// Default Sample Entries for First-Time Users
export const DEFAULT_ENTRIES = [
  {
    id: 'default-entry-1',
    title: 'Morning Matcha & New Beginnings 🍵',
    content: `There is something so peaceful about the quiet morning hours before the world wakes up. Sunbeams trickling through the sheer linen curtains, a warm mug of matcha, and space to just breathe. 

Today's intention: go slow, notice the small details, and speak gently to myself. I want to build a daily habit of jotting down my thoughts here every day.`,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    mood: '🧘 Serene',
    category: 'Reflections',
    color: 'sage',
    sticker: '🌿',
    isPinned: true,
    fontStyle: 'handwriting',
  },
  {
    id: 'default-entry-2',
    title: 'Raindrops on the Windowpane 🌧️',
    content: `It rained all afternoon. I curled up in my cozy nook with a cup of chamomile tea and finally finished reading my favorite book. 

I love the sound of rain tapping soft rhythms against the glass. It makes staying inside feel like a warm hug. Reminded me of childhood afternoons watching water droplets race down the pane.`,
    createdAt: new Date(Date.now() - 86400000 * 1 - 3600000 * 4).toISOString(), // Yesterday
    updatedAt: new Date(Date.now() - 86400000 * 1 - 3600000 * 4).toISOString(),
    mood: '☕ Cozy',
    category: 'Memories',
    color: 'lavender',
    sticker: '📖',
    isPinned: false,
    fontStyle: 'handwriting',
  },
  {
    id: 'default-entry-3',
    title: 'Small Victories & Golden Sunset 🌅',
    content: `Crossed off three main tasks on my goal list today! Took a 30-minute golden hour walk in the nearby park and saw the most vibrant pastel pink & lavender sky. 

Note to self: Celebrate the quiet daily progress instead of waiting for giant milestones. Every step forward counts.`,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    mood: '💖 Grateful',
    category: 'Gratitude',
    color: 'rose',
    sticker: '✨',
    isPinned: false,
    fontStyle: 'handwriting',
  }
];

// Daily Writing Prompts for Inspiration
export const WRITING_PROMPTS = [
  "What made you smile or feel at peace today?",
  "Describe a quiet moment that brought you joy recently.",
  "What is one thing you're looking forward to this week?",
  "What is a lesson you learned or a mistake that taught you something valueable?",
  "If today had a color or song, what would it be and why?",
  "List 3 simple things you are genuinely grateful for right now.",
  "What does your ideal peaceful morning look like?"
];

// Categories & Colors Available
export const CATEGORIES = [
  { id: 'Personal', label: 'Personal', color: 'rose', icon: '🌸' },
  { id: 'Reflections', label: 'Reflections', color: 'sage', icon: '🌿' },
  { id: 'Gratitude', label: 'Gratitude', color: 'butter', icon: '💖' },
  { id: 'Memories', label: 'Memories', color: 'lavender', icon: '📖' },
  { id: 'Ideas', label: 'Ideas & Dreams', color: 'mint', icon: '💡' },
  { id: 'Travel', label: 'Travel & Walks', color: 'sky', icon: '✈️' }
];

// Mood Options
export const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '🧘', label: 'Serene' },
  { emoji: '💖', label: 'Grateful' },
  { emoji: '☕', label: 'Cozy' },
  { emoji: '💭', label: 'Thoughtful' },
  { emoji: '⚡', label: 'Inspired' },
  { emoji: '🌧️', label: 'Somber' }
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
    console.error('Error loading diary entries from localStorage:', error);
    return DEFAULT_ENTRIES;
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving diary entries to localStorage:', error);
  }
}

// Theme storage
export function loadSavedTheme() {
  return localStorage.getItem(THEME_KEY) || 'cream';
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
  
  // Format options: "Thursday, Aug 13, 2026 • 9:38 AM"
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDayYear = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return `${dayName}, ${monthDayYear} • ${timeStr}`;
}

export function formatShortDate(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRelativeTime(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Calculate Word & Character Count
export function getStats(text = '') {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
  return { words, chars, readTimeMinutes };
}
