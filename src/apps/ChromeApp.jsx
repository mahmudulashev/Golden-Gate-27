import React, { useState } from 'react';

export default function ChromeApp() {
  const [url, setUrl] = useState('https://www.google.com');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#202124', color: '#E8EAED', fontFamily: 'SF Pro Text, sans-serif' }}>
      {/* Chrome Navigation Bar */}
      <div style={{ padding: '8px 12px', background: '#292A2D', borderBottom: '1px solid #3C4043', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ background: 'none', border: 'none', color: '#9AA0A6', cursor: 'pointer' }}>◀</button>
          <button style={{ background: 'none', border: 'none', color: '#9AA0A6', cursor: 'pointer' }}>▶</button>
          <button style={{ background: 'none', border: 'none', color: '#9AA0A6', cursor: 'pointer' }}>🔄</button>
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, background: '#202124', border: '1px solid #5F6368', borderRadius: '16px', padding: '4px 14px', color: 'white', fontSize: '12px', outline: 'none' }}
        />
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8AB4F8', color: '#202124', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 700 }}>M</div>
      </div>

      {/* Chrome Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px' }}>
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC04' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </h1>

        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', background: '#303134', border: '1px solid #5F6368', borderRadius: '24px', padding: '8px 16px', marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Search Google or type a URL"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '14px' }}
          />
          <span>🔍</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { name: 'YouTube', icon: '▶️' },
            { name: 'Gmail', icon: '✉️' },
            { name: 'Drive', icon: '📁' },
            { name: 'GitHub', icon: '💻' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#303134', display: 'grid', placeItems: 'center', fontSize: '22px', marginBottom: '8px' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '12px', color: '#BDC1C6' }}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
