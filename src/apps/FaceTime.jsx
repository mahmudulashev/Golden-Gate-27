import React from 'react';
export default function FaceTime() {
  return (
    <div style={{ height: '100%', background: '#1C1C1E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>📹</div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>FaceTime</h2>
      <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '14px', marginBottom: '28px', textAlign: 'center', maxWidth: '300px' }}>
        Start a video or audio call with anyone
      </p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
        <button style={{ padding: '10px 24px', borderRadius: '12px', background: '#34C759', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          📹 New FaceTime
        </button>
        <button style={{ padding: '10px 24px', borderRadius: '12px', background: '#636366', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}>
          Create Link
        </button>
      </div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.3)', marginBottom: '20px' }}>Recent Calls</div>
      {[
        { name: 'Maya Chen', time: 'Today, 3:42 PM', type: '📹', duration: '12 min' },
        { name: 'Alex Kim', time: 'Yesterday, 1:15 PM', type: '📞', duration: '5 min' },
        { name: 'Design Team', time: 'Jul 16, 10:00 AM', type: '📹', duration: '45 min' },
      ].map((call, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px',
          width: '340px', borderRadius: '10px', cursor: 'pointer', marginBottom: '4px',
          background: 'rgba(255,255,255,.06)'
        }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: ['#007AFF','#FF9500','#34C759'][i], display: 'grid', placeItems: 'center', fontSize: '14px', fontWeight: 700 }}>{call.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{call.name}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)' }}>{call.time} · {call.duration}</div>
          </div>
          <span style={{ fontSize: '18px' }}>{call.type}</span>
        </div>
      ))}
    </div>
  );
}
