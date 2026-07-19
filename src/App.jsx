import React, { useState, useEffect, useCallback } from 'react';

// Components
import Window from './components/Window';
import LockScreen from './components/LockScreen';

// Apps
import Finder from './apps/Finder';
import Safari from './apps/Safari';
import Terminal from './apps/Terminal';
import Notes from './apps/Notes';
import SystemSettings from './apps/SystemSettings';
import Music from './apps/Music';
import Calculator from './apps/Calculator';
import Maps from './apps/Maps';
import Photos from './apps/Photos';
import Calendar from './apps/Calendar';
import AppStore from './apps/AppStore';
import Messages from './apps/Messages';
import Mail from './apps/Mail';
import FaceTime from './apps/FaceTime';
import Contacts from './apps/Contacts';
import Podcasts from './apps/Podcasts';
import AppleTV from './apps/AppleTV';
import News from './apps/News';
import Pages from './apps/Pages';
import Keynote from './apps/Keynote';
import Numbers from './apps/Numbers';
import Reminders from './apps/Reminders';

const wallpaperMap = {
  'clear-lake': "url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2070')",
  'sunset': "url('https://images.unsplash.com/photo-1472214222555-d4aea475c4b5?q=80&w=2070')",
  'forest': "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070')",
  'night': "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2070')",
  'mountain': "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070')",
  'desert': "url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070')"
};

const menuDropdowns = {
  file: [
    { label: 'New Window', shortcut: '⌘N' },
    { label: 'New Folder', shortcut: '⇧⌘N' },
    { label: 'Open', shortcut: '⌘O' },
    { label: 'Close Window', shortcut: '⌘W', action: 'closeActive' },
    { type: 'separator' },
    { label: 'Get Info', shortcut: '⌘I' },
    { label: 'Rename...', shortcut: '⏎' }
  ],
  edit: [
    { label: 'Undo', shortcut: '⌘Z' },
    { label: 'Redo', shortcut: '⇧⌘Z' },
    { type: 'separator' },
    { label: 'Cut', shortcut: '⌘X' },
    { label: 'Copy', shortcut: '⌘C' },
    { label: 'Paste', shortcut: '⌘V' },
    { label: 'Select All', shortcut: '⌘A' }
  ],
  view: [
    { label: 'As Icons', shortcut: '⌘1' },
    { label: 'As List', shortcut: '⌘2' },
    { label: 'As Columns', shortcut: '⌘3' },
    { type: 'separator' },
    { label: 'Clean Up' },
    { type: 'separator' },
    { label: 'Hide Sidebar', shortcut: '⌃⌘S' },
    { label: 'Enter Full Screen', shortcut: '🌐F' }
  ],
  go: [
    { label: 'Back', shortcut: '⌘[' },
    { label: 'Forward', shortcut: '⌘]' },
    { label: 'Enclosing Folder', shortcut: '⌘↑' },
    { type: 'separator' },
    { label: 'Applications', shortcut: '⇧⌘A' },
    { label: 'Documents', shortcut: '⇧⌘O' },
    { label: 'Downloads', shortcut: '⌥⌘L' }
  ],
  window: [
    { label: 'Minimize', shortcut: '⌘M', action: 'minimizeActive' },
    { label: 'Zoom', action: 'maximizeActive' },
    { type: 'separator' },
    { label: 'Bring All to Front' }
  ],
  help: [
    { label: 'Search' },
    { label: 'macOS Help' }
  ]
};

