import React, { useState } from 'react';

export default function IPhoneMirroringApp() {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#090A0F', padding: '16px' }}>
      {/* iPhone 16 Pro Frame */}
      <div style={{
        width: '280px', height: '540px', background: '#000', borderRadius: '44px',
        border: '4px solid #333', boxShadow: '0 12px 40px rgba(0,0,0,0.8), inset 0 0 0 2px #222',
        position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80')",
        backgroundSize: 'cover', backgroundPosition: 'center', userSelect: 'none'
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
          width: '85px', height: '24px', background: '#000', borderRadius: '20px', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0b1d3a', border: '1px solid #1a365d' }} />
        </div>

        {/* Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px 4px', fontSize: '11px', color: 'white', fontWeight: 600 }}>
          <span>13:52</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span>5G</span>
            <span>🔋100%</span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
          {activeApp ? (
            <div style={{ flex: 1, background: '#1C1C1E', borderRadius: '20px', padding: '16px', color: 'white', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>{activeApp}</span>
                <button onClick={() => setActiveApp(null)} style={{ background: '#333', border: 'none', color: 'white', borderRadius: '12px', padding: '2px 10px', fontSize: '11px', cursor: 'pointer' }}>✕ Back</button>
              </div>
              <div style={{ fontSize: '12px', color: '#AAA' }}>
                iPhone Mirroring active. Interacting with {activeApp} on iPhone 16 Pro.
              </div>
            </div>
          ) : (
            <div>
              {/* Widgets */}
              <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(15px)', borderRadius: '18px', padding: '12px', color: 'white', marginBottom: '20px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>WEATHER</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>24°C Sunny</div>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>Tashkent, Uzbekistan</div>
              </div>

              {/* App Icons Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', justifyItems: 'center' }}>
                {[
                  { name: 'Photos', icon: '🖼️', bg: '#fff' },
                  { name: 'Camera', icon: '📷', bg: '#444' },
                  { name: 'Messages', icon: '💬', bg: '#34C759' },
                  { name: 'Notes', icon: '📝', bg: '#FFCC00' },
                  { name: 'Settings', icon: '⚙️', bg: '#8E8E93' },
                  { name: 'Music', icon: '🎵', bg: '#FF2D55' },
                  { name: 'Maps', icon: '🗺️', bg: '#007AFF' },
                  { name: 'Safari', icon: '🧭', bg: '#007AFF' }
                ].map((app, i) => (
                  <div key={i} onClick={() => setActiveApp(app.name)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: app.bg, display: 'grid', placeItems: 'center', fontSize: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                      {app.icon}
                    </div>
                    <span style={{ fontSize: '10px', color: 'white', marginTop: '4px', fontWeight: 500 }}>{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Home Bar Indicator */}
        <div style={{ height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '4px', background: 'white', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  );
}
