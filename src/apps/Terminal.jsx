import React, { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'macOS 27 Terminal — Liquid Glass Edition' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const commands = {
    help: () => 'Available commands:\n  help          Show this help\n  clear         Clear terminal\n  whoami        Current user\n  hostname      System hostname\n  date          Current date/time\n  uname         System info\n  ls            List files\n  pwd           Working directory\n  echo <text>   Echo text\n  neofetch      System info display\n  theme <mode>  Switch theme (light/dark)\n  uptime        System uptime\n  cat README    Show readme\n  history       Command history',
    clear: () => '__CLEAR__',
    whoami: () => 'kimi',
    hostname: () => 'macbook-pro.local',
    date: () => new Date().toString(),
    uname: () => 'Darwin macbook-pro.local 27.0.0 Darwin Kernel Version 27.0.0: macOS 27 Liquid Glass; root:xnu-12345.1.1/RELEASE_ARM64_T6020 arm64',
    pwd: () => '/Users/kimi',
    uptime: () => `${new Date().toTimeString().slice(0,8)} up ${Math.floor(Math.random() * 30 + 1)} days, ${Math.floor(Math.random() * 23)}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}, 3 users, load averages: 1.${Math.floor(Math.random()*99)} 1.${Math.floor(Math.random()*99)} 1.${Math.floor(Math.random()*99)}`,
    ls: () => 'Applications  Desktop     Documents   Downloads\nLibrary       Movies      Music       Pictures\nPublic        .config     .ssh        .zshrc',
    neofetch: () => `                    'c.          kimi@macbook-pro.local
                 ,xNMM.          ─────────────────────────
               .OMMMMo           OS: macOS 27 Liquid Glass arm64
               OMMM0,            Host: MacBook Pro (M4 Pro, 2025)
     .;loddo:' loolloddol;.      Kernel: 27.0.0
   cKMMMMMMMMMMNWMMMMMMMMMM0:    Uptime: ${Math.floor(Math.random()*30+1)} days
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    Packages: 284 (brew)
 XMMMMMMMMMMMMMMMMMMMMMMMX.     Shell: zsh 5.9
;MMMMMMMMMMMMMMMMMMMMMMMM:      Resolution: 3456x2234
:MMMMMMMMMMMMMMMMMMMMMMMM:      DE: Aqua
.MMMMMMMMMMMMMMMMMMMMMMMMX.     WM: Quartz Compositor
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.   Terminal: Terminal.app
 .XMMMMMMMMMMMMMMMMMMMMMMMMk    CPU: Apple M4 Pro (14) @ 4.51GHz
  .XMMMMMMMMMMMMMMMMMMMMK.     GPU: Apple M4 Pro (20-core)
    kMMMMMMMMMMMMMMMMMMd.       Memory: 8.2 GiB / 36 GiB (22%)
     ;KMMMMMMMWXXWMMMKo.`,
    'cat': (args) => {
      if (args === 'README' || args === 'readme') {
        return '# macOS 27 Liquid Glass\n\nA pixel-faithful browser simulation of macOS 27.\n\nFeatures:\n- Glassmorphism UI with backdrop-filter\n- 23+ functional apps\n- Dark/Light mode\n- Dock magnification\n- Window management (drag, resize, minimize, maximize)\n- Lock screen with unlock animation\n- Interactive widgets';
      }
      return `cat: ${args || 'No file specified'}: No such file or directory`;
    },
    history: () => '__HISTORY__',
    echo: (args) => args || '',
    theme: (args) => {
      if (args === 'dark' || args === 'light') {
        window.dispatchEvent(new CustomEvent('change-theme', { detail: args }));
        return `Theme switched to ${args} mode`;
      }
      return 'Usage: theme <light|dark>';
    }
  };

  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const entry = { type: 'input', text: `kimi@macbook-pro ~ % ${trimmed}` };
    let result;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[cmd]) {
      const output = typeof commands[cmd] === 'function' ? commands[cmd](args) : commands[cmd];
      if (output === '__HISTORY__') {
        result = cmdHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n');
      } else {
        result = output;
      }
    } else {
      result = `zsh: command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, entry, { type: 'output', text: result }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const idx = historyIndex < 0 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const idx = historyIndex + 1;
        if (idx >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(idx);
          setInput(cmdHistory[idx]);
        }
      }
    }
  };

  return (
    <div style={{
      height: '100%', background: 'rgba(30,30,30,.95)',
      color: '#4CD964', fontFamily: 'var(--font-mono)',
      fontSize: '13px', lineHeight: '1.6',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 14px' }}>
        {history.map((entry, i) => (
          <div key={i} style={{
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            color: entry.type === 'input' ? '#FFFFFF' : '#4CD964',
            marginBottom: '2px'
          }}>
            {entry.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', alignItems: 'center', padding: '8px 14px',
        borderTop: '1px solid rgba(255,255,255,.08)', flexShrink: 0
      }}>
        <span style={{ color: '#FF9500', marginRight: '8px', whiteSpace: 'nowrap' }}>kimi@macbook-pro ~ %</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: '#FFFFFF', flex: 1, fontSize: '13px',
            fontFamily: 'var(--font-mono)', caretColor: '#4CD964'
          }}
        />
      </form>
    </div>
  );
}
