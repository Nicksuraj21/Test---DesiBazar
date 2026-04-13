import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import CustomSelect from "../../components/CustomSelect";
import {
  Sparkles,
  Copy,
  Image as ImageIcon,
  Megaphone,
  Package,
  Loader2,
  Check,
} from "lucide-react";
import { productImage432Url } from "../../utils/productImage432";

const platformOptions = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
  { id: "google_ads", label: "Google Ads" },
];

/** Build product-aware background + hero subject for image AI (category + name + description). */
const getProductVisualContext = (product) => {
  const category = String(product?.category || "").trim() || "General";
  const name = String(product?.name || "").trim();
  const weight = String(product?.weight || "").trim();

  const descArr = Array.isArray(product?.description) ? product.description : [];
  const descriptionSnippet = descArr
    .map((d) => String(d || "").trim())
    .filter(Boolean)
    .slice(0, 4)
    .join(" · ");
  const blob = `${category} ${name} ${descriptionSnippet}`.toLowerCase();

  const rules = [
    {
      re: /(snack|namkeen|chips|mixture|bhujia|sev|muruku|chakli|biscuit|cookie|wafers)/i,
      hero: "the actual snack/namkeen style product in a clear hero shot (correct texture: crispy, roasted, or fried as fits the name)",
      bg: "Rustic wooden or slate surface; subtle Indian bazaar / kirana counter vibe; small brass katori or banana leaf corner accent; warm side lighting; shallow depth of field.",
    },
    {
      re: /(masala|spice|masale|powder|mirch|haldi|garam|chaat)/i,
      hero: "spice jars, bowls of ground masala, or whole spices that match the product — not a random meal",
      bg: "Earthy stone or dark wood; scattered whole spices, mortar-pestle hints; warm golden-brown tones; soft top-down or 45° angle.",
    },
    {
      re: /(tea|chai|coffee|beverage|drink|juice|sharbat|lassi)/i,
      hero: "cup/glass, steam where relevant, and the drink type that matches the product (tea vs juice vs lassi)",
      bg: "Clean kitchen counter or cafe table; morning window light or soft bokeh; subtle condensation on glass if cold drink.",
    },
    {
      re: /(sweet|mithai|ladoo|barfi|gulab|jalebi|peda|rasgulla)/i,
      hero: "Indian sweets presentation: thali/tray, silver foil accents if traditional; glossy, appetizing texture",
      bg: "Festive but minimal backdrop — marigold hint, brass plate, soft warm light; avoid clutter.",
    },
    {
      re: /(rice|dal|atta|flour|grain|pulse|ghee|oil|mustard oil)/i,
      hero: "staple pack or jar hero; burlap sack texture, brass measuring cup, or rustic kitchen props matching the staple",
      bg: "Rustic kitchen shelf or grain-market texture (burlap, jute); natural daylight; authentic kirana / desi pantry mood.",
    },
    {
      re: /(pickle|achaar|chutney|papad)/i,
      hero: "jar or stack that matches pickle/papad type; oil sheen or crisp papad stack as appropriate",
      bg: "Terracotta tiles or wooden board; sunlit kitchen; complementary spices in soft focus.",
    },
    {
      re: /(dairy|milk|paneer|curd|dahi|butter|cheese)/i,
      hero: "fresh dairy product look: clean white/cream surfaces, soft highlights, appetizing chill/fresh cues",
      bg: "Marble or clean white wood; morning light; minimal props (mint leaf, ceramic bowl) — premium fresh.",
    },
    {
      re: /(frozen|ice.?cream|kulfi)/i,
      hero: "frozen dessert with correct cold/treat appearance (scoops, stick, or tub as fits)",
      bg: "Cool pastel gradient or soft freezer-fresh mist; avoid hot food backgrounds.",
    },
    {
      re: /(soap|shampoo|cream|cosmetic|skin|hair)/i,
      hero: "product pack as hero — bathroom/shelf aesthetic, clean labels, no edible food in frame",
      bg: "Spa-like clean tiles, soft gradient, droplets if relevant; premium minimal.",
    },
    {
      re: /(clean|detergent|surf|liquid|home care)/i,
      hero: "household pack hero; bubbles/fresh laundry cues only if it matches category — not food",
      bg: "Bright laundry-fresh daylight, white linens blur, clean modern home surface.",
    },
  ];

  let hero =
    "Show the hero product matching this listing (shape/pack type implied by the product name and category), not a unrelated random item.";
  let bg = `Background, props, and color story must clearly belong to "${category}" — Indian local-market / DesiBazar context. Use textures and setting that a customer would associate with this product type.`;

  for (const r of rules) {
    if (r.re.test(blob)) {
      hero = r.hero;
      bg = r.bg;
      break;
    }
  }

  return {
    category,
    name,
    weight,
    descriptionSnippet: descriptionSnippet.slice(0, 320),
    heroInstruction: hero,
    backgroundInstruction: bg,
  };
};

