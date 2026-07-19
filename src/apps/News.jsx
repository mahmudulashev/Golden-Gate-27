import React, { useState } from 'react';
export default function News() {
  const [selectedTab, setSelectedTab] = useState('today');
  const stories = [
    { title: 'Apple Unveils macOS 27 with Revolutionary Liquid Glass Design', source: 'Apple Newsroom', time: '2h ago', category: 'Technology', color: '#FF3B30', emoji: '🍎' },
    { title: 'Global Markets React to Tech Earnings Season', source: 'Bloomberg', time: '3h ago', category: 'Business', color: '#007AFF', emoji: '📈' },
    { title: 'NASA\'s Artemis III Mission Update: Moon Landing on Track', source: 'Space.com', time: '4h ago', category: 'Science', color: '#34C759', emoji: '🚀' },
    { title: 'How AI is Reshaping Creative Industries in 2026', source: 'The Verge', time: '5h ago', category: 'Technology', color: '#AF52DE', emoji: '🤖' },
    { title: 'Premier League Transfer Window: Latest Signings', source: 'ESPN', time: '6h ago', category: 'Sports', color: '#FF9500', emoji: '⚽' },
    { title: 'New Study Links Mediterranean Diet to Longevity', source: 'Nature', time: '8h ago', category: 'Health', color: '#5AC8FA', emoji: '🥗' },
  ];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="finder-sidebar" style={{ width: '180px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>News</div>
        {['Today', 'News+', 'Sports', 'Audio', 'Following', 'Saved'].map(t => (
          <div key={t} onClick={() => setSelectedTab(t.toLowerCase())} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px',
            background: selectedTab === t.toLowerCase() ? 'var(--accent)' : 'transparent',
            color: selectedTab === t.toLowerCase() ? 'white' : 'var(--label)',
          }}>{t}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: 'var(--control-bg)', overflow: 'auto', padding: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>Today</h2>
        <div style={{ fontSize: '13px', color: 'var(--label-2)', marginBottom: '20px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        {/* Featured */}
        <div style={{
          padding: '20px', borderRadius: '14px', marginBottom: '16px',
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          color: 'white', cursor: 'pointer'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#FF3B30', marginBottom: '6px' }}>TOP STORY</div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>{stories[0].title}</h3>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)' }}>{stories[0].source} · {stories[0].time}</div>
        </div>
        {/* Story list */}
        {stories.slice(1).map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: '14px', padding: '14px 0',
            borderBottom: '1px solid var(--separator)', cursor: 'pointer'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '10px',
              background: s.color, display: 'grid', placeItems: 'center',
              fontSize: '28px', flexShrink: 0
            }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: s.color, marginBottom: '4px', textTransform: 'uppercase' }}>{s.category}</div>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', lineHeight: '1.3' }}>{s.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--label-2)' }}>{s.source} · {s.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
