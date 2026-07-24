import React, { useState } from 'react';

export default function EdgeApp() {
  const [url, setUrl] = useState('https://www.bing.com');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0F172A', color: 'white', fontFamily: 'SF Pro Display, sans-serif' }}>
      {/* Edge Toolbar */}
      <div style={{ padding: '8px 12px', background: '#1E293B', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '16px' }}>🌊</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, background: '#0F172A', border: '1px solid #475569', borderRadius: '16px', padding: '4px 14px', color: 'white', fontSize: '12px', outline: 'none' }}
        />
        <button style={{ background: 'linear-gradient(135deg, #0078D4, #00BCF2)', border: 'none', color: 'white', padding: '4px 12px', borderRadius: '14px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
          Copilot AI
        </button>
      </div>

      {/* Edge Web Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0F172A', padding: '20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, background: 'linear-gradient(90deg, #0078D4, #00BCF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
          Microsoft Edge
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '24px' }}>Fast, secure browser with integrated Copilot AI</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '480px', width: '100%' }}>
          {[
            { title: 'Bing Search', icon: '🔍', link: 'https://bing.com' },
            { title: 'Office 365', icon: '💼', link: 'https://office.com' },
            { title: 'MSN News', icon: '📰', link: 'https://msn.com' },
            { title: 'GitHub', icon: '💻', link: 'https://github.com' },
            { title: 'YouTube', icon: '▶️', link: 'https://youtube.com' },
            { title: 'Weather', icon: '☀️', link: 'https://weather.com' }
          ].map((item, i) => (
            <div key={i} onClick={() => setUrl(item.link)} style={{ background: '#1E293B', padding: '16px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
              <span style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 500 }}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
