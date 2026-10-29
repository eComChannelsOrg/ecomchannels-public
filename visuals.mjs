// Visual components for ecomchannels.com (imported by build.mjs).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Hub diagram: channels around the eComChannels logo, couriers below. Pure HTML/CSS.
export function hubVisual(logoFile, marketplaces, carriers) {
  const ring = marketplaces.slice(0, 10);
  const items = ring.map(([k, n], i) => {
    const a = (i / ring.length) * 2 * Math.PI - Math.PI / 2;
    const x = 50 + 40 * Math.cos(a), y = 50 + 40 * Math.sin(a);
    return `<li style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%"><img src="${logoFile(k)}" alt="${esc(n)}" width="44" height="44" loading="eager"></li>`;
  }).join('');
  return `<figure class="hub" aria-label="eComChannels connects marketplaces, stores and couriers">
<div class="hub-ring"><ul>${items}</ul><div class="hub-core"><img src="/logo.png" alt="eComChannels" width="96" height="96"><span>One system</span></div></div>
<figcaption><span class="pill">${marketplaces.length} marketplaces</span><span class="pill">${carriers.length} couriers</span><span class="pill">10 social platforms</span></figcaption>
</figure>`;
}

export function graphicsCompare() { return ''; }

// Listing: unoptimised supplier listing vs channel-optimised listings (illustrative, built from the real product facts).
export function listingCompare() { return ''; }

// Small illustrative visuals for product cards.
export function cardVisual(slug, logoFile, ch) {
  const logos = (list) => `<div class="cv logos-mini">${list.map(([k, n]) => `<img src="${logoFile(k)}" alt="${esc(n)}" width="34" height="34" loading="lazy">`).join('')}</div>`;
  switch (slug) {
    case 'ai-listing-optimisation': return logos(ch.marketplaces.slice(0, 8));
    case 'ai-shipping': return logos(ch.carriers);
    case 'ai-graphics': return logos(ch.marketplaces.slice(4, 12));
    case 'finance-reconciliation': return `<div class="cv bars" aria-hidden="true"><span style="--h:88%" class="m"></span><span style="--h:72%" class="m"></span><span style="--h:95%" class="m"></span><span style="--h:40%" class="s"></span><span style="--h:80%" class="m"></span><span style="--h:15%" class="u"></span><i>matched · short-paid · unmatched</i></div>`;
    case 'ai-social-media-marketing': return logos(ch.social.slice(0, 8));
    case 'order-management': return logos(ch.marketplaces.slice(0, 8));
    case 'storefronts': return logos(ch.stores);
    default: return '';
  }
}

export function shippingFlow(logoFile, carriers) {
  const steps = [['🧾', 'Order in'], ['🏷️', 'Label printed'], ['📋', 'Manifested'], ['📍', 'Tracking sent']];
  return `<div class="flow">${steps.map(([i, t]) => `<div class="step"><span class="ico">${i}</span><b>${t}</b></div>`).join('<span class="flow-arrow" aria-hidden="true">→</span>')}</div>
<div class="carrier-strip">${carriers.map(([k, n]) => `<figure><img src="${logoFile(k)}" alt="${esc(n)} logo" width="64" height="64" loading="lazy"><figcaption>${esc(n)}</figcaption></figure>`).join('')}</div>`;
}

export function reconVisual() {
  const rows = [['Order #1042', 'Amazon', 'Matched', 'm'], ['Order #1043', 'BIG W Market', 'Matched', 'm'], ['Order #1044', 'Bunnings', 'Short-paid', 's'], ['Order #1045', 'Kogan', 'Matched', 'm'], ['Order #1046', 'eBay', 'Not in payout', 'u']];
  return `<figure class="recon"><table><thead><tr><th>Order</th><th>Channel</th><th>Payout status</th></tr></thead><tbody>${rows.map(([o, c, s, k]) => `<tr><td>${o}</td><td>${c}</td><td><span class="st ${k}">${s}</span></td></tr>`).join('')}</tbody></table><figcaption>Illustration: each payout line is matched to its order, and only exceptions need a person.</figcaption></figure>`;
}
