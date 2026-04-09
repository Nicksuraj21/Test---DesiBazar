/**
 * URL-safe slug: spaces → hyphen, strip punctuation, collapse repeated hyphens.
 * "Bath & Body" → "bath-body"
 * "Colgate - Strong Teeth" → "colgate-strong-teeth"
 */
export const slugify = (text) => {
    let s = String(text ?? "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
    s = s.replace(/-+/g, "-").replace(/^-|-$/g, "");
    return s;
};

/** Match DB category string to :category URL segment (slug or legacy raw). */
export const categoryMatches = (productCategory, urlCategorySegment) => {
    if (urlCategorySegment == null || urlCategorySegment === "") return false;
    const url = String(urlCategorySegment).trim();
    const db = String(productCategory ?? "").trim();
    if (!db) return false;
    if (slugify(db) === slugify(url)) return true;
    if (db.toLowerCase() === url.toLowerCase()) return true;
    return false;
};

/**
 * Readable URL: /products/:categorySlug/:productSlug
 * Category uses slugify so "Bath & Body" → .../bath-body/...
 */
export const buildProductDetailPath = (category, name, id, products = []) => {
    const catSlug = slugify(category) || "other";
    const slug = slugify(name);
    const idStr = String(id ?? "").trim();
    if (!slug) {
        return idStr ? `/products/${catSlug}/${idStr}` : `/products/${catSlug}`;
    }

    const sameSlugInCategory = products.filter(
        (p) => categoryMatches(p.category, category) && slugify(p.name) === slug
    );

    if (sameSlugInCategory.length <= 1) {
        return `/products/${catSlug}/${slug}`;
    }

    const hex = idStr.replace(/[^a-f0-9]/gi, "");
    const short = hex.slice(-6).toLowerCase();
    return `/products/${catSlug}/${slug}-${short}`;
};

/**
 * Resolve product from URL (slug-only, short suffix, legacy slug+fullObjectId, or bare id).
 */
export const resolveProductFromRoute = (categoryParam, slugParam, products) => {
    const raw = String(slugParam ?? "").trim();
    if (!raw || !products?.length) return undefined;

    const inCategory = (p) => categoryMatches(p.category, categoryParam);

    // Whole segment is a Mongo ObjectId (old URLs)
    if (/^[a-f0-9]{24}$/i.test(raw)) {
        const byId = products.find((p) => String(p._id).toLowerCase() === raw.toLowerCase());
        return byId ?? undefined;
    }

    // Legacy: last 24 chars are Mongo ObjectId (slug-fullid URLs)
    const fullIdTail = raw.match(/([a-f0-9]{24})$/i);
    if (fullIdTail) {
        const oid = fullIdTail[1].toLowerCase();
        const byId = products.find((p) => String(p._id).toLowerCase() === oid);
        if (byId) return byId;
    }

    // Disambiguation: …-{6 hex} at end
    const shortMatch = raw.match(/-([a-f0-9]{6})$/i);
    if (shortMatch) {
        const suf = shortMatch[1].toLowerCase();
        const baseSlug = raw.slice(0, -(suf.length + 1)).toLowerCase();
        if (baseSlug) {
            const candidates = products.filter(
                (p) =>
                    inCategory(p) &&
                    slugify(p.name) === baseSlug &&
                    String(p._id).toLowerCase().endsWith(suf)
            );
            if (candidates.length >= 1) return candidates[0];
        }
    }

    // Slug-only
    const slug = raw.toLowerCase();
    const matches = products.filter((p) => inCategory(p) && slugify(p.name) === slug);
    if (matches.length >= 1) return matches[0];

    return undefined;
};
