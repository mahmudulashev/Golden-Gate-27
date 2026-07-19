import React from 'react';
export default function Maps() {
  return (
    <div style={{ height: '100%', background: '#F0EEE6', position: 'relative', overflow: 'hidden' }}>
      {/* Simulated map */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(135deg, #D4E7D4 0%, #E8E4D4 25%, #D4DAE7 50%, #E4D4D4 75%, #D4E7D4 100%),
          repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,0,0,.03) 60px, rgba(0,0,0,.03) 61px),
          repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,.03) 60px, rgba(0,0,0,.03) 61px)
        `,
      }}>
        {/* Roads */}
        <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: '8px', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,.08)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '60%', width: '8px', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,.08)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '20%', right: '50%', height: '4px', background: '#FFD700', transform: 'rotate(-15deg)' }} />
        <div style={{ position: 'absolute', top: '70%', left: '10%', right: '30%', height: '5px', background: 'white', transform: 'rotate(5deg)' }} />

        {/* Water */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '40%', height: '30%',
          background: 'linear-gradient(135deg, #A8D8EA, #88C8E0)',
          borderTopRightRadius: '100px', opacity: 0.7
        }} />

        {/* Park */}
        <div style={{
          position: 'absolute', top: '15%', right: '15%', width: '100px', height: '80px',
          background: '#B8D4A0', borderRadius: '30px', opacity: 0.6
        }} />

        {/* Pin */}
        <div style={{
          position: 'absolute', top: 'calc(40% - 30px)', left: 'calc(60% - 12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer'
        }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50% 50% 50% 0',
            background: '#FF3B30', transform: 'rotate(-45deg)',
            display: 'grid', placeItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.25)'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', transform: 'rotate(45deg)' }} />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px', right: '60px',
        padding: '8px 14px', borderRadius: '12px',
        background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(20px)',
        boxShadow: '0 2px 12px rgba(0,0,0,.12)',
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search Maps" defaultValue="Cupertino, CA" style={{
          background: 'none', border: 'none', outline: 'none', flex: 1,
          fontSize: '14px', color: '#1E1E1E', fontFamily: 'var(--font-ui)'
        }} />
      </div>

      {/* Zoom controls */}
      <div style={{
        position: 'absolute', bottom: '16px', right: '16px',
        display: 'flex', flexDirection: 'column', gap: '1px',
        borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.12)'
      }}>
        <button style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,.9)', border: 'none', cursor: 'pointer', fontSize: '18px' }}>+</button>
        <button style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,.9)', border: 'none', cursor: 'pointer', fontSize: '18px' }}>−</button>
      </div>

      {/* Location info card */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '16px',
        padding: '12px 16px', borderRadius: '12px',
        background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 16px rgba(0,0,0,.12)', maxWidth: '220px'
      }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#1E1E1E' }}>Apple Park</div>
        <div style={{ fontSize: '12px', color: '#8E8E93', marginTop: '2px' }}>One Apple Park Way</div>
        <div style={{ fontSize: '12px', color: '#8E8E93' }}>Cupertino, CA 95014</div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button style={{
            background: '#007AFF', color: 'white', border: 'none',
            padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 500
          }}>Directions</button>
          <button style={{
            background: '#E5E5EA', color: '#1E1E1E', border: 'none',
            padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 500
          }}>More Info</button>
        </div>
      </div>
    </div>
  );
}
