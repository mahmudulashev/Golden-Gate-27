import React, { useState } from 'react';
export default function Keynote() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: 'macOS 27', subtitle: 'Liquid Glass', bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
    { title: 'A New Material', subtitle: 'Real-time refraction • Specular highlights • Adaptive blur', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
    { title: 'Design Principles', subtitle: '1. Depth over Flatness\n2. Light as Material\n3. Context Awareness', bg: 'linear-gradient(135deg, #0f3460, #533483)' },
    { title: 'Performance', subtitle: '60fps on M-series • GPU-accelerated filters • Adaptive quality', bg: 'linear-gradient(135deg, #e94560, #0f3460)' },
    { title: 'Thank You', subtitle: 'Questions?', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  ];
  const slide = slides[currentSlide];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Slide navigator */}
      <div style={{ width: '160px', background: 'var(--window-bg)', borderRight: '1px solid var(--separator)', overflow: 'auto', padding: '8px' }}>
        {slides.map((s, i) => (
          <div key={i} onClick={() => setCurrentSlide(i)} style={{
            padding: '4px', marginBottom: '6px', cursor: 'pointer',
            borderRadius: '6px', border: currentSlide === i ? '2px solid var(--accent)' : '2px solid transparent'
          }}>
            <div style={{
              aspectRatio: '16/9', borderRadius: '4px', background: s.bg,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'white', padding: '8px'
            }}>
              <div style={{ fontSize: '8px', fontWeight: 700, textAlign: 'center' }}>{s.title}</div>
              <div style={{ fontSize: '5px', opacity: .7, textAlign: 'center', marginTop: '2px' }}>{s.subtitle.split('\n')[0]}</div>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--label-3)', textAlign: 'center', marginTop: '2px' }}>{i + 1}</div>
          </div>
        ))}
      </div>
      {/* Main slide view */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#2B2B2D' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
          borderBottom: '1px solid rgba(255,255,255,.08)', flexShrink: 0
        }}>
          <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} style={{ background: 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' }}>◀</button>
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '12px' }}>{currentSlide + 1} / {slides.length}</span>
          <button onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))} style={{ background: 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' }}>▶</button>
          <div style={{ flex: 1 }} />
          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '4px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>▶ Play</button>
        </div>
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div style={{
            width: '100%', maxWidth: '640px', aspectRatio: '16/9',
            borderRadius: '8px', background: slide.bg,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: 'white', padding: '40px', boxShadow: '0 8px 32px rgba(0,0,0,.5)'
          }}>
            <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px' }}>{slide.title}</h1>
            <p style={{ fontSize: '18px', opacity: .7, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{slide.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
