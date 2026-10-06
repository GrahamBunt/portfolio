"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './CubbyDemoApp.module.css';

// Render outside the scroll viewport so the last row's tooltip isn't clipped.
export function EntryAction({ label, tooltip, onClick, className, children }: {
  label: string; tooltip: string; onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string; children: ReactNode;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [position, setPosition] = useState<{ app: HTMLElement; x: number; y: number }>();
  const dismiss = () => { clearTimeout(timer.current); setPosition(undefined); };
  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const control = button.current;
      const app = control?.closest<HTMLElement>('[data-cubby-demo]');
      if (!control || !app) return;
      const bounds = app.getBoundingClientRect(), rect = control.getBoundingClientRect();
      const scale = bounds.width / 360;
      setPosition({ app, x: (rect.left + rect.width / 2 - bounds.left) / scale, y: (rect.bottom - bounds.top) / scale + 8 });
    }, 350);
  };
  useEffect(() => {
    const hide = () => { clearTimeout(timer.current); setPosition(undefined); };
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, []);
  return <>
    <button ref={button} type="button" aria-label={label} className={className}
      onPointerEnter={event => { if (event.pointerType !== 'touch') show(); }} onPointerLeave={dismiss}
      onFocus={show} onBlur={dismiss} onClick={event => { event.stopPropagation(); dismiss(); onClick(event); }}>
      {children}
    </button>
    {position && createPortal(<span role="tooltip" className={styles.entryTooltip}
      style={{ left: position.x, top: position.y }}>{tooltip}</span>, position.app)}
  </>;
}
