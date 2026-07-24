import React, { useState } from 'react';

export default function GeminiApp() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Mahmud! I am Google Gemini. What would you like to explore or build today?' }
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (textToSend) => {
    const q = textToSend || prompt;
    if (!q.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: q }]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Here is what I found for "${q}":\n\n1. **Golden Gate 27 system** is operating smoothly.\n2. All applications have active components.\n3. Design aesthetics match macOS Liquid Glass.` }
      ]);
      setLoading(false);
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#131314', color: '#E3E3E3', fontFamily: 'SF Pro Display, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #28292A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, background: 'linear-gradient(90deg, #4285F4, #9B51E0, #EA4335)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Gemini 3.6 Pro
          </span>
        </div>
        <span style={{ fontSize: '12px', color: '#8E918F' }}>Google AI Assistant</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', gap: '12px',
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}>
            {m.role === 'assistant' && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #1A73E8, #EA4335, #FBBC04)', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>✨</div>
            )}
            <div style={{
              background: m.role === 'user' ? '#27292A' : '#1E1F20',
              padding: '12px 16px', borderRadius: '16px', fontSize: '13px', lineHeight: '1.5', whiteSpace: 'pre-wrap'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: '13px', color: '#A8C7FA', fontStyle: 'italic' }}>Gemini is thinking...</div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div style={{ padding: '0 20px 10px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {['Code Python script', 'Write email summary', 'Analyze macOS theme'].map((chip, idx) => (
          <button 
            key={idx} 
            onClick={() => handleSubmit(chip)}
            style={{ background: '#1E1F20', border: '1px solid #333537', color: '#C4C7C5', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            💡 {chip}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ padding: '12px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#1E1F20', border: '1px solid #333537', borderRadius: '24px', padding: '6px 14px' }}>
          <input
            type="text"
            placeholder="Ask Gemini..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '13px' }}
          />
          <button type="submit" style={{ background: '#A8C7FA', color: '#040C1E', border: 'none', borderRadius: '50%', width: '28px', height: '28px', fontWeight: 700, cursor: 'pointer' }}>➔</button>
        </div>
      </form>
    </div>
  );
}
