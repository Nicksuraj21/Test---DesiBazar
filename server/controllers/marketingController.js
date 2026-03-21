import Product from "../models/Product.js";

const BANNED_PATTERNS = [
  { regex: /\bguaranteed\b/gi, replace: "promised" },
  { regex: /\bcure(s|d)?\b/gi, replace: "help" },
  { regex: /\b100\s*%/gi, replace: "best" },
];

const sanitizeText = (text) => {
  if (typeof text !== "string") return text;
  let out = text;
  for (const rule of BANNED_PATTERNS) out = out.replace(rule.regex, rule.replace);
  return out;
};

const sanitizeDeep = (obj) => {
  if (Array.isArray(obj)) return obj.map((x) => sanitizeDeep(x));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) out[k] = sanitizeDeep(obj[k]);
    return out;
  }
  return sanitizeText(obj);
};

const buildFallbackResult = ({
  product,
  goal,
  tone,
  language,
  platforms,
  campaignDays,
  targetArea,
}) => {
  const offer = Number(product.offerPrice || 0);
  const mrp = Number(product.price || 0);
  const discountPct =
    mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : null;

  const stockLine = product.inStock
    ? "Stock available now. Order today!"
    : "Currently out of stock. Back soon!";

  const areaLine = targetArea ? ` (${targetArea})` : "";
  const priceLine = discountPct ? `Save ${discountPct}% today` : "Special price today";

  const langPrefix =
    language === "Hindi" ? "नमस्ते! " : language === "English" ? "" : "";

  const toneHook =
    tone === "Premium"
      ? "Premium quality, desi taste."
      : tone === "Desi & Local"
      ? "DesiBazar ki local vibe!"
      : tone === "Hype & Energy"
      ? "Ready, set, taste!"
      : "Fresh and friendly!";

  const baseHeadline = `${product.name}${areaLine} | ${goal}`;
  const headlines = [
    `${baseHeadline}: ${priceLine}`,
    `${langPrefix}${product.name}${areaLine} - ${toneHook}`,
    `${product.name}: Fresh, tasty, and value for money`,
    product.inStock
      ? `Limited-time deal on ${product.name}!`
      : `We will restock ${product.name} soon`,
  ];

  const instagramCaptions = [
    `${langPrefix}${product.name}${areaLine}\n${priceLine}\n${stockLine}\nCTA: Order now & get fast delivery.`,
    `${toneHook} ${product.name}${areaLine}\n${priceLine}\nOffer on today only.\nCTA: Tap to order.`,
  ];

  const whatsappMessages = [
    `${langPrefix}${product.name}${areaLine} - ${priceLine}\n${stockLine}\nWhatsApp code: ORDER\nReply with quantity.`,
    `${product.name}${areaLine} ke liye offer hai ✅\n${priceLine}\n${stockLine}\nOrder karne ke liye reply karein.`,
  ];

  const facebookPosts = [
    `${product.name}${areaLine}\n${priceLine}\n${toneHook}\n${stockLine}\nDM/Call to place your order.`,
  ];

  const email = [
    {
      subject: `Today deal: ${product.name}${areaLine} (${goal})`,
      body: `Hi,\n\n${product.name}${areaLine} par ${priceLine}.\n${toneHook}\n${stockLine}\n\nOrder now from DesiBazar.\n`,
    },
  ];

  const google_ads = {
    headlines: [
      `${product.name} Deal`,
      `${goal} on ${product.name}`,
      discountPct ? `Save ${discountPct}%` : `Special Price`,
      targetArea ? `Near ${targetArea}` : "Fast Delivery",
    ].filter(Boolean),
    descriptions: [
      `${priceLine}. ${stockLine}`,
      `Order ${product.name} online & get fast delivery.`,
    ],
  };

  const platformMap = {
    instagram: { captions: instagramCaptions },
    whatsapp: { messages: whatsappMessages },
    facebook: { posts: facebookPosts },
    email: { email },
    google_ads,
  };

  const enabledPlatforms = platforms.reduce((acc, id) => {
    acc[id] = platformMap[id];
    return acc;
  }, {});

  const calendar = Array.from({ length: campaignDays }).map((_, i) => {
    const dayNum = i + 1;
    const focus =
      dayNum === 1
        ? "Opening offer + urgency"
        : dayNum % 3 === 0
        ? "Why this product (taste/quality)"
        : dayNum % 3 === 1
        ? "Offer reminder + CTA"
        : "Local vibe + delivery promise";

    const copy = `Day ${dayNum}: ${product.name}${areaLine}\n${focus}\n${priceLine}\n${stockLine}\nCTA: Order now.`;
    return { day: `Day ${dayNum}`, copy };
  });

  return {
    summary: "Generated marketing kit (stock-aware + offer math).",
    headlines,
    platforms: enabledPlatforms,
    campaignCalendar: calendar,
  };
};

