import React, { useState, useEffect } from 'react';

export default function LockScreen({ onUnlock }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      setDate(`${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`);
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, '0');
      setTime(`${h % 12 || 12}:${m}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  const handleClick = () => {
    setFading(true);
    setTimeout(() => onUnlock(), 600);
  };

  return (
    <div className={`lock-screen ${fading ? 'lock-screen-fade' : ''}`} onClick={handleClick}>
      <div className="lock-screen-content">
        <div className="lock-screen-date">{date}</div>
        <div className="lock-screen-time">{time}</div>
        <div className="lock-screen-avatar">K</div>
        <div className="lock-screen-username">kimi</div>
        <div className="lock-screen-hint">Click to log in</div>
      </div>
    </div>
  );
}
