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
      <div style={{ flex: 1, overflow: 'auto', padding: webContent ? 0 : '24px 32px', background: webContent ? '#fff' : 'var(--control-bg)' }}>
        {webContent ? (
          /* Render Simulated Page */
          (() => {
            const lowercaseWeb = String(webContent).toLowerCase();
            
            if (lowercaseWeb.includes('apple')) {
              return (
                <div style={{ background: '#000', color: '#fff', minHeight: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  {/* Apple Nav */}
                  <div style={{ background: 'rgba(22, 22, 23, 0.8)', backdropFilter: 'blur(20px)', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ cursor: 'pointer', opacity: 0.8 }}>🍎</span>
                    <span style={{ cursor: 'pointer', opacity: 0.8 }}>Store</span>
                    <span style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => navigateTo('apple.com/mac')}>Mac</span>
                    <span style={{ cursor: 'pointer', opacity: 0.8 }}>iPad</span>
                    <span style={{ cursor: 'pointer', opacity: 0.8 }}>iPhone</span>
                    <span style={{ cursor: 'pointer', opacity: 0.8 }}>Support</span>
                  </div>
                  {/* Apple Hero */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '50px 20px' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: 600, letterSpacing: '-0.5px' }}>macOS 27</h1>
                    <p style={{ fontSize: '18px', fontWeight: 400, color: '#86868b', marginTop: '6px' }}>Liquid Glass. Refracted. Perfectly Clear.</p>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                      <span onClick={() => navigateTo('wikipedia.org')} style={{ color: '#2997ff', cursor: 'pointer', fontSize: '14px' }}>Learn more &gt;</span>
                      <span onClick={() => navigateTo('github.com')} style={{ color: '#2997ff', cursor: 'pointer', fontSize: '14px' }}>Visit GitHub Repo &gt;</span>
                    </div>
                    <div style={{
                      width: '80%', height: '200px', marginTop: '30px', borderRadius: '16px',
                      background: 'radial-gradient(circle, rgba(98,186,70,0.18) 0%, rgba(0,122,255,0.18) 50%, rgba(165,80,167,0.18) 100%)',
                      border: '1px solid rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center'
                    }}>
                      <div style={{ textShadow: '0 4px 20px rgba(255,255,255,0.4)', fontSize: '56px' }}></div>
                    </div>
                  </div>
                </div>
              );
            }
            
            if (lowercaseWeb.includes('wikipedia')) {
              return (
                <div style={{ background: '#fff', color: '#202122', padding: '24px', minHeight: '100%', fontFamily: 'sans-serif' }}>
                  <div style={{ display: 'flex', borderBottom: '1px solid #a2a9b1', paddingBottom: '8px', marginBottom: '16px', alignItems: 'baseline', gap: '15px' }}>
                    <span style={{ fontSize: '28px', fontFamily: 'Georgia, serif' }}>W</span>
                    <div style={{ fontSize: '22px', fontFamily: 'Georgia, serif' }}>Glassmorphism UI</div>
                  </div>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                    <b>Glassmorphism UI</b> (often referred to as <i>Liquid Glass</i> in later revisions like macOS 27) is a visual design trend characterized by translucent, frosted-glass-like elements, floating components, and vibrant, colorful background blurs.
                  </p>
                  <h3 style={{ fontSize: '16px', borderBottom: '1px solid #c8ccd1', marginTop: '20px', paddingBottom: '4px' }}>History</h3>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.6, marginTop: '8px' }}>
                    The origin of frosted glass interfaces dates back to Windows Vista (Aero) and iOS 7. However, with macOS Big Sur, Apple introduced deep backdrop-filters and light saturating borders. In macOS 27, this evolved into <i>Liquid Glass</i>, which dynamically warps behind windows based on cursor proximity and ambient lighting.
                  </p>
                </div>
              );
            }
            
            if (lowercaseWeb.includes('github')) {
              return (
                <div style={{ background: '#0d1117', color: '#c9d1d9', minHeight: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
                  <div style={{ background: '#161b22', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #30363d' }}>
                    <span style={{ fontSize: '20px' }}>🐙</span>
                    <strong style={{ color: '#f0f6fc' }}>github.com</strong>
                    <span style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', color: '#8b949e' }}>Search GitHub</span>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '18px', alignItems: 'center' }}>
                      <span style={{ color: '#58a6ff' }}>kimi</span>
                      <span style={{ color: '#8b949e' }}>/</span>
                      <strong style={{ color: '#f0f6fc' }}>macos-27-liquid-glass</strong>
                      <span style={{ background: 'rgba(56,139,253,0.15)', border: '1px solid rgba(56,139,253,0.4)', borderRadius: '2em', padding: '0 7px', fontSize: '11px', color: '#58a6ff' }}>Public</span>
                    </div>
                    <p style={{ marginTop: '10px', fontSize: '13.5px', color: '#8b949e' }}>
                      A pixel-perfect macOS 27 simulation with custom liquid glass blurs, neofetch, maps, widgets, music, terminal, and Safari search!
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '20px', fontSize: '11.5px', color: '#8b949e' }}>
                      <span>⭐ <strong>12.8k</strong> stars</span>
                      <span>🍴 <strong>1.4k</strong> forks</span>
                      <span>👁️ <strong>245</strong> watching</span>
                    </div>
                  </div>
                </div>
              );
            }
            
            if (lowercaseWeb.includes('ycombinator') || lowercaseWeb.includes('hacker')) {
              return (
                <div style={{ background: '#f6f6ef', color: '#222', minHeight: '100%', fontFamily: 'Verdana, Geneva, sans-serif', padding: '8px' }}>
                  <table style={{ width: '100%', background: '#ff6600', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: '2px', width: '18px' }}>
                          <span style={{ border: '1px solid white', color: 'white', padding: '0 2px', fontWeight: 'bold', fontSize: '12px' }}>Y</span>
                        </td>
                        <td style={{ padding: '2px', fontWeight: 'bold', fontSize: '12px' }}>
                          Hacker News
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ol style={{ fontSize: '12px', paddingLeft: '20px', marginTop: '10px' }}>
                    {[
                      { title: 'macOS 27 "Liquid Glass" released in web browser', points: 412, author: 'kimi', time: '3 hours ago', link: 'apple.com' },
                      { title: 'Show HN: Backdrop blurs running at 60fps using custom CSS keyframes', points: 189, author: 'antigravity', time: '5 hours ago', link: 'github.com' },
                      { title: 'Why skeuomorphism is returning to Apple platforms', points: 275, author: 'design_guy', time: '8 hours ago', link: 'wikipedia.org' },
                      { title: 'Vite 8 is out — faster compilation and smaller chunks', points: 89, author: 'evan_you', time: '10 hours ago', link: 'github.com' }
                    ].map((story, i) => (
                      <li key={i} style={{ marginBottom: '8px', color: '#828282' }}>
                        <span onClick={() => navigateTo(story.link)} style={{ color: '#000', cursor: 'pointer', textDecoration: 'underline' }}>{story.title}</span>
                        <div style={{ fontSize: '9.5px', marginTop: '2px' }}>
                          {story.points} points by {story.author} {story.time} | 42 comments
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            }

            /* Default Search Engine Results */
            return (
              <div style={{ background: '#fff', color: '#222', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '36px' }}>🔍</span>
                  <span style={{ fontSize: '26px', fontWeight: 'bold', letterSpacing: '-1px' }}>SearchOS</span>
                </div>
                <div style={{ width: '400px', border: '1px solid #dfe1e5', borderRadius: '24px', padding: '8px 16px', display: 'flex', gap: '10px', alignItems: 'center', boxShadow: '0 1px 6px rgba(32,33,36,0.1)', background: '#fff' }}>
                  <input type="text" defaultValue={webContent} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '15px' }} />
                </div>
                <div style={{ marginTop: '20px', width: '100%', maxWidth: '560px', padding: '0 20px', textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#70757a', marginBottom: '14px' }}>About 1,420,000 results (0.12 seconds)</div>
                  {[
                    { t: 'macOS 27 Liquid Glass - Official Site', d: 'Experience the new translucent glass design system. Complete with custom widget setups, terminal zsh simulation, and immersive blurs.', url: 'apple.com' },
                    { t: 'Glassmorphism UI: Design guidelines for web applications', d: 'How to implement the backdrop-filter property in CSS to create beautiful, realistic glass panels that scale down smoothly.', url: 'wikipedia.org' },
                    { t: 'GitHub Repo for macOS 27 simulation', d: 'Contribute to the macos-27 browser simulation built using Vite + React. Free and open source on GitHub.', url: 'github.com' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '11px', color: '#202124' }}>{item.url}</div>
                      <h3 style={{ fontSize: '16px', color: '#1a0dab', fontWeight: 400, marginTop: '2px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigateTo(item.url)}>{item.t}</h3>
                      <p style={{ fontSize: '12.5px', color: '#4d5156', marginTop: '4px', lineHeight: 1.4 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
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
