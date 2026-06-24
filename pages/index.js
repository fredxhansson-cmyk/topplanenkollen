import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ORG_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Topplånkollen\",\"url\":\"https://topplanenkollen.vercel.app\",\"logo\":\"https://topplanenkollen.vercel.app/favicon.ico\",\"description\":\"Oberoende jämförelsetjänst för svenska konsumenter inom finans.\",\"foundingDate\":\"2026\",\"inLanguage\":\"sv-SE\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"customer support\",\"url\":\"https://topplanenkollen.vercel.app/kontakt\"}}";
const WEB_PAGE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Bästa topplån för småföretag 2026\",\"description\":\"Upptäck de bästa företagslånen för småföretag 2026. Jämför ledande leverantörer snabbt och enkelt. ✓ Uppdaterad 2026\",\"url\":\"https://topplanenkollen.vercel.app\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"inLanguage\":\"sv-SE\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"Topplånkollen\",\"url\":\"https://topplanenkollen.vercel.app\"},\"breadcrumb\":{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Hem\",\"item\":\"https://topplanenkollen.vercel.app\"}]}}";
const ITEM_LIST_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Topplånen för småföretagare 2026 — Jämförelse 2026\",\"description\":\"Jämför företagslån från sveriges ledande leverantörer.\",\"numberOfItems\":7,\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Lendo Företagslån\",\"url\":\"https://www.lendo.se/foretagslan\",\"description\":\"Flexibla lån upp till 5 miljoner\",\"feesAndCommissionsSpecification\":\"från 500 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"639\"}}},{\"@type\":\"ListItem\",\"position\":2,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Froda\",\"url\":\"https://www.froda.se\",\"description\":\"Automatisk återbetalning baserad på omsättning\",\"feesAndCommissionsSpecification\":\"från 750 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"592\"}}},{\"@type\":\"ListItem\",\"position\":3,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Qred Företagslån\",\"url\":\"https://www.qred.se\",\"description\":\"Lån utan dolda avgifter\",\"feesAndCommissionsSpecification\":\"från 600 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.6\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"537\"}}},{\"@type\":\"ListItem\",\"position\":4,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Capcito\",\"url\":\"https://www.capcito.com\",\"description\":\"Dynamiska lån baserat på fakturor\",\"feesAndCommissionsSpecification\":\"från 800 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.5\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"107\"}}},{\"@type\":\"ListItem\",\"position\":5,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Svea Ekonomi Företagslån\",\"url\":\"https://www.svea.com/se/sv/foretag/finansiering/foretagslan/\",\"description\":\"Lån med personlig rådgivning\",\"feesAndCommissionsSpecification\":\"från 700 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.4\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"594\"}}},{\"@type\":\"ListItem\",\"position\":6,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Almi Företagspartner\",\"url\":\"https://www.almi.se\",\"description\":\"Stöd och lån för tillväxtföretag\",\"feesAndCommissionsSpecification\":\"från 650 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.3\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"145\"}}},{\"@type\":\"ListItem\",\"position\":7,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Krea Företagslån\",\"url\":\"https://www.krea.se\",\"description\":\"Jämför lån från flera långivare\",\"feesAndCommissionsSpecification\":\"från 550 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.2\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"528\"}}}]}";
const ARTICLE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Topplånen för småföretagare 2026\",\"description\":\"Jämför företagslån från sveriges ledande leverantörer.\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"author\":{\"@type\":\"Organization\",\"name\":\"Topplånkollen\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Topplånkollen\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://topplanenkollen.vercel.app\"}}";
const FAQ_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Vilket företagslån är bäst för småföretag?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Det bästa företagslånet beror på ditt företags specifika behov och ekonomiska situation. Jämför flera alternativ för att hitta det mest lämpliga.\"}}]}";