const generateWithOpenAI = async ({
  product,
  goal,
  tone,
  language,
  platforms,
  campaignDays,
  targetArea,
}) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const offer = Number(product.offerPrice || 0);
  const mrp = Number(product.price || 0);
  const discountPct = mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : null;

  const platformText = platforms.join(", ");

  const productDesc = (product.description || []).slice(0, 4).join(". ");

  const system = `You are a marketing strategist for local e-commerce sellers in India. 
Write in the requested language/tone. Keep claims safe and non-medical. Return JSON only.`;

  const user = {
    product: {
      name: product.name,
      category: product.category,
      weight: product.weight,
      price: product.price,
      offerPrice: product.offerPrice,
      inStock: product.inStock,
      discountPct,
      description: productDesc,
    },
    inputs: { goal, tone, language, platforms: platformText, campaignDays, targetArea: targetArea || null },
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Generate a marketing kit for this product.

Return ONLY a valid JSON object with this structure:
{
  "summary": string,
  "headlines": string[], 
  "platforms": {
    "instagram": { "captions": string[] },
    "facebook": { "posts": string[] },
    "whatsapp": { "messages": string[] },
    "email": { "email": { "subject": string, "body": string }[] },
    "google_ads": { "headlines": string[], "descriptions": string[] }
  },
  "campaignCalendar": { "day": string, "copy": string }[]
}

Only fill the sections for platforms requested in inputs.platforms (others can be empty objects).
Constraints:
- Captions/posts/messages should be short and sale-oriented.
- Include clear CTA (order/DM/call).
- If inStock is false, messages should say "Back soon" / "Restocking soon" (no false claims).
- Avoid banned claims like guaranteed cures or 100% promises.

INPUT_JSON:
${JSON.stringify(user)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`OpenAI error: ${response.status} ${text}`.trim());
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned empty content");

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    // If model wrapped JSON inside text, try to extract.
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      parsed = JSON.parse(content.slice(start, end + 1));
    } else {
      throw new Error("Failed to parse OpenAI JSON");
    }
  }

  return sanitizeDeep(parsed);
};

