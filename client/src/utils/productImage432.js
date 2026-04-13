/** 432×432 pad, no crop. Avoid b_auto/g_auto in URL — Cloudinary often returns 400. */
const CLOUDINARY_432_SEGMENT = "w_432,h_432,c_pad,f_auto,q_auto";

export function productImage432Url(url) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const marker = "/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const prefix = url.slice(0, i + marker.length);
  const tail = url.slice(i + marker.length);
  const parts = tail.split("/");
  const first = parts[0] || "";
  if (first.includes("w_432") && first.includes("h_432")) {
    parts[0] = CLOUDINARY_432_SEGMENT;
    return prefix + parts.join("/");
  }
  return prefix + CLOUDINARY_432_SEGMENT + "/" + tail;
}
