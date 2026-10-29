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

// Fictional "YourBrand" bottle rendered from tools/examples.html (no client data).
export function graphicsCompare() {
  return `<div class="compare">
<figure class="before"><span class="tag bad">Before</span><img src="/examples/before.jpg" alt="Dim, off-centre phone photo of a water bottle on a cluttered desk" width="720" height="720" loading="lazy"><figcaption><b>One phone snapshot</b><ul class="x"><li>Dark, off-centre and cluttered</li><li>No feature callouts or size info</li><li>Fails main-image rules on most marketplaces</li></ul></figcaption></figure>
<div class="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
<figure class="after"><span class="tag good">After: marketplace-ready image set</span><div class="set">
<img src="/examples/hero.jpg" alt="Clean white-background main image of the bottle with a 24 hour cold badge" width="720" height="720" loading="lazy">
<img src="/examples/info.jpg" alt="Infographic with callouts: 24 h cold, 12 h hot, leak-proof, BPA-free" width="720" height="720" loading="lazy">
<img src="/examples/dims.jpg" alt="Dimensions image: 27 cm tall, 7.5 cm wide, 750 ml, 380 g" width="720" height="720" loading="lazy">
<img src="/examples/life.jpg" alt="Lifestyle image of the bottle outdoors on a rock with mountains" width="720" height="720" loading="lazy">
</div><figcaption><b>Main image, infographic, dimensions and lifestyle</b><ul class="ok"><li>Made to each marketplace's image slots and sizes</li><li>Feature callouts shoppers can scan in seconds</li><li>One approval publishes to every channel</li></ul></figcaption></figure>
</div>
<p class="note">Illustrative example with a fictional product.</p>`;
}

// Listing: unoptimised supplier listing vs channel-optimised listings (illustrative, built from the real product facts).
export function listingCompare(logoFile) {
  const tile = (key, name, title, bullets) => `<article class="lt"><header><img src="${logoFile(key)}" alt="" width="22" height="22"> ${esc(name)}</header><img class="lt-img" src="/examples/hero.jpg" alt="" width="720" height="720" loading="lazy"><h4>${esc(title)}</h4><ul>${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul><p class="len">${title.length} characters, written to ${esc(name)} rules</p></article>`;
  return `<div class="compare listing">
<figure class="before"><span class="tag bad">Before: supplier data</span><article class="lt plain"><img class="lt-img" src="/examples/before.jpg" alt="" width="720" height="720" loading="lazy"><h4>Water Bottle Blue</h4><p>Steel bottle. 750ml.</p></article><figcaption><ul class="x"><li>No brand, features or size in the title</li><li>No bullet points or search terms</li><li>Missing required marketplace attributes</li></ul></figcaption></figure>
<div class="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
<figure class="after"><span class="tag good">After: written to each marketplace's rules</span><div class="tiles">
${tile('amazon', 'Amazon', 'YourBrand 750 ml Insulated Stainless Steel Water Bottle, Leak-Proof Lid, Keeps Drinks Cold 24 Hours, BPA-Free, Blue', ['Double-wall vacuum keeps drinks cold 24 h, hot 12 h', 'Leak-proof screw lid for bags', '18/8 stainless steel, BPA-free'])}
${tile('kogan', 'Kogan', 'YourBrand 750ml Insulated Steel Water Bottle (Blue)', ['24 h cold / 12 h hot', 'Leak-proof lid', 'BPA-free'])}
${tile('bunnings', 'Bunnings', 'YourBrand 750ml Blue Insulated Water Bottle', ['Capacity: 750 ml', 'Material: 18/8 stainless steel', 'Height: 27 cm'])}
</div></figure>
</div>
<p class="note">Illustrative example with a fictional product. Titles follow each marketplace's style and length rules.</p>`;
}

// Small illustrative visuals for product cards.
export function cardVisual(slug, logoFile, ch) {
  const logos = (list) => `<div class="cv logos-mini">${list.map(([k, n]) => `<img src="${logoFile(k)}" alt="${esc(n)}" width="34" height="34" loading="lazy">`).join('')}</div>`;
  switch (slug) {
    case 'ai-listing-optimisation': return `<div class="cv split"><img src="/examples/before.jpg" alt="" loading="lazy"><span>→</span><img src="/examples/hero.jpg" alt="" loading="lazy"></div>`;
    case 'ai-shipping': return logos(ch.carriers);
    case 'ai-graphics': return `<div class="cv quad"><img src="/examples/hero.jpg" alt="" loading="lazy"><img src="/examples/info.jpg" alt="" loading="lazy"><img src="/examples/dims.jpg" alt="" loading="lazy"><img src="/examples/life.jpg" alt="" loading="lazy"></div>`;
    case 'finance-reconciliation': return `<div class="cv bars" aria-hidden="true"><span style="--h:88%" class="m"></span><span style="--h:72%" class="m"></span><span style="--h:95%" class="m"></span><span style="--h:40%" class="s"></span><span style="--h:80%" class="m"></span><span style="--h:15%" class="u"></span><i>matched · short-paid · unmatched</i></div>`;
    case 'ai-social-media-marketing': return logos(ch.social.slice(0, 8));
    case 'order-management': return logos(ch.marketplaces.slice(0, 8));
    case 'storefronts': return `<div class="cv browser" aria-hidden="true"><div class="bar"><i></i><i></i><i></i></div><img src="/examples/life.jpg" alt="" loading="lazy"></div>`;
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
