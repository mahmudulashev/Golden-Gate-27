import React, { useState } from 'react';

export default function PyCharmApp() {
  const [output, setOutput] = useState('Press "Run" to execute Python script...');
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setOutput('Executing: python3 main.py...');
    setTimeout(() => {
      setOutput('🚀 [PyCharm] macOS Golden Gate 27 environment initialized successfully.\nProcess finished with exit code 0');
      setRunning(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#1E1F22', color: '#BCBEC4', fontFamily: 'Consolas, Monaco, monospace' }}>
      {/* PyCharm Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 14px', background: '#2B2D30', borderBottom: '1px solid #1E1F22', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#35D0BA', fontWeight: 700 }}>PyCharm 2026</span>
          <span style={{ color: '#808080' }}>main.py</span>
        </div>
        <button 
          onClick={handleRun}
          disabled={running}
          style={{ background: '#35D0BA', color: '#1E1F22', border: 'none', borderRadius: '4px', padding: '4px 14px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
        >
          {running ? '⌛ Running...' : '▶ Run main.py'}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Project Tree */}
        <div style={{ width: '180px', background: '#2B2D30', borderRight: '1px solid #1E1F22', padding: '10px 0', fontSize: '12px' }}>
          <div style={{ padding: '4px 12px', color: '#808080', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}>Project</div>
          <div style={{ padding: '4px 16px', color: '#35D0BA', fontWeight: 600 }}>📁 golden_gate_27</div>
          <div style={{ padding: '3px 28px', color: '#BCBEC4' }}>🐍 main.py</div>
          <div style={{ padding: '3px 28px', color: '#BCBEC4' }}>🐍 config.py</div>
          <div style={{ padding: '3px 28px', color: '#BCBEC4' }}>📄 requirements.txt</div>
        </div>

        {/* Python Code Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px', fontSize: '13px', lineHeight: '1.6', overflowY: 'auto' }}>
            <div><span style={{ color: '#CF8E6D' }}>import</span> os</div>
            <div><span style={{ color: '#CF8E6D' }}>import</span> sys</div>
            <br/>
            <div><span style={{ color: '#CF8E6D' }}>def</span> <span style={{ color: '#56A8F5' }}>main</span>():</div>
            <div style={{ paddingLeft: '20px' }}>print(<span style={{ color: '#6AAB73' }}>"Initializing Golden Gate 27..."</span>)</div>
            <div style={{ paddingLeft: '20px' }}>system_name = <span style={{ color: '#6AAB73' }}>"macOS 27 Liquid Glass"</span></div>
            <div style={{ paddingLeft: '20px' }}>print(<span style={{ color: '#6AAB73' }}>f"Running on {"{"}system_name{"}"}"</span>)</div>
            <br/>
            <div><span style={{ color: '#CF8E6D' }}>if</span> __name__ == <span style={{ color: '#6AAB73' }}>"__main__"</span>:</div>
            <div style={{ paddingLeft: '20px' }}>main()</div>
          </div>

          {/* Execution Console */}
          <div style={{ height: '110px', background: '#1E1F22', borderTop: '1px solid #2B2D30', padding: '10px 14px', fontSize: '12px' }}>
            <div style={{ color: '#808080', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>PyCharm Console</div>
            <pre style={{ margin: 0, color: '#6AAB73', fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
