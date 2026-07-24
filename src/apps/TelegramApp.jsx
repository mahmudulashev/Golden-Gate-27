import React, { useState } from 'react';

export default function TelegramApp() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [chats, setChats] = useState([
    {
      id: 0, name: 'Mahmud Ulashev', avatar: '💻', status: 'online',
      messages: [
        { sender: 'them', text: 'Hey! The lock screen design looks fantastic 🔥', time: '13:45' },
        { sender: 'me', text: 'Thanks! All apps are now functioning smoothly.', time: '13:46' }
      ]
    },
    {
      id: 1, name: 'Dev_Yut_Student 🚀', avatar: '🎓', status: '124 members',
      messages: [
        { sender: 'them', text: 'React 19 update deployed to production!', time: '12:30' },
        { sender: 'me', text: 'Awesome news!', time: '12:35' }
      ]
    },
    {
      id: 2, name: 'Saved Messages 📌', avatar: '🔖', status: 'cloud storage',
      messages: [
        { sender: 'me', text: 'macOS Golden Gate 27 release checklist completed.', time: '11:15' }
      ]
    }
  ]);
  const [text, setText] = useState('');

  const activeChat = chats[selectedChat];

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setChats(prev => prev.map((c, i) => i === selectedChat ? {
      ...c,
      messages: [...c.messages, { sender: 'me', text, time: timeStr }]
    } : c));
    setText('');
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#17212B', color: '#F5F5F5', fontFamily: 'SF Pro Text, sans-serif' }}>
      {/* Chats Sidebar */}
      <div style={{ width: '260px', background: '#17212B', borderRight: '1px solid #0E1621', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px', background: '#17212B', borderBottom: '1px solid #0E1621' }}>
          <input
            type="text"
            placeholder="Search chats..."
            style={{ width: '100%', background: '#242F3D', border: 'none', borderRadius: '18px', padding: '6px 14px', color: 'white', fontSize: '12px', outline: 'none' }}
          />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {chats.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setSelectedChat(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                background: selectedChat === i ? '#2B5278' : 'transparent', cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.03)'
              }}
            >
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#2B5278', display: 'grid', placeItems: 'center', fontSize: '18px' }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: '#8897A4', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginTop: '2px' }}>
                  {c.messages[c.messages.length - 1]?.text || c.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0E1621' }}>
        {/* Chat Header */}
        <div style={{ padding: '10px 16px', background: '#17212B', borderBottom: '1px solid #0E1621', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2B5278', display: 'grid', placeItems: 'center', fontSize: '16px' }}>
            {activeChat.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>{activeChat.name}</div>
            <div style={{ fontSize: '11px', color: '#5288C1' }}>{activeChat.status}</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeChat.messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start',
                background: m.sender === 'me' ? '#2B5278' : '#182533',
                color: 'white', padding: '8px 14px', borderRadius: '12px',
                fontSize: '13px', maxWidth: '70%', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              <div>{m.text}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textAlign: 'right', marginTop: '4px' }}>{m.time} ✓✓</div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{ padding: '10px 14px', background: '#17212B', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ flex: 1, background: '#242F3D', border: 'none', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none' }}
          />
          <button type="submit" style={{ background: '#5288C1', border: 'none', color: 'white', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '14px' }}>
            ➔
          </button>
        </form>
      </div>
    </div>
  );
}
