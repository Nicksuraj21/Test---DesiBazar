export const slugify = (text) =>
    String(text ?? "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

/**
 * Last URL segment: readable slug + Mongo ObjectId (no hyphens in id).
 */
export const productDetailSlugSegment = (name, id) => {
    const slug = slugify(name);
    const idStr = String(id ?? "").trim();
    if (!idStr) return "";
    return slug ? `${slug}-${idStr}` : idStr;
};

export const buildProductDetailPath = (category, name, id) => {
    const cat = String(category ?? "other").toLowerCase().trim() || "other";
    const segment = productDetailSlugSegment(name, id);
    if (!segment) return `/products/${cat}`;
    return `/products/${cat}/${segment}`;
};

/**
 * Parse product id from :slug route param. Supports legacy URLs that used only the id.
 */
export const extractProductIdFromSlugParam = (slug) => {
    if (slug == null) return "";
    const s = String(slug).trim();
    if (!s) return "";
    const last = s.split("-").pop();
    if (last && last.length > 0) return last;
    return s;
};
