'use client';

import { useState, useEffect } from 'react';

const Icon = ({ name, className }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined select-none leading-none ${className ?? ''}`}>{name}</span>
);


type BlockType = 'sport' | 'food' | 'wellness' | 'free' | 'info';

type LiveStatus =
  | { phase: 'upcoming'; msLeft: number }
  | { phase: 'active'; dayIndex: number; blockIndex: number }
  | { phase: 'ended' };

function formatCountdown(ms: number) {
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return { d, h, m, s };
}

function computeLive(now: Date): LiveStatus {
  const EVENT_START = new Date('2026-05-14T11:00:00+02:00');
  const EVENT_END   = new Date('2026-05-15T13:00:00+02:00');
  if (now < EVENT_START) return { phase: 'upcoming', msLeft: EVENT_START.getTime() - now.getTime() };
  if (now >= EVENT_END)  return { phase: 'ended' };

  const dayDates = ['2026-05-14', '2026-05-15'];
  for (let di = 0; di < dayBlocks.length; di++) {
    for (let bi = 0; bi < dayBlocks[di].blocks.length; bi++) {
      const [startStr, endStr] = dayBlocks[di].blocks[bi].time.split(' – ');
      const [sh, sm] = startStr.split(':').map(Number);
      const [eh, em] = endStr.split(':').map(Number);
      const base = new Date(dayDates[di]);
      const blockStart = new Date(base); blockStart.setHours(sh, sm, 0, 0);
      const blockEnd   = new Date(base); blockEnd.setHours(eh, em, 0, 0);
      if (eh < sh) blockEnd.setDate(blockEnd.getDate() + 1); // overnight
      if (now >= blockStart && now < blockEnd) return { phase: 'active', dayIndex: di, blockIndex: bi };
    }
  }
  // gap between blocks — find next upcoming block
  for (let di = 0; di < dayBlocks.length; di++) {
    for (let bi = 0; bi < dayBlocks[di].blocks.length; bi++) {
      const [startStr] = dayBlocks[di].blocks[bi].time.split(' – ');
      const [sh, sm] = startStr.split(':').map(Number);
      const blockStart = new Date(dayDates[di]); blockStart.setHours(sh, sm, 0, 0);
      if (now < blockStart) return { phase: 'active', dayIndex: di, blockIndex: bi };
    }
  }
  return { phase: 'ended' };
}


const icsContent = [
  'BEGIN:VCALENDAR', 'VERSION:2.0',
  'BEGIN:VEVENT',
  'DTSTART:20260514T110000',
  'DTEND:20260515T130000',
  'SUMMARY:Športový deň 2026 — Tribe Home Experience',
  'LOCATION:x-bionic® sphere\\, Šamorín',
  'END:VEVENT', 'END:VCALENDAR',
].join('\n');
const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

const blockTypeConfig: Record<BlockType, { label: string; badgeCls: string; icon: string; accent: string }> = {
  info:     { label: 'Check-in',   badgeCls: 'bg-pink-500/10 text-pink-500 border border-pink-500/20',     icon: 'how_to_reg',    accent: '' },
  food:     { label: 'Jedlo',      badgeCls: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',     icon: 'restaurant',    accent: '' },
  sport:    { label: 'Šport',      badgeCls: 'bg-green-500/10 text-green-400 border border-green-500/20',  icon: 'sports_kabaddi',accent: 'border-l-4 border-l-primary-container' },
  wellness: { label: 'Wellness',   badgeCls: 'bg-purple-500/10 text-purple-400 border border-purple-500/20', icon: 'spa',          accent: '' },
  free:     { label: 'Voľný čas', badgeCls: 'bg-orange-500/10 text-orange-400 border border-orange-500/20', icon: 'nightlife',    accent: '' },
};

const dayBlocks = [
  {
    day: 'Deň 1',
    date: '14.5.',
    blocks: [
      { time: '11:00 – 12:30', title: 'Príchod a registrácia',   type: 'info'     as BlockType, location: 'Pozícia 1 · Hotel',    badge: 'Príchod', note: 'Prosíme vás, aby ste prichádzali priebežne v tomto čase. Vyhneme sa tak radom pri registrácii a všetci sa v pokoji stihnete naobedovať.' },
      { time: '11:30 – 13:00', title: 'Obed',                        type: 'food'     as BlockType, location: 'Olym-Pic · poz. 2', note: 'Reštaurácia bude pripravená pre prichádzajúcich hostí.' },
      { time: '13:00 – 17:00', title: 'Štart aktivít',            type: 'sport'    as BlockType, location: 'Areál · poz. 29',   note: 'O tomto čase sa už všetci stretneme v športovom oblečení priamo na športovisku.' },
      { time: '17:00 – 19:00', title: 'Wellness / bazén / gym',   type: 'wellness' as BlockType, location: 'Poz. 5, 11–14'     },
      { time: '19:00 – 20:00', title: 'Večera',                   type: 'food'     as BlockType, location: 'Olym-Pic'          },
      { time: '20:00 – 02:00', title: 'Večerný kvíz & voľný program', type: 'free' as BlockType, location: "Legends' Bar"      },
    ],
  },
  {
    day: 'Deň 2',
    date: '15.5.',
    blocks: [
      { time: '07:00 – 10:00', title: 'Raňajky',                    type: 'food'  as BlockType, location: 'Olym-Pic · poz. 2', note: 'Raňajky sú k dispozícii v Olym-Pic od 7:00 do 10:00.' },
      { time: '09:00 – 12:00', title: 'Voľný program',               type: 'free'  as BlockType, location: 'Areál' },
      { time: '12:00',          title: 'Ukončenie a presun domov',   type: 'info'  as BlockType, badge: 'Check-out' },
    ],
  },
];

const disciplines = [
  { name: 'Lukostreľba',  description: 'Zameraj a zasiahni stred terča.',  badge: 'Presnosť', icon: 'target',         color: 'primary',   image: '/discipliny/lukostrelbba.jpg' },
  { name: 'Vzduchovka',   description: 'Športová streľba na pevný terč.',  badge: 'Presnosť', icon: 'crossword',      color: 'primary',   image: '/discipliny/vzduchovka.jpg'   },
  { name: 'Airsoft',      description: 'Dynamická strelnica v teréne.',     badge: 'Outdoor',  icon: 'shield',         color: 'secondary', image: '/discipliny/airsoft.jpg'       },
  { name: 'Penalty',      description: 'Prekonaj brankára v súboji.',       badge: 'Presnosť', icon: 'sports_soccer',  color: 'primary',   image: '/discipliny/penalty.jpg'       },
  { name: 'Hod oštepom',  description: 'Klasická atletická disciplína.',    badge: 'Sila',     icon: 'fitness_center', color: 'neutral',   image: '/discipliny/hod-ostepom.jpg'  },
  { name: 'Discgolf',     description: 'Trať s košmi v areáli parku.',      badge: 'Outdoor',  icon: 'sports',         color: 'secondary', image: '/discipliny/discgolf.jpg',     pending: true },
];

const tournaments = [
  { name: 'Futbal',     location: 'Main Field',     note: 'Presný rozpis bude riešený na mieste s agentúrou.', pending: true, image: '/turnaje/futbal.jpg'     },
  { name: 'Volejbal',   location: 'Main Field',     note: 'Presný rozpis bude riešený na mieste s agentúrou.', pending: true, image: '/turnaje/volejbal.jpg'   },
  { name: 'Streetball', location: 'Concrete Court', note: 'Presný rozpis bude riešený na mieste s agentúrou.', pending: true, image: '/turnaje/streetball.jpg' },
];

const teamTasks = [
  { name: 'Bludisko',         description: 'Spoločná tímová úloha.',                       icon: 'route',           color: 'primary'   },
  { name: 'Lyže pre piatich', description: 'Koordinačná aktivita vyžadujúca spoluprácu.', icon: 'downhill_skiing', color: 'secondary' },
  { name: 'Letné sane',       description: 'Zábavná tímová úloha s pohybovým prvkom.',     icon: 'sledding',        color: 'primary'   },
  { name: 'Amazonka',         description: 'Spoločná aktivita / výzva pre tímy.',           icon: 'forest',          color: 'secondary' },
];

const mapPoints = [
  { label: 'Hotel / Check-in', number: '1'  },
  { label: 'Šport. zóna',      number: '29' },
  { label: 'Olym-Pic',         number: '7'  },
  { label: 'Gym',              number: '5'  },
  { label: 'Wellness',         number: '11' },
  { label: 'Krytý bazén',      number: '12' },
  { label: 'Vonk. bazén',      number: '14' },
  { label: "Legends' Bar",     number: '8'  },
];

const mapPins: Record<string, { x: number; y: number; label: string; number: string }> = {
  pos1:  { x: 1092, y:  840, label: 'Hotel / Check-in', number: '1'  },
  pos29: { x: 1152, y:  717, label: 'Šport. zóna',      number: '29' },
  pos5:  { x: 1054, y:  811, label: 'Gym',              number: '5'  },
  pos11: { x:  932, y:  846, label: 'Wellness',         number: '11' },
  pos12: { x:  890, y:  856, label: 'Krytý bazén',      number: '12' },
  pos7:  { x: 1030, y:  870, label: 'Olym-Pic',         number: '7'  },
  pos8:  { x: 1053, y:  910, label: "Legends' Bar",     number: '8'  },
  pos14: { x:  825, y:  869, label: 'Vonk. bazén',      number: '14' },
};


const navItems = [
  { label: 'Program',    href: '#program',        icon: 'calendar_today' },
  { label: 'Mapa',       href: '#mapa',           icon: 'map'            },
  { label: 'Disciplíny', href: '#discipliny',     icon: 'sports_kabaddi' },
  { label: 'Info',       href: '#prakticke-info', icon: 'info'           },
  { label: 'Wellness',   href: '#wellness',       icon: 'spa'            },
];

const menuItems = [
  { label: 'Program',        href: '#program',        icon: 'calendar_today' },
  { label: 'Praktické info', href: '#prakticke-info', icon: 'info'           },
  { label: 'Mapa',           href: '#mapa',           icon: 'map'            },
  { label: 'Disciplíny',     href: '#discipliny',     icon: 'sports_kabaddi' },
  { label: 'Turnaje',        href: '#turnaje',        icon: 'emoji_events'   },
  { label: 'Wellness',       href: '#wellness',       icon: 'spa'            },
];

type AnnouncementType = 'info' | 'warning' | 'success';
type Announcement = {
  id: string;
  text: string;
  time?: string;
  type: AnnouncementType;
  active: boolean;
};

// ── OZNAMY – edituj počas eventu, potom git push ──────────────
const announcements: Announcement[] = [
  { id: 'ann-005', text: 'Bicykle (15.5.) sú pre nepriaznivé počasie zrušené.', type: 'warning', active: true },
  { id: 'ann-006', text: 'Bicykle (15.5.) sú pre nepriaznivé počasie zrušené.', type: 'warning', active: true },
];

export default function Page() {
  const [activeDay, setActiveDay] = useState(0);
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [activeSection, setActiveSection] = useState('program');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapTab, setMapTab] = useState<'areal' | 'budovy'>('areal');
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const toggleSection = (id: string) => setExpanded(prev =>
    prev.has(id) ? new Set() : new Set([id])
  );

  const expandSection = (href: string) => {
    const map: Record<string, string[]> = {
      '#discipliny':     ['discipliny'],
      '#turnaje':        ['turnaje'],
      '#wellness':       ['wellness'],
      '#prakticke-info': ['prakticke-info'],
    };
    const ids = map[href];
    setExpanded(ids ? new Set(ids) : new Set());
  };

  const dismissAnn = (id: string) => {
    setDismissedIds(prev => {
      const next = new Set(prev).add(id);
      try { sessionStorage.setItem('dismissed-ann', JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  };

  useEffect(() => {
    const update = () => setLiveStatus(computeLive(new Date()));
    update();
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.replace('fade-hidden', 'fade-visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-hidden').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ids = navItems.map(n => n.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('dismissed-ann');
      if (stored) setDismissedIds(new Set(JSON.parse(stored)));
    } catch { /* noop */ }
  }, []);

  const visibleAnns = announcements.filter(a => a.active && !dismissedIds.has(a.id));
  const showBanner = visibleAnns.length > 0;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">

      {/* ── HEADER ────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg flex items-center px-5 h-16">
        {/* Left */}
        <div className="flex-1 flex items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-pink-500 hover:bg-white/5 transition-colors p-2 rounded-full flex-shrink-0"
          >
            <Icon name="home" className="text-[22px]" />
          </button>
        </div>

        {/* Center: countdown */}
        <div className="flex items-center">
          {liveStatus?.phase === 'upcoming' && (() => {
            const { d, h, m, s } = formatCountdown(liveStatus.msLeft);
            return (
              <div className="flex items-baseline gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.1em] font-semibold text-white/30 leading-none mr-0.5">do začiatku</span>
                {[
                  { val: String(d),                  unit: 'd' },
                  { val: String(h).padStart(2, '0'), unit: 'h' },
                  { val: String(m).padStart(2, '0'), unit: 'm' },
                  { val: String(s).padStart(2, '0'), unit: 's' },
                ].map(({ val, unit }, i) => (
                  <span key={unit} className="flex items-baseline">
                    {i > 0 && <span className="text-white/15 text-[11px] mr-1.5">·</span>}
                    <span className="text-[15px] font-bold text-white tabular-nums leading-none">{val}</span>
                    <span className="text-[10px] font-bold ml-0.5 leading-none" style={{ color: '#e20074' }}>{unit}</span>
                  </span>
                ))}
              </div>
            );
          })()}
          {liveStatus?.phase === 'active' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider" style={{ background: '#e20074' }}>● LIVE</span>
          )}
        </div>

        {/* Right */}
        <div className="flex-1 flex items-center justify-end">
          <button onClick={() => setMenuOpen(true)} className="text-pink-500 hover:bg-white/5 transition-colors p-2 rounded-full flex-shrink-0">
            <Icon name="menu" />
          </button>
        </div>
      </header>

      {/* ── ANNOUNCEMENT TICKER ───────────────────────────────── */}
      {showBanner && (
        <div className="fixed top-16 w-full z-40 overflow-hidden"
          style={{ background: 'rgba(226,0,116,0.10)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(226,0,116,0.25)' }}>
          <div className="ticker-track" style={{ animationDuration: `${20 + visibleAnns.length * 10}s` }}>
            {[0, 1].map(copy => (
              <span key={copy} className="inline-flex items-center shrink-0">

                {/* Label */}
                <span className="text-[10px] font-bold uppercase tracking-widest pl-5 pr-3" style={{ color: '#e20074' }}>Oznamy</span>
                <span className="text-white/20 text-xs">·</span>

                {/* Manual announcements */}
                {visibleAnns.map((ann, i) => {
                  const colorMap = { info: '#e20074', warning: '#fb923c', success: '#4ade80' } as const;
                  const iconMap  = { info: 'campaign', warning: 'warning', success: 'check_circle' } as const;
                  return (
                    <span key={ann.id} className="inline-flex items-center gap-2 px-5 py-3">
                      {i > 0 && <span className="text-white/25 select-none mr-3">·</span>}
                      <span className="text-[18px] leading-none" style={{ color: colorMap[ann.type] }}><Icon name={iconMap[ann.type]} /></span>
                      <span className="text-sm font-semibold text-white">
                        {ann.text}
                        {ann.time && <span className="text-[11px] font-medium ml-2" style={{ color: colorMap[ann.type] }}>{ann.time}</span>}
                      </span>
                    </span>
                  );
                })}

                {/* Gap before loop repeats – must be ≥ viewport width so copy 2 is never visible during copy 1 */}
                <span className="inline-block shrink-0" style={{ width: '100vw' }} />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── BURGER MENU OVERLAY ───────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          {/* Drawer */}
          <div className="relative ml-auto w-72 h-full flex flex-col"
            style={{ background: 'rgba(17,20,21,0.97)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Navigácia</span>
              <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors">
                <Icon name="close" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => { expandSection(item.href); setMenuOpen(false); }}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Icon name={item.icon} className="text-pink-500 text-[22px]" />
                  <span className="text-base font-semibold">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="pb-28 px-5 max-w-md mx-auto space-y-10" style={{ paddingTop: showBanner ? '128px' : '80px' }}>

        {/* ── HERO BANNER ───────────────────────────────────── */}
        <section className="fade-hidden -mx-5">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0a1128 0%, #1a1040 100%)',
              minHeight: '240px',
              margin: '0 16px',
              padding: '28px',
            }}
          >
            {/* Text content */}
            <div className="relative z-20 pt-6">
              <span className="inline-block mb-4 text-white font-bold uppercase tracking-[0.05em]" style={{ background: '#e20074', fontSize: '11px', padding: '4px 12px', borderRadius: '999px' }}>
                HOME EXPERIENCE TRIBE
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 800, color: 'white', lineHeight: 1.05, marginBottom: '16px' }}>
                Športový deň<br />2026
              </h1>
              <div className="flex items-center gap-1.5 text-[13px] text-white/70 mt-1">
                <Icon name="calendar_today" className="text-[14px] text-white/60" />
                <span>14–15 May 2026</span>
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-white/70 mt-1">
                <Icon name="location_on" className="text-[14px] text-white/60" />
                <span>x-bionic® sphere, Šamorín</span>
              </div>
            </div>
          </div>
        </section>


        {/* ── INFO CARDS ────────────────────────────────────── */}
        <section className="fade-hidden space-y-3">
          {/* Location — full width, tall vertical layout, tappable to navigate */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=x-bionic+sphere,+%C5%A0amor%C3%ADn,+Slovakia"
            target="_blank"
            rel="noopener noreferrer"
            className="block glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-pink-500/30 transition-all"
            style={{ minHeight: '140px' }}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <Icon name="map" className="text-pink-500" />
              </div>
              <Icon name="north_east" className="text-pink-500/50 text-[20px]" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Location · Navigovať</p>
              <h3 className="font-bold text-white mt-1">x-bionic® sphere</h3>
              <p className="text-body-sm text-on-surface-variant">Dubová 33, Šamorín</p>
            </div>
          </a>

          {/* Parking — full width, right after Location */}
          <div className="glass-panel p-4 rounded-2xl flex gap-3 items-center hover:border-pink-500/30 transition-all">
            <div className="p-2 bg-pink-500/10 rounded-lg flex-shrink-0">
              <Icon name="local_parking" className="text-pink-500" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Parking</p>
              <h3 className="font-bold text-white">On site</h3>
              <p className="text-body-sm text-on-surface-variant">Free for guests</p>
            </div>
          </div>

          {/* Dates + Check-in — 2 column */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={icsDataUri}
              download="sportovy-den-2026.ics"
              className="glass-panel p-4 rounded-2xl flex flex-col justify-between hover:border-pink-500/30 transition-all"
              style={{ minHeight: '120px' }}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-pink-500/10 rounded-lg w-max">
                  <Icon name="event" className="text-pink-500" />
                </div>
                <Icon name="download" className="text-white/20 text-[18px]" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Dates</p>
                <h3 className="font-bold text-white mt-1">14–15 May</h3>
                <p className="text-[10px] text-pink-500/70 mt-1 font-semibold">+ Pridať do kalen.</p>
              </div>
            </a>
            <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 hover:border-pink-500/30 transition-all">
              <div className="p-2 bg-pink-500/10 rounded-lg w-max">
                <Icon name="login" className="text-pink-500" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Check-in</p>
                <h3 className="font-bold text-white mt-1">From 15:00</h3>
                <p className="text-body-sm text-on-surface-variant">Poz. 1 · Hotel</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAPA ──────────────────────────────────────────── */}
        <section id="mapa" className="fade-hidden">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Mapa areálu</h2>

          {/* Map tab switcher */}
          <div className="flex gap-2 mb-4 p-1 bg-slate-900/50 rounded-xl border border-white/5">
            <button
              onClick={() => setMapTab('areal')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${mapTab === 'areal' ? 'bg-primary-container text-white' : 'text-slate-400 hover:bg-white/5'}`}
            >
              Areál
            </button>
            <button
              onClick={() => setMapTab('budovy')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${mapTab === 'budovy' ? 'bg-primary-container text-white' : 'text-slate-400 hover:bg-white/5'}`}
            >
              Budovy & Reštaurácie
            </button>
          </div>

          {/* Map image + SVG overlay */}
          <div className="rounded-2xl overflow-hidden border border-white/10 relative">
            <img
              src={mapTab === 'areal' ? '/mapa-xbionic.jpg' : '/mapa-budovy.jpg'}
              alt="Mapa areálu x-bionic® sphere"
              className="w-full object-cover"
              style={{ maxHeight: '320px', objectPosition: 'center' }}
            />
            {mapTab === 'areal' && (
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1536 1314"
                preserveAspectRatio="xMidYMid slice"
                style={{ pointerEvents: 'none' }}
              >
                {/* Piny */}
                {Object.entries(mapPins).map(([id, pin]) => {
                  const isSel  = selectedMapPin === id;
                  const isBase = id === 'pos29';
                  return (
                    <g key={id} style={{ pointerEvents: 'all', cursor: 'pointer' }}
                      onClick={() => setSelectedMapPin(selectedMapPin === id ? null : id)}>
                      {isSel && <>
                        <circle cx={pin.x} cy={pin.y} r="18" fill="none" stroke="#e20074" strokeWidth="2.5" className="map-pin-pulse" />
                        <circle cx={pin.x} cy={pin.y} r="18" fill="none" stroke="#e20074" strokeWidth="2.5" className="map-pin-pulse-delay" />
                      </>}
                      <circle cx={pin.x} cy={pin.y} r={isSel ? 18 : 14}
                        fill={isSel || isBase ? '#e20074' : 'rgba(226,0,116,0.72)'}
                        stroke="white" strokeWidth="2" />
                      <text x={pin.x} y={pin.y + 5} textAnchor="middle"
                        fill="white" fontSize="13" fontWeight="bold"
                        style={{ fontFamily: 'sans-serif', userSelect: 'none' }}>
                        {pin.number}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          {/* Key locations pill carousel */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {mapPoints.map((pt) => {
              const pinId    = `pos${pt.number.replace(/[–\-].*/, '')}`;
              const isSel    = selectedMapPin === pinId;
              return (
                <button
                  key={pt.label}
                  onClick={() => setSelectedMapPin(isSel ? null : pinId)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full flex items-center gap-2 transition-all ${
                    isSel ? 'bg-pink-500/15 border border-pink-500' : 'glass-panel'
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isSel ? 'bg-pink-500 text-white' : 'bg-primary-container text-white'
                  }`}>
                    {pt.number.length <= 2 ? pt.number : '·'}
                  </span>
                  <span className={`text-xs font-medium ${isSel ? 'text-pink-400' : 'text-slate-300'}`}>{pt.label}</span>
                  {pt.number.length > 2 && !isSel && <span className="text-xs text-slate-500">({pt.number})</span>}
                </button>
              );
            })}
          </div>

          {/* Navigation links */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href="https://www.x-bionicsphere.com/restauracie/legends-bar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors"
              style={{ background: 'rgba(29,32,33,0.7)', border: '1px solid rgba(255,255,255,0.08)', color: '#e3bdc5' }}
            >
              <Icon name="local_bar" className="text-[18px] text-pink-500" />
              Legends&apos; Bar
            </a>
            <a
              href="https://www.x-bionicsphere.com/restauracie/olym-pick/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors"
              style={{ background: 'rgba(29,32,33,0.7)', border: '1px solid rgba(255,255,255,0.08)', color: '#e3bdc5' }}
            >
              <Icon name="restaurant" className="text-[18px] text-pink-500" />
              Olym-Pic
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=x-bionic+sphere,+%C5%A0amor%C3%ADn,+Slovakia"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: '#e20074' }}
            >
              <Icon name="navigation" className="text-[18px]" />
              Navigovať sem
            </a>
          </div>
        </section>

        {/* ── PROGRAM TIMELINE ──────────────────────────────── */}
        <section id="program" className="fade-hidden">

          <div className="flex justify-between items-end mb-5">
            <h2 className="font-headline-md text-headline-md text-on-surface">Program</h2>
            <span className="text-primary text-label-md">{dayBlocks[activeDay].blocks.length} blokov</span>
          </div>

          {/* Day tabs */}
          <div className="flex gap-3 p-1 bg-slate-900/50 rounded-xl border border-white/5 mb-6">
            {dayBlocks.map((day, i) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(i)}
                className={`flex-1 py-3 px-4 rounded-lg font-label-lg text-center transition-all active:scale-95 ${
                  activeDay === i
                    ? 'bg-primary-container text-on-primary-container shadow-lg'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {day.day} <span className="opacity-60 text-xs">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-4 relative timeline-line">
            {dayBlocks[activeDay].blocks.map((block, idx) => {
              const cfg = blockTypeConfig[block.type];
              const isLive = liveStatus?.phase === 'active' && liveStatus.dayIndex === activeDay && liveStatus.blockIndex === idx;
              return (
                <div key={idx} className="relative flex gap-4 items-start">
                  <div className={`relative z-10 w-10 h-10 flex-shrink-0 rounded-full border-2 border-primary-container bg-slate-950 flex items-center justify-center ${isLive ? 'shadow-[0_0_15px_rgba(226,0,116,0.4)]' : ''}`}>
                    <Icon name={'icon' in block ? (block as {icon: string}).icon : cfg.icon} className="text-primary-container text-[20px]" />
                  </div>
                  <div className={`flex-1 glass-card rounded-xl p-4 transition-all hover:border-pink-500/20 ${cfg.accent} ${isLive ? 'border-primary-container/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-label-md text-primary-container">{block.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.badgeCls}`}>{'badge' in block ? (block as {badge: string}).badge : cfg.label}</span>
                    </div>
                    <h3 className="font-semibold text-slate-50">{block.title}</h3>
                    {block.location && (
                      <div className="flex items-center gap-1 mt-2 text-slate-400">
                        <Icon name="location_on" className="text-[16px]" />
                        <span className="text-body-sm">{block.location}</span>
                      </div>
                    )}
                    {'note' in block && block.note && (
                      <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">{(block as {note: string}).note}</p>
                    )}
                    {isLive && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pink-500" />
                        </span>
                        <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">Práve teraz</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── DISCIPLÍNY ────────────────────────────────────── */}
        <section id="discipliny" className="fade-hidden">
          <button onClick={() => toggleSection('discipliny')} className="w-full flex justify-between items-center py-1">
            <h2 className="font-headline-md text-headline-md text-on-surface">Individuálne disciplíny</h2>
            <div className="flex items-center gap-2">
              <span className="text-primary text-label-md">{disciplines.length}</span>
              <Icon name="chevron_right" className={`text-pink-500 text-[22px] transition-transform duration-300 ${expanded.has('discipliny') ? 'rotate-90' : ''}`} />
            </div>
          </button>
          {expanded.has('discipliny') && (
            <div className="grid grid-cols-2 gap-4 mt-5">
              {disciplines.map((item) => {
                const colMap = {
                  primary:   { bg: 'bg-primary-container/20', text: 'text-primary',   badge: 'bg-primary/20 text-primary'     },
                  secondary: { bg: 'bg-secondary-container/30', text: 'text-secondary', badge: 'bg-secondary-container/40 text-secondary' },
                  neutral:   { bg: 'bg-on-primary-fixed-variant/20', text: 'text-on-surface-variant', badge: 'bg-surface-variant text-on-surface-variant' },
                };
                const col = colMap[item.color as keyof typeof colMap];
                return (
                  <div
                    key={item.name}
                    className="relative border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/20"
                    style={{ minHeight: '160px' }}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(10,17,40,0.7), rgba(10,17,40,0.7))' }} />
                    <div className="relative z-10 p-4 flex flex-col justify-between h-full" style={{ minHeight: '160px' }}>
                      <div className="mb-4">
                        <div className={`w-10 h-10 rounded-lg ${col.bg} flex items-center justify-center ${col.text}`}>
                          <Icon name={item.icon} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-white mb-1">{item.name}</h3>
                        <p className="text-slate-400 text-label-md">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── TURNAJE ───────────────────────────────────────── */}
        <section id="turnaje" className="fade-hidden space-y-6">
          {/* Tímové turnaje accordion */}
          <div>
            <button onClick={() => toggleSection('turnaje')} className="w-full flex justify-between items-center py-1">
              <h2 className="font-headline-md text-headline-md text-on-surface">Tímové turnaje</h2>
              <div className="flex items-center gap-2">
                <span className="text-primary text-label-md">{tournaments.length}</span>
                <Icon name="chevron_right" className={`text-pink-500 text-[22px] transition-transform duration-300 ${expanded.has('turnaje') ? 'rotate-90' : ''}`} />
              </div>
            </button>
            {expanded.has('turnaje') && (
              <div className="space-y-4 mt-5">
                {tournaments.map((item) => (
                  <div key={item.name} className="relative overflow-hidden rounded-2xl border border-white/5 h-32 flex items-center">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(10,17,40,0.75), rgba(10,17,40,0.75))' }} />
                    <div className="relative z-10 px-5 w-full">
                      <h3 className="font-headline-sm text-white">{item.name}</h3>
                      <p className="text-primary font-bold text-label-md uppercase tracking-widest mt-1">
                        {item.location}
                      </p>
                      <p className="text-slate-400 text-xs mt-1 italic">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tímové úlohy accordion */}
          <div>
            <button onClick={() => toggleSection('ulohy')} className="w-full flex justify-between items-center py-1">
              <h2 className="font-headline-md text-headline-md text-on-surface">Tímové úlohy</h2>
              <div className="flex items-center gap-2">
                <span className="text-primary text-label-md">{teamTasks.length}</span>
                <Icon name="chevron_right" className={`text-pink-500 text-[22px] transition-transform duration-300 ${expanded.has('ulohy') ? 'rotate-90' : ''}`} />
              </div>
            </button>
            {expanded.has('ulohy') && (
              <div className="grid grid-cols-2 gap-4 mt-5">
                {teamTasks.map((item) => {
                  const colMap = {
                    primary:   { bg: 'bg-primary-container/20', icon: 'text-primary' },
                    secondary: { bg: 'bg-secondary-container/30', icon: 'text-secondary' },
                  };
                  const col = colMap[item.color as keyof typeof colMap];
                  return (
                    <div key={item.name} className="glass-card rounded-xl border border-white/10 p-4 flex flex-col gap-3" style={{ minHeight: '130px' }}>
                      <div className={`w-10 h-10 rounded-lg ${col.bg} flex items-center justify-center`}>
                        <Icon name={item.icon} className={`${col.icon} text-[20px]`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                        <p className="mt-1 text-xs text-on-surface-variant">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── WELLNESS ──────────────────────────────────────── */}
        <section id="wellness" className="fade-hidden">
          <button onClick={() => toggleSection('wellness')} className="w-full flex justify-between items-center py-1">
            <h2 className="font-headline-md text-headline-md text-on-surface">Wellness & Relax</h2>
            <Icon name="chevron_right" className={`text-pink-500 text-[22px] transition-transform duration-300 ${expanded.has('wellness') ? 'rotate-90' : ''}`} />
          </button>
          {expanded.has('wellness') && (
            <div className="space-y-3 mt-5">
              {[
                { icon: 'pool',          iconCls: 'text-blue-400',   bgCls: 'bg-blue-500/10',   title: 'Bazény & Wellness', text: 'Vstup do wellness je možný z vnútornej časti hotela. Pre vstup do bazéna využite vonkajší vstup. Pri návšteve bazéna môžete využiť aj novootvorený termálny bazén v areáli.' },
                { icon: 'fitness_center', iconCls: 'text-purple-400', bgCls: 'bg-purple-500/10', title: 'Gym',               text: 'Fitness centrum pre individuálny tréning. Pozícia 5 na mape.'          },
                { icon: 'local_bar',      iconCls: 'text-amber-400',  bgCls: 'bg-amber-500/10',  title: "Legends' Bar",      text: "Večerný program a relax. Počas večera bude možné využiť aj bowling a biliard. Pozícia 8 na mape." },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-4 flex items-start gap-4 hover:border-pink-500/20 transition-all">
                  <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center ${item.bgCls}`}>
                    <Icon name={item.icon} className={`text-[24px] ${item.iconCls}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-body-sm text-on-surface-variant">{item.text}</p>
                  </div>
                </div>
              ))}
              <p className="text-[12px] text-slate-500 leading-relaxed px-1">
                Vstup do bazéna, gymu a wellness je možný len pre účastníkov, ktorí si danú aktivitu vybrali. Dostupné 17:00–19:30, pozície 11–14.
              </p>
            </div>
          )}
        </section>

        {/* ── PRAKTICKÉ INFO ────────────────────────────────── */}
        <section id="prakticke-info" className="fade-hidden">
          <button onClick={() => toggleSection('prakticke-info')} className="w-full flex justify-between items-center py-1">
            <h2 className="font-headline-md text-headline-md text-on-surface">Praktické info</h2>
            <Icon name="chevron_right" className={`text-pink-500 text-[22px] transition-transform duration-300 ${expanded.has('prakticke-info') ? 'rotate-90' : ''}`} />
          </button>
          {expanded.has('prakticke-info') && (
            <div className="mt-5 space-y-4">
              <div className="glass-card rounded-xl p-5 border-l-4 border-l-primary-container">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Icon name="backpack" className="text-primary-container text-[20px]" />
                  Čo si priniesť
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: 'sports',                    label: 'Na šport',              text: 'Pohodlné športové oblečenie a vhodná športová obuv – ideálne taká, čo zvládne outdoor aj indoor.'       },
                    { icon: 'checkroom',                 label: 'Pre istotu',             text: 'Náhradné tričká a ponožky na prezlečenie – po výkone padnú vhod.'                                        },
                    { icon: 'pool',                      label: 'Do vody',                text: 'Plavky a šľapky, ak máte vybrané vodné aktivity alebo plánujete využiť wellness.'                        },
                    { icon: 'wb_sunny',                  label: 'Slnko',                  text: 'Šiltovku alebo čiapku a opaľovací krém, ak nám bude priať slnko.'                                        },
                    { icon: 'rainy',                     label: 'Dážď',                   text: 'Pršiplášť alebo nepremokavú bundu, ak by nás prekvapil dážď.'                                            },
                    { icon: 'nightlife',                 label: 'Na večer',               text: 'Neformálne oblečenie na večerný program a spoločnú zábavu.'                                              },
                    { icon: 'sentiment_very_satisfied',  label: 'To najdôležitejšie',     text: 'Dobrú náladu a chuť zapojiť sa do spoločných aktivít!'                                                   },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Icon name={item.icon} className="text-[17px] text-primary-container flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold text-white">{item.label}: </span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unified info list */}
              <div className="space-y-2">
                {[
                  { icon: 'restaurant',    label: 'Obed a večera',           value: 'Olym-Pic · poz. 7',                                                    pending: false },
                  { icon: 'local_bar',     label: 'Večerný program',         value: "Legends' Bar · poz. 8",                                                pending: false },
                  { icon: 'sports',        label: 'Hlavná športová plocha',  value: 'Pozícia 29',                                                           pending: false },
                  { icon: 'local_parking', label: 'Parkovanie',              value: 'v areáli x-bionic® sphere',                                            pending: false },
                  { icon: 'group',         label: 'Turnaje a organizácia',   value: 'Individuálne disciplíny, tímové turnaje a tímové úlohy zabezpečuje externá agentúra.', pending: false },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
                    <Icon name={item.icon} className="text-[20px] text-primary-container flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{item.label}</span>
                        {item.pending && <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full flex-shrink-0">Čaká</span>}
                      </div>
                      <div className="text-sm font-medium text-white mt-0.5">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── KONTAKT & OZNAMY ──────────────────────────────── */}
        <section id="kontakt" className="fade-hidden">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-5">Kontakt & Oznamy</h2>
          <div className="glass-card rounded-2xl p-5 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">Hlavný kontakt</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                <Icon name="person" className="text-white text-[20px]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">Marek</div>
                <a href="tel:0915991413" className="text-sm text-slate-400 hover:text-pink-400 transition-colors">0915 991 413</a>
              </div>
              <div className="flex gap-2">
                <a href="tel:0915991413"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Zavolať">
                  <Icon name="call" className="text-[20px] text-slate-400" />
                </a>
                <a href="https://wa.me/421915991413"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#4ade80">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.523 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.101-1.474A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.878 9.878 0 0 1-5.034-1.376l-.36-.214-3.733.902.935-3.64-.235-.374A9.866 9.866 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.467 0 9.9 4.433 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">Oznamy</p>
            {announcements.length === 0 ? (
              <p className="text-sm text-slate-500">Zatiaľ žiadne oznamy.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {[...announcements].reverse().map((ann) => {
                  const cfg = {
                    info:    { icon: 'campaign',     text: '#e20074' },
                    warning: { icon: 'warning',      text: '#fb923c' },
                    success: { icon: 'check_circle', text: '#4ade80' },
                  }[ann.type];
                  return (
                    <div key={ann.id} className={`flex items-start gap-3 ${!ann.active ? 'opacity-40' : ''}`}>
                      <span className="text-[18px] flex-shrink-0 mt-0.5" style={{ color: ann.active ? cfg.text : '#6b7280' }}><Icon name={cfg.icon} /></span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white leading-snug">{ann.text}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {ann.time && <span className="text-[11px] text-slate-500">{ann.time}</span>}
                          {!ann.active && <span className="text-[11px] text-slate-600">archív</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <footer className="pt-2 text-center text-xs text-slate-600">
          Športový deň 2026 · Tribe Home Experience
        </footer>
      </main>

      {/* ── BOTTOM NAV ────────────────────────────────────── */}
      <nav
        className="fixed bottom-0 w-full rounded-t-2xl z-50 border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-2 pb-safe"
        style={{ background: 'rgba(17,20,21,0.85)', backdropFilter: 'blur(20px)' }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => expandSection(item.href)}
              className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-pink-500 scale-110' : 'text-slate-500 hover:text-pink-400'}`}
            >
              <span className="relative">
                <Icon name={item.icon} />
                {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest mt-1">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
