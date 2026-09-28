import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { GLOSSARY_BY_ID } from '@/data/taxonomy';
import { IconInfo } from './ui/icons';
import { cx } from './ui/primitives';

/**
 * ---------------------------------------------------------------------------
 *  EXPLANATORY TOOLTIP
 * ---------------------------------------------------------------------------
 *
 *  Opens on hover and on focus, and can be pinned open by clicking — which
 *  touch devices need, because they have no hover.
 *
 *  ---------------------------------------------------------------------------
 *  WHY THIS IS NOT A PURE-CSS TOOLTIP, AT THE THIRD ATTEMPT
 *  ---------------------------------------------------------------------------
 *
 *  This component has caused the same bug twice, and the second fix was
 *  incomplete, so it is worth writing down properly.
 *
 *  The panel is a fixed-width box absolutely positioned against its trigger.
 *  Two facts make that a layout hazard:
 *
 *   1. An absolutely positioned element CONTRIBUTES TO THE DOCUMENT'S SCROLL
 *      WIDTH even while it is invisible at `opacity: 0`. A page full of closed
 *      tooltips can therefore be dragged sideways before anyone interacts with
 *      anything.
 *   2. Anchoring it to one side of the trigger is wrong somewhere. Left-anchored
 *      overflows for triggers near the right edge; right-anchored overflows for
 *      triggers near the left edge. There is no single correct side, which is
 *      why v0.8's "anchor right on small screens" fix held on the home page and
 *      still failed by 147px on a course page, and by 75px at desktop width
 *      where the panel went back to being left-anchored.
 *
 *  So both problems are now solved at their root rather than tuned:
 *
 *   · THE PANEL IS NOT RENDERED AT ALL WHEN CLOSED. `display: none` is the only
 *     state that contributes nothing to scroll width, and not mounting the
 *     element is the strongest form of that. The cost is that open/close cannot
 *     be a CSS transition, so hover is tracked in state — a few more lines, and
 *     the behaviour a reader sees is unchanged.
 *   · WHEN OPEN, THE PANEL IS MEASURED AND NUDGED BACK INSIDE THE VIEWPORT.
 *     One read of its own bounding box after mount, then a horizontal offset if
 *     either edge is outside. This works at any width, on either side, for any
 *     trigger position, which is what the two previous side-picking fixes could
 *     not do.
 *
 *  Accessibility is unchanged and was verified: the trigger is a real button
 *  with an accessible name, `aria-describedby` points at the panel, and the
 *  panel is reachable by keyboard because focus opens it.
 */
export function InfoTooltip({
  term,
  text,
  label,
  align = 'left',
}: {
  /** Glossary id, e.g. "typical-offer". */
  term?: string;
  /** Explicit text, used when no glossary entry fits. */
  text?: string;
  label?: ReactNode;
  align?: 'left' | 'right';
}) {
  const id = useId();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [offset, setOffset] = useState(0);
  const panelRef = useRef<HTMLSpanElement | null>(null);

  const entry = term ? GLOSSARY_BY_ID[term] : undefined;
  const body = text ?? entry?.definition;
  const open = pinned || hovered || focused;

  /*
   * Measure once per open and shift horizontally if either edge is outside the
   * viewport. `offset` starts at 0 so the first paint uses the natural
   * position; the correction lands in the same frame via a layout effect's
   * microtask, which is imperceptible and avoids a flash at the wrong place.
   */
  const clamp = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const margin = 8;
    const prev = el.style.transform;
    el.style.transform = 'none';
    const r = el.getBoundingClientRect();
    el.style.transform = prev;
    const vw = document.documentElement.clientWidth;
    let shift = 0;
    if (r.right > vw - margin) shift = vw - margin - r.right;
    if (r.left + shift < margin) shift = margin - r.left;
    setOffset(shift);
  }, []);

  useEffect(() => {
    if (!open) {
      setOffset(0);
      return;
    }
    clamp();
    // A resize while the panel is open changes the right answer.
    window.addEventListener('resize', clamp);
    return () => window.removeEventListener('resize', clamp);
  }, [open, clamp]);

  if (!body) return null;

  return (
    <span
      className="group relative inline-flex align-middle"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setPinned((p) => !p)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setPinned(false);
        }}
        className="inline-flex items-center gap-1 rounded text-slate-400 hover:text-navy-700 focus:text-navy-700"
      >
        {label ? <span>{label}</span> : null}
        <IconInfo width={13} height={13} />
        <span className="sr-only">
          {entry ? `What does “${entry.term}” mean?` : 'More information'}
        </span>
      </button>

      {open ? (
        <span
          ref={panelRef}
          id={id}
          role="tooltip"
          style={offset ? { transform: `translateX(${offset}px)` } : undefined}
          className={cx(
            'pointer-events-none absolute top-full z-30 mt-1.5 w-64 max-w-[calc(100vw-1rem)] rounded-md border border-slate-200 bg-white p-2.5 text-left text-xs leading-relaxed text-ink shadow-raised',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {entry ? (
            <span className="mb-0.5 block font-semibold text-navy-900">{entry.term}</span>
          ) : null}
          {body}
        </span>
      ) : null}
    </span>
  );
}
