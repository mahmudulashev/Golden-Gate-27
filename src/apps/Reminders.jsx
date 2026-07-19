import React, { useState } from 'react';

export default function Reminders() {
  const [lists, setLists] = useState([
    { id: 'today', label: 'Today', count: 3, icon: '📅', color: '#007AFF' },
    { id: 'scheduled', label: 'Scheduled', count: 1, icon: '🗓️', color: '#FF9500' },
    { id: 'all', label: 'All', count: 4, icon: '🗂️', color: '#8E8E93' },
    { id: 'flagged', label: 'Flagged', count: 0, icon: '🚩', color: '#FF3B30' },
  ]);

  const [selectedList, setSelectedList] = useState('today');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Send brand review feedback', done: false, list: 'today' },
    { id: 2, text: 'Review PR #142 — glass filter', done: false, list: 'today' },
    { id: 3, text: 'Pick up dry cleaning', done: false, list: 'today' },
    { id: 4, text: 'Schedule dentist appointment', done: false, list: 'scheduled' },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const handleToggle = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: newTodo, done: false, list: selectedList }
    ]);
    setNewTodo('');
  };

  const currentTodos = todos.filter(t => selectedList === 'all' ? true : t.list === selectedList);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div className="finder-sidebar" style={{ width: '180px' }}>
        <div style={{ padding: '8px 14px 4px', fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase' }}>My Lists</div>
        {lists.map(list => (
          <div
            key={list.id}
            onClick={() => setSelectedList(list.id)}
            style={{
              padding: '5px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              borderRadius: '6px',
              margin: '1px 6px',
              fontSize: '13px',
              fontWeight: selectedList === list.id ? 600 : 400,
              background: selectedList === list.id ? 'var(--accent)' : 'transparent',
              color: selectedList === list.id ? 'white' : 'var(--label)',
            }}
          >
            <span style={{ fontSize: '14px', color: selectedList === list.id ? 'white' : list.color }}>{list.icon}</span>
            <span style={{ flex: 1 }}>{list.label}</span>
            <span style={{ fontSize: '11px', color: selectedList === list.id ? 'rgba(255,255,255,.7)' : 'var(--label-3)' }}>
              {todos.filter(t => list.id === 'all' ? true : t.list === list.id && !t.done).length}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: 'var(--control-bg)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{
          fontSize: '24px', fontWeight: 700, marginBottom: '20px',
          color: lists.find(l => l.id === selectedList)?.color || 'var(--accent)'
        }}>
          {lists.find(l => l.id === selectedList)?.label || 'Reminders'}
        </h2>

        {/* Todo List */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {currentTodos.map(todo => (
            <div
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
                background: 'var(--window-bg)',
                transition: 'opacity 0.2s'
              }}
            >
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%',
                border: `2px solid ${todo.done ? 'var(--accent)' : 'var(--label-3)'}`,
                background: todo.done ? 'var(--accent)' : 'transparent',
                display: 'grid', placeItems: 'center'
              }}>
                {todo.done && <span style={{ color: 'white', fontSize: '9px' }}>✓</span>}
              </div>
              <span style={{
                fontSize: '13px',
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? 'var(--label-3)' : 'var(--label)'
              }}>
                {todo.text}
              </span>
            </div>
          ))}
          {currentTodos.length === 0 && (
            <div style={{ color: 'var(--label-3)', fontSize: '13px', padding: '12px 0' }}>No Reminders</div>
          )}
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <input
            type="text"
            placeholder="Add a reminder..."
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: '8px',
              background: 'var(--window-bg)', border: '1px solid var(--separator)',
              outline: 'none', color: 'var(--label)', fontSize: '13px',
              fontFamily: 'var(--font-ui)'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px', borderRadius: '8px',
              background: 'var(--accent)', color: 'white', border: 'none',
              fontWeight: 600, fontSize: '13px', cursor: 'pointer'
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
