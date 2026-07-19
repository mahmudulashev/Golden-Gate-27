import React, { useState } from 'react';
export default function AppStore() {
  const [selectedTab, setSelectedTab] = useState('discover');
  const apps = [
    { name: 'Notion', desc: 'Notes, Docs, Projects', color: '#1E1E1E', emoji: '📝', price: 'Free' },
    { name: 'Figma', desc: 'Design & Prototype', color: '#1E1E1E', emoji: '🎨', price: 'Free' },
    { name: 'Slack', desc: 'Business Communication', color: '#4A154B', emoji: '💬', price: 'Free' },
    { name: '1Password', desc: 'Password Manager', color: '#0572EC', emoji: '🔐', price: '$2.99/mo' },
    { name: 'Things 3', desc: 'Task Manager', color: '#4E79A7', emoji: '✅', price: '$49.99' },
    { name: 'Pixelmator Pro', desc: 'Image Editor', color: '#34C759', emoji: '🖼️', price: '$49.99' },
  ];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="finder-sidebar" style={{ width: '170px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>App Store</div>
        {['Discover', 'Arcade', 'Create', 'Work', 'Play', 'Develop', 'Categories', 'Updates'].map(t => (
          <div key={t} onClick={() => setSelectedTab(t.toLowerCase())} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px',
            background: selectedTab === t.toLowerCase() ? 'var(--accent)' : 'transparent',
            color: selectedTab === t.toLowerCase() ? 'white' : 'var(--label)',
          }}>{t}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: 'var(--control-bg)', overflow: 'auto', padding: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>Discover</h2>
        <div style={{ fontSize: '13px', color: 'var(--label-2)', marginBottom: '20px' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        {/* Featured Banner */}
        <div style={{
          padding: '24px', borderRadius: '14px', marginBottom: '20px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white', cursor: 'pointer'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, opacity: .7, marginBottom: '6px' }}>FEATURED</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Best Apps for macOS 27</h3>
          <div style={{ fontSize: '14px', opacity: .8 }}>Apps reimagined for the new Liquid Glass design language</div>
        </div>
        {/* App grid */}
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Essential Apps</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {apps.map((app, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
              borderRadius: '10px', cursor: 'pointer', borderBottom: '1px solid var(--separator)'
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '12px',
                background: app.color, display: 'grid', placeItems: 'center',
                fontSize: '26px', boxShadow: '0 2px 8px rgba(0,0,0,.12)'
              }}>{app.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{app.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--label-2)' }}>{app.desc}</div>
              </div>
              <button style={{
                background: 'var(--window-bg)', border: '1px solid var(--separator)',
                borderRadius: '14px', padding: '4px 16px', cursor: 'pointer',
                fontSize: '12px', fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-ui)'
              }}>{app.price === 'Free' ? 'GET' : app.price}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
