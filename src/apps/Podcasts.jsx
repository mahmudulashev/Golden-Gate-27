import React, { useState } from 'react';
export default function Podcasts() {
  const [selectedTab, setSelectedTab] = useState('browse');
  const shows = [
    { title: 'Syntax — Web Dev', host: 'Wes Bos & Scott Tolinski', color: '#F5A623', emoji: '🎧' },
    { title: 'The Daily', host: 'The New York Times', color: '#1A1A2E', emoji: '📰' },
    { title: 'Accidental Tech Podcast', host: 'Marco Arment, Casey Liss', color: '#4B7BEC', emoji: '💻' },
    { title: 'Darknet Diaries', host: 'Jack Rhysider', color: '#2D3436', emoji: '🕵️' },
    { title: 'Huberman Lab', host: 'Andrew Huberman', color: '#00B894', emoji: '🧠' },
    { title: 'Lex Fridman Podcast', host: 'Lex Fridman', color: '#636E72', emoji: '🤖' },
  ];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="finder-sidebar" style={{ width: '180px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>Apple Podcasts</div>
        {['Listen Now', 'Browse', 'Search', 'Library', 'Downloaded'].map(t => (
          <div key={t} onClick={() => setSelectedTab(t.toLowerCase().replace(' ', '-'))} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px',
            background: selectedTab === t.toLowerCase().replace(' ', '-') ? 'var(--accent)' : 'transparent',
            color: selectedTab === t.toLowerCase().replace(' ', '-') ? 'white' : 'var(--label)',
          }}>{t}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: 'var(--control-bg)', overflow: 'auto', padding: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Browse</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {shows.map((show, i) => (
            <div key={i} style={{ cursor: 'pointer' }}>
              <div style={{
                aspectRatio: '1', borderRadius: '12px', background: show.color,
                display: 'grid', placeItems: 'center', fontSize: '48px',
                boxShadow: '0 4px 16px rgba(0,0,0,.12)', marginBottom: '8px'
              }}>{show.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>{show.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--label-2)' }}>{show.host}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
