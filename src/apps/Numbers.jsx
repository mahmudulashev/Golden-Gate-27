import React, { useState } from 'react';
export default function Numbers() {
  const [data, setData] = useState([
    ['Product', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'],
    ['MacBook Pro', '1,240', '1,380', '1,520', '1,680', '5,820'],
    ['MacBook Air', '2,100', '2,340', '2,150', '2,600', '9,190'],
    ['iMac', '890', '920', '1,050', '1,180', '4,040'],
    ['Mac Studio', '340', '420', '380', '510', '1,650'],
    ['Mac Pro', '120', '95', '140', '165', '520'],
    ['Mac mini', '1,560', '1,720', '1,890', '2,100', '7,270'],
  ]);
  const [selectedCell, setSelectedCell] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
        borderBottom: '1px solid var(--separator)', background: 'var(--window-bg)', flexShrink: 0
      }}>
        {['Format', 'Insert', 'Table', 'Chart', 'Sort & Filter'].map(t => (
          <button key={t} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: 'var(--label)', padding: '4px 8px',
            borderRadius: '4px', fontFamily: 'var(--font-ui)'
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        {/* Formula bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '3px 8px', borderRadius: '6px',
          background: 'var(--control-bg)', border: '1px solid var(--separator)',
          fontSize: '12px', color: 'var(--label-2)', minWidth: '200px'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>fx</span>
          <span>=SUM(B2:B7)</span>
        </div>
      </div>

      {/* Spreadsheet */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px', background: 'var(--control-bg)' }}>
        <table style={{
          width: '100%', borderCollapse: 'collapse', fontSize: '13px',
          background: 'white', borderRadius: '8px', overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,.06)'
        }}>
          <thead>
            <tr>
              {data[0].map((h, i) => (
                <th key={i} style={{
                  padding: '8px 14px', textAlign: i === 0 ? 'left' : 'right',
                  background: '#F0F0F4', fontWeight: 700, fontSize: '12px',
                  borderBottom: '2px solid var(--separator)', color: 'var(--label)'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    onClick={() => setSelectedCell(`${ri}-${ci}`)}
                    style={{
                      padding: '8px 14px',
                      textAlign: ci === 0 ? 'left' : 'right',
                      borderBottom: '1px solid var(--separator)',
                      fontWeight: ci === 0 ? 600 : ci === row.length - 1 ? 600 : 400,
                      color: ci === row.length - 1 ? 'var(--accent)' : 'var(--label)',
                      background: selectedCell === `${ri}-${ci}` ? 'color-mix(in srgb, var(--accent) 10%, transparent)' :
                                 ci === row.length - 1 ? 'rgba(0,122,255,.03)' : 'transparent',
                      cursor: 'pointer',
                      outline: selectedCell === `${ri}-${ci}` ? '2px solid var(--accent)' : 'none',
                      fontVariantNumeric: ci > 0 ? 'tabular-nums' : 'normal'
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            {/* Total row */}
            <tr>
              <td style={{ padding: '8px 14px', fontWeight: 800, borderTop: '2px solid var(--separator)', background: '#F8F8FC' }}>Total</td>
              {['6,250', '6,875', '7,130', '8,235', '28,490'].map((v, i) => (
                <td key={i} style={{
                  padding: '8px 14px', textAlign: 'right', fontWeight: 800,
                  borderTop: '2px solid var(--separator)', background: '#F8F8FC',
                  color: i === 4 ? 'var(--accent)' : 'var(--label)',
                  fontVariantNumeric: 'tabular-nums'
                }}>{v}</td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Mini chart */}
        <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Sales by Quarter</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '120px' }}>
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => {
              const values = [6250, 6875, 7130, 8235];
              const height = (values[i] / 8235) * 100;
              return (
                <div key={q} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '100%', height: `${height}%`, borderRadius: '6px 6px 0 0',
                    background: `linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 60%, transparent))`,
                    transition: 'height .3s ease'
                  }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--label-2)' }}>{q}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
