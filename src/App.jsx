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
  'clear-lake': "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80')",
  'sunset': "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')",
  'forest': "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80')",
  'night': "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=2000&q=80')",
  'mountain': "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')",
  'desert': "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80')",
  'aurora': "linear-gradient(135deg, #0575E6 0%, #00F260 100%)",
  'cosmic': "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)"
};

export default function App() {
  const [locked, setLocked] = useState(true);
  const [theme, setTheme] = useState('light');
  const [wallpaper, setWallpaper] = useState('clear-lake');
  const [blurAmount, setBlurAmount] = useState(25);
  const [dockMagnify, setDockMagnify] = useState(false);
  const [bouncingAppId, setBouncingAppId] = useState(null);
  const [showWidgets, setShowWidgets] = useState(true);

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
      { label: 'Enter Full Screen', shortcut: '🌐F' },
      { type: 'separator' },
      { label: showWidgets ? 'Hide Widgets' : 'Show Widgets', shortcut: '⌥⌘W', action: 'toggleWidgets' }
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

  // Time
  const [timeStr, setTimeStr] = useState('');

  // Menu / Control Center / Spotlight / Context Menu states
  const [activeMenuDropdown, setActiveMenuDropdown] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [launchpadSearch, setLaunchpadSearch] = useState('');
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [dndEnabled, setDndEnabled] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  // Dynamic Desktop Items matching user's screen
  const [desktopItems, setDesktopItems] = useState([
    { id: 'dev_yut', name: 'Dev_Yut_Student', type: 'folder', app: 'finder' },
    { id: 'golden_gate', name: 'Golden Gate 27 ☁️', type: 'folder', app: 'finder' },
    { id: 'screenshot_img', name: 'Screenshot 2026-07-20 at 14.02.45', type: 'file', app: 'photos' }
  ]);

  // Web Audio UI Sound Generator
  const playSystemSound = useCallback((type = 'click') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.04 * (volume / 100), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'unlock') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06 * (volume / 100), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'launch') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05 * (volume / 100), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {}
  }, [volume]);

  // Todos for widget
  const [todos, setTodos] = useState([
    { id: 1, text: 'Send brand review fe...', done: false },
    { id: 2, text: 'Review PR #142 — g...', done: false },
    { id: 3, text: 'Pick up dry cleaning', done: false }
  ]);

  // Window states
  const [windows, setWindows] = useState({
    finder: { title: 'Finder', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
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

  const [topWindowId, setTopWindowId] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

  // Clock state
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
      setTimeStr(now.toLocaleDateString('en-US', options).replace(',', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme attribute
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

  const launchApp = useCallback((id) => {
    if (windows[id]) {
      if (!windows[id]?.isOpen) {
        setBouncingAppId(id);
        setTimeout(() => {
          setBouncingAppId(null);
        }, 1000);
      }
      focusWindow(id);
    }
  }, [focusWindow, windows]);

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

  // ── Dock App Definitions Matching User Screenshot ──
  const dockApps = [
    { id: 'finder', name: 'Finder', badge: 0, bg: 'transparent', icon: (
      <img src="/icons/App Icon Finder.png" alt="Finder" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'safari', name: 'Safari', badge: 0, bg: 'transparent', icon: (
      <img src="https://cdn.jim-nielsen.com/macos/1024/safari-2025-11-14.png?rf=1024" alt="Safari" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'antigravity', name: 'Antigravity', badge: 0, bg: 'transparent', icon: (
      <img src="https://img.utdstc.com/icon/572/79c/57279caf8af06fd8bdeb8fd23b65284d882ff0555ad85a5389b08ab50504569a:600" alt="Antigravity" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '22%' }} />
    )},
    { id: 'pycharm', name: 'PyCharm', badge: 0, bg: 'transparent', icon: (
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/PyCharm_Icon.svg" alt="PyCharm" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'launchpad', name: 'Launchpad', badge: 0, bg: 'transparent', icon: (
      <img src="/icons/Launchpad.png" alt="Launchpad" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'gemini', name: 'Google Gemini', badge: 0, bg: 'transparent', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="28" fill="#FFFFFF"/>
        <path d="M60 18 Q60 60 102 60 Q60 60 60 102 Q60 60 18 60 Q60 60 60 18 Z" fill="url(#geminiG)"/>
        <defs>
          <linearGradient id="geminiG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A73E8"/><stop offset="33%" stopColor="#8AB4F8"/><stop offset="66%" stopColor="#EA4335"/><stop offset="100%" stopColor="#FBBC04"/>
          </linearGradient>
        </defs>
      </svg>
    )},
    { id: 'music', name: 'Music', badge: 0, bg: 'transparent', icon: (
      <img src="/icons/App Icon Music.png" alt="Music" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'settings', name: 'System Settings', badge: 0, bg: 'transparent', icon: (
      <img src="/icons/App Icon Settings.png" alt="System Settings" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'iphone', name: 'iPhone Mirroring', badge: 0, bg: 'transparent', icon: (
      <svg viewBox="0 0 120 120" style={{width:'100%',height:'100%'}}>
        <rect width="120" height="120" rx="28" fill="url(#iphG)"/>
        <rect x="42" y="24" width="36" height="72" rx="10" fill="none" stroke="white" strokeWidth="5"/>
        <line x1="52" y1="32" x2="68" y2="32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <defs>
          <linearGradient id="iphG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
        </defs>
      </svg>
    )},
    'divider',
    { id: 'edge', name: 'Microsoft Edge', badge: 0, bg: 'transparent', icon: (
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Microsoft Edge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'telegram', name: 'Telegram', badge: 0, bg: 'transparent', icon: (
      <img src="https://cdn.jim-nielsen.com/macos/512/telegram-2021-07-12.png?rf=1024" alt="Telegram" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'chrome', name: 'Google Chrome', badge: 0, bg: 'transparent', icon: (
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" alt="Google Chrome" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    )},
    { id: 'preview_win', name: 'Active Window', badge: 0, bg: 'transparent', icon: (
      <div style={{ width: '100%', height: '100%', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.7)', boxShadow: '0 3px 10px rgba(0,0,0,0.3)', position: 'relative', background: '#0f172a' }}>
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', display: 'grid', placeItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4285F4"/></svg>
        </div>
      </div>
    )},
    { id: 'trash', name: 'Trash', badge: 0, bg: 'transparent', icon: (
      <img src="/icons/Trash Full.png" alt="Trash" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
          showWidgets={showWidgets}
          onToggleWidgets={() => setShowWidgets(prev => !prev)}
        />
      );
      default: return null;
    }
  };

  const handleLockScreen = () => {
    setLocked(true);
  };

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
      onClick={() => { setActiveMenuDropdown(null); setContextMenu(null); }}
      onContextMenu={(e) => {
        e.preventDefault();
        setActiveMenuDropdown(null);
        setContextMenu({
          x: Math.min(e.clientX, window.innerWidth - 210),
          y: Math.min(e.clientY, window.innerHeight - 230)
        });
      }}
    >
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

      <div style={{
        position: 'fixed', inset: 0,
        background: 'black',
        opacity: Math.max(0, (100 - brightness) * 0.0065),
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'opacity 0.1s linear'
      }} />

      <div className="menu-bar">
        <div className="menu-bar-left">
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
                            if (dropdownItem.action === 'toggleWidgets') setShowWidgets(prev => !prev);
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

          <span className="menu-item" style={{ padding: '2px 4px' }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: 'conic-gradient(#FF3B30, #FF9500, #FFCC00, #34C759, #007AFF, #AF52DE, #FF3B30)',
              boxShadow: '0 0 6px rgba(0,0,0,.3)'
            }} />
          </span>

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
                width: '320px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px'
              }} onClick={e => e.stopPropagation()}>
                {/* Connectivity & Focus Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                  {/* Left Column: Wi-Fi, Bluetooth, AirDrop */}
                  <div className="cc-tile" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px 12px' }}>
                    {/* Wi-Fi */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setWifiEnabled(!wifiEnabled)}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: wifiEnabled ? 'linear-gradient(135deg, #007AFF, #00C6FF)' : 'rgba(120, 120, 128, 0.2)',
                        color: 'white', display: 'grid', placeItems: 'center',
                        boxShadow: wifiEnabled ? '0 2px 8px rgba(0, 122, 255, 0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--label)', lineHeight: 1.2 }}>Wi-Fi</span>
                        <span style={{ fontSize: '10px', color: 'var(--label-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {wifiEnabled ? 'HomeNet_5G' : 'Off'}
                        </span>
                      </div>
                    </div>

                    {/* Bluetooth */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setBluetoothEnabled(!bluetoothEnabled)}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: bluetoothEnabled ? 'linear-gradient(135deg, #007AFF, #00C6FF)' : 'rgba(120, 120, 128, 0.2)',
                        color: 'white', display: 'grid', placeItems: 'center',
                        boxShadow: bluetoothEnabled ? '0 2px 8px rgba(0, 122, 255, 0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="m7 7 10 10-5 5V2l5 5L7 17"/>
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--label)', lineHeight: 1.2 }}>Bluetooth</span>
                        <span style={{ fontSize: '10px', color: 'var(--label-2)' }}>{bluetoothEnabled ? 'On' : 'Off'}</span>
                      </div>
                    </div>

                    {/* AirDrop */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setAirdropEnabled(!airdropEnabled)}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: airdropEnabled ? 'linear-gradient(135deg, #007AFF, #00C6FF)' : 'rgba(120, 120, 128, 0.2)',
                        color: 'white', display: 'grid', placeItems: 'center',
                        boxShadow: airdropEnabled ? '0 2px 8px rgba(0, 122, 255, 0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="3"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49"/>
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--label)', lineHeight: 1.2 }}>AirDrop</span>
                        <span style={{ fontSize: '10px', color: 'var(--label-2)' }}>{airdropEnabled ? 'Contacts Only' : 'Off'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Focus DND & Stage Manager */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Focus Card */}
                    <div className="cc-tile" style={{
                      flex: 1, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                      background: dndEnabled ? 'linear-gradient(135deg, rgba(175,82,222,0.85), rgba(147,51,234,0.85))' : undefined,
                      color: dndEnabled ? 'white' : 'var(--label)'
                    }} onClick={() => setDndEnabled(!dndEnabled)}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: dndEnabled ? 'rgba(255,255,255,0.25)' : 'rgba(120, 120, 128, 0.2)',
                        display: 'grid', placeItems: 'center', color: dndEnabled ? 'white' : 'var(--label)'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.2 }}>Focus</span>
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>{dndEnabled ? 'DND' : 'Off'}</span>
                      </div>
                    </div>

                    {/* Stage Manager Card */}
                    <div className="cc-tile" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(120, 120, 128, 0.2)', display: 'grid', placeItems: 'center', color: 'var(--label)'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18"/>
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, lineHeight: 1.2 }}>Stage Mgr</span>
                        <span style={{ fontSize: '9px', color: 'var(--label-2)' }}>On</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Display & Sound Sliders */}
                <div className="cc-tile" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px' }}>
                  {/* Display Brightness */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, marginBottom: '6px', color: 'var(--label)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                        Display
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--label-2)' }}>{brightness}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={brightness}
                      onChange={e => setBrightness(Number(e.target.value))}
                      style={{
                        width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer',
                        accentColor: 'var(--accent)'
                      }} />
                  </div>

                  {/* Sound Volume */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, marginBottom: '6px', color: 'var(--label)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                        Sound
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--label-2)' }}>{volume}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={volume}
                      onChange={e => setVolume(Number(e.target.value))}
                      style={{
                        width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer',
                        accentColor: 'var(--accent)'
                      }} />
                  </div>
                </div>

                {/* Now Playing Widget */}
                <div className="cc-tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #FA2D55, #9333EA)',
                      display: 'grid', placeItems: 'center', fontSize: '18px',
                      boxShadow: '0 2px 8px rgba(250, 45, 85, 0.3)'
                    }}>
                      🌃
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--label)' }}>Midnight City</div>
                      <div style={{ fontSize: '10px', color: 'var(--label-2)' }}>M83 — Hurry Up...</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => launchApp('music')} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '16px', color: 'var(--accent)'
                    }}>▶</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="menu-item" style={{
            fontWeight: 500, fontSize: '13px',
            textShadow: '0 1px 2px rgba(0,0,0,.3), 0 0 8px rgba(0,0,0,.15)'
          }}>
            {timeStr}
          </span>
        </div>
      </div>

      {contextMenu && (
        <div
          className="apple-menu-dropdown glass-menu"
          style={{
            position: 'absolute', top: `${contextMenu.y}px`, left: `${contextMenu.x}px`,
            zIndex: 10000, minWidth: '190px', padding: '6px'
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="menu-dropdown-item" onClick={() => {
            const name = `New Folder ${desktopItems.length + 1}`;
            setDesktopItems(prev => [...prev, { id: `folder-${Date.now()}`, name, type: 'folder', app: 'finder' }]);
            setContextMenu(null);
          }}>
            📁 New Folder
          </div>
          <div className="menu-separator" />
          <div className="menu-dropdown-item" onClick={() => {
            launchApp('settings');
            setContextMenu(null);
          }}>
            🎨 Change Wallpaper...
          </div>
          <div className="menu-dropdown-item" onClick={() => {
            setShowWidgets(prev => !prev);
            setContextMenu(null);
          }}>
            🧩 {showWidgets ? 'Hide Widgets' : 'Show Widgets'}
          </div>
          <div className="menu-dropdown-item" onClick={() => {
            setTheme(prev => prev === 'light' ? 'dark' : 'light');
            setContextMenu(null);
          }}>
            🌓 Toggle Dark Mode
          </div>
          <div className="menu-separator" />
          <div className="menu-dropdown-item" onClick={() => {
            setLocked(true);
            setContextMenu(null);
          }}>
            🔒 Lock Screen
          </div>
        </div>
      )}

      {showWidgets && (
        <div className="widgets-panel">
          {/* Top Row: Clock & Weather Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Clock Widget */}
            <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '110px', background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(30px)' }}>
              <div style={{ fontSize: '42px', fontWeight: 200, letterSpacing: '-1px', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)', fontFamily: 'system-ui, sans-serif' }}>
                14:06
              </div>
            </div>

            {/* Weather Widget */}
            <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', height: '110px', background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(30px)' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Urgut 📍
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '38px', fontWeight: 300, lineHeight: 1, color: 'white' }}>36°</span>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Sunny</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>H:36° L:26°</div>
            </div>
          </div>
        </div>
      )}

      <div className="desktop-icons-grid">
        {desktopItems.map(item => (
          <div key={item.id} className="desktop-icon" onDoubleClick={() => { launchApp(item.app || 'finder'); }}>
            <div className="desktop-icon-img">
              {item.type === 'folder' ? (
                <svg viewBox="0 0 64 64" width="48" height="48">
                  <path d="M8 4h36l12 12v40a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4z" fill="#5AC8FA" opacity="0.95"/>
                  <path d="M44 4l12 12H48a4 4 0 01-4-4V4z" fill="#38BDF8"/>
                </svg>
              ) : (
                <svg viewBox="0 0 64 64" width="48" height="48">
                  <rect x="8" y="4" width="48" height="56" rx="4" fill="white" opacity="0.95"/>
                  <text x="16" y="25" fill="#8E8E93" fontSize="8" fontWeight="600">TXT</text>
                  <line x1="16" y1="32" x2="48" y2="32" stroke="#E5E5EA" strokeWidth="1.5"/>
                  <line x1="16" y1="40" x2="48" y2="40" stroke="#E5E5EA" strokeWidth="1.5"/>
                  <line x1="16" y1="48" x2="36" y2="48" stroke="#E5E5EA" strokeWidth="1.5"/>
                </svg>
              )}
            </div>
            <span className="desktop-icon-name">{item.name}</span>
          </div>
        ))}
      </div>

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

      {showLaunchpad && (
        <div className="launchpad-overlay" onClick={() => setShowLaunchpad(false)}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }} onClick={e => e.stopPropagation()}>
            <input
              type="text"
              placeholder="🔍 Search Launchpad..."
              value={launchpadSearch}
              onChange={e => setLaunchpadSearch(e.target.value)}
              autoFocus
              className="glass-spotlight"
              style={{
                width: '320px', padding: '10px 16px', borderRadius: '20px',
                fontSize: '14px', outline: 'none', border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', background: 'rgba(0,0,0,0.4)', textAlign: 'center'
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '32px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            {appsList
              .filter(a => a.id !== 'launchpad')
              .filter(a => a.name.toLowerCase().includes(launchpadSearch.toLowerCase()))
              .map(app => (
                <div
                  key={app.id}
                  onClick={(e) => { e.stopPropagation(); setShowLaunchpad(false); launchApp(app.id); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'transform 0.15s' }}
                >
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '15px',
                    overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,.3)'
                  }}>
                    {app.icon}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,.8)' }}>{app.name}</span>
                </div>
              ))}
          </div>
        </div>
      )}

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
              <div className={`dock-icon ${bouncingAppId === app.id ? 'dock-bounce' : ''}`} style={{ background: app.bg }}>
                {app.icon}
              </div>
              {app.badge > 0 && <div className="dock-badge">{app.badge}</div>}
              {win.isOpen && <div className="dock-icon-dot" />}
            </div>
          );
        })}
      </div>

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
                placeholder="Spotlight Search or Calculate (e.g. 12 * 8)..."
                value={spotlightQuery}
                onChange={e => setSpotlightQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && spotlightQuery.trim()) {
                    const matches = appsList.filter(app => app.name.toLowerCase().includes(spotlightQuery.toLowerCase()));
                    if (matches.length > 0) {
                      launchApp(matches[0].id);
                      setShowSpotlight(false);
                      setSpotlightQuery('');
                    }
                  }
                }}
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

                {(() => {
                  try {
                    const clean = spotlightQuery.trim().replace(/x/g, '*').replace(/÷/g, '/');
                    if (/^[\d\s\+\-\*\/\%\(\)\.\^]+$/.test(clean) && /[0-9]/.test(clean)) {
                      const expr = clean.replace(/\^/g, '**');
                      const val = Function('"use strict"; return (' + expr + ')')();
                      if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
                        return (
                          <div style={{
                            background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                            padding: '10px 14px', borderRadius: '10px', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between', margin: '4px 0'
                          }}>
                            <span style={{ fontSize: '13px', color: 'var(--label-2)' }}>Calculation</span>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>= {val}</span>
                          </div>
                        );
                      }
                    }
                  } catch (e) {}
                  return null;
                })()}

                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--label-3)', padding: '0 4px', marginTop: '4px' }}>APPLICATIONS</div>
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

      {locked && <LockScreen onUnlock={() => setLocked(false)} />}
    </div>
  );
}
