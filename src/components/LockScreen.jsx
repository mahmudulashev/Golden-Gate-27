import React, { useState, useEffect } from 'react';

export default function LockScreen({ onUnlock, wallpaper, username = "Mahmud Ulashev" }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [fading, setFading] = useState(false);
  const [password, setPassword] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayName = days[d.getDay()];
      const dayNum = d.getDate();
      const monthName = months[d.getMonth()];
      
      setDate(`${dayName} ${dayNum} ${monthName}`);
      
      const h = d.getHours().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleUnlock = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => onUnlock && onUnlock(), 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  const defaultWallpaper = "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=90";
  const bgStyle = wallpaper ? (wallpaper.includes('url(') ? wallpaper : `url(${wallpaper})`) : `url('${defaultWallpaper}')`;

  return (
    <div 
      className={`lock-screen ${fading ? 'lock-screen-fade' : ''}`} 
      onClick={() => setShowInput(true)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ backgroundImage: bgStyle }}
    >
      {/* Top Status Bar */}
      <div className="lock-screen-topbar">
        <div className="lock-screen-topbar-right">
          <span className="lock-screen-abc-badge">ABC</span>
          <span className="lock-screen-battery-text">36%</span>
          {/* Battery Icon */}
          <svg className="lock-screen-status-icon" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
            <rect x="2" y="2" width="7" height="8" rx="1" fill="currentColor"/>
            <path d="M22 4C22.5523 4 23 4.44772 23 5V7C23 7.55228 22.5523 8 22 8V4Z" fill="currentColor"/>
          </svg>
          {/* WiFi Icon */}
          <svg className="lock-screen-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* Main Lock Screen Content */}
      <div className="lock-screen-content">
        <div className="lock-screen-clock-box">
          <div className="lock-screen-date">{date}</div>
          <div className="lock-screen-time">{time}</div>
        </div>

        {/* User Login Section */}
        <div className="lock-screen-user-section">
          <div className="lock-screen-vinyl-avatar" onClick={handleUnlock}>
            <div className="vinyl-groove"></div>
            <div className="vinyl-label">
              <div className="vinyl-center-dot"></div>
            </div>
          </div>

          <div className="lock-screen-username">{username}</div>
          
          {showInput ? (
            <form 
              onSubmit={(e) => { e.preventDefault(); handleUnlock(); }}
              className="lock-screen-password-form"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="lock-screen-password-input"
              />
              <button type="submit" className="lock-screen-password-btn">
                ➔
              </button>
            </form>
          ) : (
            <div className="lock-screen-hint" onClick={handleUnlock}>
              Touch ID or Enter Password
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

