import React, { useState } from 'react';

export default function SystemSettings({
  activeWallpaper,
  onWallpaperChange,
  blurAmount,
  onBlurChange,
  dockMagnify,
  onDockMagnifyToggle,
  showWidgets,
  onToggleWidgets
}) {
  const [selectedPage, setSelectedPage] = useState('appearance');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('blue');
  const [iconStyle, setIconStyle] = useState('default');

  // Interactive settings state
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [batteryMode, setBatteryMode] = useState('auto');
  const [brightness, setBrightness] = useState(85);
  const [soundVolume, setSoundVolume] = useState(75);
  const [selectedSound, setSelectedSound] = useState('Glass');
  const [dockPosition, setDockPosition] = useState('bottom');
  const [dockSize, setDockSize] = useState(48);
  const [searchQuery, setSearchQuery] = useState('');

  const accentColors = [
    { name: 'blue', color: '#007AFF' },
    { name: 'purple', color: '#A550A7' },
    { name: 'pink', color: '#F74F9E' },
    { name: 'red', color: '#FF5257' },
    { name: 'orange', color: '#F7821B' },
    { name: 'yellow', color: '#FFC600' },
    { name: 'green', color: '#62BA46' },
    { name: 'graphite', color: '#8C8C8C' },
  ];

  const sidebarItems = [
    { id: 'account', label: 'Apple Account', icon: '👤', sep: true },
    { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { id: 'bluetooth', label: 'Bluetooth', icon: '᯽' },
    { id: 'network', label: 'Network', icon: '🌐' },
    { id: 'battery', label: 'Battery', icon: '🔋', sep: true },
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'dock', label: 'Desktop & Dock', icon: '⬜' },
    { id: 'displays', label: 'Displays', icon: '🖥️' },
    { id: 'wallpaper', label: 'Wallpaper', icon: '🏞️' },
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'privacy', label: 'Privacy & Security', icon: '🛡️' },
  ];

  const handleThemeChange = (t) => {
    setCurrentTheme(t);
    document.documentElement.setAttribute('data-theme', t === 'auto' ? 'light' : t);
  };

  const handleAccentChange = (name) => {
    setAccentColor(name);
    const colorMap = { blue: '#007AFF', purple: '#A550A7', pink: '#F74F9E', red: '#FF5257', orange: '#F7821B', yellow: '#FFC600', green: '#62BA46', graphite: '#8C8C8C' };
    document.documentElement.style.setProperty('--accent', colorMap[name] || '#007AFF');
    document.documentElement.style.setProperty('--accent-blue', colorMap[name] || '#007AFF');
  };

  const filteredSidebar = sidebarItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (selectedPage) {
      case 'account':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Apple Account</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #1A73E8, #9B51E0)', display: 'grid', placeItems: 'center', color: 'white', fontSize: '24px', fontWeight: 700 }}>
                MU
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700 }}>Mahmud Ulashev</div>
                <div style={{ fontSize: '12px', color: 'var(--label-2)', marginTop: '2px' }}>mahmud@ulashev.dev</div>
                <div style={{ fontSize: '11px', color: 'var(--accent)', marginTop: '4px', fontWeight: 600 }}>Apple ID, iCloud, Media & Purchases</div>
              </div>
            </div>

            <div style={{ background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>iCloud Storage</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--label-2)', marginBottom: '6px' }}>
                <span>42.5 GB of 200 GB Used</span>
                <span>21%</span>
              </div>
              <div style={{ height: '8px', width: '100%', borderRadius: '4px', background: 'var(--separator)', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '12%', background: '#007AFF' }} />
                <div style={{ width: '5%', background: '#FF9500' }} />
                <div style={{ width: '4%', background: '#34C759' }} />
              </div>
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Wi-Fi</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--window-bg)', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--separator)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📶</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Wi-Fi</span>
              </div>
              <div
                onClick={() => setWifiOn(!wifiOn)}
                style={{
                  width: '42px', height: '24px', borderRadius: '12px',
                  background: wifiOn ? 'var(--accent)' : 'var(--label-3)',
                  cursor: 'pointer', position: 'relative', transition: 'background .2s'
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'white', position: 'absolute', top: '2px',
                  left: wifiOn ? '20px' : '2px', transition: 'left .2s'
                }} />
              </div>
            </div>

            {wifiOn && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase', marginBottom: '8px' }}>Known Networks</div>
                <div style={{ background: 'var(--window-bg)', borderRadius: '12px', border: '1px solid var(--separator)', overflow: 'hidden' }}>
                  {[
                    { name: 'Golden Gate 5G', connected: true, signal: 'Strong' },
                    { name: 'Dev_Yut_Student_5G', connected: false, signal: 'Strong' },
                    { name: 'Home_WiFi_Mesh', connected: false, signal: 'Medium' }
                  ].map((net, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: idx < 2 ? '1px solid var(--separator)' : 'none' }}>
                      <span style={{ fontSize: '13px', fontWeight: net.connected ? 600 : 400 }}>{net.name} {net.connected && '✓'}</span>
                      <span style={{ fontSize: '11px', color: 'var(--label-2)' }}>{net.connected ? 'Connected' : net.signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'bluetooth':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Bluetooth</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--window-bg)', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--separator)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>᯽</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Bluetooth</span>
              </div>
              <div
                onClick={() => setBluetoothOn(!bluetoothOn)}
                style={{
                  width: '42px', height: '24px', borderRadius: '12px',
                  background: bluetoothOn ? 'var(--accent)' : 'var(--label-3)',
                  cursor: 'pointer', position: 'relative', transition: 'background .2s'
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'white', position: 'absolute', top: '2px',
                  left: bluetoothOn ? '20px' : '2px', transition: 'left .2s'
                }} />
              </div>
            </div>

            {bluetoothOn && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase', marginBottom: '8px' }}>My Devices</div>
                <div style={{ background: 'var(--window-bg)', borderRadius: '12px', border: '1px solid var(--separator)', overflow: 'hidden' }}>
                  {[
                    { name: 'AirPods Pro', battery: '85%', connected: true, icon: '🎧' },
                    { name: 'Magic Keyboard', battery: '92%', connected: true, icon: '⌨️' },
                    { name: 'Magic Trackpad 2', battery: '68%', connected: true, icon: '🖱️' }
                  ].map((dev, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: idx < 2 ? '1px solid var(--separator)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>{dev.icon}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{dev.name}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--label-2)' }}>{dev.battery} • Connected</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'battery':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Battery</h2>
            
            <div style={{ background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--label-2)', marginBottom: '4px' }}>Battery Level</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent)' }}>36%</div>
              <div style={{ fontSize: '12px', color: '#34C759', marginTop: '2px', fontWeight: 600 }}>Battery Health: 100% Maximum Capacity</div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>Energy Mode</div>
            <div style={{ background: 'var(--window-bg)', borderRadius: '12px', border: '1px solid var(--separator)', overflow: 'hidden' }}>
              {[
                { id: 'low', label: 'Low Power Mode', desc: 'Reduces energy usage' },
                { id: 'auto', label: 'Automatic', desc: 'Balanced performance' },
                { id: 'high', label: 'High Performance', desc: 'Maximum processing speed' }
              ].map((m, idx) => (
                <div key={m.id} onClick={() => setBatteryMode(m.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: idx < 2 ? '1px solid var(--separator)' : 'none', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: batteryMode === m.id ? 600 : 400 }}>{m.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--label-2)' }}>{m.desc}</div>
                  </div>
                  {batteryMode === m.id && <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'general':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>General</h2>
            
            <div style={{ background: 'var(--window-bg)', padding: '20px', borderRadius: '14px', border: '1px solid var(--separator)', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>💻</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>macOS 27 Sequoia</div>
              <div style={{ fontSize: '12px', color: 'var(--label-2)', marginTop: '2px' }}>Version 27.2 Liquid Glass Edition</div>
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--label-2)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Model:</strong> Mac Studio (M3 Ultra)</div>
                <div><strong>Memory:</strong> 64 GB Unified Memory</div>
                <div><strong>Serial Number:</strong> C02G27KG91X8</div>
              </div>
            </div>
          </div>
        );

      case 'displays':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Displays</h2>
            
            <div style={{ background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>Brightness: {brightness}%</div>
              <input
                type="range" min="10" max="100" value={brightness}
                onChange={e => setBrightness(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            <div style={{ background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Built-in Liquid Retina XDR Display</div>
              <div style={{ fontSize: '12px', color: 'var(--label-2)' }}>Resolution: 3024 × 1964 (Default for Display)</div>
            </div>
          </div>
        );

      case 'sound':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Sound</h2>
            
            <div style={{ background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>Output Volume: {soundVolume}%</div>
              <input
                type="range" min="0" max="100" value={soundVolume}
                onChange={e => setSoundVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Alert Sound</div>
            <div style={{ background: 'var(--window-bg)', borderRadius: '12px', border: '1px solid var(--separator)', overflow: 'hidden' }}>
              {['Breeze', 'Funk', 'Glass', 'Hero', 'Ping', 'Pop'].map((snd, idx) => (
                <div key={snd} onClick={() => setSelectedSound(snd)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: idx < 5 ? '1px solid var(--separator)' : 'none', cursor: 'pointer', fontSize: '13px' }}>
                  <span>{snd}</span>
                  {selectedSound === snd && <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Appearance</h2>

            {/* Light/Dark/Auto switcher */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Appearance</div>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { key: 'light', label: 'Light', bg: '#F5F5F5' },
                  { key: 'dark', label: 'Dark', bg: '#2B2B2D' },
                  { key: 'auto', label: 'Auto', bg: 'linear-gradient(135deg, #F5F5F5 50%, #2B2B2D 50%)' },
                ].map(opt => (
                  <div key={opt.key} onClick={() => handleThemeChange(opt.key)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{
                      width: '120px', height: '82px', borderRadius: '12px',
                      background: opt.bg,
                      border: currentTheme === opt.key ? `3px solid var(--accent)` : '3px solid var(--separator)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '4px', overflow: 'hidden'
                    }}>
                      <div style={{ width: '60px', height: '40px', borderRadius: '6px', background: opt.key === 'dark' ? '#3A3A3C' : 'white' }} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, marginTop: '6px', color: currentTheme === opt.key ? 'var(--accent)' : 'var(--label)' }}>
                      {opt.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Accent Color</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {accentColors.map(ac => (
                  <div
                    key={ac.name}
                    onClick={() => handleAccentChange(ac.name)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: ac.color, cursor: 'pointer',
                      border: accentColor === ac.name ? '3px solid var(--label)' : '2px solid transparent',
                      display: 'grid', placeItems: 'center'
                    }}
                  >
                    {accentColor === ac.name && <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'dock':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Desktop & Dock</h2>
            
            <div style={{ background: 'var(--window-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--separator)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Dock Magnification</div>
                <div
                  onClick={() => onDockMagnifyToggle(!dockMagnify)}
                  style={{
                    width: '42px', height: '24px', borderRadius: '12px',
                    background: dockMagnify ? 'var(--accent)' : 'var(--label-3)',
                    cursor: 'pointer', position: 'relative', transition: 'background .2s'
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'white', position: 'absolute', top: '2px',
                    left: dockMagnify ? '20px' : '2px', transition: 'left .2s'
                  }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Glass Blur Amount: {blurAmount}px</div>
                <input
                  type="range" min="5" max="50" value={blurAmount}
                  onChange={e => onBlurChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Show Widgets on Desktop</div>
                <div
                  onClick={() => onToggleWidgets && onToggleWidgets()}
                  style={{
                    width: '42px', height: '24px', borderRadius: '12px',
                    background: showWidgets ? 'var(--accent)' : 'var(--label-3)',
                    cursor: 'pointer', position: 'relative', transition: 'background .2s'
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'white', position: 'absolute', top: '2px',
                    left: showWidgets ? '20px' : '2px', transition: 'left .2s'
                  }} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'wallpaper':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Wallpaper</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {[
                { id: 'arctic', label: 'Arctic Mountains', bg: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.15)), url('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80')" },
                { id: 'clear-lake', label: 'Clear Lake', bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80')" },
                { id: 'sunset', label: 'Sunset', bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80')" },
                { id: 'forest', label: 'Forest', bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80')" },
                { id: 'night', label: 'Night Sky', bg: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80')" },
                { id: 'mountain', label: 'Mountain', bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80')" },
                { id: 'desert', label: 'Desert', bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80')" },
                { id: 'aurora', label: 'Aurora Emerald', bg: "linear-gradient(135deg, #0575E6 0%, #00F260 100%)" },
                { id: 'cosmic', label: 'Cosmic Sunset', bg: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)" },
              ].map(wp => (
                <div
                  key={wp.id}
                  onClick={() => onWallpaperChange && onWallpaperChange(wp.id, currentTheme)}
                  style={{
                    height: '90px', borderRadius: '12px',
                    background: wp.bg, backgroundSize: 'cover', backgroundPosition: 'center',
                    cursor: 'pointer',
                    border: activeWallpaper === wp.id ? '3px solid var(--accent)' : '3px solid rgba(255,255,255,0.2)',
                    display: 'grid', placeItems: 'center', color: 'white',
                    fontWeight: 700, fontSize: '12px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'transform 0.15s, border 0.15s'
                  }}
                >
                  {wp.label}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div style={{ background: 'var(--window-bg)', padding: '20px', borderRadius: '14px', border: '1px solid var(--separator)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Privacy & Security</h2>
            <div style={{ fontSize: '12px', color: 'var(--label-2)' }}>FileVault Encryption: Enabled (On)</div>
            <div style={{ fontSize: '12px', color: 'var(--label-2)', marginTop: '4px' }}>Touch ID & Password Security: Active</div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div className="settings-sidebar">
        {/* Search */}
        <div style={{ padding: '4px 12px', marginBottom: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '5px 8px', borderRadius: '8px', background: 'var(--control-bg)',
            border: '1px solid var(--separator)'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search Settings" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'none', border: 'none', outline: 'none',
                fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)', width: '100%'
              }} 
            />
          </div>
        </div>

        {filteredSidebar.map(item => (
          <React.Fragment key={item.id}>
            {item.sep && <div style={{ height: '1px', background: 'var(--separator)', margin: '6px 12px' }} />}
            <div
              onClick={() => setSelectedPage(item.id)}
              style={{
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                borderRadius: '6px',
                margin: '1px 6px',
                fontSize: '13px',
                fontWeight: selectedPage === item.id ? 600 : 400,
                background: selectedPage === item.id ? 'var(--accent)' : 'transparent',
                color: selectedPage === item.id ? 'white' : 'var(--label)',
              }}
            >
              <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
}
