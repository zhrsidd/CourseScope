import { useEffect, useRef, useState } from 'react';
import { IconCheck } from './ui/icons';

type Listener = (message: string) => void;
const listeners = new Set<Listener>();

/** Say something short, visibly (toast) and to screen readers (live region). */
export function announce(message: string) {
  listeners.forEach((l) => l(message));
}

/** Mount once. A polite live region plus a short-lived toast. */
export function Announcer() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    const listener: Listener = (m) => {
      // Clear first so repeating the same message is announced again.
      setMessage('');
      window.setTimeout(() => setMessage(m), 30);
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 2400);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {message}
      </div>
      <div className={`toast ${visible ? 'toast-show' : ''}`} aria-hidden="true">
        <IconCheck width={16} height={16} />
        <span>{message}</span>
      </div>
    </>
  );
}
