import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets, categories } from "../assets/assets";
import { buildProductDetailPath, slugify } from "../utils/slugify";
import { productImage432Url } from "../utils/productImage432";

const RECENT_KEY = "desibazarSearchRecent";
const MAX_RECENT = 3;
const MAX_SUGGESTIONS = 10;

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(arr) ? arr.filter((s) => typeof s === "string" && s.trim()) : [];
    const next = list.slice(0, MAX_RECENT);
    if (next.length !== list.length) {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    }
    return next;
  } catch {
    return [];
  }
}

function saveRecent(term) {
  const t = term.trim();
  if (!t) return;
  const prev = loadRecent();
  const next = [t, ...prev.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function scoreProduct(p, qLower) {
  const name = String(p.name ?? "")
    .toLowerCase()
    .trim();
  const cat = String(p.category ?? "")
    .toLowerCase()
    .trim();
  let score = 0;
  if (!name && !cat) return 0;
  if (name === qLower) score += 120;
  else if (name.startsWith(qLower)) score += 95;
  else if (name.split(/\s+/).some((w) => w.startsWith(qLower))) score += 75;
  else if (name.includes(qLower)) score += 55;
  if (cat.includes(qLower)) score += 35;
  if (slugify(p.name).includes(slugify(qLower))) score += 8;
  return score;
}

const POPULAR_PICKS = 6;

function PlusMark({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function MinusMark({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ProductPickList({
  title,
  ariaLabel,
  products,
  currency,
  onSelect,
  cartItems,
  addToCart,
  removeFromCart,
  className = "",
}) {
  if (!products?.length) return null;
  return (
    <section
      aria-label={ariaLabel}
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ${className}`.trim()}
    >
      <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </div>
      <ul>
        {products.map((p) => {
          const qty = cartItems[p._id] || 0;
          return (
            <li
              key={p._id}
              className="flex items-center gap-2 border-b border-slate-100 px-2 py-2 last:border-b-0 sm:gap-3 sm:px-3 sm:py-2.5"
            >
              <button
                type="button"
                onClick={() => onSelect(p)}
                className="flex min-w-0 flex-1 items-center gap-2 rounded-lg py-1 text-left transition hover:bg-emerald-50/70 sm:gap-3 sm:py-1.5 sm:pr-1"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-14 sm:w-14">
                  {p.image?.[0] ? (
                    <img
                      src={productImage432Url(p.image[0])}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{p.name}</p>
                  <p className="truncate text-xs text-slate-500">{p.category}</p>
                  <p className="mt-0.5 text-sm font-semibold text-primary">
                    {currency}
                    {p.offerPrice ?? p.price}
                    {p.price != null && p.offerPrice != null && Number(p.price) > Number(p.offerPrice) ? (
                      <span className="ml-1 text-xs font-normal text-slate-400 line-through">
                        {currency}
                        {p.price}
                      </span>
                    ) : null}
                  </p>
                </div>
              </button>
              <div
                className="flex shrink-0 items-center justify-center py-0.5 pl-0.5"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {!p.inStock ? (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-300"
                    title="Out of stock"
                  >
                    <PlusMark className="opacity-40" />
                  </span>
                ) : qty === 0 ? (
                  <button
                    type="button"
                    aria-label={`${p.name} cart mein add karein`}
                    onClick={() => addToCart(p._id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/45 bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white active:scale-90"
                  >
                    <PlusMark />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label={`${p.name} cart se ek hataein (${qty} abhi cart mein)`}
                    onClick={() => removeFromCart(p._id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary bg-primary text-white shadow-sm transition hover:bg-primary/90 active:scale-90"
                  >
                    <MinusMark className="text-white" />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const SearchPage = () => {
  const {
    products,
    productsLoading,
    productsError,
    fetchProducts,
    navigate,
    setSearchQuery,
    currency,
    axios,
    cartItems,
    addToCart,
    removeFromCart,
  } = useAppContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(() => searchParams.get("q")?.trim() ?? "");
  const [recent, setRecent] = useState(() => loadRecent());
  const [orderRankedIds, setOrderRankedIds] = useState([]);
  const inputRef = useRef(null);
  const debounceUrl = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get("/api/product/popular");
        if (cancelled) return;
        if (data?.success && Array.isArray(data.ids)) {
          setOrderRankedIds(data.ids.map(String));
        } else {
          setOrderRankedIds([]);
        }
      } catch {
        if (!cancelled) setOrderRankedIds([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [axios]);

  useEffect(() => {
    if (debounceUrl.current) clearTimeout(debounceUrl.current);
    debounceUrl.current = setTimeout(() => {
      const t = input.trim();
      if (t) setSearchParams({ q: t }, { replace: true });
      else {
        setSearchParams({}, { replace: true });
      }
    }, 280);
    return () => {
      if (debounceUrl.current) clearTimeout(debounceUrl.current);
    };
  }, [input, setSearchParams]);

  const qLower = input.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!qLower || !products?.length) return [];
    const scored = products
      .map((p) => ({ p, s: scoreProduct(p, qLower) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || String(a.p.name).localeCompare(String(b.p.name)));
    const out = [];
    const seen = new Set();
    for (const { p } of scored) {
      const id = String(p._id);
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(p);
      if (out.length >= MAX_SUGGESTIONS) break;
    }
    return out;
  }, [products, qLower]);

  const matchCount = useMemo(() => {
    if (!qLower || !products?.length) return 0;
    return products.filter((p) => scoreProduct(p, qLower) > 0).length;
  }, [products, qLower]);

  const popular = useMemo(() => {
    if (!products?.length) return [];
    const byId = new Map(products.map((p) => [String(p._id), p]));
    const out = [];
    const seen = new Set();
    for (const id of orderRankedIds) {
      const p = byId.get(String(id));
      if (!p || seen.has(String(p._id))) continue;
      seen.add(String(p._id));
      out.push(p);
      if (out.length >= POPULAR_PICKS) break;
    }
    if (out.length > 0) return out;
    const flagged = products.filter((p) => p.bestSeller);
    if (flagged.length) return flagged.slice(0, POPULAR_PICKS);
    return products.slice(0, POPULAR_PICKS);
  }, [products, orderRankedIds]);

  const goToAllResults = useCallback(() => {
    const t = input.trim();
    if (!t) return;
    saveRecent(t);
    setRecent(loadRecent());
    setSearchQuery(t);
    navigate("/products");
  }, [input, navigate, setSearchQuery]);

  const openProduct = useCallback(
    (p) => {
      const t = input.trim();
      if (t) {
        saveRecent(t);
        setRecent(loadRecent());
      }
      navigate(buildProductDetailPath(p.category, p.name, p._id, products));
      scrollTo(0, 0);
    },
    [input, navigate, products]
  );

  const onRecentTap = (term) => {
    setInput(term);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="pb-4 pt-[max(1.75rem,calc(env(safe-area-inset-top,0px)+1rem))] md:mt-[calc(4rem+env(safe-area-inset-top,0px))] md:pb-6 md:pt-3">
      <div className="mx-auto max-w-2xl">
        <div className="relative mx-auto max-w-lg">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200/70 bg-white px-3 py-2 shadow-sm shadow-emerald-900/5 ring-emerald-500/10 focus-within:ring-1 md:py-2">
            <img src={assets.search_icon} alt="" className="h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="done"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              placeholder="Kya dhundh rahe hai ?"
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              aria-label="Search products"
            />
            {input ? (
              <button
                type="button"
                onClick={() => setInput("")}
                className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium text-slate-500 hover:bg-slate-100"
              >
                Clear
              </button>
            ) : null}
          </div>

          {qLower ? (
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
              <span className="text-slate-500">
                {productsLoading ? "Loading…" : `${matchCount} match${matchCount === 1 ? "" : "es"}`}
              </span>
              <button
                type="button"
                onClick={goToAllResults}
                disabled={!input.trim()}
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-emerald-600/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:py-2 md:text-sm"
              >
                Saare results → All products
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {productsLoading && (
        <div className="mx-auto mt-12 max-w-2xl text-center text-slate-600">Products load ho rahe hain…</div>
      )}

      {!productsLoading && productsError && (
        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-slate-700">Load nahi ho paya.</p>
          <button
            type="button"
            onClick={() => fetchProducts()}
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Dobara try karein
          </button>
        </div>
      )}

      {!productsLoading && !productsError && (
        <div className="mx-auto mt-8 max-w-2xl">
          {qLower && suggestions.length > 0 && (
            <ProductPickList
              title="Suggestions"
              ariaLabel="Suggestions"
              products={suggestions}
              currency={currency}
              onSelect={openProduct}
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          )}

          {qLower && !suggestions.length && (
            <p className="rounded-xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-center text-sm text-amber-900">
              Is naam se koi product nahi mila. Spelling check kare ya category neeche try kare.
            </p>
          )}

          {!qLower && recent.length > 0 && (
            <section className="mb-8" aria-label="Recent searches">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Recent</h2>
              <div className="flex flex-wrap gap-2">
                {recent.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => onRecentTap(term)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/50"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>
          )}

          {!qLower && (
            <section className="mb-10" aria-label="Browse categories">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.path}
                    to={`/products/${slugify(c.path)}`}
                    onClick={() => scrollTo(0, 0)}
                    className="rounded-full border border-emerald-100 bg-emerald-50/40 px-3 py-1.5 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100/80"
                  >
                    {c.text}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {!qLower && popular.length > 0 && (
            <ProductPickList
              title="Popular picks"
              ariaLabel="Popular products"
              products={popular}
              currency={currency}
              onSelect={openProduct}
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              className="mt-8"
            />
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default SearchPage;
