import React from 'react';
export default function AppleTV() {
  const featured = [
    { title: 'Severance', subtitle: 'Season 3 Now Streaming', color: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
    { title: 'Foundation', subtitle: 'The Epic Continues', color: 'linear-gradient(135deg, #0f3460, #533483)' },
    { title: 'Ted Lasso', subtitle: 'All Episodes Available', color: 'linear-gradient(135deg, #e94560, #0f3460)' },
  ];
  const rows = [
    { label: 'Trending Now', items: [
      { title: 'Killers of the Flower Moon', emoji: '🌻' },
      { title: 'Napoleon', emoji: '⚔️' },
      { title: 'The Morning Show', emoji: '☀️' },
      { title: 'For All Mankind', emoji: '🚀' },
      { title: 'Slow Horses', emoji: '🐎' },
    ]},
    { label: 'Apple Originals', items: [
      { title: 'Pachinko', emoji: '🎰' },
      { title: 'Shrinking', emoji: '🛋️' },
      { title: 'Silo', emoji: '🏗️' },
      { title: 'Invasion', emoji: '👽' },
      { title: 'Monarch', emoji: '🦋' },
    ]},
  ];
  return (
    <div style={{ height: '100%', background: '#1C1C1E', overflow: 'auto', color: 'white' }}>
      {/* Hero */}
      <div style={{ display: 'flex', gap: '12px', padding: '20px', overflow: 'auto' }}>
        {featured.map((f, i) => (
          <div key={i} style={{
            minWidth: '280px', height: '160px', borderRadius: '14px',
            background: f.color, padding: '20px', display: 'flex',
            flexDirection: 'column', justifyContent: 'flex-end', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,.3)'
          }}>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{f.title}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', marginTop: '4px' }}>{f.subtitle}</div>
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ padding: '0 20px 20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{row.label}</h3>
          <div style={{ display: 'flex', gap: '12px', overflow: 'auto' }}>
            {row.items.map((item, i) => (
              <div key={i} style={{
                minWidth: '130px', aspectRatio: '2/3', borderRadius: '10px',
                background: `linear-gradient(135deg, hsl(${(ri*5+i)*50}, 60%, 30%), hsl(${(ri*5+i)*50+30}, 50%, 20%))`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,.2)', gap: '8px'
              }}>
                <span style={{ fontSize: '36px' }}>{item.emoji}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, textAlign: 'center', padding: '0 8px' }}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
