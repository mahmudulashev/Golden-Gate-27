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
    { id: 'vpn', label: 'VPN', icon: '🔒', sep: true },
    { id: 'battery', label: 'Battery', icon: '🔋', sep: true },
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'menubar', label: 'Menu Bar', icon: '▤' },
    { id: 'siri', label: 'Apple Intelligence & Siri', icon: '🤖' },
    { id: 'dock', label: 'Desktop & Dock', icon: '⬜' },
    { id: 'displays', label: 'Displays', icon: '🖥️' },
    { id: 'wallpaper', label: 'Wallpaper', icon: '🏞️' },
    { id: 'screensaver', label: 'Screen Saver', icon: '🌙' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'keyboard', label: 'Keyboard', icon: '⌨️' },
    { id: 'trackpad', label: 'Trackpad', icon: '🖱️' },
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

  const renderContent = () => {
    switch (selectedPage) {
      case 'appearance':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Appearance</h2>

            {/* Light/Dark/Auto switcher */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Appearance</div>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { key: 'light', label: 'Light', bg: '#F5F5F5', fg: '#1E1E1E' },
                  { key: 'dark', label: 'Dark', bg: '#2B2B2D', fg: '#F5F5F5' },
                  { key: 'auto', label: 'Auto', bg: 'linear-gradient(135deg, #F5F5F5 50%, #2B2B2D 50%)', fg: '#1E1E1E' },
                ].map(opt => (
                  <div key={opt.key} onClick={() => handleThemeChange(opt.key)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{
                      width: '120px', height: '82px', borderRadius: '12px',
                      background: opt.bg,
                      border: currentTheme === opt.key ? `3px solid var(--accent)` : '3px solid var(--separator)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '4px', overflow: 'hidden', position: 'relative'
                    }}>
                      {/* Mini window preview */}
                      <div style={{
                        width: '60px', height: '40px', borderRadius: '6px',
                        background: opt.key === 'dark' ? '#3A3A3C' : 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,.15)',
                        display: 'flex', flexDirection: 'column'
                      }}>
                        <div style={{
                          height: '10px', background: opt.key === 'dark' ? '#4A4A4C' : '#F0F0F0',
                          borderRadius: '6px 6px 0 0',
                          display: 'flex', alignItems: 'center', padding: '0 4px', gap: '2px'
                        }}>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FF5F57' }} />
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FEBC2E' }} />
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#28C840' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex' }}>
                          <div style={{ width: '15px', background: opt.key === 'dark' ? '#2B2B2D' : '#E8E8E8' }} />
                          <div style={{ flex: 1 }} />
                        </div>
                      </div>
                      {/* Mini dock */}
                      <div style={{
                        width: '40px', height: '8px', borderRadius: '4px',
                        background: opt.key === 'dark' ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.08)'
                      }} />
                    </div>
                    <div style={{
                      fontSize: '12px', fontWeight: 500, marginTop: '6px',
                      color: currentTheme === opt.key ? 'var(--accent)' : 'var(--label)'
                    }}>
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
                      boxShadow: accentColor === ac.name ? `0 0 0 2px ${ac.color}` : 'inset 0 0 0 1px rgba(0,0,0,.1)',
                      display: 'grid', placeItems: 'center'
                    }}
                  >
                    {accentColor === ac.name && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight Color */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Highlight Color</div>
              <select style={{
                background: 'var(--window-bg)', border: '1px solid var(--separator)',
                borderRadius: '8px', padding: '6px 12px', fontSize: '13px',
                color: 'var(--label)', fontFamily: 'var(--font-ui)', outline: 'none',
                width: '200px'
              }}>
                <option>Accent Color</option>
                <option>Blue</option>
                <option>Purple</option>
                <option>Pink</option>
                <option>Red</option>
                <option>Orange</option>
                <option>Yellow</option>
                <option>Green</option>
                <option>Graphite</option>
              </select>
            </div>

            {/* Icon & Widget Style */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Icon & Widget Style</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { key: 'default', label: 'Default', desc: 'Colorful icons' },
                  { key: 'dark', label: 'Dark', desc: 'Muted colors' },
                  { key: 'tinted', label: 'Tinted', desc: 'Accent-tinted' },
                  { key: 'clear', label: 'Clear', desc: 'Transparent' },
                ].map(opt => (
                  <div key={opt.key} onClick={() => setIconStyle(opt.key)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{
                      width: '72px', height: '52px', borderRadius: '10px',
                      background: 'var(--window-bg)',
                      border: iconStyle === opt.key ? '2px solid var(--accent)' : '2px solid var(--separator)',
                      display: 'grid', placeItems: 'center',
                    }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[0,1,2].map(i => (
                          <div key={i} style={{
                            width: '14px', height: '14px', borderRadius: '4px',
                            background: opt.key === 'default' ? ['#FF3B30','#34C759','#007AFF'][i] :
                                       opt.key === 'dark' ? ['#8E8E93','#636366','#48484A'][i] :
                                       opt.key === 'tinted' ? 'var(--accent)' :
                                       'rgba(0,0,0,.08)',
                            opacity: opt.key === 'tinted' ? [0.4, 0.6, 0.8][i] :
                                    opt.key === 'clear' ? 0.5 : 1
                          }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 500, marginTop: '4px', color: iconStyle === opt.key ? 'var(--accent)' : 'var(--label)' }}>
                      {opt.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar icon size */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Sidebar Icon Size</div>
                <select style={{
                  background: 'var(--window-bg)', border: '1px solid var(--separator)',
                  borderRadius: '8px', padding: '4px 10px', fontSize: '12px',
                  color: 'var(--label)', fontFamily: 'var(--font-ui)', outline: 'none'
                }}>
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>

            {/* Show scroll bars */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Show Scroll Bars</div>
                <select style={{
                  background: 'var(--window-bg)', border: '1px solid var(--separator)',
                  borderRadius: '8px', padding: '4px 10px', fontSize: '12px',
                  color: 'var(--label)', fontFamily: 'var(--font-ui)', outline: 'none'
                }}>
                  <option>Automatically based on mouse or trackpad</option>
                  <option>When scrolling</option>
                  <option>Always</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'dock':
        return (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Desktop & Dock</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px' }}>Dock Magnification</div>
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
                    left: dockMagnify ? '20px' : '2px',
                    transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)'
                  }} />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', marginBottom: '6px' }}>Glass Blur Amount: {blurAmount}px</div>
                <input
                  type="range" min="5" max="50" value={blurAmount}
                  onChange={e => onBlurChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', marginTop: '16px' }}>
                <div style={{ fontSize: '13px' }}>Show Widgets on Desktop</div>
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
                    left: showWidgets ? '20px' : '2px',
                    transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)'
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { id: 'clear-lake', label: 'Clear Lake', color: '#0EA5E9' },
                { id: 'sunset', label: 'Sunset', color: '#F97316' },
                { id: 'forest', label: 'Forest', color: '#22C55E' },
                { id: 'night', label: 'Night Sky', color: '#1E293B' },
                { id: 'mountain', label: 'Mountain', color: '#6366F1' },
                { id: 'desert', label: 'Desert', color: '#D97706' },
              ].map(wp => (
                <div
                  key={wp.id}
                  onClick={() => onWallpaperChange && onWallpaperChange(wp.id, currentTheme)}
                  style={{
                    height: '80px', borderRadius: '10px',
                    background: wp.color, cursor: 'pointer',
                    border: activeWallpaper === wp.id ? '3px solid var(--accent)' : '3px solid transparent',
                    display: 'grid', placeItems: 'center', color: 'white',
                    fontWeight: 600, fontSize: '12px'
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--label-2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>
              {sidebarItems.find(i => i.id === selectedPage)?.icon || '⚙️'}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>
              {sidebarItems.find(i => i.id === selectedPage)?.label || 'Settings'}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--label-3)', marginTop: '6px' }}>
              Coming soon in macOS 27
            </div>
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
            <input type="text" placeholder="Search" style={{
              background: 'none', border: 'none', outline: 'none',
              fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)', width: '100%'
            }} />
          </div>
        </div>

        {sidebarItems.map(item => (
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
