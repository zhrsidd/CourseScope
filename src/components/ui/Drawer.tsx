import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { IconCross } from './icons';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

/**
 * Modal side sheet: a 420px drawer on desktop, a full-screen sheet on phones.
 *
 * Behaviour that matters and is easy to get wrong:
 *  - focus moves into the sheet on open and returns to the opener on close;
 *  - Tab and Shift+Tab stay inside while it is open;
 *  - Escape closes it, and so does the scrim;
 *  - the page behind does not scroll and is inert to assistive technology;
 *  - it stays mounted for the length of the exit transition, so closing is
 *    animated and can be interrupted by re-opening.
 */
export function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'right',
  returnFocusRef,
  footer,
  hideTitle = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: 'right' | 'left';
  returnFocusRef?: RefObject<HTMLElement>;
  footer?: ReactNode;
  hideTitle?: boolean;
}) {
  const [present, setPresent] = useState(open);
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Mount, then flip `shown` on the next frame so the enter transition runs.
  useEffect(() => {
    if (open) {
      openerRef.current = (document.activeElement as HTMLElement) ?? null;
      setPresent(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = window.setTimeout(() => setPresent(false), 260);
    return () => window.clearTimeout(t);
  }, [open]);

  // Focus in on open, back out on close.
  useEffect(() => {
    if (!shown) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
  }, [shown]);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      const target = returnFocusRef?.current ?? openerRef.current;
      target?.focus?.();
    }
  }, [open, returnFocusRef]);

  // Page behind: no scroll, not reachable by assistive technology.
  useEffect(() => {
    if (!present) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = document.getElementById('root');
    root?.setAttribute('inert', '');
    root?.setAttribute('aria-hidden', 'true');
    return () => {
      document.body.style.overflow = prevOverflow;
      root?.removeAttribute('inert');
      root?.removeAttribute('aria-hidden');
    };
  }, [present]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (n) => !n.closest('[inert]') && n.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!present) return null;

  return createPortal(
    <div className="drawer-layer" onKeyDown={onKeyDown}>
      <div className={`scrim ${shown ? 'scrim-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`drawer drawer-${side} ${shown ? 'drawer-open' : ''}`}
      >
        <div className="drawer-head">
          <h2 className={hideTitle ? 'sr-only' : 'drawer-title'}>{title}</h2>
          <button type="button" className="btn-ghost btn-sm" onClick={onClose} aria-label={`Close ${title}`}>
            <IconCross width={16} height={16} />
            <span>Close</span>
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-foot">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
