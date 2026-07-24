import React, { useState } from 'react';

export default function TrashApp() {
  const [items, setItems] = useState([
    { name: 'old_sketch_v1.png', size: '4.2 MB', date: 'Jul 20, 2026', type: 'PNG Image' },
    { name: 'draft_archive.zip', size: '128 MB', date: 'Jul 18, 2026', type: 'ZIP Archive' },
    { name: 'temp_log_output.txt', size: '45 KB', date: 'Jul 15, 2026', type: 'Text Document' }
  ]);

  const handleEmpty = () => {
    if (window.confirm('Are you sure you want to permanently erase the items in the Trash?')) {
      setItems([]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--label)', fontFamily: 'SF Pro Text, sans-serif' }}>
      {/* Toolbar */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--separator)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: '13px' }}>Trash ({items.length} items)</div>
        <button
          onClick={handleEmpty}
          disabled={items.length === 0}
          style={{
            background: items.length > 0 ? 'var(--accent)' : 'var(--control-bg)',
            color: items.length > 0 ? 'white' : 'var(--label-3)',
            border: 'none', borderRadius: '6px', padding: '5px 14px', fontSize: '12px', fontWeight: 600, cursor: items.length > 0 ? 'pointer' : 'default'
          }}
        >
          Empty Trash
        </button>
      </div>

      {/* List */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {items.length === 0 ? (
          <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--label-3)', fontSize: '14px' }}>
            🗑️ Trash is Empty
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--separator)', textAlign: 'left', color: 'var(--label-2)' }}>
                <th style={{ padding: '6px 8px' }}>Name</th>
                <th style={{ padding: '6px 8px' }}>Date Deleted</th>
                <th style={{ padding: '6px 8px' }}>Size</th>
                <th style={{ padding: '6px 8px' }}>Kind</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--separator)' }}>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>📄 {item.name}</td>
                  <td style={{ padding: '8px', color: 'var(--label-2)' }}>{item.date}</td>
                  <td style={{ padding: '8px', color: 'var(--label-2)' }}>{item.size}</td>
                  <td style={{ padding: '8px', color: 'var(--label-2)' }}>{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
