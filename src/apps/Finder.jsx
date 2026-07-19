import React, { useState } from 'react';

export default function Finder() {
  const [selectedFolder, setSelectedFolder] = useState('documents');
  const [viewMode, setViewMode] = useState('list');
  const [selectedFile, setSelectedFile] = useState(null);

  const sidebarItems = [
    { type: 'header', label: 'Favorites' },
    { id: 'airdrop', label: 'AirDrop', icon: '📡' },
    { id: 'recents', label: 'Recents', icon: '🕐' },
    { id: 'applications', label: 'Applications', icon: '📱' },
    { id: 'desktop', label: 'Desktop', icon: '🖥️' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'downloads', label: 'Downloads', icon: '⬇️' },
    { type: 'header', label: 'iCloud' },
    { id: 'icloud-drive', label: 'iCloud Drive', icon: '☁️' },
    { id: 'shared', label: 'Shared', icon: '👥' },
    { type: 'header', label: 'Tags' },
    { id: 'tag-red', label: 'Red', icon: '🔴' },
    { id: 'tag-blue', label: 'Blue', icon: '🔵' },
    { id: 'tag-green', label: 'Green', icon: '🟢' },
  ];

  const files = {
    documents: [
      { name: 'Project Proposal.pages', size: '2.1 MB', modified: 'Jul 17, 2026', kind: 'Pages Document', icon: '📝' },
      { name: 'Budget 2026.numbers', size: '890 KB', modified: 'Jul 15, 2026', kind: 'Numbers Spreadsheet', icon: '📊' },
      { name: 'Resume — Latest.pdf', size: '340 KB', modified: 'Jul 12, 2026', kind: 'PDF Document', icon: '📕' },
      { name: 'Presentation.key', size: '15.2 MB', modified: 'Jul 10, 2026', kind: 'Keynote Presentation', icon: '📑' },
      { name: 'Meeting Notes.txt', size: '12 KB', modified: 'Jul 8, 2026', kind: 'Plain Text', icon: '📄' },
      { name: 'Screenshots', size: '--', modified: 'Jul 18, 2026', kind: 'Folder', icon: '📁' },
      { name: 'Archives', size: '--', modified: 'Jun 30, 2026', kind: 'Folder', icon: '📁' },
      { name: 'Design Assets', size: '--', modified: 'Jul 5, 2026', kind: 'Folder', icon: '📁' },
      { name: 'cover-letter.docx', size: '45 KB', modified: 'Jun 22, 2026', kind: 'Word Document', icon: '📃' },
      { name: 'app-mockup.fig', size: '8.4 MB', modified: 'Jul 14, 2026', kind: 'Figma File', icon: '🎨' },
    ],
    downloads: [
      { name: 'macOS27-wallpaper.heic', size: '12.8 MB', modified: 'Jul 18, 2026', kind: 'HEIC Image', icon: '🖼️' },
      { name: 'Xcode_16.2.xip', size: '8.2 GB', modified: 'Jul 16, 2026', kind: 'Xcode Archive', icon: '📦' },
      { name: 'invoice-july.pdf', size: '125 KB', modified: 'Jul 15, 2026', kind: 'PDF Document', icon: '📕' },
    ],
    applications: [
      { name: 'Safari.app', size: '45 MB', modified: 'Jul 1, 2026', kind: 'Application', icon: '🧭' },
      { name: 'Xcode.app', size: '12.8 GB', modified: 'Jul 16, 2026', kind: 'Application', icon: '🔨' },
      { name: 'Figma.app', size: '340 MB', modified: 'Jun 28, 2026', kind: 'Application', icon: '🎨' },
      { name: 'Visual Studio Code.app', size: '460 MB', modified: 'Jul 10, 2026', kind: 'Application', icon: '💻' },
      { name: 'Slack.app', size: '190 MB', modified: 'Jul 5, 2026', kind: 'Application', icon: '💬' },
    ],
  };

  const currentFiles = files[selectedFolder] || files.documents;

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div className="finder-sidebar">
        {sidebarItems.map((item, idx) => {
          if (item.type === 'header') {
            return (
              <div key={idx} style={{
                padding: '8px 14px 4px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--label-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: idx > 0 ? '8px' : 0
              }}>
                {item.label}
              </div>
            );
          }
          return (
            <div
              key={item.id}
              onClick={() => setSelectedFolder(item.id)}
              style={{
                padding: '4px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                borderRadius: '6px',
                margin: '1px 6px',
                fontSize: '13px',
                fontWeight: selectedFolder === item.id ? 600 : 400,
                background: selectedFolder === item.id ? 'var(--accent)' : 'transparent',
                color: selectedFolder === item.id ? 'white' : 'var(--label)',
              }}
            >
              <span style={{ fontSize: '13px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="finder-content">
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--separator)'
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['≡', '⊞', '▤', '⋮⋮⋮'].map((icon, i) => (
              <button key={i} onClick={() => setViewMode(i === 0 ? 'list' : 'grid')} style={{
                background: (i === 0 && viewMode === 'list') || (i === 1 && viewMode === 'grid') ? 'var(--accent)' : 'var(--window-bg)',
                color: (i === 0 && viewMode === 'list') || (i === 1 && viewMode === 'grid') ? 'white' : 'var(--label-2)',
                border: '1px solid var(--separator)',
                borderRadius: '6px', padding: '3px 8px', cursor: 'pointer',
                fontSize: '12px', fontFamily: 'var(--font-ui)'
              }}>
                {icon}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '4px 10px', borderRadius: '8px',
              background: 'var(--window-bg)', border: '1px solid var(--separator)'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Search" style={{
                background: 'none', border: 'none', outline: 'none',
                fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)', width: '100px'
              }} />
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1.2fr 1fr',
              gap: '8px',
              padding: '4px 0',
              borderBottom: '1px solid var(--separator)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--label-2)'
            }}>
              <span>Name</span>
              <span>Size</span>
              <span>Date Modified</span>
              <span>Kind</span>
            </div>
            {/* Files */}
            {currentFiles.map((file, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFile(idx)}
                onDoubleClick={() => {
                  if (file.kind === 'Folder') setSelectedFolder(file.name.toLowerCase());
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1.2fr 1fr',
                  gap: '8px',
                  padding: '5px 0',
                  borderBottom: '1px solid var(--separator)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  background: selectedFile === idx ? 'var(--accent)' : 'transparent',
                  color: selectedFile === idx ? 'white' : 'var(--label)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '14px' }}>{file.icon}</span>
                  {file.name}
                </span>
                <span style={{ color: selectedFile === idx ? 'rgba(255,255,255,.7)' : 'var(--label-2)' }}>{file.size}</span>
                <span style={{ color: selectedFile === idx ? 'rgba(255,255,255,.7)' : 'var(--label-2)' }}>{file.modified}</span>
                <span style={{ color: selectedFile === idx ? 'rgba(255,255,255,.7)' : 'var(--label-2)' }}>{file.kind}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '16px' }}>
            {currentFiles.map((file, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFile(idx)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  padding: '8px', borderRadius: '8px', cursor: 'pointer',
                  background: selectedFile === idx ? 'var(--accent)' : 'transparent',
                  color: selectedFile === idx ? 'white' : 'var(--label)'
                }}
              >
                <span style={{ fontSize: '36px' }}>{file.icon}</span>
                <span style={{ fontSize: '11px', textAlign: 'center', wordBreak: 'break-word', lineHeight: '1.3' }}>{file.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Status bar */}
        <div style={{
          marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--separator)',
          fontSize: '11px', color: 'var(--label-2)', display: 'flex', justifyContent: 'space-between'
        }}>
          <span>{currentFiles.length} items</span>
          <span>228.4 GB available</span>
        </div>
      </div>
    </div>
  );
}
