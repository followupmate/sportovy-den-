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
  return { d, h, m };
}

function computeLive(now: Date): LiveStatus {
  const EVENT_START = new Date('2026-05-14T11:00:00');
  const EVENT_END   = new Date('2026-05-15T13:00:00');
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
      { time: '11:00 – 11:30', title: 'Príchod, registrácia',      type: 'info'     as BlockType, location: 'Pozícia 29'        },
      { time: '11:30 – 12:30', title: 'Privítanie + obed',          type: 'food'     as BlockType, location: 'Olym-Pic'          },
      { time: '13:00 – 17:00', title: 'Športový program',           type: 'sport'    as BlockType, location: 'Areál'             },
      { time: '17:00 – 19:30', title: 'Wellness / bazén / gym',     type: 'wellness' as BlockType, location: 'Poz. 5, 11–14'     },
      { time: '19:30 – 21:00', title: 'Večera',                     type: 'food'     as BlockType, location: 'Olym-Pic'          },
      { time: '21:00 – 02:00', title: 'Voľný večerný program',      type: 'free'     as BlockType, location: "Legends' Bar"               },
    ],
  },
  {
    day: 'Deň 2',
    date: '15.5.',
    blocks: [
      { time: '09:00 – 12:00', title: 'Bicykel / beh / prechádzka', type: 'sport' as BlockType, location: 'Danubiana' },
      { time: '12:00',          title: 'Ukončenie a presun domov',   type: 'info'  as BlockType                       },
    ],
  },
];

