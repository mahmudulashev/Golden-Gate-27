import React, { useState } from 'react';

export default function Music() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(35);
  const [selectedTab, setSelectedTab] = useState('library');
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const tracks = [
    { title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:03', cover: '🌃' },
    { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: '🌟' },
    { title: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '3:49', cover: '⚡' },
    { title: 'Dreams', artist: 'Fleetwood Mac', album: 'Rumours', duration: '4:14', cover: '🌊' },
    { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', cover: '👑' },
    { title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', duration: '3:47', cover: '🎸' },
    { title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50', cover: '⭐' },
    { title: 'Pumped Up Kicks', artist: 'Foster the People', album: 'Torches', duration: '3:59', cover: '👟' },
  ];

  const current = tracks[currentTrack];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div className="finder-sidebar" style={{ width: '200px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>Library</div>
        {['Recently Added', 'Artists', 'Albums', 'Songs', 'Made for You'].map(item => (
          <div key={item} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px',
            background: selectedTab === item.toLowerCase().replace(' ', '-') ? 'var(--accent)' : 'transparent',
            color: selectedTab === item.toLowerCase().replace(' ', '-') ? 'white' : 'var(--label)',
          }} onClick={() => setSelectedTab(item.toLowerCase().replace(' ', '-'))}>
            <span style={{ fontSize: '12px' }}>
              {item === 'Recently Added' ? '🕐' : item === 'Artists' ? '🎤' : item === 'Albums' ? '💿' : item === 'Songs' ? '🎵' : '✨'}
            </span>
            {item}
          </div>
        ))}
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase', marginTop: '12px' }}>Playlists</div>
        {['Chill Vibes', 'Workout Mix', 'Road Trip', 'Focus Flow'].map(pl => (
          <div key={pl} style={{
            padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px', color: 'var(--label)'
          }}>
            <span style={{ fontSize: '12px' }}>🎶</span>
            {pl}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--control-bg)' }}>
        {/* Track list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Songs</h2>
          {/* Column headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '30px 2fr 1.5fr 1.5fr 60px',
            gap: '8px', padding: '4px 8px', borderBottom: '1px solid var(--separator)',
            fontSize: '11px', fontWeight: 600, color: 'var(--label-2)'
          }}>
            <span>#</span><span>Title</span><span>Artist</span><span>Album</span><span>⏱</span>
          </div>
          {tracks.map((track, idx) => (
            <div
              key={idx}
              onClick={() => { setCurrentTrack(idx); setPlaying(true); }}
              style={{
                display: 'grid', gridTemplateColumns: '30px 2fr 1.5fr 1.5fr 60px',
                gap: '8px', padding: '8px', borderRadius: '8px', cursor: 'pointer',
                fontSize: '13px', alignItems: 'center',
                background: currentTrack === idx ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
              }}
            >
              <span style={{ color: currentTrack === idx ? 'var(--accent)' : 'var(--label-3)', fontSize: '12px' }}>
                {currentTrack === idx && playing ? '▶' : idx + 1}
              </span>
              <span style={{ fontWeight: currentTrack === idx ? 600 : 400, color: currentTrack === idx ? 'var(--accent)' : 'var(--label)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px' }}>{track.cover}</span>
                {track.title}
              </span>
              <span style={{ color: 'var(--label-2)' }}>{track.artist}</span>
              <span style={{ color: 'var(--label-2)' }}>{track.album}</span>
              <span style={{ color: 'var(--label-3)' }}>{track.duration}</span>
            </div>
          ))}
        </div>

        {/* Now Playing Bar */}
        <div style={{
          padding: '10px 16px', borderTop: '1px solid var(--separator)',
          display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0,
          background: 'var(--window-bg)'
        }}>
          {/* Track info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '200px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'grid', placeItems: 'center', fontSize: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,.15)'
            }}>
              {current.cover}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{current.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--label-2)' }}>{current.artist}</div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setShuffle(!shuffle)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', color: shuffle ? 'var(--accent)' : 'var(--label-3)', padding: '4px'
              }}>🔀</button>
              <button onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '16px', color: 'var(--label)', padding: '4px'
              }}>⏮</button>
              <button onClick={() => setPlaying(!playing)} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--label)', border: 'none', cursor: 'pointer',
                display: 'grid', placeItems: 'center', fontSize: '14px',
                color: 'var(--control-bg)'
              }}>
                {playing ? '⏸' : '▶'}
              </button>
              <button onClick={() => setCurrentTrack(Math.min(tracks.length - 1, currentTrack + 1))} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '16px', color: 'var(--label)', padding: '4px'
              }}>⏭</button>
              <button onClick={() => setRepeat(!repeat)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', color: repeat ? 'var(--accent)' : 'var(--label-3)', padding: '4px'
              }}>🔁</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '400px' }}>
              <span style={{ fontSize: '10px', color: 'var(--label-3)', width: '30px', textAlign: 'right' }}>
                {Math.floor(progress * 0.04)}:{String(Math.floor((progress * 2.4) % 60)).padStart(2, '0')}
              </span>
              <input type="range" min="0" max="100" value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--accent)', height: '4px' }} />
              <span style={{ fontSize: '10px', color: 'var(--label-3)', width: '30px' }}>{current.duration}</span>
            </div>
          </div>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '130px' }}>
            <span style={{ fontSize: '12px', color: 'var(--label-3)' }}>🔈</span>
            <input type="range" min="0" max="100" value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent)', height: '4px' }} />
            <span style={{ fontSize: '12px', color: 'var(--label-3)' }}>🔊</span>
          </div>
        </div>
      </div>
    </div>
  );
}