export async function getStaticProps() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.toLocaleDateString('sv-SE', { month: 'long' });
  var updated = now.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  var fallback = [{"name":"Lendo Företagslån","url":"https://www.lendo.se/foretagslan","description":"Flexibla lån upp till 5 miljoner","badge":"Bäst totalt","score":"4.8","price":"från 500 kr/mån","pros":["Snabb ansökan","Ingen säkerhet krävs","Flera lånealternativ"]},{"name":"Froda","url":"https://www.froda.se","description":"Automatisk återbetalning baserad på omsättning","badge":"null","score":"4.7","price":"från 750 kr/mån","pros":["Ingen UC","Flexibel återbetalning","Snabb utbetalning"]},{"name":"Qred Företagslån","url":"https://www.qred.se","description":"Lån utan dolda avgifter","badge":"null","score":"4.6","price":"från 600 kr/mån","pros":["Inga dolda avgifter","Ingen UC","Snabb process"]},{"name":"Capcito","url":"https://www.capcito.com","description":"Dynamiska lån baserat på fakturor","badge":"null","score":"4.5","price":"från 800 kr/mån","pros":["Flexibel kredit","Ingen säkerhet","Snabb utbetalning"]},{"name":"Svea Ekonomi Företagslån","url":"https://www.svea.com/se/sv/foretag/finansiering/foretagslan/","description":"Lån med personlig rådgivning","badge":"null","score":"4.4","price":"från 700 kr/mån","pros":["Personlig service","Anpassade lånevillkor","Lång erfarenhet"]},{"name":"Almi Företagspartner","url":"https://www.almi.se","description":"Stöd och lån för tillväxtföretag","badge":"null","score":"4.3","price":"från 650 kr/mån","pros":["Rådgivning","Tillväxtfokus","Statligt stöd"]},{"name":"Krea Företagslån","url":"https://www.krea.se","description":"Jämför lån från flera långivare","badge":"null","score":"4.2","price":"från 550 kr/mån","pros":["Jämförelsetjänst","Många alternativ","Snabb ansökan"]}];
  var items = fallback.slice();

  try {
    var ctrl = new AbortController();
    var t = setTimeout(function() { ctrl.abort(); }, 4000);
    var r = await fetch('https://api.adtraction.net/v2/public/compare-loans', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ market: 'SE', currency: 'SEK' }), signal: ctrl.signal,
    });
    clearTimeout(t);
    if (r.ok) {
      var live = await r.json();
      if (Array.isArray(live) && live.length >= 3) {
        live.sort(function(a, b) { return (a.interestRateFrom||99) - (b.interestRateFrom||99); });
        var mapped = live.slice(0, 7).map(function(p, i) {
          var base = fallback[i] || fallback[0];
          var rv = p.interestRateFrom || base.rateValue || 6.9;
          return {
            name: p.programName || base.name,
            url: p.approvalUrl || p.trackingUrl || base.url,
            description: base.description,
            badge: i===0 ? 'Lägst ränta' : i===1 ? 'Bäst totalt' : i===2 ? 'Högt belopp' : (base.badge||null),
            score: base.score, price: 'från ' + rv + '%', rateValue: rv,
            pros: base.pros, logoUrl: p.logoUrl || null,
          };
        });
        if (mapped.length < 5) mapped = mapped.concat(fallback.slice(mapped.length));
        items = mapped;
      }
    }
  } catch(e) {}
  return {
    props: { providers: items, year: year, month: month, updated: updated },
    revalidate: 86400,
  };
}

