import React, { useState } from 'react';

export default function Mail() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(0);

  const folders = [
    { id: 'inbox', label: 'Inbox', count: 4, icon: '📥' },
    { id: 'drafts', label: 'Drafts', count: 1, icon: '📝' },
    { id: 'sent', label: 'Sent', count: 0, icon: '📤' },
    { id: 'junk', label: 'Junk', count: 0, icon: '🗑️' },
    { id: 'archive', label: 'Archive', count: 0, icon: '📦' },
    { id: 'flagged', label: 'Flagged', count: 2, icon: '🚩' },
  ];

  const emails = [
    { from: 'Maya Chen', subject: 'Re: Q3 Planning Updates', preview: 'Hey! I\'ve reviewed the timeline and everything looks solid. Let me know if you need the budget...', time: '11:02 AM', unread: true, flagged: true },
    { from: 'GitHub', subject: '[liquid-glass] PR #142 merged', preview: 'Your pull request "Implement SVG refraction filter" has been merged into main...', time: '10:15 AM', unread: true },
    { from: 'App Store Connect', subject: 'Your app is ready for sale', preview: 'The review of your app "Liquid Glass Demo" for macOS 27 is complete...', time: '9:30 AM', unread: true },
    { from: 'Design Team', subject: 'Updated Figma — Liquid Glass components', preview: 'Hi team, I\'ve updated the shared Figma file with the latest Liquid Glass design tokens...', time: 'Yesterday', unread: false },
    { from: 'Apple Developer', subject: 'WWDC26 Session Videos Available', preview: 'New sessions are now available on Apple Developer including "What\'s new in SwiftUI"...', time: 'Jul 15', unread: false },
  ];

  const email = emails[selectedEmail];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div className="finder-sidebar" style={{ width: '160px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>Mailboxes</div>
        {folders.map(f => (
          <div key={f.id} onClick={() => setSelectedFolder(f.id)} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px',
            background: selectedFolder === f.id ? 'var(--accent)' : 'transparent',
            color: selectedFolder === f.id ? 'white' : 'var(--label)',
          }}>
            <span style={{ fontSize: '12px' }}>{f.icon}</span>
            <span style={{ flex: 1 }}>{f.label}</span>
            {f.count > 0 && <span style={{ fontSize: '11px', color: selectedFolder === f.id ? 'rgba(255,255,255,.7)' : 'var(--accent)', fontWeight: 600 }}>{f.count}</span>}
          </div>
        ))}
      </div>

      {/* Email List */}
      <div style={{ width: '250px', borderRight: '1px solid var(--separator)', overflow: 'auto', padding: '8px', background: 'var(--control-bg)' }}>
        {emails.map((e, i) => (
          <div key={i} onClick={() => setSelectedEmail(i)} style={{
            padding: '10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2px',
            background: selectedEmail === i ? 'var(--accent)' : 'transparent',
            color: selectedEmail === i ? 'white' : 'var(--label)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontWeight: e.unread ? 700 : 400, fontSize: '13px' }}>{e.from}</span>
              <span style={{ fontSize: '10px', color: selectedEmail === i ? 'rgba(255,255,255,.7)' : 'var(--label-3)' }}>{e.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {e.unread && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedEmail === i ? 'white' : 'var(--accent)', flexShrink: 0 }} />}
              <div style={{ fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.subject}</div>
            </div>
            <div style={{ fontSize: '11px', color: selectedEmail === i ? 'rgba(255,255,255,.6)' : 'var(--label-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
              {e.preview}
            </div>
          </div>
        ))}
      </div>

      {/* Email Content */}
      <div style={{ flex: 1, background: 'var(--control-bg)', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
          borderBottom: '1px solid var(--separator)', flexShrink: 0
        }}>
          {['↩ Reply', '↩↩ Reply All', '↪ Forward', '🗑️ Delete', '🏳️ Flag'].map(action => (
            <button key={action} style={{
              background: 'var(--window-bg)', border: '1px solid var(--separator)',
              borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
              fontSize: '11px', color: 'var(--label)', fontFamily: 'var(--font-ui)'
            }}>{action}</button>
          ))}
        </div>

        {/* Email header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--separator)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{email.subject}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'grid', placeItems: 'center', color: 'white',
              fontSize: '16px', fontWeight: 600
            }}>
              {email.from[0]}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{email.from}</div>
              <div style={{ fontSize: '12px', color: 'var(--label-2)' }}>To: kimi@icloud.com · {email.time}</div>
            </div>
          </div>
        </div>

        {/* Email body */}
        <div style={{ padding: '20px', flex: 1, fontSize: '14px', lineHeight: '1.7' }}>
          <p>{email.preview}</p>
          <p style={{ marginTop: '12px', color: 'var(--label-2)' }}>
            Looking forward to our next sync. Let me know if anything changes on your end.
          </p>
          <p style={{ marginTop: '12px' }}>Best regards,<br/>{email.from}</p>
        </div>
      </div>
    </div>
  );
}
