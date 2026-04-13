import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

function normalizeOptions(options) {
  if (!options?.length) return [];
  return options.map((opt) =>
    typeof opt === "string" || typeof opt === "number"
      ? { value: String(opt), label: String(opt) }
      : { value: String(opt.value), label: opt.label != null ? String(opt.label) : String(opt.value) }
  );
}

/**
 * Custom dropdown — avoids native `<select>` OS/Chrome pickers on mobile.
 */
export default function CustomSelect({
  value,
  onChange,
  options: optionsProp,
  disabled = false,
  placeholder = "Select…",
  className = "",
  triggerClassName = "",
  triggerIconClassName = "",
  menuClassName = "",
  /** Minimum menu width (px) so long labels stay on one line; can exceed trigger width */
  menuMinWidth = 0,
  /** If true, option rows don’t wrap (use for short fixed labels only) */
  menuItemsNoWrap = false,
  id,
  "aria-label": ariaLabel,
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0, maxHeight: 280 });
  const wrapRef = useRef(null);

  const options = useMemo(() => normalizeOptions(optionsProp), [optionsProp]);

  const selected = useMemo(
    () => options.find((o) => o.value === String(value ?? "")),
    [options, value]
  );

  const display =
    selected?.label ?? (value !== "" && value != null ? String(value) : placeholder);

  const updatePosition = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 4;
    const below = rect.bottom + gap;
    const spaceBelow = window.innerHeight - below - 8;
    const maxHeight = Math.min(280, Math.max(120, spaceBelow));
    const width = Math.max(rect.width, Number(menuMinWidth) || 0);
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
    setMenuPos({ top: below, left, width, maxHeight });
  }, [menuMinWidth]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition, options.length]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      const w = wrapRef.current;
      if (w?.contains(e.target)) return;
      if (e.target.closest?.("[data-custom-select-menu]")) return;
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handlePick = (v) => {
    onChange(v);
    setOpen(false);
  };

  const listId = id ? `${id}-listbox` : undefined;
  const isDisabled = disabled || options.length === 0;

  return (
    <div className={`relative min-w-0 ${className}`} ref={wrapRef}>
      <button
        type="button"
        id={id}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={isDisabled}
        onClick={() => !isDisabled && setOpen((o) => !o)}
        className={[
          "flex w-full min-w-0 items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-800 shadow-sm transition",
          "outline-none hover:border-gray-300 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          isDisabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : "cursor-pointer",
          triggerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="truncate">{display}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition ${open ? "rotate-180" : ""} ${triggerIconClassName}`.trim()}
          strokeWidth={2}
        />
      </button>

      {open &&
        !isDisabled &&
        createPortal(
          <div
            data-custom-select-menu
            id={listId}
            role="listbox"
            className={[
              "fixed z-[200] overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg",
              menuClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width,
              maxHeight: menuPos.maxHeight,
            }}
          >
            {options.map((opt) => {
              const active = opt.value === String(value ?? "");
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handlePick(opt.value)}
                  className={[
                    "flex w-full items-center px-3 py-2.5 text-left text-sm transition",
                    menuItemsNoWrap ? "whitespace-nowrap" : "",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-gray-800 hover:bg-gray-50",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}
