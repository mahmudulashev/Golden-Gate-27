import React, { useState } from 'react';
export default function Pages() {
  const [content, setContent] = useState('Liquid Glass: Designing for Depth\n\nThe new Liquid Glass design language introduces a fundamentally different approach to UI materials in macOS 27. Rather than simulating flat surfaces, Liquid Glass uses real-time light refraction and specular highlights to create interfaces that feel three-dimensional and responsive.\n\nKey Properties\n\n• Refraction: Light bends through glass surfaces using SVG displacement maps\n• Specular highlights: Dynamic top-edge gleam that responds to window position\n• Blur saturation: Background content is blurred and color-saturated\n• Depth hierarchy: Multiple glass layers create a sense of spatial depth\n\nThe material adapts seamlessly between light and dark modes, maintaining its essential character while adjusting transparency, blur intensity, and shadow values.');

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Toolbar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--control-bg)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
          borderBottom: '1px solid var(--separator)', background: 'var(--window-bg)', flexShrink: 0
        }}>
          <select style={{ background: 'var(--control-bg)', border: '1px solid var(--separator)', borderRadius: '6px', padding: '3px 8px', fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)', outline: 'none' }}>
            <option>Body</option><option>Title</option><option>Heading</option><option>Subtitle</option>
          </select>
          <div style={{ width: '1px', height: '18px', background: 'var(--separator)' }} />
          {['B', 'I', 'U'].map(f => (
            <button key={f} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
              fontWeight: f === 'B' ? 700 : 400, fontStyle: f === 'I' ? 'italic' : 'normal',
              textDecoration: f === 'U' ? 'underline' : 'none', color: 'var(--label)',
              padding: '3px 6px', borderRadius: '4px', fontFamily: 'var(--font-ui)'
            }}>{f}</button>
          ))}
          <div style={{ width: '1px', height: '18px', background: 'var(--separator)' }} />
          {['☰ Left', '☰ Center', '☰ Right'].map(a => (
            <button key={a} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', color: 'var(--label-2)', padding: '3px 4px' }}>{a.split(' ')[0]}</button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: '11px', color: 'var(--label-3)' }}>Word Count: {content.split(/\s+/).length}</span>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', overflow: 'auto', padding: '20px', background: '#E5E5E5' }}>
          <div style={{
            width: '612px', minHeight: '792px', background: 'white',
            padding: '72px 72px', boxShadow: '0 4px 20px rgba(0,0,0,.12)',
            borderRadius: '2px'
          }}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{
                width: '100%', height: '100%', minHeight: '648px',
                background: 'none', border: 'none', outline: 'none', resize: 'none',
                fontSize: '14px', lineHeight: '1.8', color: '#1E1E1E',
                fontFamily: 'Georgia, "Times New Roman", serif'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
