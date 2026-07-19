import React, { useState } from 'react';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [view, setView] = useState('month');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const events = {
    18: [
      { title: '1:1 with Maya', time: '2:00 PM – 2:30 PM', color: '#007AFF' },
      { title: 'Design Review', time: '4:00 PM – 5:00 PM', color: '#FF9500' },
    ],
    19: [
      { title: 'Sprint Planning', time: '9:30 AM – 10:30 AM', color: '#34C759' },
    ],
    20: [
      { title: 'Team Standup', time: '10:00 AM – 10:15 AM', color: '#AF52DE' },
      { title: 'Launch Party 🎉', time: '6:00 PM – 8:00 PM', color: '#FF2D55' },
    ],
    22: [
      { title: 'Dentist Appointment', time: '11:00 AM – 12:00 PM', color: '#FF3B30' },
    ],
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar - Mini calendar + event list */}
      <div className="finder-sidebar" style={{ width: '220px' }}>
        {/* Mini Calendar */}
        <div style={{ padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>{months[month]} {year}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '14px' }}>‹</button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '14px' }}>›</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', fontSize: '11px', textAlign: 'center' }}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} style={{ fontWeight: 700, color: 'var(--label-3)', padding: '3px', fontSize: '10px' }}>{d}</div>
            ))}
            {Array.from({ length: startDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === now.getDate();
              const isSelected = day === selectedDate;
              const hasEvent = events[day];
              return (
                <div key={day} onClick={() => setSelectedDate(day)} style={{
                  padding: '3px', cursor: 'pointer', borderRadius: '50%',
                  width: '24px', height: '24px', display: 'grid', placeItems: 'center',
                  margin: '0 auto',
                  background: isToday ? '#FF3B30' : isSelected ? 'var(--accent)' : 'transparent',
                  color: (isToday || isSelected) ? 'white' : 'var(--label)',
                  fontWeight: (isToday || hasEvent) ? 600 : 400, fontSize: '11px',
                  position: 'relative'
                }}>
                  {day}
                  {hasEvent && !isToday && !isSelected && (
                    <div style={{ position: 'absolute', bottom: '0px', width: '3px', height: '3px', borderRadius: '50%', background: 'var(--accent)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div style={{ padding: '0 12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--label-2)', textTransform: 'uppercase', marginBottom: '6px' }}>
            {selectedDate === now.getDate() ? 'Today' : `Jul ${selectedDate}`}
          </div>
          {(events[selectedDate] || []).map((ev, i) => (
            <div key={i} style={{
              padding: '6px 8px', borderRadius: '6px', marginBottom: '4px',
              borderLeft: `3px solid ${ev.color}`, background: 'var(--control-bg)', fontSize: '12px'
            }}>
              <div style={{ fontWeight: 600 }}>{ev.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--label-2)', marginTop: '1px' }}>{ev.time}</div>
            </div>
          ))}
          {!events[selectedDate] && (
            <div style={{ fontSize: '12px', color: 'var(--label-3)', padding: '8px 0' }}>No events</div>
          )}
        </div>
      </div>

      {/* Main view */}
      <div style={{ flex: 1, background: 'var(--control-bg)', padding: '16px', overflow: 'auto' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Day', 'Week', 'Month', 'Year'].map(v => (
              <button key={v} onClick={() => setView(v.toLowerCase())} style={{
                background: view === v.toLowerCase() ? 'var(--accent)' : 'var(--window-bg)',
                color: view === v.toLowerCase() ? 'white' : 'var(--label)',
                border: '1px solid var(--separator)', borderRadius: '6px',
                padding: '4px 12px', cursor: 'pointer', fontSize: '12px', fontFamily: 'var(--font-ui)'
              }}>{v}</button>
            ))}
          </div>
          <button style={{
            background: 'var(--accent)', color: 'white', border: 'none',
            padding: '6px 14px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '12px', fontWeight: 500
          }}>+ New Event</button>
        </div>

        {/* Day view with time slots */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const hour = i + 8;
            const hourLabel = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
            const dayEvents = (events[selectedDate] || []).filter(ev => {
              const h = parseInt(ev.time);
              const isPM = ev.time.includes('PM');
              const evHour = isPM && h !== 12 ? h + 12 : h;
              return evHour === hour;
            });

            return (
              <div key={i} style={{
                display: 'flex', minHeight: '48px',
                borderBottom: '1px solid var(--separator)'
              }}>
                <div style={{ width: '60px', fontSize: '11px', color: 'var(--label-3)', padding: '4px 8px 0 0', textAlign: 'right', flexShrink: 0 }}>
                  {hourLabel}
                </div>
                <div style={{ flex: 1, padding: '2px 4px', position: 'relative' }}>
                  {dayEvents.map((ev, j) => (
                    <div key={j} style={{
                      padding: '4px 8px', borderRadius: '4px',
                      background: ev.color, color: 'white', fontSize: '11px', fontWeight: 500,
                      marginBottom: '2px'
                    }}>
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
