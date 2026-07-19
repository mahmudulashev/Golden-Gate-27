import React, { useState } from 'react';

export default function Notes() {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [notes, setNotes] = useState([
    {
      id: 0,
      title: 'macOS 27 Launch Checklist',
      date: 'Jul 18, 2026',
      preview: 'Finalize Liquid Glass specs, Ship Safari 27...',
      pinned: true,
      content: 'macOS 27 Launch Checklist\n\n☑ Finalize Liquid Glass specs\n☑ Ship Safari 27 with new tab design\n☐ Review Accessibility audit results\n☐ Prepare keynote demo\n☐ Update developer documentation\n\nNotes:\n• The new glass material uses backdrop-filter with SVG refraction\n• Performance target: 60fps on M-series chips\n• Dark mode variants need final sign-off'
    },
    {
      id: 1,
      title: 'Meeting Notes — Q3 Planning',
      date: 'Jul 15, 2026',
      preview: 'Key decisions: focus on performance, accessibility...',
      content: 'Meeting Notes — Q3 Planning\n\nKey decisions:\n1. Focus on high-end animation performance.\n2. Accessibility needs to be integrated from day 1.\n3. Expand widget API to support canvas rendering.\n\nNext Steps:\n- Meet with the design team on Tuesday.\n- Sync up on timeline.'
    },
    {
      id: 2,
      title: 'Book Recommendations',
      date: 'Jul 10, 2026',
      preview: 'The Design of Everyday Things, Refactoring UI...',
      content: 'Book Recommendations\n\n• The Design of Everyday Things - Don Norman\n• Refactoring UI - Adam Wathan & Steve Schoger\n• Clean Code - Robert C. Martin\n• Creativity, Inc. - Ed Catmull\n• Hooked - Nir Eyal'
    },
    {
      id: 3,
      title: 'Recipe: Pasta Carbonara',
      date: 'Jun 28, 2026',
      preview: 'Ingredients: guanciale, eggs, pecorino romano...',
      content: 'Recipe: Pasta Carbonara\n\nIngredients:\n- 150g guanciale or pancetta\n- 4 large egg yolks + 1 whole egg\n- 75g Pecorino Romano\n- 400g spaghetti\n- Freshly ground black pepper\n\nMethod:\n1. Crisp the guanciale.\n2. Whisk eggs and cheese together.\n3. Cook pasta.\n4. Toss everything together off heat to create a creamy sauce.'
    }
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState(0);

  const folders = [
    { id: 'icloud', label: 'iCloud', type: 'header' },
    { id: 'all', label: 'Notes', count: notes.length, icon: '📝' },
    { id: 'personal', label: 'Personal', count: 2, icon: '👤' },
    { id: 'mac', label: 'On My Mac', type: 'header' },
    { id: 'travel', label: 'Travel', count: 1, icon: '✈️' },
    { id: 'tags', label: 'Tags', type: 'header' },
    { id: 'work', label: '#work', count: 2, icon: '🏷️' },
    { id: 'personal-tag', label: '#personal', count: 1, icon: '🏷️' },
    { id: 'deleted', label: 'Recently Deleted', count: 0, icon: '🗑️', sep: true },
  ];

  const currentNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  const handleContentChange = (newVal) => {
    setNotes(prev => prev.map(note => {
      if (note.id === selectedNoteId) {
        const lines = newVal.split('\n');
        const title = lines[0] || 'Untitled Note';
        const preview = lines[1] || lines[2] || 'Empty note...';
        return {
          ...note,
          title,
          preview,
          content: newVal,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
      return note;
    }));
  };

  const createNewNote = () => {
    const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 0;
    const newNote = {
      id: newId,
      title: 'New Note',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      preview: 'Empty note...',
      content: 'New Note\n\nStart typing here...'
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newId);
  };

  return (
    <div style={{ display: 'flex', height: '100%', userSelect: 'text' }}>
      {/* Left Pane: Folders */}
      <div className="notes-sidebar">
        {folders.map(folder => {
          if (folder.type === 'header') {
            return (
              <div key={folder.id} style={{
                padding: '8px 14px 4px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--label-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: folder.id !== 'icloud' ? '8px' : 0
              }}>
                {folder.label}
              </div>
            );
          }
          return (
            <React.Fragment key={folder.id}>
              {folder.sep && <div style={{ height: '1px', background: 'var(--separator)', margin: '8px 14px' }} />}
              <div
                onClick={() => setSelectedFolder(folder.id)}
                style={{
                  padding: '5px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  margin: '1px 6px',
                  fontSize: '13px',
                  fontWeight: selectedFolder === folder.id ? 600 : 400,
                  background: selectedFolder === folder.id ? 'var(--accent)' : 'transparent',
                  color: selectedFolder === folder.id ? 'white' : 'var(--label)',
                }}
              >
                <span style={{ fontSize: '12px' }}>{folder.icon}</span>
                <span style={{ flex: 1 }}>{folder.label}</span>
                {folder.id === 'all' && notes.length > 0 && (
                  <span style={{
                    fontSize: '11px',
                    color: selectedFolder === folder.id ? 'rgba(255,255,255,.7)' : 'var(--label-3)'
                  }}>
                    {notes.length}
                  </span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Middle Pane: Notes List */}
      <div className="notes-list">
        {/* Search bar */}
        <div style={{
          padding: '4px 8px',
          marginBottom: '8px',
          borderRadius: '8px',
          background: 'var(--window-bg)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--label-3)" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            style={{
              background: 'none', border: 'none', outline: 'none',
              fontSize: '12px', color: 'var(--label)', fontFamily: 'var(--font-ui)',
              width: '100%'
            }}
          />
        </div>

        {/* Pinned section */}
        {notes.some(n => n.pinned) && (
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', padding: '4px 0', marginBottom: '4px' }}>
            📌 Pinned
          </div>
        )}

        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => setSelectedNoteId(note.id)}
            style={{
              padding: '10px 8px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '2px',
              background: selectedNoteId === note.id ? 'var(--accent)' : 'transparent',
              color: selectedNoteId === note.id ? 'white' : 'var(--label)',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {note.title}
            </div>
            <div style={{
              fontSize: '11px',
              color: selectedNoteId === note.id ? 'rgba(255,255,255,.7)' : 'var(--label-2)',
              display: 'flex', gap: '6px'
            }}>
              <span style={{ fontWeight: 500 }}>{note.date}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {note.preview}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Right Pane: Editor */}
      <div className="notes-editor">
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          borderBottom: '1px solid var(--separator)',
          flexShrink: 0
        }}>
          <select style={{
            background: 'var(--window-bg)', border: '1px solid var(--separator)',
            borderRadius: '6px', padding: '3px 8px', fontSize: '12px',
            color: 'var(--label)', fontFamily: 'var(--font-ui)', outline: 'none'
          }}>
            <option>Body</option>
            <option>Title</option>
            <option>Heading</option>
            <option>Subheading</option>
            <option>Monospaced</option>
          </select>
          <div style={{ width: '1px', height: '18px', background: 'var(--separator)' }} />
          {['B', 'I', 'U', 'S'].map(fmt => (
            <button key={fmt} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: fmt === 'B' ? 700 : 400,
              fontStyle: fmt === 'I' ? 'italic' : 'normal',
              textDecoration: fmt === 'U' ? 'underline' : fmt === 'S' ? 'line-through' : 'none',
              color: 'var(--label)', padding: '3px 6px', borderRadius: '4px',
              fontFamily: 'var(--font-ui)'
            }}>
              {fmt}
            </button>
          ))}
          <div style={{ width: '1px', height: '18px', background: 'var(--separator)' }} />
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: 'var(--accent)', padding: '3px 6px'
          }}>🔗</button>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: 'var(--label-2)', padding: '3px 6px'
          }}>☰</button>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: 'var(--label-2)', padding: '3px 6px'
          }}>☑</button>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: 'var(--label-2)', padding: '3px 6px'
          }}>⊞</button>
          <div style={{ flex: 1 }} />
          <button
            onClick={createNewNote}
            style={{
              background: 'var(--accent)', color: 'white', border: 'none',
              padding: '6.5px 12px', borderRadius: '6px', cursor: 'pointer',
              fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px'
            }}
          >
            ✏️ New Note
          </button>
        </div>

        {/* Note Content */}
        <div style={{ flex: 1, padding: '16px 20px', overflow: 'auto' }}>
          <textarea
            value={currentNote ? currentNote.content : ''}
            onChange={(e) => handleContentChange(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '14px',
              lineHeight: '1.7',
              color: 'var(--label)',
              fontFamily: 'var(--font-ui)',
              userSelect: 'text'
            }}
          />
        </div>
      </div>
    </div>
  );
}