const disciplines = [
  { name: 'Lukostreľba',  description: 'Zameraj a zasiahni stred terča.',  badge: 'Presnosť', icon: 'target',         color: 'primary',   image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400' },
  { name: 'Vzduchovka',   description: 'Športová streľba na pevný terč.',  badge: 'Presnosť', icon: 'crossword',      color: 'primary',   image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400' },
  { name: 'Airsoft',      description: 'Dynamická strelnica v teréne.',     badge: 'Outdoor',  icon: 'shield',         color: 'secondary', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { name: 'Penalty',      description: 'Prekonaj brankára v súboji.',       badge: 'Presnosť', icon: 'sports_soccer',  color: 'primary',   image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400' },
  { name: 'Hod oštepom',  description: 'Klasická atletická disciplína.',    badge: 'Sila',     icon: 'fitness_center', color: 'neutral',   image: 'https://images.unsplash.com/photo-1591491634026-6cc1d8a0c542?w=400' },
  { name: 'Discgolf',     description: 'Trať s košmi v areáli parku.',      badge: 'Outdoor',  icon: 'sports',         color: 'secondary', image: 'https://images.unsplash.com/photo-1547041547050-1b6add6db0ef?w=400', pending: true },
];

const tournaments = [
  { name: 'Futbal',     location: 'Main Field',     time: '14:00', note: 'Presný rozpis bude riešený na mieste agentúrou.', pending: true, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600' },
  { name: 'Volejbal',   location: 'Sand Arena',     time: '15:30', note: 'Poznámka: prosíme natiahnuť sieť.',               pending: true, image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600' },
  { name: 'Streetball', location: 'Concrete Court', time: '17:00', note: 'Výsledky sledovať priamo na mieste.',             pending: true, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600' },
];

const teamTasks = [
  { name: 'Bludisko',         description: 'Spoločná tímová úloha.',                       icon: 'route',           color: 'primary'   },
  { name: 'Lyže pre piatich', description: 'Koordinačná aktivita vyžadujúca spoluprácu.', icon: 'downhill_skiing', color: 'secondary' },
  { name: 'Letné sane',       description: 'Zábavná tímová úloha s pohybovým prvkom.',     icon: 'sledding',        color: 'primary'   },
  { name: 'Amazonka',         description: 'Spoločná aktivita / výzva pre tímy.',           icon: 'forest',          color: 'secondary' },
];

const mapPoints = [
  { label: 'Šport. zóna', number: '29' },
  { label: 'Olym-Pic',    number: '7'  },
  { label: 'Gym',         number: '5'  },
  { label: 'Wellness',    number: '11–14' },
];

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

export default function Page() {
  const [activeDay, setActiveDay] = useState(0);
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [activeSection, setActiveSection] = useState('program');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapTab, setMapTab] = useState<'areal' | 'budovy'>('areal');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggleSection = (id: string) => setExpanded(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  useEffect(() => {
    const update = () => setLiveStatus(computeLive(new Date()));
    update();
    const id = setInterval(update, 30_000);
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

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">

      {/* ── HEADER ────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg flex justify-between items-center px-5 h-16">
        <span className="text-white font-bold uppercase tracking-[0.05em]" style={{ background: '#e20074', fontSize: '11px', padding: '4px 12px', borderRadius: '999px' }}>
          HOME EXPERIENCE TRIBE
        </span>
        <button onClick={() => setMenuOpen(true)} className="text-pink-500 hover:bg-white/5 transition-colors p-2 rounded-full">
          <Icon name="menu" />
        </button>
      </header>

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
                  onClick={() => setMenuOpen(false)}
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

      <main className="pt-20 pb-28 px-5 max-w-md mx-auto space-y-10">

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
            <div className="relative z-20 pt-10">
              <h1 style={{ fontFamily: 'Manrope', fontSize: '42px', fontWeight: 800, color: 'white', lineHeight: 1.05, marginBottom: '16px' }}>
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

        {/* ── HORIZONTAL PILL TABS ─────────────────────────── */}
        <section className="fade-hidden -mx-5 px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                  style={isActive
                    ? { background: 'transparent', color: '#e20074', border: '1.5px solid #e20074' }
                    : { background: 'rgba(29,32,33,0.7)', color: '#e3bdc5', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {item.label}
                </a>
              );
            })}
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
            <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 hover:border-pink-500/30 transition-all">
              <div className="p-2 bg-pink-500/10 rounded-lg w-max">
                <Icon name="event" className="text-pink-500" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Dates</p>
                <h3 className="font-bold text-white mt-1">14–15 May</h3>
                <p className="text-body-sm text-on-surface-variant">2026</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 hover:border-pink-500/30 transition-all">
              <div className="p-2 bg-pink-500/10 rounded-lg w-max">
                <Icon name="login" className="text-pink-500" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Check-in</p>
                <h3 className="font-bold text-white mt-1">From 11:00</h3>
                <p className="text-body-sm text-on-surface-variant">Pozícia 29</p>
              </div>
            </div>
          </div>
        </section>


        {/* ── LIVE STATUS ───────────────────────────────────── */}
        {liveStatus !== null && (
          <section>
            {liveStatus.phase === 'upcoming' && (() => {
              const { d, h, m } = formatCountdown(liveStatus.msLeft);
              return (
                <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/20 blur-3xl rounded-full pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500">Do štartu eventu</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[{ v: d, l: 'dní' }, { v: h, l: 'hodín' }, { v: m, l: 'minút' }].map(({ v, l }) => (
                        <div key={l} className="rounded-xl bg-white/5 py-3 text-center">
                          <div className="text-2xl font-bold text-white">{String(v).padStart(2, '0')}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                    <a href={icsDataUri} download="sportovy-den-2026.ics"
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity">
                      <Icon name="download" className="text-[20px]" />
                      Pridať do kalendára
                    </a>
                  </div>
                </div>
              );
            })()}

            {liveStatus.phase === 'active' && (() => {
              const cur = dayBlocks[liveStatus.dayIndex].blocks[liveStatus.blockIndex];
              const next = dayBlocks[liveStatus.dayIndex].blocks[liveStatus.blockIndex + 1];
              const later = dayBlocks[liveStatus.dayIndex].blocks[liveStatus.blockIndex + 2];
              return (
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500">Práve teraz</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 rounded-xl bg-primary-container/10 p-3 border border-primary-container/20">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-pink-500">Teraz</div>
                      <div className="mt-1 font-semibold text-white">{cur.title}</div>
                      <div className="mt-0.5 text-xs text-slate-400">{cur.time}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {next && (
                        <div className="rounded-xl bg-white/5 p-2">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Ďalší</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-300 leading-tight">{next.title}</div>
                        </div>
                      )}
                      {later && (
                        <div className="rounded-xl bg-white/5 p-2 opacity-50">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Neskôr</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-400 leading-tight">{later.title}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {liveStatus.phase === 'ended' && (
              <div className="glass-card rounded-2xl p-4 text-center text-sm text-slate-400">
                Event sa skončil — ďakujeme za účasť! 🎉
              </div>
            )}
          </section>
        )}

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
                    <Icon name={cfg.icon} className="text-primary-container text-[20px]" />
                  </div>
                  <div className={`flex-1 glass-card rounded-xl p-4 transition-all hover:border-pink-500/20 ${cfg.accent} ${isLive ? 'border-primary-container/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-label-md text-primary-container">{block.time.split(' – ')[0]}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.badgeCls}`}>{cfg.label}</span>
                    </div>
                    <h3 className="font-semibold text-slate-50">{block.title}</h3>
                    {block.location && (
                      <div className="flex items-center gap-1 mt-2 text-slate-400">
                        <Icon name="location_on" className="text-[16px]" />
                        <span className="text-body-sm">{block.location}</span>
                      </div>
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

          {/* Map image */}
          <div className="rounded-2xl overflow-hidden border border-white/10 relative">
            {mapTab === 'areal' ? (
              <img
                src="/mapa-xbionic.jpg"
                alt="Mapa areálu x-bionic® sphere"
                className="w-full object-cover"
                style={{ maxHeight: '320px', objectPosition: 'center' }}
              />
            ) : (
              <img
                src="/mapa-budovy.jpg"
                alt="Mapa budov a reštaurácií x-bionic® sphere"
                className="w-full object-cover"
                style={{ maxHeight: '320px', objectPosition: 'center' }}
              />
            )}
          </div>

          {/* Key locations + nav links */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {mapPoints.map((pt) => (
              <div key={pt.label} className="flex-shrink-0 glass-panel px-3 py-2 rounded-full flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container text-[10px] font-bold text-white">
                  {pt.number.length <= 2 ? pt.number : '·'}
                </span>
                <span className="text-xs font-medium text-slate-300">{pt.label}</span>
                {pt.number.length > 2 && <span className="text-xs text-slate-500">({pt.number})</span>}
              </div>
            ))}
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
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-lg ${col.bg} flex items-center justify-center ${col.text}`}>
                          <Icon name={item.icon} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`${col.badge} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter`}>{item.badge}</span>
                          {item.pending && (
                            <span className="flex items-center gap-1 text-[10px] text-slate-400">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />Čaká
                            </span>
                          )}
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
                        {item.location} · {item.time}
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
                { icon: 'pool',          iconCls: 'text-blue-400',   bgCls: 'bg-blue-500/10',   title: 'Bazény & Wellness', text: 'Dostupné počas poobedného bloku (17:00–19:30). Pozície 11–14 na mape.' },
                { icon: 'fitness_center', iconCls: 'text-purple-400', bgCls: 'bg-purple-500/10', title: 'Gym',               text: 'Fitness centrum pre individuálny tréning. Pozícia 5 na mape.'          },
                { icon: 'restaurant',    iconCls: 'text-amber-400',  bgCls: 'bg-amber-500/10',  title: 'Olym-Pic',          text: 'Reštaurácia — obedy a večera. Pozícia 7 na mape.'                     },
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
                <ul className="space-y-2">
                  {['Športové oblečenie a vhodná obuv', 'Veci do bazéna / wellness', 'Oblečenie na večerný program'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon name="check_circle" className="text-[16px] text-primary-container" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                {[
                  { icon: 'location_on', title: 'Primárna športová zóna', text: 'Pozícia 29 a zelená plocha za ňou.' },
                  { icon: 'info',        title: 'Rozmiestnenie disciplín', text: 'Presné rozloženie bude doplnené po potvrdení od agentúry.', pending: true },
                  { icon: 'group',       title: 'Turnaje a organizácia',   text: 'Turnajovú časť zabezpečuje externá agentúra.', pending: true },
                ].map((item) => (
                  <div key={item.title} className="glass-card rounded-xl p-4 flex gap-3">
                    <Icon name={item.icon} className="text-[20px] text-primary-container flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        {item.pending && <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Čaká</span>}
                      </div>
                      <p className="mt-0.5 text-body-sm text-on-surface-variant">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── KONTAKT ───────────────────────────────────────── */}
        <section id="kontakt" className="fade-hidden">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-5">Kontakt</h2>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">Hlavný kontakt</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                <Icon name="person" className="text-white text-[20px]" />
              </div>
              <div>
                <div className="font-semibold text-white">Marek</div>
                <a href="tel:0915991413" className="text-sm text-slate-400 hover:text-pink-400 transition-colors">0915 991 413</a>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: 'restaurant',    label: 'Obed a večera',        value: 'Olym-Pic · poz. 7'           },
                { icon: 'sports',        label: 'Hlavná šport. plocha', value: 'Pozícia 29'                  },
                { icon: 'local_parking', label: 'Parkovanie',           value: 'v areáli x-bionic® sphere'   },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5">
                  <Icon name={item.icon} className="text-[20px] text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                    <div className="text-sm font-medium text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
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
