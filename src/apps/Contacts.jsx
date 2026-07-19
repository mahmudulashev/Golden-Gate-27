import React, { useState } from 'react';
export default function Contacts() {
  const [selected, setSelected] = useState(0);
  const contacts = [
    { name: 'Alex Kim', phone: '+1 (408) 555-0142', email: 'alex.kim@icloud.com', title: 'Senior Engineer', company: 'Apple', avatar: 'A', color: '#007AFF' },
    { name: 'Maya Chen', phone: '+1 (415) 555-0198', email: 'maya@design.co', title: 'Design Lead', company: 'Figma', avatar: 'M', color: '#FF9500' },
    { name: 'Sam Rivera', phone: '+1 (650) 555-0176', email: 'sam.r@github.com', title: 'Product Manager', company: 'GitHub', avatar: 'S', color: '#34C759' },
    { name: 'Jordan Lee', phone: '+1 (510) 555-0134', email: 'jordan@startup.io', title: 'CTO', company: 'TechCorp', avatar: 'J', color: '#AF52DE' },
    { name: 'Taylor Brooks', phone: '+1 (831) 555-0167', email: 'taylor.b@email.com', title: 'Freelance Designer', company: '', avatar: 'T', color: '#FF2D55' },
  ];
  const c = contacts[selected];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '250px', borderRight: '1px solid var(--separator)', overflow: 'auto', background: 'rgba(242,242,247,.55)', backdropFilter: 'blur(20px) saturate(170%)', padding: '8px' }}>
        <div style={{ padding: '4px 8px', marginBottom: '8px', borderRadius: '8px', background: 'var(--control-bg)', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--separator)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)', width: '100%' }} />
        </div>
        {contacts.map((ct, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2px',
            display: 'flex', alignItems: 'center', gap: '10px',
            background: selected === i ? 'var(--accent)' : 'transparent',
          }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: ct.color, display: 'grid', placeItems: 'center', color: 'white', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{ct.avatar}</div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: selected === i ? 'white' : 'var(--label)' }}>{ct.name}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: 'var(--control-bg)', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: c.color, display: 'grid', placeItems: 'center', color: 'white', fontSize: '32px', fontWeight: 600, marginBottom: '12px' }}>{c.avatar}</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>{c.name}</h2>
        {c.title && <div style={{ fontSize: '13px', color: 'var(--label-2)' }}>{c.title}{c.company ? ` · ${c.company}` : ''}</div>}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', marginBottom: '24px' }}>
          {[{ label: 'message', icon: '💬' }, { label: 'call', icon: '📞' }, { label: 'video', icon: '📹' }, { label: 'mail', icon: '✉️' }].map(a => (
            <div key={a.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer',
              padding: '8px 16px', borderRadius: '10px', background: 'var(--window-bg)'
            }}>
              <span style={{ fontSize: '18px' }}>{a.icon}</span>
              <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 500, textTransform: 'capitalize' }}>{a.label}</span>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {[{ label: 'phone', value: c.phone }, { label: 'email', value: c.email }].map(field => (
            <div key={field.label} style={{ padding: '12px 0', borderBottom: '1px solid var(--separator)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: 'var(--label-2)', textTransform: 'capitalize' }}>{field.label}</span>
              <span style={{ fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
