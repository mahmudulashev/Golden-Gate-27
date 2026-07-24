import React, { useState } from 'react';

export default function AntigravityApp() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello Mahmud! I am Antigravity AI, your pair programming assistant. How can I help you today?' },
    { sender: 'user', text: 'Lock screen design updated cleanly!' },
    { sender: 'ai', text: 'Great work! The Lock Screen matches the macOS layout with custom status bar, time display, and vinyl avatar.' }
  ]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('App.jsx');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: `Analyzing task: "${userMsg}". All modules compiled cleanly with 0 errors.` }
      ]);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#0F172A', color: '#E2E8F0', fontFamily: 'SF Pro Text, monospace' }}>
      {/* File Explorer */}
      <div style={{ width: '210px', background: '#1E293B', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          PROJECT EXPLORER
        </div>
        <div style={{ padding: '4px 14px', fontSize: '12px', color: '#38BDF8', cursor: 'pointer' }} onClick={() => setActiveTab('App.jsx')}>
          📄 App.jsx
        </div>
        <div style={{ padding: '4px 14px', fontSize: '12px', color: '#94A3B8', cursor: 'pointer' }} onClick={() => setActiveTab('LockScreen.jsx')}>
          📄 LockScreen.jsx
        </div>
        <div style={{ padding: '4px 14px', fontSize: '12px', color: '#94A3B8', cursor: 'pointer' }} onClick={() => setActiveTab('index.css')}>
          🎨 index.css
        </div>
        <div style={{ padding: '4px 14px', fontSize: '12px', color: '#94A3B8', cursor: 'pointer' }} onClick={() => setActiveTab('Finder.jsx')}>
          📄 Finder.jsx
        </div>
        
        <div style={{ marginTop: 'auto', padding: '12px', borderTop: '1px solid #334155', fontSize: '11px', color: '#94A3B8' }}>
          ⚡ Antigravity Agent v3.6<br/>
          <span style={{ color: '#4ADE80' }}>● Model Ready</span>
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #334155' }}>
        <div style={{ display: 'flex', background: '#0F172A', borderBottom: '1px solid #334155' }}>
          <div style={{ padding: '8px 16px', background: '#1E293B', color: '#38BDF8', fontSize: '12px', fontWeight: 600, borderTop: '2px solid #38BDF8' }}>
            {activeTab}
          </div>
        </div>
        <div style={{ flex: 1, padding: '16px', fontFamily: 'Consolas, Monaco, monospace', fontSize: '12.5px', lineHeight: '1.6', overflowY: 'auto', color: '#CBD5E1' }}>
          <div><span style={{ color: '#F472B6' }}>import</span> React, {'{'} useState, useEffect {'}'} <span style={{ color: '#F472B6' }}>from</span> <span style={{ color: '#A3E635' }}>'react'</span>;</div>
          <div><span style={{ color: '#F472B6' }}>import</span> LockScreen <span style={{ color: '#F472B6' }}>from</span> <span style={{ color: '#A3E635' }}>'./components/LockScreen'</span>;</div>
          <br/>
          <div><span style={{ color: '#F472B6' }}>export default function</span> <span style={{ color: '#60A5FA' }}>App</span>() {'{'}</div>
          <div style={{ paddingLeft: '20px' }}><span style={{ color: '#F472B6' }}>const</span> [locked, setLocked] = <span style={{ color: '#60A5FA' }}>useState</span>(<span style={{ color: '#F87171' }}>true</span>);</div>
          <div style={{ paddingLeft: '20px' }}><span style={{ color: '#F472B6' }}>const</span> [user, setUser] = <span style={{ color: '#60A5FA' }}>useState</span>(<span style={{ color: '#A3E635' }}>'Mahmud Ulashev'</span>);</div>
          <br/>
          <div style={{ paddingLeft: '20px' }}><span style={{ color: '#F472B6' }}>return</span> (</div>
          <div style={{ paddingLeft: '40px' }}>&lt;<span style={{ color: '#38BDF8' }}>div</span> className=<span style={{ color: '#A3E635' }}>"desktop-container"</span>&gt;</div>
          <div style={{ paddingLeft: '60px' }}>{'{'}locked && &lt;<span style={{ color: '#FBBF24' }}>LockScreen</span> username={'{'}user{'}'} /&gt;{'}'}</div>
          <div style={{ paddingLeft: '40px' }}>&lt;/<span style={{ color: '#38BDF8' }}>div</span>&gt;</div>
          <div style={{ paddingLeft: '20px' }}>);</div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* AI Chat Side Panel */}
      <div style={{ width: '280px', background: '#1E293B', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #334155', fontSize: '12px', fontWeight: 600, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✨ Antigravity Assistant</span>
        </div>
        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              background: m.sender === 'user' ? '#0284C7' : '#334155',
              color: 'white', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', maxWidth: '85%'
            }}>
              {m.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} style={{ padding: '10px', borderTop: '1px solid #334155', display: 'flex', gap: '6px' }}>
          <input
            type="text"
            placeholder="Ask AI assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, background: '#0F172A', border: '1px solid #475569', borderRadius: '6px', padding: '6px 10px', color: 'white', fontSize: '12px', outline: 'none' }}
          />
          <button type="submit" style={{ background: '#0284C7', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer' }}>Send</button>
        </form>
      </div>
    </div>
  );
}
