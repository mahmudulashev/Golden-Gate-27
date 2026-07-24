import React, { useState, useRef, useEffect } from 'react';

export default function Window({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  active,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  initialX = 100,
  initialY = 80,
  initialWidth = 800,
  initialHeight = 550,
  minWidth = 320,
  minHeight = 240,
  children
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [dragStart, setDragStart] = useState(null);
  const [resizeType, setResizeType] = useState(null);
  const [resizeStart, setResizeStart] = useState(null);
  const [isNew, setIsNew] = useState(true);
  
  const windowRef = useRef(null);

  // Position & responsive size bounding
  useEffect(() => {
    const handleResize = () => {
      const sw = window.innerWidth;
      const sh = window.innerHeight;
      if (sw <= 768) {
        setPosition({ x: 6, y: 30 });
        setSize({ width: Math.max(300, sw - 12), height: Math.max(350, sh - 95) });
      } else {
        setSize(prev => ({
          width: Math.min(prev.width, sw - 20),
          height: Math.min(prev.height, sh - 70)
        }));
        setPosition(prev => ({
          x: Math.max(10, Math.min(prev.x, sw - 100)),
          y: Math.max(25, Math.min(prev.y, sh - 100))
        }));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setIsNew(false), 400);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [id]);

  if (!isOpen) return null;

  const windowStyles = isMaximized
    ? {
        top: '25px',
        left: '0px',
        width: '100vw',
        height: 'calc(100vh - 95px)',
        zIndex,
        borderRadius: 0
      }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        maxWidth: 'calc(100vw - 12px)',
        maxHeight: 'calc(100vh - 70px)',
        zIndex
      };

  // Handle Dragging
  const handleDragMouseDown = (e) => {
    if (isMaximized) return;
    onFocus(id);
    setDragStart({
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    });
    e.preventDefault();
  };

  // Handle Resizing
  const handleResizeMouseDown = (type, e) => {
    if (isMaximized) return;
    onFocus(id);
    setResizeType(type);
    setResizeStart({
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
      startXPos: position.x,
      startYPos: position.y
    });
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragStart) {
        const dx = e.clientX - dragStart.startX;
        const dy = e.clientY - dragStart.startY;
        let newX = dragStart.posX + dx;
        let newY = dragStart.posY + dy;
        if (newY < 25) newY = 25;
        setPosition({ x: newX, y: newY });
      } else if (resizeType && resizeStart) {
        const dx = e.clientX - resizeStart.startX;
        const dy = e.clientY - resizeStart.startY;
        let newW = resizeStart.startW;
        let newH = resizeStart.startH;
        let newX = position.x;
        let newY = position.y;

        if (resizeType.includes('r')) newW = Math.max(minWidth, resizeStart.startW + dx);
        if (resizeType.includes('b')) newH = Math.max(minHeight, resizeStart.startH + dy);
        if (resizeType.includes('l')) {
          const potentialW = resizeStart.startW - dx;
          if (potentialW >= minWidth) { newW = potentialW; newX = resizeStart.startXPos + dx; }
        }
        if (resizeType.includes('t')) {
          const potentialH = resizeStart.startH - dy;
          if (potentialH >= minHeight) { newH = potentialH; newY = Math.max(25, resizeStart.startYPos + dy); }
        }
        setSize({ width: newW, height: newH });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setDragStart(null);
      setResizeType(null);
      setResizeStart(null);
    };

    if (dragStart || resizeType) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragStart, resizeType, resizeStart, position, size]);

  return (
    <div
      ref={windowRef}
      className={`glass-window window-transition ${active ? 'active' : ''} ${isMinimized ? 'window-minimize-to-dock' : ''} ${isNew ? 'window-opening' : ''}`}
      style={windowStyles}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar"
        onDoubleClick={onMaximize}
        onMouseDown={handleDragMouseDown}
      >
        {/* Traffic Light Buttons */}
        <div className="tl-group">
          <button
            className={`tl tl-close ${!active ? 'tl-inactive' : ''}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="1.5">
              <path d="M3 3l6 6M9 3l-6 6" />
            </svg>
          </button>
          <button
            className={`tl tl-min ${!active ? 'tl-inactive' : ''}`}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            title="Minimize"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="1.5">
              <path d="M2 6h8" />
            </svg>
          </button>
          <button
            className={`tl tl-zoom ${!active ? 'tl-inactive' : ''}`}
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            title="Full Screen"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="1.5">
              <path d="M2 3.5l4 5 4-5" />
            </svg>
          </button>
        </div>

        {/* Window Title */}
        <div className="window-title-text">{title}</div>

        {/* Right alignment placeholder */}
        <div style={{ width: '52px' }} />
      </div>

      {/* Window Body */}
      <div style={{
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div onMouseDown={(e) => handleResizeMouseDown('r', e)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6px', cursor: 'e-resize', zIndex: 100 }} />
          <div onMouseDown={(e) => handleResizeMouseDown('b', e)} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', cursor: 's-resize', zIndex: 100 }} />
          <div onMouseDown={(e) => handleResizeMouseDown('br', e)} style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', cursor: 'se-resize', zIndex: 101 }} />
          <div onMouseDown={(e) => handleResizeMouseDown('l', e)} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', cursor: 'w-resize', zIndex: 100 }} />
          <div onMouseDown={(e) => handleResizeMouseDown('t', e)} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', cursor: 'n-resize', zIndex: 100 }} />
        </>
      )}
    </div>
  );
}
