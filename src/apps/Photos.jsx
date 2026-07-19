import React, { useState } from 'react';
export default function Photos() {
  const [selectedTab, setSelectedTab] = useState('library');
  const photos = [
    { color: '#FF6B6B', label: 'Sunset' }, { color: '#4ECDC4', label: 'Ocean' },
    { color: '#45B7D1', label: 'Sky' }, { color: '#96CEB4', label: 'Forest' },
    { color: '#FFEAA7', label: 'Beach' }, { color: '#DDA0DD', label: 'Flowers' },
    { color: '#87CEEB', label: 'Mountains' }, { color: '#F0E68C', label: 'Desert' },
    { color: '#98D8C8', label: 'Lake' }, { color: '#F7DC6F', label: 'Fields' },
    { color: '#BB8FCE', label: 'Lavender' }, { color: '#85C1E9', label: 'Clouds' },
    { color: '#F1948A', label: 'Sunrise' }, { color: '#82E0AA', label: 'Garden' },
    { color: '#F8C471', label: 'Autumn' }, { color: '#AED6F1', label: 'Winter' },
  ];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="finder-sidebar" style={{ width: '170px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>Library</div>
        {['Library', 'Memories', 'Favorites', 'People', 'Places', 'Recents'].map(t => (
          <div key={t} onClick={() => setSelectedTab(t.toLowerCase())} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px',
            background: selectedTab === t.toLowerCase() ? 'var(--accent)' : 'transparent',
            color: selectedTab === t.toLowerCase() ? 'white' : 'var(--label)',
          }}>{t}</div>
        ))}
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase', marginTop: '8px' }}>Albums</div>
        {['Travel 2026', 'Screenshots', 'Wallpapers'].map(a => (
          <div key={a} style={{ padding: '4px 14px', cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px', color: 'var(--label)' }}>{a}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: 'var(--control-bg)', overflow: 'auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Library</h2>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Days', 'Months', 'Years', 'All Photos'].map(v => (
              <button key={v} style={{ background: v === 'All Photos' ? 'var(--accent)' : 'var(--window-bg)', color: v === 'All Photos' ? 'white' : 'var(--label)', border: '1px solid var(--separator)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)' }}>{v}</button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--label-2)', marginBottom: '8px' }}>July 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '3px' }}>
          {photos.map((p, i) => (
            <div key={i} style={{
              aspectRatio: '1', background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`,
              borderRadius: '2px', cursor: 'pointer', display: 'grid', placeItems: 'center',
              fontSize: '22px', transition: 'transform .1s', overflow: 'hidden'
            }} title={p.label}>
              {['🌅','🌊','⛅','🌲','🏖️','🌸','⛰️','🏜️','🏞️','🌾','💐','☁️','🌄','🌻','🍂','❄️'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