const SectionCard = ({ title, subtitle, icon: Icon, children, className = "" }) => (
  <div
    className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-100 ${className}`}
  >
    <div className="border-b border-slate-100 px-4 py-3 md:px-5 md:py-3.5">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </div>
    <div className="p-4 md:p-5">{children}</div>
  </div>
);

const CopyBlock = ({ text, onCopy, className = "" }) => (
  <div
    className={`group flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition hover:border-primary/20 hover:bg-primary/[0.03] ${className}`}
  >
    <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
      {text}
    </p>
    <button
      type="button"
      onClick={() => onCopy(text)}
      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
    >
      <Copy className="h-3.5 w-3.5" />
      Copy
    </button>
  </div>
);

const AIMarketing = () => {
  const { products, axios, userLocation, currency } = useAppContext();

  const [selectedProductId, setSelectedProductId] = useState("");
  const selectedProduct = useMemo(
    () => products.find((p) => p._id === selectedProductId) || null,
    [products, selectedProductId]
  );

  useEffect(() => {
    if (!selectedProductId && products.length > 0) {
      setSelectedProductId(products[0]._id);
    }
  }, [products, selectedProductId]);

  const [goal, setGoal] = useState("Discount Offer");
  const [tone, setTone] = useState("Friendly");
  const [language, setLanguage] = useState("Hinglish");

  const [platforms, setPlatforms] = useState(["instagram", "whatsapp"]);

  const [imagePrompt, setImagePrompt] = useState("");
  const [autoImagePromptEnabled, setAutoImagePromptEnabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const togglePlatform = (id) => {
    setPlatforms((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  const safePlatforms = platforms.length ? platforms : ["instagram"];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const generate = async () => {
    if (!selectedProductId) return toast.error("Select a product");

    try {
      setLoading(true);
      setResult(null);

      const payload = {
        productId: selectedProductId,
        goal,
        tone,
        language,
        platforms: safePlatforms,
        location: userLocation || undefined,
      };

      const { data } = await axios.post("/api/marketing/generate", payload);
      if (!data?.success) {
        throw new Error(data?.message || "Failed to generate marketing copy");
      }

      setResult(data.result || null);
      toast.success("AI marketing content generated");
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const autoImagePrompt = useMemo(() => {
    if (!selectedProduct) return "";
    const ctx = getProductVisualContext(selectedProduct);

    const mrp = Number(selectedProduct.price || 0);
    const offer = Number(selectedProduct.offerPrice || 0);
    const discountPct =
      mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : null;

    const discountText =
      discountPct ? `Save ${discountPct}% today` : "Special price today";

    const offerOrRestock = selectedProduct.inStock
      ? discountText
      : "Restocking soon";

    const cta = language === "Hindi" ? "Order abhi" : "Order Now";

    const palette =
      tone === "Premium"
        ? "deep navy + amber/gold"
        : tone === "Desi & Local"
        ? "green + earthy warm tones"
        : tone === "Hype & Energy"
        ? "bold orange/red accents"
        : "fresh green/white high-contrast";

    const productFacts = [
      `Category: ${ctx.category}`,
      `Product name: ${ctx.name}`,
      ctx.weight ? `Pack / weight: ${ctx.weight}` : null,
      ctx.descriptionSnippet
        ? `Listing details (use only for visual cues — ingredients, style, occasion): ${ctx.descriptionSnippet}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `Square Instagram post (1080x1080).
Create a professional high-contrast advertisement for DesiBazar — the image must match THIS exact product type and category (not a generic random product photo).

Goal: ${goal}.

Product context (read carefully — hero + background must follow this):
${productFacts}

Hero subject (critical):
- ${ctx.heroInstruction}
- Do NOT show a different category (e.g. if this is masala, do not show pizza; if snacks, do not show only raw vegetables unless the listing says so).
- The main pack/product should look like what "${ctx.name}" suggests (shape, category-typical presentation).

Background & environment:
- ${ctx.backgroundInstruction}
- Match mood to category: authentic Indian local / kirana / home-kitchen feel where appropriate.
- Keep background supportive — hero product must stay the sharpest focal point.

Composition & text overlays:
- Clean premium layout with safe margins for text.
- Brand: add a clear "DesiBazar" wordmark at the bottom (simple text logo style, readable).
- Headline overlay: "${ctx.name}"
- Subhead: "${offerOrRestock}"
- CTA strip/button text: "${cta}"

Style:
- Palette: ${palette}
- Tone: ${tone}
- Language for on-image text: ${language} (Hinglish/Hindi/English style as selected)
- Photography: realistic, appetizing where food; crisp pack shot where FMCG; soft shadows, high clarity.

Safety/constraints:
- No medical claims; no "guaranteed" wording.
- Only "DesiBazar" as brand mark — no other real brand logos or watermarks.
- Text must stay legible on mobile.
`;
  }, [selectedProduct, goal, tone, language]);

  useEffect(() => {
    if (!selectedProductId) return;
    if (!autoImagePromptEnabled) return;
    if (autoImagePrompt) setImagePrompt(autoImagePrompt);
  }, [selectedProductId, autoImagePromptEnabled, autoImagePrompt]);

  const selectTriggerClass =
    "!w-full !rounded-xl !border-slate-200 !bg-white !px-3 !py-2.5 !text-sm !text-slate-800 focus-visible:!border-primary focus-visible:!ring-2 focus-visible:!ring-primary/20";

  const productOptions = useMemo(
    () => products.map((p) => ({ value: p._id, label: p.name })),
    [products]
  );

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full md:p-8 p-4 pb-12 max-w-[1400px] mx-auto space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-primary/10 via-white to-emerald-50/30 px-5 py-6 md:px-8 md:py-7 shadow-sm">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
                <Sparkles className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  AI Marketing Studio
                </h1>
                <p className="mt-1 max-w-xl text-sm text-slate-600">
                  Product select karo, goal & tone set karo — phir copy generate karo aur niche
                  wala image prompt kisi bhi AI tool me paste karke creatives banao.
                </p>
              </div>
            </div>
            {selectedProduct && (
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-sm">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                  <img
                    src={productImage432Url(selectedProduct.image?.[0])}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {selectedProduct.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {currency}
                    {selectedProduct.offerPrice} ·{" "}
                    {selectedProduct.inStock ? (
                      <span className="text-emerald-600">In stock</span>
                    ) : (
                      <span className="text-amber-600">Out of stock</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left column */}
          <div className="space-y-5 lg:col-span-4 lg:sticky lg:top-4 lg:self-start">
            <SectionCard
              title="Campaign setup"
              subtitle="Product, goal, tone, language & platforms"
              icon={Megaphone}
            >
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </label>
                  <CustomSelect
                    aria-label="Product for campaign"
                    value={selectedProductId}
                    onChange={setSelectedProductId}
                    options={productOptions}
                    placeholder={products.length ? "Select product" : "No products"}
                    className="w-full"
                    triggerClassName={selectTriggerClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Goal
                    </label>
                    <CustomSelect
                      aria-label="Campaign goal"
                      value={goal}
                      onChange={setGoal}
                      options={[
                        "Discount Offer",
                        "New Launch",
                        "Festive Promotion",
                        "Brand Awareness",
                        "Bulk Order",
                      ]}
                      className="w-full"
                      triggerClassName={selectTriggerClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tone
                    </label>
                    <CustomSelect
                      aria-label="Campaign tone"
                      value={tone}
                      onChange={setTone}
                      options={["Friendly", "Premium", "Desi & Local", "Hype & Energy"]}
                      className="w-full"
                      triggerClassName={selectTriggerClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Language
                  </label>
                  <CustomSelect
                    aria-label="Campaign language"
                    value={language}
                    onChange={setLanguage}
                    options={["Hinglish", "Hindi", "English"]}
                    className="w-full"
                    triggerClassName={selectTriggerClass}
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Platforms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {platformOptions.map((opt) => {
                      const active = platforms.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => togglePlatform(opt.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                            active
                              ? "border-primary bg-primary text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generate}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md shadow-primary/25 transition hover:bg-primary/90 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate marketing copy
                    </>
                  )}
                </button>
              </div>
            </SectionCard>

            <SectionCard
              title="AI image prompt"
              subtitle="Copy-paste kisi bhi image AI me — DesiBazar wordmark included"
              icon={ImageIcon}
            >
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                    checked={autoImagePromptEnabled}
                    onChange={(e) => setAutoImagePromptEnabled(e.target.checked)}
                  />
                  <span>Auto-update prompt when setup changes</span>
                </label>
                <textarea
                  value={imagePrompt}
                  onChange={(e) => {
                    setImagePrompt(e.target.value);
                    setAutoImagePromptEnabled(false);
                  }}
                  rows={8}
                  className="min-h-[180px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 font-mono text-xs leading-relaxed text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
                  placeholder="AI image prompt..."
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(imagePrompt)}
                    disabled={!imagePrompt?.trim()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:opacity-50 min-w-[140px]"
                  >
                    <Copy className="h-4 w-4" />
                    Copy prompt
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoImagePromptEnabled(true);
                      toast.success("Auto prompt on");
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Auto sync
                  </button>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right column — results */}
          <div className="space-y-4 lg:col-span-8">
            {!result ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                  <Package className="h-7 w-7 text-slate-400" />
                </div>
                <p className="text-base font-medium text-slate-800">Abhi koi copy generate nahi hua</p>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  Left side se product & platforms choose karo, phir{" "}
                  <span className="font-medium text-slate-700">Generate marketing copy</span> dabao.
                </p>
                <p className="text-xs text-slate-400 mt-4">
                  Server par <code className="rounded bg-slate-100 px-1">OPENAI_API_KEY</code> ho to
                  AI copy; warna smart templates use honge.
                </p>
              </div>
            ) : (
              <>
                <SectionCard
                  title="Headlines & creative"
                  subtitle={result?.summary || "AI-generated"}
                  icon={Sparkles}
                >
                  {result?.headlines?.length ? (
                    <div className="space-y-2">
                      {result.headlines.map((h, idx) => (
                        <CopyBlock key={`${h}-${idx}`} text={h} onCopy={copyToClipboard} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No headlines returned.</p>
                  )}
                </SectionCard>

                {result?.platforms?.instagram?.captions?.length ? (
                  <SectionCard title="Instagram" subtitle="Captions" icon={Megaphone}>
                    <div className="space-y-2">
                      {result.platforms.instagram.captions.map((t, idx) => (
                        <CopyBlock key={`${t}-${idx}`} text={t} onCopy={copyToClipboard} />
                      ))}
                    </div>
                  </SectionCard>
                ) : null}

                {result?.platforms?.whatsapp?.messages?.length ? (
                  <SectionCard title="WhatsApp" subtitle="Messages" icon={Megaphone}>
                    <div className="space-y-2">
                      {result.platforms.whatsapp.messages.map((t, idx) => (
                        <CopyBlock key={`${t}-${idx}`} text={t} onCopy={copyToClipboard} />
                      ))}
                    </div>
                  </SectionCard>
                ) : null}

                {result?.platforms?.facebook?.posts?.length ? (
                  <SectionCard title="Facebook" subtitle="Posts" icon={Megaphone}>
                    <div className="space-y-2">
                      {result.platforms.facebook.posts.map((t, idx) => (
                        <CopyBlock key={`${t}-${idx}`} text={t} onCopy={copyToClipboard} />
                      ))}
                    </div>
                  </SectionCard>
                ) : null}

                {result?.platforms?.email?.email?.length ? (
                  <SectionCard title="Email" subtitle="Subject & body" icon={Megaphone}>
                    <div className="space-y-4">
                      {result.platforms.email.email.map((e, idx) => (
                        <div
                          key={`${e.subject}-${idx}`}
                          className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                        >
                          <p className="text-sm font-semibold text-slate-900">{e.subject}</p>
                          <p className="mt-2 text-sm whitespace-pre-wrap text-slate-700">{e.body}</p>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`${e.subject}\n\n${e.body}`)}
                            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:border-primary/40"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Copy full email
                          </button>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                ) : null}

                {result?.platforms?.google_ads?.headlines?.length ? (
                  <SectionCard title="Google Ads" subtitle="Headlines & descriptions" icon={Megaphone}>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Headlines
                        </p>
                        <div className="space-y-2">
                          {(result.platforms.google_ads.headlines || []).map((t, idx) => (
                            <CopyBlock key={`${t}-${idx}`} text={t} onCopy={copyToClipboard} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Descriptions
                        </p>
                        <div className="space-y-2">
                          {(result.platforms.google_ads.descriptions || []).map((t, idx) => (
                            <CopyBlock key={`${t}-${idx}`} text={t} onCopy={copyToClipboard} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMarketing;
