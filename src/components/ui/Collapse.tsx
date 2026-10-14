import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Animated disclosure body. Height animates through grid-template-rows (0fr to
 * 1fr), which is CSS-only, interruptible mid-way, and needs no measurement.
 *
 * Children mount on first open and stay mounted afterwards, so a long list of
 * collapsed panels costs nothing until someone opens one. While closed the
 * region is `inert`, so its contents leave the tab order and the accessibility
 * tree even though they are still in the DOM.
 */
export function Collapse({
  open,
  id,
  children,
  className,
}: {
  open: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(open);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // `inert` is not in React 18's typings; set it as an attribute.
    if (open) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [open, mounted]);

  return (
    <div
      ref={ref}
      id={id}
      className={`disc ${open ? 'disc-open' : ''} ${className ?? ''}`}
      // Initial inert state for first paint (the effect keeps it in step).
      {...(open ? {} : { inert: '' as unknown as undefined })}
    >
      <div className="disc-clip">{mounted ? children : null}</div>
    </div>
  );
}