export const generateMarketing = async (req, res) => {
  try {
    const {
      productId,
      goal = "Discount Offer",
      tone = "Friendly",
      language = "Hinglish",
      platforms = ["instagram", "whatsapp"],
      targetArea,
      campaignDays = 7,
    } = req.body || {};

    if (!productId) {
      return res.json({ success: false, message: "productId is required" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const normalizedPlatforms = Array.isArray(platforms) && platforms.length ? platforms : ["instagram"];
    const normalizedDays = Math.max(1, Math.min(30, Number(campaignDays || 7)));

    const result = process.env.OPENAI_API_KEY
      ? await generateWithOpenAI({
          product,
          goal,
          tone,
          language,
          platforms: normalizedPlatforms,
          campaignDays: normalizedDays,
          targetArea,
        }).catch(() => buildFallbackResult({
          product,
          goal,
          tone,
          language,
          platforms: normalizedPlatforms,
          campaignDays: normalizedDays,
          targetArea,
        }))
      : buildFallbackResult({
          product,
          goal,
          tone,
          language,
          platforms: normalizedPlatforms,
          campaignDays: normalizedDays,
          targetArea,
        });

    return res.json({ success: true, result });
  } catch (error) {
    return res.json({
      success: false,
      message: error?.message || "Failed to generate marketing content",
    });
  }
};

const buildSvgInstagramFallback = ({
  product,
  headline,
  language,
  tone,
  goal,
  backgroundRef,
}) => {
  const discountPct =
    Number(product.price || 0) > 0 && Number(product.offerPrice || 0) > 0
      ? Math.round(
          ((Number(product.price) - Number(product.offerPrice)) /
            Number(product.price)) *
            100
        )
      : null;

  const topText =
    language === "Hindi"
      ? "DesiBazar Specials"
      : language === "English"
      ? "DesiBazar Specials"
      : "DesiBazar Specials";

  const offerText =
    product.inStock
      ? discountPct
        ? `Save ${discountPct}% today`
        : "Special price today"
      : "Restocking soon";

  const toneLine =
    tone === "Premium"
      ? "Premium quality, desi taste."
      : tone === "Desi & Local"
      ? "DesiBazar local vibe."
      : tone === "Hype & Energy"
      ? "Ready, set, taste!"
      : "Fresh and friendly!";

  const c1 = tone === "Premium" ? "#0f172a" : "#16a34a";
  const c2 = tone === "Premium" ? "#f59e0b" : "#22c55e";

  const productName = String(product.name || "Product").slice(0, 34);
  const headlineLine = String(headline || goal || "").slice(0, 40);

  const orderCta = language === "Hindi" ? "Order abhi" : "Order Now";
  const productImageUrl = product?.image?.[0];

  const backgroundLayer = backgroundRef
    ? `
    <image href="${escapeXml(backgroundRef)}" x="0" y="0" width="1024" height="1024" preserveAspectRatio="xMidYMid slice" />
    <rect width="1024" height="1024" fill="url(#bgOverlay)" opacity="0.78" />
    `
    : `
    <rect width="1024" height="1024" rx="64" fill="url(#bg)" />
    <rect width="1024" height="1024" fill="url(#bgOverlay)" opacity="0.55" />
    `;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <linearGradient id="bgOverlay" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0b1220"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>

    ${backgroundLayer}

    <!-- Top brand -->
    <g fill="white">
      <text x="78" y="128" font-size="40" font-family="Arial, sans-serif" font-weight="800" letter-spacing="0.2">${escapeXml(
        topText
      )}</text>
      <text x="78" y="168" font-size="22" font-family="Arial, sans-serif" font-weight="600" opacity="0.85">Fresh • Fast • Local</text>
    </g>

    <!-- Left text stack -->
    <g fill="white">
      <text x="78" y="290" font-size="72" font-family="Arial, sans-serif" font-weight="900">${escapeXml(
        productName
      )}</text>

      <text x="78" y="378" font-size="40" font-family="Arial, sans-serif" font-weight="800" opacity="0.98">${escapeXml(
        headlineLine
      )}</text>

      <g>
        <rect x="78" y="410" width="360" height="96" rx="48" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.35)" />
        <text x="258" y="478" text-anchor="middle" font-size="34" font-family="Arial, sans-serif" font-weight="900">${escapeXml(
          offerText
        )}</text>
      </g>
    </g>

    <!-- Tone line -->
    <g fill="white" opacity="0.95">
      <text x="78" y="565" font-size="28" font-family="Arial, sans-serif" font-weight="700">${escapeXml(
        toneLine
      )}</text>
    </g>

    <!-- Product photo -->
    ${
      productImageUrl
        ? `
      <defs>
        <clipPath id="imgClip">
          <rect x="620" y="220" width="320" height="600" rx="56" />
        </clipPath>
      </defs>
      <image href="${escapeXml(productImageUrl)}" x="620" y="220" width="320" height="600" preserveAspectRatio="xMidYMid slice" clip-path="url(#imgClip)" />
      <rect x="620" y="220" width="320" height="600" rx="56" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)"/>
      `
        : ""
    }

    <!-- CTA button -->
    <g>
      <rect x="120" y="740" width="784" height="128" rx="64" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.30)"/>
      <text x="512" y="824" text-anchor="middle" fill="white" font-size="52" font-family="Arial, sans-serif" font-weight="900">${escapeXml(
        orderCta
      )}</text>
      <text x="512" y="865" text-anchor="middle" fill="white" font-size="22" font-family="Arial, sans-serif" font-weight="700" opacity="0.92">COD/Online • Fast Delivery</text>
    </g>

    <g fill="white" opacity="0.9">
      <text x="80" y="962" font-size="24" font-family="Arial, sans-serif" font-weight="700">DesiBazar • India’s Local Grocery Store</text>
    </g>
  </svg>
  `.trim();

  return svg;
};

const escapeXml = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const generateInstagramPostImageFallback = ({
  product,
  headline,
  language,
  tone,
  goal,
  backgroundRef,
  revisedPrompt,
}) => {
  const svg = buildSvgInstagramFallback({
    product,
    headline: headline || goal,
    language,
    tone,
    goal,
    backgroundRef,
  });

  const base64 = Buffer.from(svg).toString("base64");
  return {
    imageDataUrl: `data:image/svg+xml;base64,${base64}`,
    revisedPrompt: revisedPrompt || "SVG fallback creative.",
  };
};

export const generateInstagramPostImage = async (req, res) => {
  try {
    const {
      productId,
      prompt,
      goal = "Discount Offer",
      tone = "Friendly",
      language = "Hinglish",
      targetArea,
    } = req.body || {};

    if (!productId) {
      return res.json({ success: false, message: "productId is required" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // We will ALWAYS return an SVG poster that overlays text + product photo.
    // If OpenAI key is present, we use AI only for the BACKGROUND style (no readable text).
    const stockLine = product.inStock ? "In stock now" : "Restocking soon";
    const areaLine = targetArea ? ` ${String(targetArea).slice(0, 40)}` : "";

    const defaultBackgroundPrompt = `Modern DesiBazar food advertising background for an Instagram post.
Style: ${tone}, ${language}.
Vibe: fresh, local market, high contrast, premium clean look.
Include subtle patterns/ingredients (no readable text).
Leave clear empty space in the center & bottom for text overlay.
Area:${areaLine}
No logos, no watermarks, no medical claims, no readable text.`;

    const backgroundPrompt =
      typeof prompt === "string" && prompt.trim().length ? prompt.trim() : defaultBackgroundPrompt;

    const finalBackgroundPrompt = sanitizeText(backgroundPrompt);

    const apiKey = process.env.OPENAI_API_KEY;
    let backgroundRef = null;
    if (apiKey) {
      try {
        const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
        const size = "1024x1024";

        const response = await fetch(
          "https://api.openai.com/v1/images/generations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              prompt: `${finalBackgroundPrompt}\n\nReminder: Do not add readable text, logos, or watermarks.`,
              size,
              n: 1,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const item = data?.data?.[0];
          if (item?.url) backgroundRef = item.url;
          else if (item?.b64_json)
            backgroundRef = `data:image/png;base64,${item.b64_json}`;
        }
      } catch {
        // If background generation fails, SVG gradient will be used.
        backgroundRef = null;
      }
    }

    const fallback = generateInstagramPostImageFallback({
      product,
      headline: goal,
      language,
      tone,
      goal,
      backgroundRef: backgroundRef || undefined,
      revisedPrompt: `Background prompt: ${finalBackgroundPrompt}`,
    });

    return res.json({ success: true, image: fallback });
  } catch (error) {
    return res.json({
      success: false,
      message: error?.message || "Failed to generate image",
    });
  }
};

