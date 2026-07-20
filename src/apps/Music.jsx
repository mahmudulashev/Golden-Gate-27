import React, { useState, useEffect, useRef } from 'react';

export default function Music() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(20);
  const [selectedTab, setSelectedTab] = useState('songs');
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const tracks = [
    { title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:03', cover: '🌃', notes: [261, 329, 392, 523] },
    { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: '🌟', notes: [293, 349, 440, 587] },
    { title: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '3:49', cover: '⚡', notes: [329, 392, 493, 659] },
    { title: 'Dreams', artist: 'Fleetwood Mac', album: 'Rumours', duration: '4:14', cover: '🌊', notes: [349, 440, 523, 698] },
    { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', cover: '👑', notes: [392, 493, 587, 783] },
    { title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', duration: '3:47', cover: '🎸', notes: [440, 523, 659, 880] },
    { title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50', cover: '⭐', notes: [261, 349, 392, 523] },
    { title: 'Pumped Up Kicks', artist: 'Foster the People', album: 'Torches', duration: '3:59', cover: '👟', notes: [293, 392, 440, 587] },
  ];

  const lyricsMap = {
    0: "Waiting in a car...\nWaiting for a ride in the dark\nThe night city is a glow\nUnfolding in the air...",
    1: "I've been on my own for long enough\nMaybe you can show me how to love, maybe\nI'm drowning in the night\nOh, when I'm like this, you're the one I trust...",
    2: "All along the Western Front\nPeople line up to receive\nShe got the electric feel now\nAll along the Western Front...",
    3: "Now here you go again, you say you want your freedom\nWell, who am I to keep you down?\nIt's only right that you should play the way you feel it...",
  };

  const current = tracks[currentTrack];

  // Synthesized Web Audio API sound loop
  useEffect(() => {
    if (playing) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        const chord = current.notes || [300, 400, 500];
        osc.frequency.setValueAtTime(chord[0], ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime((volume / 100) * 0.1, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;

        // Arpeggiator effect
        let step = 0;
        const interval = setInterval(() => {
          step = (step + 1) % chord.length;
          if (oscRef.current && ctx) {
            oscRef.current.frequency.setValueAtTime(chord[step], ctx.currentTime);
          }
        }, 300);

        return () => {
          clearInterval(interval);
          if (gainRef.current && ctx) {
            gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
          }
          setTimeout(() => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          }, 60);
        };
      } catch (e) {
        console.warn('Audio play error', e);
      }
    }
  }, [playing, currentTrack]);

  // Volume update
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime((volume / 100) * 0.1, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Track Progress Timer
  useEffect(() => {
    let timer;
    if (playing) {
      timer = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playing]);

  // Audio Visualizer canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 28;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const h = playing 
          ? Math.abs(Math.sin(phase + i * 0.35) * Math.cos(phase * 0.5 + i * 0.2)) * (canvas.height - 4) + 4
          : 4;

        const x = i * barWidth + 2;
        const y = canvas.height - h;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#FA2D55');
        gradient.addColorStop(1, '#9333EA');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth - 3, h, 2);
        } else {
          ctx.rect(x, y, barWidth - 3, h);
        }
        ctx.fill();
      }
      phase += playing ? 0.12 : 0.02;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [playing]);

  return (
    <div style={{ display: 'flex', height: '100%', userSelect: 'none' }}>
      {/* Sidebar */}
      <div className="finder-sidebar" style={{ width: '200px', flexShrink: 0 }}>
        <div style={{ padding: '10px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>Library</div>
        {['Songs', 'Recently Added', 'Artists', 'Albums'].map(item => {
          const key = item.toLowerCase().replace(' ', '-');
          return (
            <div key={item} style={{
              padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '10px',
              cursor: 'pointer', borderRadius: '8px', margin: '2px 8px', fontSize: '13px',
              background: selectedTab === key ? 'var(--accent)' : 'transparent',
              color: selectedTab === key ? 'white' : 'var(--label)',
              fontWeight: selectedTab === key ? 600 : 400
            }} onClick={() => setSelectedTab(key)}>
              <span>{item === 'Songs' ? '🎵' : item === 'Recently Added' ? '🕐' : item === 'Artists' ? '🎤' : '💿'}</span>
              {item}
            </div>
          );
        })}
        <div style={{ padding: '12px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>Playlists</div>
        {['Chill Vibes ☕', 'Synthwave Night 🌃', 'Workout Mix 🏋️', 'Focus Flow 🎧'].map(pl => (
          <div key={pl} style={{
            padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '8px', margin: '2px 8px', fontSize: '13px', color: 'var(--label-2)'
          }}>
            {pl}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--control-bg)', overflow: 'hidden' }}>
        {/* Track list or Lyrics View */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{showLyrics ? 'Lyrics' : 'Songs'}</h2>
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              style={{
                background: showLyrics ? 'var(--accent)' : 'var(--window-bg)',
                color: showLyrics ? 'white' : 'var(--label)',
                border: '1px solid var(--separator)',
                borderRadius: '16px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              🎤 {showLyrics ? 'Show Tracklist' : 'Show Lyrics'}
            </button>
          </div>

          {showLyrics ? (
            <div style={{
              flex: 1, background: 'var(--window-bg)', borderRadius: '12px', padding: '24px',
              border: '1px solid var(--separator)', display: 'flex', flexDirection: 'column', gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '48px' }}>{current.cover}</span>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{current.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--label-2)', margin: '4px 0 0' }}>{current.artist} — {current.album}</p>
                </div>
              </div>
              <div style={{
                fontSize: '16px', lineHeight: '1.8', color: 'var(--label)', fontWeight: 500,
                whiteSpace: 'pre-line', fontStyle: 'italic', opacity: 0.9, marginTop: '10px'
              }}>
                {lyricsMap[currentTrack] || "♪ Instrumental track / Lyrics loading from Apple Music Cloud ♪\n\nEnjoy the rhythm and ambient beats!"}
              </div>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid', gridTemplateColumns: '36px 2.5fr 1.5fr 1.5fr 60px',
                gap: '8px', padding: '6px 12px', borderBottom: '1px solid var(--separator)',
                fontSize: '11px', fontWeight: 700, color: 'var(--label-3)', textTransform: 'uppercase'
              }}>
                <span>#</span><span>Title</span><span>Artist</span><span>Album</span><span>Time</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
                {tracks.map((track, idx) => {
                  const isSelected = currentTrack === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (isSelected) {
                          setPlaying(!playing);
                        } else {
                          setCurrentTrack(idx);
                          setPlaying(true);
                        }
                      }}
                      style={{
                        display: 'grid', gridTemplateColumns: '36px 2.5fr 1.5fr 1.5fr 60px',
                        gap: '8px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                        fontSize: '13px', alignItems: 'center', transition: 'background 0.15s',
                        background: isSelected ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                      }}
                    >
                      <span style={{ color: isSelected ? 'var(--accent)' : 'var(--label-3)', fontSize: '13px', fontWeight: 600 }}>
                        {isSelected && playing ? '▶' : idx + 1}
                      </span>
                      <span style={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--accent)' : 'var(--label)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{track.cover}</span>
                        {track.title}
                      </span>
                      <span style={{ color: 'var(--label-2)' }}>{track.artist}</span>
                      <span style={{ color: 'var(--label-3)' }}>{track.album}</span>
                      <span style={{ color: 'var(--label-3)', fontSize: '12px' }}>{track.duration}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Audio Visualizer Canvas Strip */}
        <div style={{ height: '28px', background: 'var(--window-bg)', borderTop: '1px solid var(--separator)', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={canvasRef} width="400" height="24" style={{ width: '100%', maxWidth: '400px', height: '24px' }} />
        </div>

        {/* Now Playing Bar */}
        <div style={{
          padding: '12px 20px', borderTop: '1px solid var(--separator)',
          display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0,
          background: 'var(--window-bg)'
        }}>
          {/* Track Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '220px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #FA2D55, #9333EA)',
              display: 'grid', placeItems: 'center', fontSize: '24px',
              boxShadow: '0 4px 12px rgba(250, 45, 85, 0.3)'
            }}>
              {current.cover}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--label-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.artist}</div>
            </div>
          </div>

          {/* Player Controls */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <button onClick={() => setShuffle(!shuffle)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', color: shuffle ? 'var(--accent)' : 'var(--label-3)' }}>🔀</button>
              <button onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--label)' }}>⏮</button>
              <button onClick={() => setPlaying(!playing)} style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#FA2D55', border: 'none', cursor: 'pointer',
                display: 'grid', placeItems: 'center', fontSize: '15px', color: 'white',
                boxShadow: '0 3px 10px rgba(250, 45, 85, 0.4)', transition: 'transform 0.1s'
              }}>
                {playing ? '⏸' : '▶'}
              </button>
              <button onClick={() => setCurrentTrack((currentTrack + 1) % tracks.length)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--label)' }}>⏭</button>
              <button onClick={() => setRepeat(!repeat)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', color: repeat ? 'var(--accent)' : 'var(--label-3)' }}>🔁</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '450px' }}>
              <span style={{ fontSize: '10px', color: 'var(--label-3)', width: '32px', textAlign: 'right', fontWeight: 600 }}>
                {Math.floor(progress * 0.04)}:{String(Math.floor((progress * 2.4) % 60)).padStart(2, '0')}
              </span>
              <input type="range" min="0" max="100" value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#FA2D55', height: '4px', cursor: 'pointer' }} />
              <span style={{ fontSize: '10px', color: 'var(--label-3)', width: '32px', fontWeight: 600 }}>{current.duration}</span>
            </div>
          </div>

          {/* Volume Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '130px' }}>
            <span style={{ fontSize: '13px', color: 'var(--label-3)' }}>🔈</span>
            <input type="range" min="0" max="100" value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent)', height: '4px', cursor: 'pointer' }} />
            <span style={{ fontSize: '13px', color: 'var(--label-3)' }}>🔊</span>
          </div>
        </div>
      </div>
    </div>
  );
}