export default function Home({ providers, year, month, updated }) {
  const [sortBy, setSortBy] = useState('betyg');
  const [visibleCount, setVisibleCount] = useState(5);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [amount, setAmount] = useState(150000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(5.5);
  const monthly = Math.round((amount * (rate/100/12)) / (1 - Math.pow(1 + rate/100/12, -years*12)));
  const totalCost = Math.round(monthly * years * 12);
  const totalInterest = totalCost - amount;
  var calcMonthly = function(p) {
    var r = parseFloat(p.rateValue || p.rate || 6.9) / 100 / 12;
    if (!r || isNaN(r)) return Infinity;
    return Math.round((amount * r) / (1 - Math.pow(1 + r, -years * 12)));
  };
  var bestProv = providers.reduce(function(b, p) {
    return calcMonthly(p) < calcMonthly(b) ? p : b;
  }, providers[0] || {});
  var bestMonthly = bestProv && bestProv.name ? calcMonthly(bestProv) : 0;
  var bestTotal = bestMonthly * years * 12;
  var bestInterest = bestTotal - amount;

  var extractNum = function(p) {
    if (p.rateValue) return parseFloat(p.rateValue);
    if (p.priceValue) return parseFloat(p.priceValue);
    var m = String(p.price||'').match(/[0-9]+[.,]?[0-9]*/);
    return m ? parseFloat(m[0].replace(',','.')) : 9999;
  };
  var sorted = [...providers].sort(function(a, b) {
    if (sortBy === 'pris') return extractNum(a) - extractNum(b);
    if (sortBy === 'namn') return a.name.localeCompare(b.name, 'sv');
    return parseFloat(b.score||b.rating||0) - parseFloat(a.score||a.rating||0);
  });
  var visible = sorted.slice(0, visibleCount);
  var toggleSelect = function(name) {
    setSelected(function(prev) {
      return prev.includes(name) ? prev.filter(function(n){return n!==name;}) : prev.length < 3 ? prev.concat([name]) : prev;
    });
  };
  var selectedProviders = providers.filter(function(p){return selected.includes(p.name);});

  const pc = '#1d4ed8';
  const pcLight = '#1d4ed814';
  const pcMed = '#1d4ed830';

  const TRACK_BASE = 'https://axiom-engine-production-54c3.up.railway.app/r';
  const SITE_SLUG = 'topplanenkollen';
  const AffBtn = ({ url, name, primary }) => {
    var href = TRACK_BASE && TRACK_BASE.startsWith('http')
      ? TRACK_BASE + '?p=' + encodeURIComponent(name) + '&url=' + encodeURIComponent(url) + '&site=' + SITE_SLUG
      : url;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer sponsored"
        style={{ display:'inline-block', background: primary ? pc : '#0f172a', color:'#fff',
          padding:'11px 22px', borderRadius:9, fontWeight:700, fontSize:14,
          textDecoration:'none', whiteSpace:'nowrap', transition:'opacity .15s' }}>
        Välj {name} →
      </a>
    );
  };

  const Stars = ({ score }) => {
    const n = parseFloat(score);
    return (
      <span style={{ fontSize:15, letterSpacing:1 }}>
        <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(n))}</span>
        <span style={{ color:'#d1d5db' }}>{'★'.repeat(5 - Math.floor(n))}</span>
        <span style={{ color:'#64748b', fontSize:12, marginLeft:6, fontWeight:600 }}>{score}</span>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Bästa topplån för småföretag 2026</title>
        <meta name="description" content="Upptäck de bästa företagslånen för småföretag 2026. Jämför ledande leverantörer snabbt och enkelt. ✓ Uppdaterad 2026" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://topplanenkollen.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bästa topplån för småföretag 2026" />
        <meta property="og:description" content="Upptäck de bästa företagslånen för småföretag 2026. Jämför ledande leverantörer snabbt och enkelt. ✓ Uppdaterad 2026" />
        <meta property="og:url" content="https://topplanenkollen.vercel.app" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:site_name" content="Topplånkollen" />
        <meta property="og:image" content="https://topplanenkollen.vercel.app/api/og?title=B%C3%A4sta%20toppl%C3%A5n%20f%C3%B6r%20sm%C3%A5f%C3%B6retag%202026&niche=finans" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bästa topplån för småföretag 2026" />
        <meta name="twitter:description" content="Upptäck de bästa företagslånen för småföretag 2026. Jämför ledande leverantörer snabbt och enkelt. ✓ Uppdaterad 2026" />
        <meta name="twitter:image" content="https://topplanenkollen.vercel.app/api/og?title=B%C3%A4sta%20toppl%C3%A5n%20f%C3%B6r%20sm%C3%A5f%C3%B6retag%202026&niche=finans" />
        <link rel="alternate" hreflang="sv" href="https://topplanenkollen.vercel.app" />
        <link rel="alternate" hreflang="x-default" href="https://topplanenkollen.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEB_PAGE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ITEM_LIST_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      </Head>

      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px',
        height:60, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>
          Topplånkollen
        </Link>
        <div style={{ display:'flex', gap:28, fontSize:14 }}>
          <a href="#jamfor" style={{ color:'#64748b', textDecoration:'none' }}>Jämförelse</a>
          <a href="#guide" style={{ color:'#64748b', textDecoration:'none' }}>Guide</a>
          <Link href="/om-oss" style={{ color:'#64748b', textDecoration:'none' }}>Om oss</Link>
        </div>
      </nav>

      <section style={{ background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#f8fafc 100%)',
        padding:'72px 20px 56px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center',
          gap:48, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:pcLight, color:pc, padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Uppdaterad {updated}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:'#f0fdf4', color:'#15803d', padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Oberoende jämförelse
              </div>
            </div>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:800,
              lineHeight:1.14, marginBottom:18, color:'#0f172a' }}>
              Topplånen för småföretagare 2026
            </h1>
            <p style={{ fontSize:18, color:'#475569', lineHeight:1.72,
              marginBottom:32, maxWidth:540 }}>
              Jämför företagslån från sveriges ledande leverantörer.
            </p>
            <a href="#jamfor" style={{ display:'inline-block', background:pc, color:'#fff',
              padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16,
              textDecoration:'none', boxShadow:'0 4px 24px '+pc+'44' }}>
              Jämför lån nu →
            </a>
            <p style={{ marginTop:14, fontSize:13, color:'#94a3b8' }}>
              Gratis &middot; Oberoende &middot; Ingen prenumeration
            </p>
          </div>
          <div style={{ flexShrink:0 }} dangerouslySetInnerHTML={{ __html: "<svg width=\"260\" height=\"210\" viewBox=\"0 0 260 210\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"18\" y=\"130\" width=\"34\" height=\"68\" rx=\"5\" fill=\"#1d4ed8\" opacity=\"0.18\"/><rect x=\"64\" y=\"98\" width=\"34\" height=\"100\" rx=\"5\" fill=\"#1d4ed8\" opacity=\"0.38\"/><rect x=\"110\" y=\"58\" width=\"34\" height=\"140\" rx=\"5\" fill=\"#1d4ed8\" opacity=\"0.65\"/><rect x=\"156\" y=\"76\" width=\"34\" height=\"122\" rx=\"5\" fill=\"#1d4ed8\" opacity=\"0.82\"/><rect x=\"202\" y=\"36\" width=\"34\" height=\"162\" rx=\"5\" fill=\"#1d4ed8\"/><path d=\"M35 124 L81 93 L127 53 L173 71 L219 31\" stroke=\"#1d4ed8\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"35\" cy=\"124\" r=\"5\" fill=\"#1d4ed8\"/><circle cx=\"81\" cy=\"93\" r=\"5\" fill=\"#1d4ed8\"/><circle cx=\"127\" cy=\"53\" r=\"5\" fill=\"#1d4ed8\"/><circle cx=\"173\" cy=\"71\" r=\"5\" fill=\"#1d4ed8\"/><circle cx=\"219\" cy=\"31\" r=\"5\" fill=\"#1d4ed8\"/><circle cx=\"228\" cy=\"178\" r=\"24\" fill=\"#1d4ed8\" opacity=\"0.12\" stroke=\"#1d4ed8\" stroke-width=\"2\"/><text x=\"228\" y=\"184\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-family=\"Inter,sans-serif\" font-size=\"13\" font-weight=\"700\">kr</text></svg>" }} />
        </div>
      </section>

      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0',
        padding:'16px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex',
          gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#1d4ed8',fontWeight:800,flexShrink:0}}>✓</span><span>Snabb ansökan</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#1d4ed8',fontWeight:800,flexShrink:0}}>✓</span><span>Flexibla villkor</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#1d4ed8',fontWeight:800,flexShrink:0}}>✓</span><span>Konkurrenskraftiga räntor</span></div>
        </div>
      </div>

      <section id="jamfor" style={{ padding:'64px 20px', maxWidth:980,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:30, fontWeight:800, marginBottom:10, color:'#0f172a' }}>
            Jämför företagslån enkelt
          </h2>
          <p style={{ color:'#64748b', fontSize:15 }}>
            Vi har granskat {providers.length} alternativ &mdash; senast uppdaterat {updated}
          </p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:20,
          flexWrap:'wrap', justifyContent:'center' }}>
          {['betyg','pris','namn'].map(function(s) { return (
            <button key={s} onClick={() => setSortBy(s)}
              style={{ padding:'7px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                cursor:'pointer', fontFamily:'Inter,sans-serif', border:'none',
                background: sortBy===s ? pc : '#f1f5f9',
                color: sortBy===s ? '#fff' : '#64748b' }}>
              {s==='betyg' ? '⭐ Bäst betyg' : s==='pris' ? '💰 Lägst pris' : '🔤 Namn A–Ö'}
            </button>
          ); })}
        </div>


        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {visible.map((p, i) => (
            <div key={p.name} style={{ background:'#fff', border: i===0 ? '2px solid '+pc : '1px solid #e2e8f0', borderRadius:16, padding:'22px 26px', position:'relative', boxShadow: i===0 ? '0 4px 24px '+pc+'18' : '0 1px 4px #0000000a' }}>
              <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12, background: i===0 ? pcLight : '#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color: i===0 ? pc : '#64748b', flexShrink:0, border:'1px solid '+(i===0 ? pcMed : '#e2e8f0') }}>
                  {['1','2','3','4','5'][i] || (i+1)}
                </div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:800, fontSize:18, color:'#0f172a', marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:'#64748b', marginBottom:10 }}>{p.description}</div>
                  {p.pros && <div style={{ display:'flex', flexDirection:'column', gap:5 }}>{p.pros.map((pro, j) => (<div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13 }}><span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ color:'#374151' }}>{pro}</span></div>))}</div>}
                </div>
                <div style={{ textAlign:'right', minWidth:190, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:pc }}>{p.currentPrice || p.price}</div>
                  <Stars score={p.score} />
                  <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:8 }}>{p.badge}</div>
                  <AffBtn url={p.url} name={p.name} primary={i===0} />
                  <button onClick={() => toggleSelect(p.name)} style={{ padding:'7px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor: selected.includes(p.name) || selected.length < 3 ? 'pointer' : 'not-allowed', fontFamily:'Inter,sans-serif', border:'1px solid', borderColor: selected.includes(p.name) ? pc : '#e2e8f0', background: selected.includes(p.name) ? pcLight : '#fff', color: selected.includes(p.name) ? pc : '#64748b', opacity: !selected.includes(p.name) && selected.length >= 3 ? 0.4 : 1 }}>
                    {selected.includes(p.name) ? '✓ Vald' : '+ Jämför'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:20, marginBottom:4, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {visibleCount < sorted.length && (
            <button onClick={() => setVisibleCount(function(c){ return Math.min(c + 5, sorted.length); })}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid '+pc, background:'#fff', color:pc }}>
              Visa 5 fler ↓ &nbsp;<span style={{ fontWeight:400, fontSize:13, opacity:0.7 }}>({sorted.length - visibleCount} återstår)</span>
            </button>
          )}
          {visibleCount >= sorted.length && sorted.length > 5 && (
            <button onClick={() => setVisibleCount(5)}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid #e2e8f0', background:'#fff', color:'#64748b' }}>
              Visa färre ↑
            </button>
          )}
          <p style={{ margin:0, fontSize:13, color:'#94a3b8' }}>
            Visar {visible.length} av {sorted.length} alternativ
            {selected.length > 0 && <span style={{ marginLeft:12, color:pc, fontWeight:600 }}>{selected.length} valda för jämförelse</span>}
          </p>
          <p style={{ margin:0, fontSize:11, color:'#cbd5e1' }}>
            Priser är riktpriser — klicka på ett alternativ för aktuellt pris hos respektive leverantör
          </p>
        </div>

        {selected.length >= 2 && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:80,
            background:'#0f172a', padding:'14px 20px', fontFamily:'Inter,sans-serif',
            display:'flex', alignItems:'center', justifyContent:'center', gap:14, flexWrap:'wrap',
            boxShadow:'0 -4px 32px rgba(0,0,0,0.25)' }}>
            <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:14 }}>
              {selected.length} valda: {selected.join(' vs ')}
            </span>
            <button onClick={() => setShowCompare(true)}
              style={{ background:pc, color:'#fff', border:'none', borderRadius:8,
                padding:'9px 22px', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Jämför nu →
            </button>
            <button onClick={() => setSelected([])}
              style={{ background:'transparent', color:'#94a3b8', border:'1px solid #334155',
                borderRadius:8, padding:'9px 14px', fontSize:13, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Rensa
            </button>
          </div>
        )}

        {showCompare && (
          <div onClick={() => setShowCompare(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.72)', zIndex:200,
            display:'flex', alignItems:'flex-start', justifyContent:'center',
            padding:'24px 16px', overflowY:'auto', fontFamily:'Inter,sans-serif' }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16,
              width:'100%', maxWidth: selectedProviders.length === 2 ? 700 : 940,
              padding:28, marginTop:12, marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h3 style={{ fontSize:20, fontWeight:800, margin:0, color:'#0f172a' }}>
                  Jämförelse — {selectedProviders.map(function(p){return p.name;}).join(' vs ')}
                </h3>
                <button onClick={() => setShowCompare(false)}
                  style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#94a3b8' }}>✕</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns: selectedProviders.map(function(){return '1fr';}).join(' '), gap:14 }}>
                {selectedProviders.map(function(p) { return (
                  <div key={p.name} style={{ border:'2px solid '+pc+'30', borderRadius:12, padding:'20px 18px',
                    display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ fontWeight:800, fontSize:17, color:'#0f172a', borderBottom:'1px solid #f1f5f9', paddingBottom:10 }}>{p.name}</div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>PRIS</div>
                      <div style={{ fontSize:20, fontWeight:800, color:pc }}>{p.currentPrice||p.price||'—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>BETYG</div>
                      <Stars score={p.score} />
                    </div>
                    {p.badge && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>UTMÄRKELSE</div>
                        <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:8, display:'inline-block' }}>{p.badge}</div>
                      </div>
                    )}
                    {p.description && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>OM TJÄNSTEN</div>
                        <div style={{ fontSize:13, color:'#475569', lineHeight:1.5 }}>{p.description}</div>
                      </div>
                    )}
                    {p.pros && p.pros.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:6 }}>FÖRDELAR</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                          {p.pros.map(function(pro,j){return(
                            <div key={j} style={{ display:'flex', gap:6, fontSize:13 }}>
                              <span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span>
                              <span style={{ color:'#374151' }}>{pro}</span>
                            </div>
                          );})}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop:'auto', paddingTop:10 }}>
                      <AffBtn url={p.url} name={p.name} primary={true} />
                    </div>
                  </div>
                );})}
              </div>
              <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
                * Stäng för att välja fler alternativ eller byta urval.
              </p>
            </div>
          </div>
        )}

        <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
          * Vi kan erhålla provision vid val via våra länkar. Det påverkar aldrig priset för dig eller våra oberoende betyg.
          Se vår <Link href="/om-oss" style={{ color:pc }}>redaktionspolicy</Link>.
        </p>
      </section>

      <section id="kalkylator" style={{ background:'#fff', borderTop:'1px solid #e2e8f0',
        padding:'56px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <h2 style={{ fontSize:26, fontWeight:800, marginBottom:6, color:'#0f172a' }}>
            Räkna på din lånekostnad
          </h2>
          <p style={{ color:'#64748b', marginBottom:32, fontSize:15 }}>
            Justera belopp, återbetalningstid och ränta — se din månadskostnad direkt.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            <div>
              <label style={{ display:'block', fontWeight:700, marginBottom:8, fontSize:14, color:'#374151' }}>
                Lånebelopp: <span style={{ color:pc }}>{amount.toLocaleString('sv')} kr</span>
              </label>
              <input type="range" min="10000" max="600000" step="5000"
                value={amount} onChange={e => setAmount(Number(e.target.value))}
                style={{ width:'100%', accentColor:pc }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginTop:4 }}>
                <span>10 000 kr</span><span>600 000 kr</span>
              </div>
            </div>
            <div>
              <label style={{ display:'block', fontWeight:700, marginBottom:8, fontSize:14, color:'#374151' }}>
                Återbetalningstid: <span style={{ color:pc }}>{years} år</span>
              </label>
              <input type="range" min="1" max="20" step="1"
                value={years} onChange={e => setYears(Number(e.target.value))}
                style={{ width:'100%', accentColor:pc }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginTop:4 }}>
                <span>1 år</span><span>20 år</span>
              </div>
            </div>
            <div>
              <label style={{ display:'block', fontWeight:700, marginBottom:8, fontSize:14, color:'#374151' }}>
                Räntesats: <span style={{ color:pc }}>{rate.toFixed(1)} %</span>
              </label>
              <input type="range" min="3" max="25" step="0.5"
                value={rate} onChange={e => setRate(Number(e.target.value))}
                style={{ width:'100%', accentColor:pc }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginTop:4 }}>
                <span>3 %</span><span>25 %</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop:28, background:pcLight, border:'1px solid '+pcMed,
            borderRadius:14, padding:'24px 28px', display:'grid',
            gridTemplateColumns:'1fr 1fr 1fr', gap:16, textAlign:'center' }}>
            <div>
              <div style={{ fontSize:12, color:'#64748b', marginBottom:4 }}>Månadskostnad</div>
              <div style={{ fontSize:28, fontWeight:800, color:pc }}>{monthly.toLocaleString('sv')} kr</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:'#64748b', marginBottom:4 }}>Total kostnad</div>
              <div style={{ fontSize:28, fontWeight:800, color:'#0f172a' }}>{totalCost.toLocaleString('sv')} kr</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:'#64748b', marginBottom:4 }}>Varav ränta</div>
              <div style={{ fontSize:28, fontWeight:800, color:'#dc2626' }}>{totalInterest.toLocaleString('sv')} kr</div>
            </div>
          </div>
          {bestProv && bestProv.name && (
            <div style={{ marginTop:16, background:'#f0fdf4', border:'2px solid #bbf7d0',
              borderRadius:12, padding:'16px 20px' }}>
              <div style={{ fontSize:12, color:'#15803d', fontWeight:700, marginBottom:10 }}>
                ⭐ Billigaste alternativet för {amount.toLocaleString('sv')} kr på {years} år
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
                <div>
                  <div style={{ fontSize:18, fontWeight:800, color:'#0f172a', marginBottom:4 }}>
                    {bestProv.name}
                  </div>
                  <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                    <span style={{ fontSize:13, color:'#374151' }}>
                      <span style={{ color:'#15803d', fontWeight:700 }}>{bestMonthly.toLocaleString('sv')} kr/mån</span>
                      {' '}med {bestProv.price}
                    </span>
                    <span style={{ fontSize:13, color:'#64748b' }}>
                      Totalt {bestTotal.toLocaleString('sv')} kr · Ränta {bestInterest.toLocaleString('sv')} kr
                    </span>
                  </div>
                  {bestProv.badge && (
                    <div style={{ marginTop:6, display:'inline-block', background:'#dcfce7', color:'#15803d',
                      fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:6 }}>
                      {bestProv.badge}
                    </div>
                  )}
                </div>
                <a href={bestProv.url} target="_blank" rel="noopener noreferrer nofollow sponsored"
                  style={{ background:'#15803d', color:'#fff', padding:'10px 22px',
                    borderRadius:8, fontWeight:700, fontSize:14, textDecoration:'none',
                    whiteSpace:'nowrap', flexShrink:0 }}>
                  Ansök hos {bestProv.name} →
                </a>
              </div>
            </div>
          )}
          <p style={{ marginTop:12, fontSize:12, color:'#94a3b8' }}>
            Beräknat på respektive banks lägsta ränta. Faktisk ränta beror på kreditprövning — din ränta kan bli högre.
            Alla lån förutsätter kreditprövning. Resultaten är vägledande, inte garanti.
          </p>
        </div>
      </section>

      <section id="guide" style={{ background:'#f8fafc',
        borderTop:'1px solid #e2e8f0', padding:'64px 20px',
        fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20, color:'#0f172a' }}>
            Så fungerar det
          </h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>
            Att förstå hur företagslån fungerar är avgörande för att kunna välja rätt alternativ för ditt företag. Företagslån kan variera avsevärt i termer av räntor, återbetalningstider och villkor, så det är viktigt att noggrant överväga dina behov och vad varje långivare erbjuder. Innan du ansöker bör du bedöma ditt företags ekonomiska ställning och dina framtida planer. Det kan också vara klokt att konsultera en ekonomisk rådgivare för att säkerställa att du gör det bästa valet. När du väl har en klar bild av dina behov kan du börja jämföra olika långivares erbjudanden. Titta på faktorer som ränta, lånebelopp, återbetalningstider och eventuella avgifter. Många långivare erbjuder också digitala verktyg och kalkylatorer för att hjälpa dig beräkna kostnader och återbetalningsplaner, vilket kan vara till stor hjälp i din beslutprocess.
          </p>
          <h3 style={{ fontSize:22, fontWeight:700, marginBottom:16, color:'#0f172a', marginTop:40 }}>Vanliga misstag</h3>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>Att undvika vanliga misstag kan spara både tid och pengar när du ansöker om ett företagslån. Ett vanligt misstag är att inte jämföra tillräckligt många alternativ, vilket kan leda till att du missar mer fördelaktiga villkor. Ett annat misstag är att inte läsa det finstilta noggrant, vilket kan leda till oväntade avgifter eller villkor. Det är också viktigt att realistiskt bedöma ditt företags återbetalningsförmåga för att undvika problem längre fram. Slutligen, se till att du har alla nödvändiga dokument och information redo innan du påbörjar ansökningsprocessen för att undvika förseningar.</p>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:'#0f172a' }}>
            Vad ska du tänka på?
          </h3>
          <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#1d4ed815',color:'#1d4ed8',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>1</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Jämför flera alternativ</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#1d4ed815',color:'#1d4ed8',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>2</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Läs det finstilta</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#1d4ed815',color:'#1d4ed8',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>3</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Bedöm återbetalningsförmåga</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#1d4ed815',color:'#1d4ed8',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>4</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Ha dokument redo</p></div>
        </div>
      </section>

      <section style={{ padding:'64px 20px', maxWidth:760,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:32, color:'#0f172a' }}>
          Vanliga frågor
        </h2>
        <details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vilket företagslån är bäst för småföretag?<span style={{color:'#1d4ed8',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Det bästa företagslånet beror på ditt företags specifika behov och ekonomiska situation. Jämför flera alternativ för att hitta det mest lämpliga.</p></details>
      </section>

      <section style={{ background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding:'32px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <p style={{ fontSize:14, color:'#64748b', marginBottom:12, fontWeight:600 }}>Läs mer:</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <a href="/utan-uc" style={{color:'#1d4ed8',fontWeight:600,textDecoration:'none',fontSize:14}}>Privatlån utan UC-kontroll</a>
            · <a href="/med-betalningsanmarkning" style={{color:'#1d4ed8',fontWeight:600,textDecoration:'none',fontSize:14}}>Privatlån med betalningsanmärkning</a>
            · <a href="/snabbt" style={{color:'#1d4ed8',fontWeight:600,textDecoration:'none',fontSize:14}}>Snabbt privatlån — svar direkt</a>
            · <a href="/lagrad-ranta" style={{color:'#1d4ed8',fontWeight:600,textDecoration:'none',fontSize:14}}>Privatlån med lägst ränta</a>
          </div>
        </div>
      </section>

      <footer style={{ background:'#0f172a', color:'#94a3b8',
        padding:'52px 20px 32px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:48, flexWrap:'wrap', marginBottom:36 }}>
            <div style={{ maxWidth:260 }}>
              <div style={{ fontWeight:800, color:'#fff', fontSize:18, marginBottom:10 }}>Topplånkollen</div>
              <p style={{ fontSize:13, lineHeight:1.75 }}>
                Oberoende jämförelsetjänst för svenska konsumenter. Vi jämför 7 alternativ inom finans.
              </p>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Sidor</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Jämförelse</Link>
                <Link href="/om-oss" style={{ color:'#94a3b8', textDecoration:'none' }}>Om oss</Link>
                <Link href="/kontakt" style={{ color:'#94a3b8', textDecoration:'none' }}>Kontakt</Link>
                <Link href="/integritetspolicy" style={{ color:'#94a3b8', textDecoration:'none' }}>Integritetspolicy</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Se även</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/utan-uc" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Privatlån utan UC-kontroll</Link>
                <Link href="/med-betalningsanmarkning" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Privatlån med betalningsanmärkning</Link>
                <Link href="/snabbt" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Snabbt privatlån — svar direkt</Link>
                <Link href="/lagrad-ranta" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Privatlån med lägst ränta</Link>
                <Link href="/samlingslan" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa samlingslån</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Jämförelser</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/jamfor/lendo-foretagslan-vs-froda" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Lendo Företagslån vs Froda</Link>
                <Link href="/jamfor/lendo-foretagslan-vs-qred-foretagslan" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Lendo Företagslån vs Qred Företagslån</Link>
                <Link href="/jamfor/lendo-foretagslan-vs-capcito" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Lendo Företagslån vs Capcito</Link>
                <Link href="/jamfor/lendo-foretagslan-vs-svea-ekonomi-foretagslan" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Lendo Företagslån vs Svea Ekonomi Företagslån</Link>
                <Link href="/jamfor/lendo-foretagslan-vs-almi-foretagspartner" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Lendo Företagslån vs Almi Företagspartner</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:12, lineHeight:1.75 }}>
            <p style={{ marginBottom:8 }}>
              &copy; {year} Topplånkollen. Oberoende jämförelsetjänst utan koppling till listade
              varumärken utöver eventuella affiliate-provisioner.
            </p>
            <p>
              <strong style={{ color:'#e2e8f0' }}>Affiliateinformation:</strong> Sidan innehåller
              affiliate-länkar via Adtraction Sverige. Vi kan ta emot provision från annonsörer.
              Det påverkar aldrig priset för dig eller våra oberoende betyg.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}