import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(true);

  const handleNum = (n) => {
    if (fresh) { setDisplay(n); setFresh(false); }
    else setDisplay(prev => prev === '0' ? n : prev + n);
  };

  const handleOp = (nextOp) => {
    const current = parseFloat(display);
    if (prev !== null && op && !fresh) {
      const result = calc(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setFresh(true);
  };

  const calc = (a, b, op) => {
    switch(op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prev !== null && op) {
      const result = calc(prev, parseFloat(display), op);
      setDisplay(String(result));
      setPrev(null);
      setOp(null);
      setFresh(true);
    }
  };

  const handleClear = () => { setDisplay('0'); setPrev(null); setOp(null); setFresh(true); };
  const handlePercent = () => setDisplay(String(parseFloat(display) / 100));
  const handleToggle = () => setDisplay(String(-parseFloat(display)));
  const handleDot = () => { if (!display.includes('.')) setDisplay(display + '.'); setFresh(false); };

  const buttons = [
    [
      { label: display === '0' ? 'AC' : 'C', action: handleClear, type: 'fn' },
      { label: '±', action: handleToggle, type: 'fn' },
      { label: '%', action: handlePercent, type: 'fn' },
      { label: '÷', action: () => handleOp('÷'), type: 'op', active: op === '÷' }
    ],
    [
      { label: '7', action: () => handleNum('7') },
      { label: '8', action: () => handleNum('8') },
      { label: '9', action: () => handleNum('9') },
      { label: '×', action: () => handleOp('×'), type: 'op', active: op === '×' }
    ],
    [
      { label: '4', action: () => handleNum('4') },
      { label: '5', action: () => handleNum('5') },
      { label: '6', action: () => handleNum('6') },
      { label: '−', action: () => handleOp('−'), type: 'op', active: op === '−' }
    ],
    [
      { label: '1', action: () => handleNum('1') },
      { label: '2', action: () => handleNum('2') },
      { label: '3', action: () => handleNum('3') },
      { label: '+', action: () => handleOp('+'), type: 'op', active: op === '+' }
    ],
    [
      { label: '0', action: () => handleNum('0'), wide: true },
      { label: '.', action: handleDot },
      { label: '=', action: handleEquals, type: 'op' }
    ]
  ];

  const fontSize = display.length > 9 ? '28px' : display.length > 6 ? '36px' : '48px';

  return (
    <div style={{
      height: '100%', background: '#1C1C1E', display: 'flex', flexDirection: 'column',
      padding: '12px', gap: '8px'
    }}>
      {/* Display */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        padding: '0 16px 8px', minHeight: '60px'
      }}>
        <span style={{
          color: 'white', fontSize, fontWeight: 200, lineHeight: 1,
          fontFamily: 'var(--font-ui)', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {display}
        </span>
      </div>

      {/* Buttons */}
      {buttons.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: '8px' }}>
          {row.map((btn, ci) => (
            <button
              key={ci}
              onClick={btn.action}
              style={{
                flex: btn.wide ? 2 : 1,
                height: '48px',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: 400,
                fontFamily: 'var(--font-ui)',
                background: btn.type === 'op' ? (btn.active ? 'white' : '#FF9F0A') :
                           btn.type === 'fn' ? '#636366' : '#505050',
                color: btn.type === 'op' ? (btn.active ? '#FF9F0A' : 'white') :
                       btn.type === 'fn' ? '#1C1C1E' : 'white',
                transition: 'all .1s ease',
                textAlign: btn.wide ? 'left' : 'center',
                paddingLeft: btn.wide ? '22px' : '0'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