export default function App() {
  const [locked, setLocked] = useState(true);
  const [theme, setTheme] = useState('light');
  const [wallpaper, setWallpaper] = useState('clear-lake');
  const [blurAmount, setBlurAmount] = useState(25);
  const [dockMagnify, setDockMagnify] = useState(true);

  // Time
  const [timeStr, setTimeStr] = useState('');

  // Menu / Control Center / Spotlight states
  const [activeMenuDropdown, setActiveMenuDropdown] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [dndEnabled, setDndEnabled] = useState(false);

  // Todos for widget
  const [todos, setTodos] = useState([
    { id: 1, text: 'Send brand review fe...', done: false },
    { id: 2, text: 'Review PR #142 — g...', done: false },
    { id: 3, text: 'Pick up dry cleaning', done: false }
  ]);

  // Window states
  const [windows, setWindows] = useState({
    finder: { title: 'Finder', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
    safari: { title: 'Safari', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    terminal: { title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    notes: { title: 'Notes', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    music: { title: 'Music', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    calculator: { title: 'Calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    maps: { title: 'Maps', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    photos: { title: 'Photos', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    calendar: { title: 'Calendar', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    appstore: { title: 'App Store', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    settings: { title: 'System Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    messages: { title: 'Messages', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    mail: { title: 'Mail', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    facetime: { title: 'FaceTime', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    contacts: { title: 'Contacts', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    podcasts: { title: 'Podcasts', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    appletv: { title: 'Apple TV', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    news: { title: 'News', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    pages: { title: 'Pages', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    keynote: { title: 'Keynote', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    numbers: { title: 'Numbers', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    reminders: { title: 'Reminders', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 }
  });

  const [topWindowId, setTopWindowId] = useState('finder');
  const [maxZIndex, setMaxZIndex] = useState(10);

  // Update time
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      setTimeStr(`${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}  ${h % 12 || 12}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  // Apply theme to html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen to terminal theme switches
  useEffect(() => {
    const handler = (e) => setTheme(e.detail);
    window.addEventListener('change-theme', handler);
    return () => window.removeEventListener('change-theme', handler);
  }, []);

  // Close menu dropdowns on click outside
  useEffect(() => {
    if (!activeMenuDropdown) return;
    const handler = () => setActiveMenuDropdown(null);
    setTimeout(() => document.addEventListener('click', handler), 0);
    return () => document.removeEventListener('click', handler);
  }, [activeMenuDropdown]);

  // Spotlight search keyboard shortcut (Cmd+Space / Ctrl+Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setShowSpotlight(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const focusWindow = useCallback((id) => {
    setMaxZIndex(prev => {
      const nextZ = prev + 1;
      setTopWindowId(id);
      setWindows(w => ({
        ...w,
        [id]: { ...w[id], isOpen: true, isMinimized: false, zIndex: nextZ }
      }));
      return nextZ;
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows(prev => {
      const updated = { ...prev, [id]: { ...prev[id], isOpen: false } };
      const remaining = Object.entries(updated)
        .filter(([, w]) => w.isOpen)
        .sort((a, b) => b[1].zIndex - a[1].zIndex);
      setTopWindowId(remaining.length > 0 ? remaining[0][0] : null);
      return updated;
    });
  }, []);

  const toggleMinimize = useCallback((id) => {
    setWindows(prev => {
      const nextMin = !prev[id].isMinimized;
      if (!nextMin) focusWindow(id);
      return { ...prev, [id]: { ...prev[id], isMinimized: nextMin } };
    });
  }, [focusWindow]);

  const toggleMaximize = useCallback((id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
    focusWindow(id);
  }, [focusWindow]);

  const launchApp = useCallback((id) => focusWindow(id), [focusWindow]);

  const handleTodoToggle = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Get the active app name for menu bar
  const activeAppName = topWindowId ? windows[topWindowId]?.title || 'Finder' : 'Finder';

  // Determine which menus to show based on active app
  const getMenuItems = () => {
    if (activeAppName === 'Safari') return ['History', 'Bookmarks', 'File', 'Edit', 'View', 'Window', 'Help'];
    if (activeAppName === 'Notes') return ['Note', 'Format', 'File', 'Edit', 'View', 'Window', 'Help'];
    if (activeAppName === 'System Settings') return ['Panes', 'File', 'Edit', 'View', 'Window', 'Help'];
    return ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];
  };

  // ── Dock App Definitions ──
  const dockApps = [
    { id: 'finder', name: 'Finder', badge: 0, bg: '#3b82f6', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#1C8CFF"/>
        <rect x="0" y="0" width="60" height="120" rx="26" fill="#6CB4FF"/>
        <path d="M60 35C60 35 75 45 82 45C89 45 100 35 100 35" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M20 35C20 35 35 45 42 45C49 45 60 35 60 35" stroke="#0050B5" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <line x1="60" y1="42" x2="60" y2="72" stroke="#0050B5" strokeWidth="8" strokeLinecap="round"/>
        <path d="M42 85C42 85 52 95 60 95C68 95 78 85 78 85" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none"/>
      </svg>
    )},
    { id: 'launchpad', name: 'Launchpad', badge: 0, bg: '#1e293b', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#1E293B"/>
        {[0,1,2,3].map(r => [0,1,2,3].map(c => (
          <circle key={`${r}${c}`} cx={24+c*25} cy={24+r*25} r={8} fill={
            ['#FF5F57','#FEBC2E','#28C840','#3B82F6','#A855F7','#EC4899','#F97316','#10B981',
             '#06B6D4','#6366F1','#D946EF','#F43F5E','#84CC16','#EAB308','#14B8A6','#8B5CF6'][r*4+c]
          } />
        )))}
      </svg>
    )},
    'divider',
    { id: 'safari', name: 'Safari', badge: 0, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#fff"/>
        <circle cx="60" cy="60" r="44" fill="#058CFF"/>
        <circle cx="60" cy="60" r="40" fill="none" stroke="white" strokeWidth="3"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const r1 = 38, r2 = i%3===0 ? 32 : 35;
          const rad = a * Math.PI/180;
          return <line key={a} x1={60+Math.sin(rad)*r2} y1={60-Math.cos(rad)*r2} x2={60+Math.sin(rad)*r1} y2={60-Math.cos(rad)*r1} stroke="white" strokeWidth={i%3===0?"2":"1"} opacity="0.8"/>;
        })}
        <polygon points="60,28 68,60 60,92 52,60" fill="white" opacity="0.9"/>
        <polygon points="60,28 68,60 92,52" fill="#FF3B30"/>
        <polygon points="60,92 52,60 28,68" fill="#FF3B30"/>
        <circle cx="60" cy="60" r="3" fill="white"/>
      </svg>
    )},
    { id: 'messages', name: 'Messages', badge: 2, bg: '#34C759', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#34C759"/>
        <path d="M60 30C38 30 20 44 20 62C20 72 26 80 35 86L30 98L48 90C52 91.5 56 92 60 92C82 92 100 78 100 62C100 44 82 30 60 30Z" fill="white"/>
      </svg>
    )},
    { id: 'mail', name: 'Mail', badge: 4, bg: '#007AFF', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#007AFF"/>
        <rect x="18" y="32" width="84" height="56" rx="8" fill="white"/>
        <path d="M18 40L60 68L102 40" stroke="#007AFF" strokeWidth="5" strokeLinejoin="round" fill="none"/>
      </svg>
    )},
    { id: 'maps', name: 'Maps', badge: 0, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#5AC8FA"/>
        <path d="M20 35L45 25L75 40L100 28V95L75 105L45 90L20 100V35Z" fill="#4CD964" stroke="white" strokeWidth="2"/>
        <circle cx="60" cy="55" r="12" fill="#FF3B30"/>
        <circle cx="60" cy="55" r="5" fill="white"/>
      </svg>
    )},
    { id: 'photos', name: 'Photos', badge: 0, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#fff"/>
        <circle cx="60" cy="38" r="22" fill="#FF9500" opacity="0.85"/>
        <circle cx="82" cy="60" r="22" fill="#FF2D55" opacity="0.85"/>
        <circle cx="60" cy="82" r="22" fill="#5AC8FA" opacity="0.85"/>
        <circle cx="38" cy="60" r="22" fill="#4CD964" opacity="0.85"/>
        <circle cx="71" cy="49" r="22" fill="#FFCC00" opacity="0.65"/>
        <circle cx="71" cy="71" r="22" fill="#AF52DE" opacity="0.65"/>
        <circle cx="49" cy="71" r="22" fill="#30B0C7" opacity="0.65"/>
        <circle cx="49" cy="49" r="22" fill="#FF9F0A" opacity="0.65"/>
      </svg>
    )},
    { id: 'facetime', name: 'FaceTime', badge: 0, bg: '#34C759', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#34C759"/>
        <rect x="18" y="35" width="55" height="50" rx="10" fill="white"/>
        <path d="M80 48L102 35V85L80 72V48Z" fill="white"/>
      </svg>
    )},
    { id: 'calendar', name: 'Calendar', badge: 0, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#fff"/>
        <rect x="10" y="10" width="100" height="28" rx="8" fill="#FF3B30"/>
        <text x="60" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="700">JULY</text>
        <text x="60" y="82" textAnchor="middle" fill="#1E293B" fontSize="52" fontWeight="200">18</text>
      </svg>
    )},
    'divider',
    { id: 'contacts', name: 'Contacts', badge: 0, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#8E8E93"/>
        <circle cx="60" cy="45" r="18" fill="white"/>
        <path d="M30 100C30 80 42 68 60 68C78 68 90 80 90 100" fill="white"/>
      </svg>
    )},
    { id: 'reminders', name: 'Reminders', badge: 3, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#fff"/>
        <circle cx="35" cy="40" r="8" fill="#FF3B30"/>
        <rect x="52" y="35" width="40" height="10" rx="5" fill="#C7C7CC"/>
        <circle cx="35" cy="65" r="8" fill="#007AFF"/>
        <rect x="52" y="60" width="40" height="10" rx="5" fill="#C7C7CC"/>
        <circle cx="35" cy="90" r="8" fill="#FFCC00"/>
        <rect x="52" y="85" width="40" height="10" rx="5" fill="#C7C7CC"/>
      </svg>
    )},
    { id: 'notes', name: 'Notes', badge: 0, bg: '#FFCC00', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#FFCC00"/>
        <rect x="22" y="20" width="76" height="85" rx="6" fill="white"/>
        <line x1="32" y1="42" x2="88" y2="42" stroke="#FFCC00" strokeWidth="3"/>
        <line x1="32" y1="55" x2="88" y2="55" stroke="#E5E5EA" strokeWidth="2"/>
        <line x1="32" y1="68" x2="88" y2="68" stroke="#E5E5EA" strokeWidth="2"/>
        <line x1="32" y1="81" x2="68" y2="81" stroke="#E5E5EA" strokeWidth="2"/>
      </svg>
    )},
    { id: 'calculator', name: 'Calculator', badge: 0, bg: '#1C1C1E', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#1C1C1E"/>
        <rect x="15" y="15" width="90" height="28" rx="8" fill="#505050"/>
        <text x="95" y="35" textAnchor="end" fill="white" fontSize="22" fontWeight="300">1,024</text>
        {[0,1,2].map(r => [0,1,2,3].map(c => (
          <rect key={`${r}${c}`} x={15+c*24} y={52+r*22} width={20} height={18} rx={5}
            fill={c===3?'#FF9F0A':r===0&&c<3?'#636366':'#505050'}/>
        )))}
      </svg>
    )},
    { id: 'music', name: 'Music', badge: 0, bg: '#FA2D55', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="url(#musicGrad)"/>
        <defs><linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FC5C7D"/><stop offset="100%" stopColor="#6A82FB"/>
        </linearGradient></defs>
        <circle cx="45" cy="78" r="14" fill="none" stroke="white" strokeWidth="4"/>
        <line x1="59" y1="78" x2="59" y2="30" stroke="white" strokeWidth="5" strokeLinecap="round"/>
        <path d="M59 30C59 30 75 25 82 28C89 31 85 40 80 38" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/>
      </svg>
    )},
    { id: 'podcasts', name: 'Podcasts', badge: 0, bg: '#A855F7', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#8B5CF6"/>
        <path d="M60 25C40 25 25 40 25 55C25 65 30 73 38 78L55 105H65L82 78C90 73 95 65 95 55C95 40 80 25 60 25Z" fill="white"/>
        <circle cx="60" cy="55" r="14" fill="#8B5CF6"/>
        <rect x="55" y="68" width="10" height="20" rx="5" fill="#8B5CF6"/>
      </svg>
    )},
    { id: 'appletv', name: 'Apple TV', badge: 0, bg: '#1C1C1E', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#1C1C1E"/>
        <text x="60" y="70" textAnchor="middle" fill="white" fontSize="36" fontWeight="700">tv</text>
      </svg>
    )},
    { id: 'news', name: 'News', badge: 0, bg: '#fff', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#fff"/>
        <text x="60" y="82" textAnchor="middle" fill="#FF3B30" fontSize="68" fontWeight="900">N</text>
      </svg>
    )},
    { id: 'appstore', name: 'App Store', badge: 4, bg: '#007AFF', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#007AFF"/>
        <path d="M42 88L60 40L78 88" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="46" y1="75" x2="74" y2="75" stroke="white" strokeWidth="8" strokeLinecap="round"/>
        <line x1="30" y1="88" x2="48" y2="88" stroke="white" strokeWidth="8" strokeLinecap="round"/>
        <line x1="72" y1="88" x2="90" y2="88" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    )},
    'divider',
    { id: 'settings', name: 'System Settings', badge: 0, bg: '#8E8E93', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#8E8E93"/>
        <circle cx="60" cy="60" r="22" fill="none" stroke="white" strokeWidth="6"/>
        <circle cx="60" cy="60" r="10" fill="white"/>
        {[0,45,90,135,180,225,270,315].map(a => {
          const rad = a*Math.PI/180;
          return <line key={a} x1={60+Math.sin(rad)*26} y1={60-Math.cos(rad)*26} x2={60+Math.sin(rad)*34} y2={60-Math.cos(rad)*34} stroke="white" strokeWidth="8" strokeLinecap="round"/>;
        })}
      </svg>
    )},
    { id: 'pages', name: 'Pages', badge: 0, bg: '#FF9500', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#FF9500"/>
        <rect x="30" y="22" width="60" height="76" rx="6" fill="white"/>
        <path d="M50 55L58 45L66 58L74 50" stroke="#FF9500" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="60" cy="80" r="4" fill="#FF9500"/>
      </svg>
    )},
    { id: 'keynote', name: 'Keynote', badge: 0, bg: '#007AFF', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#007AFF"/>
        <rect x="22" y="28" width="76" height="50" rx="5" fill="#1C1C1E"/>
        <rect x="26" y="32" width="68" height="42" rx="3" fill="#005EC4"/>
        <line x1="40" y1="78" x2="32" y2="95" stroke="white" strokeWidth="4"/>
        <line x1="80" y1="78" x2="88" y2="95" stroke="white" strokeWidth="4"/>
        <line x1="32" y1="95" x2="88" y2="95" stroke="white" strokeWidth="4"/>
      </svg>
    )},
    { id: 'numbers', name: 'Numbers', badge: 0, bg: '#34C759', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#34C759"/>
        <rect x="22" y="28" width="76" height="64" rx="6" fill="white"/>
        <line x1="52" y1="28" x2="52" y2="92" stroke="#34C759" strokeWidth="2"/>
        <line x1="75" y1="28" x2="75" y2="92" stroke="#34C759" strokeWidth="2"/>
        <line x1="22" y1="50" x2="98" y2="50" stroke="#34C759" strokeWidth="2"/>
        <line x1="22" y1="71" x2="98" y2="71" stroke="#34C759" strokeWidth="2"/>
        <rect x="53" y="51" width="21" height="19" fill="#34C759" opacity="0.15"/>
      </svg>
    )},
    { id: 'terminal', name: 'Terminal', badge: 0, bg: '#1C1C1E', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="26" fill="#1C1C1E"/>
        <path d="M32 40L55 60L32 80" stroke="#4CD964" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="60" y1="80" x2="88" y2="80" stroke="#4CD964" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    )}
  ];

  // Flatten to get only apps (not dividers)
  const appsList = dockApps.filter(a => a !== 'divider');

  // ── App Content Mapping ──
  const getAppContent = (winId) => {
    switch(winId) {
      case 'safari': return <Safari />;
      case 'terminal': return <Terminal />;
      case 'notes': return <Notes />;
      case 'music': return <Music />;
      case 'calculator': return <Calculator />;
      case 'maps': return <Maps />;
      case 'photos': return <Photos />;
      case 'calendar': return <Calendar />;
      case 'appstore': return <AppStore />;
      case 'messages': return <Messages />;
      case 'mail': return <Mail />;
      case 'facetime': return <FaceTime />;
      case 'contacts': return <Contacts />;
      case 'podcasts': return <Podcasts />;
      case 'appletv': return <AppleTV />;
      case 'news': return <News />;
      case 'pages': return <Pages />;
      case 'numbers': return <Numbers />;
      case 'reminders': return <Reminders />;
      case 'settings': return (
        <SystemSettings
          activeWallpaper={wallpaper}
          onWallpaperChange={(wp, th) => { setWallpaper(wp); setTheme(th); }}
          blurAmount={blurAmount}
          onBlurChange={setBlurAmount}
          dockMagnify={dockMagnify}
          onDockMagnifyToggle={setDockMagnify}
        />
      );
      default: return null;
    }
  };

  // Lock screen handler
  const handleLockScreen = () => {
    setLocked(true);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background Wallpaper */}
      <div
        className="wallpaper-container"
        style={{
          backgroundImage: wallpaperMap[wallpaper] || wallpaperMap['clear-lake'],
          backgroundColor: '#0EA5E9',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `brightness(${brightness / 100})`,
          transition: 'background-image .3s ease'
        }}
      />

      {/* ══ Menu Bar ══ */}
      <div className="menu-bar">
        <div className="menu-bar-left">
          {/* Apple Menu */}
          <div style={{ position: 'relative' }}>
            <span
              className="menu-item"
              onClick={(e) => { e.stopPropagation(); setActiveMenuDropdown(activeMenuDropdown === 'apple' ? null : 'apple'); }}
              style={{ fontWeight: 800, fontSize: '16px', lineHeight: '21px' }}
            >
              
            </span>
            {activeMenuDropdown === 'apple' && (
              <div className="apple-menu-dropdown glass-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-dropdown-item" onClick={() => { setActiveMenuDropdown(null); }}>About This Mac</div>
                <div className="menu-separator" />
                <div className="menu-dropdown-item" onClick={() => { setActiveMenuDropdown(null); launchApp('settings'); }}>System Settings...</div>
                <div className="menu-dropdown-item" onClick={() => { setActiveMenuDropdown(null); launchApp('appstore'); }}>App Store...</div>
                <div className="menu-dropdown-item">
                  Recent Items
                  <span className="shortcut">▸</span>
                </div>
                <div className="menu-separator" />
                <div className="menu-dropdown-item">
                  Force Quit...
                  <span className="shortcut">⌥⌘⎋</span>
                </div>
                <div className="menu-separator" />
                <div className="menu-dropdown-item">Sleep</div>
                <div className="menu-dropdown-item">Restart...</div>
                <div className="menu-dropdown-item">Shut Down...</div>
                <div className="menu-separator" />
                <div className="menu-dropdown-item" onClick={() => { setActiveMenuDropdown(null); handleLockScreen(); }}>
                  Lock Screen
                  <span className="shortcut">⌃⌘Q</span>
                </div>
                <div className="menu-dropdown-item" onClick={() => { setActiveMenuDropdown(null); handleLockScreen(); }}>
                  Log Out kimi...
                  <span className="shortcut">⇧⌘Q</span>
                </div>
              </div>
            )}
          </div>

          <span className="menu-item" style={{ fontWeight: 700 }}>{activeAppName}</span>

          {/* Dynamic App Menus */}
          {getMenuItems().map(item => {
            const itemLower = item.toLowerCase();
            return (
              <div key={item} style={{ position: 'relative' }}>
                <span
                  className="menu-item"
                  onClick={(e) => { e.stopPropagation(); setActiveMenuDropdown(activeMenuDropdown === itemLower ? null : itemLower); }}
                >
                  {item}
                </span>
                {activeMenuDropdown === itemLower && (
                  <div className="apple-menu-dropdown glass-menu" style={{ position: 'absolute', top: '22px', left: '0', zIndex: 1000, minWidth: '180px' }} onClick={e => e.stopPropagation()}>
                    {menuDropdowns[itemLower]?.map((dropdownItem, di) => {
                      if (dropdownItem.type === 'separator') {
                        return <div key={di} className="menu-separator" />;
                      }
                      return (
                        <div
                          key={di}
                          className="menu-dropdown-item"
                          onClick={() => {
                            setActiveMenuDropdown(null);
                            if (dropdownItem.action === 'closeActive' && topWindowId) closeWindow(topWindowId);
                            if (dropdownItem.action === 'minimizeActive' && topWindowId) toggleMinimize(topWindowId);
                            if (dropdownItem.action === 'maximizeActive' && topWindowId) toggleMaximize(topWindowId);
                          }}
                        >
                          {dropdownItem.label}
                          {dropdownItem.shortcut && <span className="shortcut">{dropdownItem.shortcut}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="menu-bar-right" style={{ gap: '6px' }}>
          {/* Wi-Fi icon */}
          <div style={{ position: 'relative' }}>
            <span
              className="menu-item"
              style={{ padding: '2px 4px' }}
              onClick={(e) => { e.stopPropagation(); setActiveMenuDropdown(activeMenuDropdown === 'wifi' ? null : 'wifi'); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={wifiEnabled ? 'white' : 'rgba(255,255,255,.4)'} strokeWidth="2.5" strokeLinecap="round" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,.3))'}}>
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <circle cx="12" cy="20" r="1" fill={wifiEnabled ? 'white' : 'rgba(255,255,255,.4)'}/>
              </svg>
            </span>
            {activeMenuDropdown === 'wifi' && (
              <div className="apple-menu-dropdown glass-menu" style={{ position: 'absolute', top: '22px', right: '0', zIndex: 1000, minWidth: '220px', padding: '10px' }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>Wi-Fi</span>
                  <div
                    onClick={() => setWifiEnabled(!wifiEnabled)}
                    style={{
                      width: '36px', height: '20px', borderRadius: '10px',
                      background: wifiEnabled ? 'var(--accent)' : 'rgba(255,255,255,.2)',
                      cursor: 'pointer', position: 'relative', transition: 'background .2s'
                    }}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: 'white', position: 'absolute', top: '2px',
                      left: wifiEnabled ? '18px' : '2px',
                      transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)'
                    }} />
                  </div>
                </div>
                {wifiEnabled ? (
                  <>
                    <div className="menu-separator" />
                    <div className="menu-dropdown-item" style={{ color: 'var(--accent)', fontWeight: 600 }}>✓ HomeNet_5G</div>
                    <div className="menu-dropdown-item">Office_WiFi</div>
                    <div className="menu-dropdown-item">Airport_Free</div>
                  </>
                ) : (
                  <div style={{ fontSize: '11px', color: 'var(--label-2)', textAlign: 'center', padding: '6px 0' }}>Off</div>
                )}
              </div>
            )}
          </div>

          {/* Display icon */}
          <div style={{ position: 'relative' }}>
            <span
              className="menu-item"
              style={{ padding: '2px 4px' }}
              onClick={(e) => { e.stopPropagation(); setActiveMenuDropdown(activeMenuDropdown === 'display' ? null : 'display'); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,.3))'}}>
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </span>
            {activeMenuDropdown === 'display' && (
              <div className="apple-menu-dropdown glass-menu" style={{ position: 'absolute', top: '22px', right: '0', zIndex: 1000, minWidth: '200px', padding: '12px' }} onClick={e => e.stopPropagation()}>
                <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>Brightness</div>
                <input
                  type="range" min="10" max="100" value={brightness}
                  onChange={e => setBrightness(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
              </div>
            )}
          </div>

          {/* Siri / colored circle */}
          <span className="menu-item" style={{ padding: '2px 4px' }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: 'conic-gradient(#FF3B30, #FF9500, #FFCC00, #34C759, #007AFF, #AF52DE, #FF3B30)',
              boxShadow: '0 0 6px rgba(0,0,0,.3)'
            }} />
          </span>

          {/* Search / Spotlight */}
          <span
            className="menu-item"
            style={{ padding: '2px 4px' }}
            onClick={(e) => { e.stopPropagation(); setShowSpotlight(!showSpotlight); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,.3))'}}>
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>

          {/* Control Center */}
          <div style={{ position: 'relative' }}>
            <span
              className="menu-item"
              style={{ padding: '2px 4px' }}
              onClick={(e) => { e.stopPropagation(); setActiveMenuDropdown(activeMenuDropdown === 'cc' ? null : 'cc'); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,.3))'}}>
                <line x1="4" y1="6" x2="4" y2="18"/>
                <line x1="12" y1="6" x2="12" y2="18"/>
                <circle cx="4" cy="10" r="2.5" fill="white"/>
                <circle cx="12" cy="14" r="2.5" fill="white"/>
              </svg>
            </span>
            {activeMenuDropdown === 'cc' && (
              <div className="glass-panel" style={{
                position: 'absolute', top: '28px', right: '0', zIndex: 1000,
                width: '300px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px'
              }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                  <div style={{ background: 'var(--control-bg)', border: '1px solid var(--separator)', padding: '10px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setWifiEnabled(!wifiEnabled)}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: wifiEnabled ? 'var(--accent)' : 'rgba(0,0,0,.08)',
                        display: 'grid', placeItems: 'center', color: wifiEnabled ? 'white' : 'var(--label-2)',
                        fontSize: '12px'
                      }}>📶</div>
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '11px' }}>
                        <span style={{ fontWeight: 600 }}>Wi-Fi</span>
                        <span style={{ fontSize: '9px', color: 'var(--label-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80px' }}>{wifiEnabled ? 'HomeNet_5G' : 'Off'}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setBluetoothEnabled(!bluetoothEnabled)}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: bluetoothEnabled ? 'var(--accent)' : 'rgba(0,0,0,.08)',
                        display: 'grid', placeItems: 'center', color: bluetoothEnabled ? 'white' : 'var(--label-2)',
                        fontSize: '12px'
                      }}>ᛒ</div>
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '11px' }}>
                        <span style={{ fontWeight: 600 }}>Bluetooth</span>
                        <span style={{ fontSize: '9px', color: 'var(--label-2)' }}>{bluetoothEnabled ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--control-bg)', border: '1px solid var(--separator)', padding: '10px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setDndEnabled(!dndEnabled)}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: dndEnabled ? '#AF52DE' : 'rgba(0,0,0,.08)',
                        display: 'grid', placeItems: 'center', color: dndEnabled ? 'white' : 'var(--label-2)',
                        fontSize: '12px'
                      }}>🌙</div>
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '11px' }}>
                        <span style={{ fontWeight: 600 }}>DND</span>
                        <span style={{ fontSize: '9px', color: 'var(--label-2)' }}>{dndEnabled ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--control-bg)', border: '1px solid var(--separator)', padding: '10px 12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '3px' }}>
                      <span>Display</span>
                      <span>{brightness}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={brightness}
                      onChange={e => setBrightness(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '3px' }}>
                      <span>Sound</span>
                      <span>{volume}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={volume}
                      onChange={e => setVolume(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Date/Time */}
          <span className="menu-item" style={{
            fontWeight: 500, fontSize: '13px',
            textShadow: '0 1px 2px rgba(0,0,0,.3), 0 0 8px rgba(0,0,0,.15)'
          }}>
            {timeStr}
          </span>
        </div>
      </div>

      {/* ══ Widgets Panel ══ */}
      <div className="widgets-panel">
        {/* Calendar Widget */}
        <div className="widget-card" style={{ display: 'flex', gap: '12px', minHeight: '130px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FF3B30', textTransform: 'uppercase' }}>July 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', fontSize: '9px', textAlign: 'center', color: 'var(--label-2)' }}>
              {['S','M','T','W','T','F','S'].map((d,i) => <span key={i} style={{ fontWeight: 700, fontSize: '8px' }}>{d}</span>)}
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 18;
                return (
                  <span key={i} style={{
                    fontWeight: isToday ? '700' : '400',
                    color: isToday ? 'white' : 'var(--label)',
                    background: isToday ? '#FF3B30' : 'transparent',
                    borderRadius: '50%',
                    width: '14px', height: '14px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    gridColumnStart: day === 1 ? 4 : 'auto',
                    fontSize: '9px'
                  }}>
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ width: '140px', borderLeft: '1px solid var(--separator)', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
            <div>
              <div style={{ fontWeight: 600 }}>1:1 with Maya</div>
              <div style={{ fontSize: '10px', color: 'var(--label-2)' }}>2:00 PM</div>
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Sprint planning</div>
              <div style={{ fontSize: '10px', color: 'var(--label-2)' }}>9:30 AM</div>
            </div>
          </div>
        </div>

        {/* Weather + Today row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* Weather */}
          <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--label-2)' }}>Cupertino</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#8E8E93" opacity="0.6"/>
              </svg>
              <span style={{ fontSize: '36px', fontWeight: 200, lineHeight: 1 }}>57°</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--label-2)' }}>Cloudy</div>
            <div style={{ fontSize: '10px', color: 'var(--label-3)' }}>H:79° L:56°</div>
          </div>

          {/* Today / Reminders */}
          <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>Today</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {todos.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', cursor: 'pointer' }} onClick={() => handleTodoToggle(t.id)}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    border: `1.5px solid ${t.done ? 'var(--accent)' : 'var(--label-3)'}`,
                    background: t.done ? 'var(--accent)' : 'transparent',
                    flexShrink: 0
                  }} />
                  <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--label-3)' : 'var(--label)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.text}
                  </span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--accent)', cursor: 'pointer', marginTop: 'auto' }}>3 remaining &gt;</span>
          </div>
        </div>

        {/* Stocks Widget */}
        <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { sym: 'AAPL', name: 'Apple Inc.', price: '232.40', pct: '+12.02%', color: '#34C759', path: 'M0,12 L8,10 L16,4 L24,6 L32,1 L40,0' },
            { sym: 'MSFT', name: 'Microsoft C...', price: '505.80', pct: '+3.52%', color: '#34C759', path: 'M0,14 L8,12 L16,10 L24,5 L32,3 L40,2' },
            { sym: 'NVDA', name: 'NVIDIA Corp.', price: '168.25', pct: '-6.22%', color: '#FF3B30', path: 'M0,2 L8,5 L16,8 L24,12 L32,14 L40,11' }
          ].map(s => (
            <div key={s.sym} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
              <div style={{ minWidth: '55px' }}>
                <strong style={{ display: 'block' }}>{s.sym}</strong>
                <span style={{ fontSize: '9px', color: 'var(--label-3)' }}>{s.name}</span>
              </div>
              <svg width="50" height="16" fill="none" stroke={s.color} strokeWidth="1.5" style={{ flexShrink: 0 }}>
                <path d={s.path} />
              </svg>
              <div style={{ textAlign: 'right', minWidth: '60px' }}>
                <div>{s.price}</div>
                <span style={{ fontSize: '9.5px', color: s.color }}>{s.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Desktop Icons ══ */}
      <div className="desktop-icons-grid">
        <div className="desktop-icon" onDoubleClick={() => launchApp('finder')}>
          <div className="desktop-icon-img">
            <svg viewBox="0 0 64 64" width="48" height="48">
              <path d="M8 4h36l12 12v40a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4z" fill="#5AC8FA" opacity="0.9"/>
              <path d="M44 4l12 12H48a4 4 0 01-4-4V4z" fill="#4AB3E6"/>
            </svg>
          </div>
          <span className="desktop-icon-name">Tahoe Trip</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => launchApp('notes')}>
          <div className="desktop-icon-img">
            <svg viewBox="0 0 64 64" width="48" height="48">
              <rect x="8" y="4" width="48" height="56" rx="4" fill="white" opacity="0.9"/>
              <text x="16" y="25" fill="#8E8E93" fontSize="8" fontWeight="600">TXT</text>
              <line x1="16" y1="32" x2="48" y2="32" stroke="#E5E5EA" strokeWidth="1.5"/>
              <line x1="16" y1="40" x2="48" y2="40" stroke="#E5E5EA" strokeWidth="1.5"/>
              <line x1="16" y1="48" x2="36" y2="48" stroke="#E5E5EA" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="desktop-icon-name">Welcome.txt</span>
        </div>
      </div>

      {/* ══ Windows ══ */}
      <Window
        id="finder" title="Documents"
        isOpen={windows.finder.isOpen} isMinimized={windows.finder.isMinimized}
        isMaximized={windows.finder.isMaximized} zIndex={windows.finder.zIndex}
        active={topWindowId === 'finder'}
        onClose={() => closeWindow('finder')} onMinimize={() => toggleMinimize('finder')}
        onMaximize={() => toggleMaximize('finder')} onFocus={focusWindow}
        initialX={70} initialY={130} initialWidth={700} initialHeight={460}
      >
        <Finder />
      </Window>

      {Object.keys(windows).filter(k => k !== 'finder').map(winId => {
        const win = windows[winId];
        if (!win.isOpen) return null;
        return (
          <Window
            key={winId} id={winId} title={win.title}
            isOpen={win.isOpen} isMinimized={win.isMinimized}
            isMaximized={win.isMaximized} zIndex={win.zIndex}
            active={topWindowId === winId}
            onClose={() => closeWindow(winId)} onMinimize={() => toggleMinimize(winId)}
            onMaximize={() => toggleMaximize(winId)} onFocus={focusWindow}
            initialX={200 + (winId.charCodeAt(0) % 5) * 30}
            initialY={100 + (winId.charCodeAt(0) % 4) * 20}
            initialWidth={winId === 'calculator' ? 320 : 720}
            initialHeight={winId === 'calculator' ? 480 : 500}
          >
            {getAppContent(winId)}
          </Window>
        );
      })}

      {/* ══ Launchpad Overlay ══ */}
      {showLaunchpad && (
        <div className="launchpad-overlay" onClick={() => setShowLaunchpad(false)}>
          {appsList.filter(a => a.id !== 'launchpad').map(app => (
            <div
              key={app.id}
              onClick={(e) => { e.stopPropagation(); setShowLaunchpad(false); launchApp(app.id); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '14px',
                overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,.15)'
              }}>
                {app.icon}
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,.5)' }}>{app.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* ══ Dock ══ */}
      <div className="dock-wrapper glass-dock">
        {dockApps.map((app, idx) => {
          if (app === 'divider') return <div key={`div-${idx}`} className="dock-divider" />;

          const win = windows[app.id] || { isOpen: false };
          return (
            <div
              key={app.id}
              className="dock-icon-wrapper"
              onClick={() => {
                if (app.id === 'launchpad') {
                  setShowLaunchpad(!showLaunchpad);
                  return;
                }
                if (windows[app.id].isOpen) {
                  if (topWindowId === app.id && !windows[app.id].isMinimized) {
                    toggleMinimize(app.id);
                  } else {
                    focusWindow(app.id);
                  }
                } else {
                  launchApp(app.id);
                }
              }}
              onMouseEnter={(e) => {
                if (!dockMagnify) return;
                const wrapper = e.currentTarget.parentElement;
                const icons = wrapper.querySelectorAll('.dock-icon-wrapper');
                const idx = Array.from(icons).indexOf(e.currentTarget);
                icons.forEach((icon, i) => {
                  const dist = Math.abs(i - idx);
                  const scale = dist === 0 ? 1.5 : dist === 1 ? 1.25 : dist === 2 ? 1.1 : 1;
                  icon.style.transform = `scale(${scale})`;
                  icon.style.transformOrigin = 'bottom center';
                });
              }}
              onMouseLeave={(e) => {
                if (!dockMagnify) return;
                const wrapper = e.currentTarget.parentElement;
                wrapper.querySelectorAll('.dock-icon-wrapper').forEach(icon => {
                  icon.style.transform = 'scale(1)';
                });
              }}
            >
              <div className="dock-tooltip glass-banner">{app.name}</div>
              <div className="dock-icon" style={{ background: app.bg }}>
                {app.icon}
              </div>
              {app.badge > 0 && <div className="dock-badge">{app.badge}</div>}
              {win.isOpen && <div className="dock-icon-dot" />}
            </div>
          );
        })}
      </div>

      {/* ══ Spotlight Search ══ */}
      {showSpotlight && (
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '560px', zIndex: 10000,
        }} onClick={e => e.stopPropagation()}>
          <div className="glass-spotlight" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--label-2)" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Spotlight Search"
                value={spotlightQuery}
                onChange={e => setSpotlightQuery(e.target.value)}
                autoFocus
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  fontSize: '18px', color: 'var(--label)', fontFamily: 'var(--font-ui)',
                  flex: 1
                }}
              />
            </div>
            {spotlightQuery.trim() && (
              <>
                <div className="menu-separator" style={{ margin: '8px 0 4px' }} />
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--label-3)', padding: '0 4px' }}>APPLICATIONS</div>
                {appsList
                  .filter(app => app.name.toLowerCase().includes(spotlightQuery.toLowerCase()))
                  .map(app => (
                    <div
                      key={app.id}
                      onClick={() => {
                        if (app.id === 'launchpad') {
                          setShowLaunchpad(true);
                        } else {
                          launchApp(app.id);
                        }
                        setShowSpotlight(false);
                        setSpotlightQuery('');
                      }}
                      className="menu-dropdown-item"
                      style={{ borderRadius: '8px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <div style={{ width: '24px', height: '24px', borderRadius: '6px', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
                        {app.icon}
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{app.name}</span>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Lock Screen */}
      {locked && <LockScreen onUnlock={() => setLocked(false)} />}
    </div>
  );
}
