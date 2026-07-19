import React, { useState } from 'react';

export default function Safari() {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('start');

  const favorites = [
    { name: 'Apple', color: '#1E1E1E', img: '🍎' },
    { name: 'Wikipedia', color: '#fff', img: 'W' },
    { name: 'GitHub', color: '#24292e', img: '🐙' },
    { name: 'Hacker News', color: '#FF6600', img: 'Y' },
    { name: 'Figma', color: '#1E1E1E', img: '🎨' },
    { name: 'Dribbble', color: '#EA4C89', img: '🏀' },
    { name: 'MDN Web Docs', color: '#1B1B1B', img: '📖' },
    { name: 'OpenStreetMap', color: '#7EBC6F', img: '🗺️' },
  ];

  const frequentlyVisited = [
    { name: 'en.wikipedia.org', letter: 'e', bg: '#E8E8E6' },
    { name: 'apple.com', letter: 'a', bg: '#1E1E1E' },
    { name: 'news.ycombin...', letter: 'n', bg: '#FF6600' },
    { name: 'github.com', letter: 'g', bg: '#3A3A3C' },
  ];

  const pinnedTabs = [
    { name: 'Apple', icon: 'A', color: '#1E1E1E' },
    { name: 'Wikipedia', icon: 'W', color: '#636366' },
    { name: 'Hacker News', icon: 'N', color: '#FF6600' },
    { name: 'GitHub Trending', icon: 'G', color: '#636366' },
  ];

  const [webContent, setWebContent] = useState(null);

  const navigateTo = (site) => {
    setWebContent(site);
    setActiveTab('browse');
  };

  const goHome = () => {
    setWebContent(null);
    setActiveTab('start');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--control-bg)' }}>
      {/* Tab Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '2px',
        padding: '6px 12px 0', background: 'var(--window-bg)',
        borderBottom: '1px solid var(--separator)'
      }}>
        <div style={{
          padding: '6px 16px', borderRadius: '8px 8px 0 0',
          background: activeTab === 'start' ? 'var(--control-bg)' : 'transparent',
          fontSize: '12px', fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          border: activeTab === 'start' ? '1px solid var(--separator)' : '1px solid transparent',
          borderBottom: activeTab === 'start' ? '1px solid var(--control-bg)' : 'none',
          marginBottom: '-1px'
        }}>
          <span style={{ fontSize: '10px' }}>🧭</span>
          Start Page
        </div>
        <div style={{
          width: '24px', height: '24px', borderRadius: '6px',
          display: 'grid', placeItems: 'center', cursor: 'pointer',
          fontSize: '16px', color: 'var(--label-2)'
        }} title="New Tab">
          +
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', marginBottom: '6px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            fontSize: '12px', color: 'var(--label-3)'
          }}>⊞</div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="safari-toolbar">
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button onClick={goHome} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '14px', color: webContent ? 'var(--accent)' : 'var(--label-3)', padding: '2px 4px'
          }}>‹</button>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '14px', color: 'var(--label-3)', padding: '2px 4px'
          }}>›</button>
          <button onClick={goHome} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: 'var(--label-2)', padding: '2px 4px'
          }}>↻</button>
        </div>

        <div className="safari-url-bar" onClick={() => {
          const input = document.getElementById('safari-url-input');
          if (input) input.focus();
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          <input
            id="safari-url-input"
            type="text"
            placeholder="Search or enter website name"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && url.trim()) navigateTo(url); }}
            style={{
              background: 'none', border: 'none', outline: 'none',
              flex: 1, fontSize: '13px', color: 'var(--label)',
              fontFamily: 'var(--font-ui)'
            }}
          />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="1.5">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </div>
      </div>

      {/* Pinned Sites Bar */}
      <div style={{
        display: 'flex', gap: '14px', padding: '8px 16px',
        borderBottom: '1px solid var(--separator)',
        background: 'var(--control-bg)', fontSize: '12px'
      }}>
        {pinnedTabs.map(tab => (
          <div key={tab.name} style={{
            display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
            color: 'var(--label-2)', fontWeight: 500
          }} onClick={() => navigateTo(tab.name)}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '4px',
              background: tab.color, color: 'white',
              display: 'grid', placeItems: 'center', fontSize: '9px', fontWeight: 700
            }}>{tab.icon}</div>
            {tab.name}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: webContent ? 0 : '24px 32px' }}>
        {webContent ? (
          /* Web page placeholder */
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingTop: '60px' }}>
            <div style={{ fontSize: '48px' }}>🌐</div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Browsing: {webContent}</div>
            <div style={{ color: 'var(--label-2)', fontSize: '13px', textAlign: 'center', maxWidth: '400px' }}>
              This is a simulated browser. In a real implementation, this would render the actual webpage content.
            </div>
            <button onClick={goHome} style={{
              background: 'var(--accent)', color: 'white', border: 'none',
              padding: '8px 20px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '13px', fontWeight: 500
            }}>Back to Start Page</button>
          </div>
        ) : (
          /* Start Page */
          <>
            {/* Favorites */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700 }}>☆ Favorites</h2>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  border: '1px solid var(--separator)', display: 'grid', placeItems: 'center',
                  cursor: 'pointer', fontSize: '12px', color: 'var(--label-3)'
                }}>⚙</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '16px' }}>
                {favorites.map(fav => (
                  <div key={fav.name} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer'
                  }} onClick={() => navigateTo(fav.name)}>
                    <div style={{
                      width: '80px', height: '52px', borderRadius: '10px',
                      background: fav.color, display: 'grid', placeItems: 'center',
                      fontSize: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.08)',
                      border: '1px solid var(--separator)', color: fav.color === '#fff' ? '#1E1E1E' : 'white'
                    }}>
                      {fav.img}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--label-2)', fontWeight: 500 }}>{fav.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Visited */}
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Frequently Visited</h2>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {frequentlyVisited.map(site => (
                  <div key={site.name} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer'
                  }} onClick={() => navigateTo(site.name)}>
                    <div style={{
                      width: '70px', height: '70px', borderRadius: '14px',
                      background: site.bg, display: 'grid', placeItems: 'center',
                      fontSize: '28px', fontWeight: 300, color: site.bg === '#E8E8E6' ? '#1E1E1E' : 'white',
                      boxShadow: '0 2px 8px rgba(0,0,0,.06)'
                    }}>
                      {site.letter}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--label-2)', fontWeight: 500 }}>{site.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Privacy Report */}
              <div style={{
                padding: '16px', borderRadius: '12px',
                background: 'var(--window-bg)', display: 'flex', flexDirection: 'column', gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                  <span style={{ color: 'var(--accent)' }}>◐</span>
                  Privacy Report
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 200 }}>17</span>
                  <span style={{ fontSize: '12px', color: 'var(--label-2)' }}>trackers prevented from profiling you in the last seven days</span>
                </div>
              </div>

              {/* Reading List */}
              <div style={{
                padding: '16px', borderRadius: '12px',
                background: 'var(--window-bg)', display: 'flex', flexDirection: 'column', gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                  <span style={{ color: 'var(--accent)' }}>📑</span>
                  Reading List
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>Liquid Glass: Designing for Depth</div>
                  <div style={{ fontSize: '12px', color: 'var(--label-2)', marginTop: '2px' }}>Apple Developer · A new material that refracts its</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
