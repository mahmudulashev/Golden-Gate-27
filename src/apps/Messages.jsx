import React, { useState } from 'react';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMsg, setNewMsg] = useState('');

  const chats = [
    { name: 'Maya Chen', avatar: 'M', color: '#007AFF', lastMsg: 'See you at the review! 👋', time: '11:02 AM', unread: 1 },
    { name: 'Design Team', avatar: 'DT', color: '#34C759', lastMsg: 'Updated the Figma file with new components', time: '10:15 AM', unread: 0 },
    { name: 'Alex Kim', avatar: 'A', color: '#FF9500', lastMsg: 'That PR looks great, merging now', time: 'Yesterday', unread: 0 },
    { name: 'Mom', avatar: '❤️', color: '#FF2D55', lastMsg: 'Don\'t forget dinner on Sunday!', time: 'Jul 16', unread: 0 },
    { name: 'Sam Rivera', avatar: 'S', color: '#AF52DE', lastMsg: 'Sent you the playlist 🎵', time: 'Jul 14', unread: 0 },
  ];

  const messages = [
    [
      { from: 'them', text: 'Hey! Are you joining the design review at 4?' },
      { from: 'me', text: 'Yes! Just wrapping up the Liquid Glass prototype' },
      { from: 'them', text: 'Perfect. I\'ve prepared the comparison slides' },
      { from: 'me', text: 'Awesome, can\'t wait to see them 🎨' },
      { from: 'them', text: 'See you at the review! 👋' },
    ],
    [
      { from: 'them', text: 'Hey everyone, I\'ve pushed the latest design tokens to the shared Figma file' },
      { from: 'me', text: 'Thanks! The glass blur values look much better now' },
      { from: 'them', text: 'Updated the Figma file with new components' },
    ],
    [
      { from: 'them', text: 'Just reviewed your refraction filter PR' },
      { from: 'them', text: 'The feTurbulence approach is clever!' },
      { from: 'me', text: 'Thanks! Took a while to get the displacement right' },
      { from: 'them', text: 'That PR looks great, merging now' },
    ],
  ];

  const chat = chats[selectedChat];
  const chatMessages = messages[selectedChat] || [{ from: 'them', text: chat.lastMsg }];

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setNewMsg('');
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Chat list */}
      <div style={{
        width: '250px', borderRight: '1px solid var(--separator)',
        overflow: 'auto', background: 'rgba(242,242,247,.55)',
        backdropFilter: 'blur(20px) saturate(170%)', padding: '8px'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 10px', borderRadius: '8px', background: 'var(--control-bg)',
          border: '1px solid var(--separator)', marginBottom: '8px'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search" style={{
            background: 'none', border: 'none', outline: 'none',
            fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)', width: '100%'
          }} />
        </div>

        {chats.map((c, i) => (
          <div key={i} onClick={() => setSelectedChat(i)} style={{
            padding: '10px', borderRadius: '10px', cursor: 'pointer', marginBottom: '2px',
            display: 'flex', gap: '10px', alignItems: 'center',
            background: selectedChat === i ? 'var(--accent)' : 'transparent',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: c.color, display: 'grid', placeItems: 'center',
              color: 'white', fontSize: '14px', fontWeight: 700, flexShrink: 0
            }}>{c.avatar}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontWeight: 600, fontSize: '13px',
                  color: selectedChat === i ? 'white' : 'var(--label)'
                }}>{c.name}</span>
                <span style={{ fontSize: '10px', color: selectedChat === i ? 'rgba(255,255,255,.6)' : 'var(--label-3)' }}>{c.time}</span>
              </div>
              <div style={{
                fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                color: selectedChat === i ? 'rgba(255,255,255,.7)' : 'var(--label-2)',
                marginTop: '1px'
              }}>{c.lastMsg}</div>
            </div>
            {c.unread > 0 && (
              <div style={{
                background: selectedChat === i ? 'white' : 'var(--accent)',
                color: selectedChat === i ? 'var(--accent)' : 'white',
                borderRadius: '50%', width: '18px', height: '18px',
                display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 700
              }}>{c.unread}</div>
            )}
          </div>
        ))}
      </div>

      {/* Chat view */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--control-bg)' }}>
        {/* Header */}
        <div style={{
          padding: '10px 16px', borderBottom: '1px solid var(--separator)',
          display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0
        }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: chat.color, display: 'grid', placeItems: 'center',
            color: 'white', fontSize: '12px', fontWeight: 700
          }}>{chat.avatar}</div>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>{chat.name}</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {chatMessages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '65%', padding: '8px 14px', borderRadius: '18px',
                background: msg.from === 'me' ? 'var(--accent)' : 'var(--window-bg)',
                color: msg.from === 'me' ? 'white' : 'var(--label)',
                fontSize: '14px', lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} style={{
          padding: '8px 16px', borderTop: '1px solid var(--separator)',
          display: 'flex', gap: '8px', flexShrink: 0
        }}>
          <input
            type="text" value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="iMessage"
            style={{
              flex: 1, padding: '8px 14px', borderRadius: '18px',
              background: 'var(--window-bg)', border: '1px solid var(--separator)',
              outline: 'none', fontSize: '14px', color: 'var(--label)',
              fontFamily: 'var(--font-ui)'
            }}
          />
          <button type="submit" style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: newMsg.trim() ? 'var(--accent)' : 'var(--label-3)',
            border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center',
            color: 'white', fontSize: '16px'
          }}>↑</button>
        </form>
      </div>
    </div>
  );
}
