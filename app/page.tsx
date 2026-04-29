'use client';

import { useState, useEffect } from 'react';

const Icon = ({ name, className }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined select-none leading-none ${className ?? ''}`}>{name}</span>
);

const Svg = ({ c, children }: { c?: string; children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={c ?? 'h-5 w-5'} aria-hidden="true">
    {children}
  </svg>
);
const ICalendar = ({ c }: { c?: string }) => <Svg c={c}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Svg>;
const IMap      = ({ c }: { c?: string }) => <Svg c={c}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></Svg>;
const ITarget   = ({ c }: { c?: string }) => <Svg c={c}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Svg>;
const ITrophy   = ({ c }: { c?: string }) => <Svg c={c}><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h1"/><path d="M17 4h3a2 2 0 0 1 2 2v1a5 5 0 0 1-5 5h-1"/><rect x="7" y="2" width="10" height="9" rx="1"/></Svg>;
const IHeart    = ({ c }: { c?: string }) => <Svg c={c}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Svg>;
const IPhone    = ({ c }: { c?: string }) => <Svg c={c}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></Svg>;
const IWaves    = ({ c }: { c?: string }) => <Svg c={c}><path d="M2 12h2a2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 0 2 2"/><path d="M2 6h2a2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 0 2 2"/></Svg>;
const IDumbbell = ({ c }: { c?: string }) => <Svg c={c}><path d="M6 5v14"/><path d="M18 5v14"/><path d="M2 9v6"/><path d="M22 9v6"/><rect x="4" y="7" width="4" height="10" rx="1"/><rect x="16" y="7" width="4" height="10" rx="1"/><line x1="6" y1="12" x2="18" y2="12"/></Svg>;
const IUtensils = ({ c }: { c?: string }) => <Svg c={c}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/></Svg>;
const IMapPin   = ({ c }: { c?: string }) => <Svg c={c}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Svg>;
const IUser     = ({ c }: { c?: string }) => <Svg c={c}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;
const ICar      = ({ c }: { c?: string }) => <Svg c={c}><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Svg>;
const IActivity = ({ c }: { c?: string }) => <Svg c={c}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Svg>;
const IDownload = ({ c }: { c?: string }) => <Svg c={c}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>;

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

const blockTypeConfig: Record<BlockType, { label: string; cls: string; dot: string; leftBorder: string }> = {
  sport:    { label: 'Šport',      cls: 'bg-blue-100 text-blue-700',       dot: 'bg-blue-400',    leftBorder: 'border-l-blue-400'    },
  food:     { label: 'Jedlo',      cls: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400',   leftBorder: 'border-l-amber-400'   },
  wellness: { label: 'Wellness',   cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400', leftBorder: 'border-l-emerald-400' },
  free:     { label: 'Voľný čas', cls: 'bg-slate-100 text-slate-500',     dot: 'bg-slate-400',   leftBorder: 'border-l-slate-300'   },
  info:     { label: 'Príchod',   cls: 'bg-slate-100 text-slate-500',     dot: 'bg-slate-400',   leftBorder: 'border-l-slate-300'   },
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
      { time: '21:00 – 02:00', title: 'Voľný večerný program',      type: 'free'     as BlockType                                 },
    ],
  },
  {
    day: 'Deň 2',
    date: '15.5.',
    blocks: [
      { time: '09:00 – 12:00', title: 'Bicykel / beh / prechádzka', type: 'sport' as BlockType, location: 'Danubiana' },
      { time: '12:00 – 13:00', title: 'Obed (individuálny)',         type: 'food'  as BlockType, location: 'Olym-Pic'  },
    ],
  },
];

const disciplines = [
  {
    name: 'Lukostreľba',
    description: 'Individuálna disciplína zameraná na presnosť.',
    rules: ['Krátka inštruktáž pred začiatkom.', 'Každý má určený počet pokusov.', 'Dodržiavať pokyny obsluhy.'],
    badge: 'Presnosť',
  },
  {
    name: 'Streľba zo vzduchovky',
    description: 'Presnostná disciplína pre jednotlivcov.',
    rules: ['Bezpečnosť je priorita.', 'Počíta sa výsledný zásah alebo súčet bodov.', 'Poradie určuje obsluha stanovišťa.'],
    badge: 'Presnosť',
  },
  {
    name: 'Airsoft strelnica',
    description: 'Zábavná strelecká aktivita v kontrolovanom priestore.',
    rules: ['Použiť ochranné pomôcky podľa pokynov.', 'Strieľa sa len na určený cieľ.', 'Riadi sa pokynmi obsluhy.'],
    badge: 'Outdoor',
  },
  {
    name: 'Penalty',
    description: 'Futbalová disciplína na presnosť zakončenia.',
    rules: ['Každý má určený počet pokusov.', 'Počíta sa počet úspešných zásahov.', 'Nasleduje sa podľa poradia na stanovišti.'],
    badge: 'Presnosť',
  },
  {
    name: 'Hod oštepom',
    description: 'Silovo-technická disciplína v outdoor priestore.',
    rules: ['Počíta sa najlepší pokus.', 'Vstup do sektora len na pokyn obsluhy.', 'Dodržiavať bezpečnostné rozostupy.'],
    badge: 'Sila',
  },
  {
    name: 'Discgolf',
    description: 'Voľnejšia individuálna disciplína s dôrazom na presnosť hodu.',
    rules: ['Formát doplniť po potvrdení agentúrou.', 'Počet pokusov doplniť neskôr.'],
    badge: 'Outdoor',
    pending: true,
  },
];

const tournaments = [
  { name: 'Futbal',     note: 'Presný rozpis a nasadenie budú riešené na mieste agentúrou.', pending: true },
  { name: 'Volejbal',   note: 'Poznámka: prosíme natiahnuť sieť.',                           pending: true },
  { name: 'Streetball', note: 'Presný rozpis a výsledky sledovať priamo na mieste.',         pending: true },
];

const teamTasks = [
  { name: 'Bludisko',        description: 'Spoločná tímová úloha.'                            },
  { name: 'Lyže pre piatich', description: 'Koordinačná aktivita vyžadujúca spoluprácu.'     },
  { name: 'Letné sane',      description: 'Zábavná tímová úloha s pohybovým prvkom.'         },
  { name: 'Amazonka',        description: 'Spoločná aktivita / výzva pre tímy.'               },
];

const mapPoints = [
  { label: 'Šport. zóna', number: '29' },
  { label: 'Olym-Pic',    number: '7'  },
  { label: 'Gym',         number: '5'  },
  { label: 'Wellness',    number: '11–14' },
];

const navItems = [
  { label: 'Program',    href: '#program',    icon: 'calendar_today' },
  { label: 'Mapa',       href: '#mapa',       icon: 'map'            },
  { label: 'Disciplíny', href: '#discipliny', icon: 'sports_kabaddi' },
  { label: 'Turnaje',    href: '#turnaje',    icon: 'emoji_events'   },
  { label: 'Wellness',   href: '#wellness',   icon: 'spa'            },
];

export default function Page() {
  const [activeDay, setActiveDay] = useState(0);
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [discFilter, setDiscFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('program');

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
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-white/20">
            <Icon name="person" className="text-[20px] text-white" />
          </div>
          <span className="text-sm font-bold text-slate-400">Tribe Member</span>
        </div>
        <h1 className="text-base font-extrabold tracking-tighter text-slate-50 uppercase">Športový deň 2026</h1>
        <button className="text-slate-400 hover:bg-white/5 transition-colors p-2 rounded-full">
          <Icon name="menu" />
        </button>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="bg-brand-dark px-4 pt-8 pb-7 text-white">
        <div className="mx-auto max-w-md">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Tribe Home Experience
          </div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">Športový deň 2026</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              📅 14–15. mája 2026
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              📍 x-bionic® sphere, Šamorín
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              👥 101 účastníkov
            </span>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-28 px-5 max-w-md mx-auto space-y-10">

        {/* ── NAV CARDS ─────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📅', circleBg: '#e0faf5', title: 'Program',  sub: 'Časový harmonogram',   href: '#program'        },
              { icon: '🏆', circleBg: '#e8eaf6', title: 'Aktivity', sub: 'Disciplíny a turnaje',  href: '#discipliny'     },
              { icon: '📍', circleBg: '#fff3e0', title: 'Kde',      sub: 'Mapa a miesta',         href: '#mapa'           },
              { icon: '🎒', circleBg: '#fce4ec', title: 'Info',     sub: 'Čo si priniesť',        href: '#prakticke-info' },
            ].map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] active:scale-[0.98]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full text-2xl" style={{ background: card.circleBg }}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900">{card.title}</div>
                  <div className="mt-0.5 text-xs" style={{ color: '#7a8499' }}>{card.sub}</div>
                </div>
              </a>
            ))}
            {/* Card 5: Tímy — full width, disabled */}
            <div className="col-span-2 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)] opacity-70">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl" style={{ background: '#e8f5e9' }}>
                👥
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-slate-900">Tímy</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    Čoskoro k dispozícii
                  </span>
                </div>
                <div className="mt-0.5 text-xs" style={{ color: '#7a8499' }}>Zoznam účastníkov a tímy</div>
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
                <div className="rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/5 to-brand/10 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">Do štartu eventu</span>
                  </div>
                  <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                    {[{ v: d, l: 'dní' }, { v: h, l: 'hodín' }, { v: m, l: 'minút' }].map(({ v, l }) => (
                      <div key={l} className="rounded-xl bg-white/80 py-2">
                        <div className="text-2xl font-bold text-brand-dark">{String(v).padStart(2, '0')}</div>
                        <div className="text-[10px] text-slate-500">{l}</div>
                      </div>
                    ))}
                  </div>
                  <a href={icsDataUri} download="sportovy-den-2026.ics"
                    className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90">
                    <IDownload c="h-4 w-4" />
                    Pridať do kalendára
                  </a>
                </div>
              );
            })()}

            {liveStatus.phase === 'active' && (() => {
              const cur = dayBlocks[liveStatus.dayIndex].blocks[liveStatus.blockIndex];
              const next = dayBlocks[liveStatus.dayIndex].blocks[liveStatus.blockIndex + 1];
              const later = dayBlocks[liveStatus.dayIndex].blocks[liveStatus.blockIndex + 2];
              return (
                <div className="rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">Práve teraz</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 rounded-xl bg-brand/5 p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand">Teraz</div>
                      <div className="mt-1 text-sm font-semibold text-brand-dark">{cur.title}</div>
                      <div className="mt-0.5 text-xs text-slate-500">{cur.time}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {next && (
                        <div className="rounded-xl bg-slate-50 p-2">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Nasleduje</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-700 leading-tight">{next.title}</div>
                        </div>
                      )}
                      {later && (
                        <div className="rounded-xl bg-slate-50 p-2 opacity-60">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Neskôr</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-600 leading-tight">{later.title}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {liveStatus.phase === 'ended' && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-500">
                Event sa skončil — ďakujeme za účasť! 🎉
              </div>
            )}
          </section>
        )}

        {/* ── PROGRAM TIMELINE ──────────────────────────────── */}
        <section id="program" className="fade-hidden">
          <h2 className="mb-3 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Program</h2>

          {/* Day tabs */}
          <div className="mb-4 flex rounded-xl bg-slate-200 p-1">
            {dayBlocks.map((day, i) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(i)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
                  activeDay === i
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <span>{day.day}</span>
                <span className="text-xs opacity-60">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative pl-6">
            <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-slate-200" />
            <div className="space-y-3">
              {dayBlocks[activeDay].blocks.map((block, idx) => {
                const cfg = blockTypeConfig[block.type];
                const isLive = liveStatus?.phase === 'active' && liveStatus.dayIndex === activeDay && liveStatus.blockIndex === idx;
                return (
                  <div key={idx} className="flex gap-3">
                    <div className={`relative z-10 mt-[14px] h-3 w-3 shrink-0 -translate-x-[3px] rounded-full ring-2 ring-white ${cfg.dot}`} />
                    <div className={`flex-1 rounded-2xl border-l-4 border bg-white p-3 shadow-sm transition-all ${cfg.leftBorder} ${isLive ? 'border-brand/40 ring-2 ring-brand/20' : 'border-slate-200'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400">{block.time}</div>
                          <div className="mt-0.5 text-sm font-semibold text-slate-900">{block.title}</div>
                          {block.location && (
                            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                              <IMapPin c="h-3 w-3 text-slate-400" />{block.location}
                            </div>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cfg.cls}`}>{cfg.label}</span>
                          {isLive && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-brand">
                              <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" /></span>
                              Teraz
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── MAPA ──────────────────────────────────────────── */}
        <section id="mapa" className="fade-hidden">
          <h2 className="mb-3 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Mapa areálu</h2>

          {/* Key points – horizontal scroll */}
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {mapPoints.map((pt) => (
              <div
                key={pt.label}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {pt.number.length <= 2 ? pt.number : '·'}
                </span>
                <span className="text-xs font-medium text-slate-700">{pt.label}</span>
                {pt.number.length > 2 && (
                  <span className="text-xs text-slate-500">({pt.number})</span>
                )}
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="x-bionic® sphere mapa"
              className="w-full"
              height={280}
              src="https://maps.google.com/maps?q=x-bionic+sphere+Samorin+Slovakia&output=embed"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </section>

        {/* ── DISCIPLÍNY ────────────────────────────────────── */}
        <section id="discipliny" className="fade-hidden">
          <h2 className="mb-1 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Športové disciplíny</h2>
          <p className="mb-4 text-sm text-slate-500">Individuálne disciplíny — každý hráč, vlastný výkon.</p>

          <div className="mb-3 flex flex-wrap gap-2">
            {['all', 'Presnosť', 'Outdoor', 'Sila'].map((f) => (
              <button key={f} onClick={() => setDiscFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${discFilter === f ? 'bg-brand text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-brand/40'}`}>
                {f === 'all' ? 'Všetky' : f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {disciplines.filter((d) => discFilter === 'all' || d.badge === discFilter).map((item) => (
              <div key={item.name} className="self-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  <div className="flex shrink-0 flex-wrap justify-end gap-1">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">{item.badge}</span>
                    {item.pending && (
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                        Čaká
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                <ul className="mt-3 space-y-1">
                  {item.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0 text-slate-300">›</span>{rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── TURNAJE ───────────────────────────────────────── */}
        <section id="turnaje" className="fade-hidden">
          <h2 className="mb-1 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Turnaje</h2>
          <p className="mb-4 text-sm text-slate-500">Tímové turnaje organizuje agentúra priamo na mieste.</p>

          <div className="space-y-3">
            {tournaments.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  {item.pending && (
                    <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                      Čaká na potvrdenie
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-slate-500 italic">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Team tasks */}
          <h3 className="mb-3 mt-6 text-base font-semibold text-slate-900">Tímové úlohy</h3>
          <div className="grid grid-cols-2 gap-3">
            {teamTasks.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
                <p className="mt-1 text-xs text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WELLNESS ──────────────────────────────────────── */}
        <section id="wellness" className="fade-hidden">
          <h2 className="mb-3 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Wellness & relax</h2>
          <div className="space-y-2">
            {[
              { icon: <IWaves c="h-5 w-5 text-blue-500" />,    title: 'Bazény & Wellness', text: 'Dostupné počas poobedného bloku (17:00–19:30). Pozície 11–14 na mape.' },
              { icon: <IDumbbell c="h-5 w-5 text-violet-500" />, title: 'Gym',              text: 'Fitness centrum pre individuálny tréning. Pozícia 5 na mape.'          },
              { icon: <IUtensils c="h-5 w-5 text-amber-500" />,  title: 'Olym-Pic',         text: 'Reštaurácia — obedy a večera. Pozícia 7 na mape.'                     },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-slate-900 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-5 text-slate-300">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRAKTICKÉ INFO ────────────────────────────────── */}
        <section id="prakticke-info" className="fade-hidden">
          <h2 className="mb-3 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Praktické info</h2>

          {/* What to bring – highlighted box */}
          <div className="mb-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="text-sm font-semibold text-emerald-900">Čo si priniesť</h3>
            <ul className="mt-2 space-y-1.5">
              {[
                'Športové oblečenie a vhodná obuv',
                'Veci do bazéna / wellness',
                'Oblečenie na večerný program',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-emerald-800">
                  <span className="text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Primárna športová zóna', text: 'Pozícia 29 a zelená plocha za ňou.' },
              { title: 'Rozmiestnenie disciplín', text: 'Presné rozloženie disciplín bude doplnené po potvrdení od agentúry.', pending: true },
              { title: 'Turnaje a organizácia',   text: 'Turnajovú časť zabezpečuje externá agentúra. Web slúži na orientáciu.', pending: true },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  {item.pending && (
                    <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                      Čaká na potvrdenie
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── KONTAKT ───────────────────────────────────────── */}
        <section id="kontakt" className="fade-hidden">
          <h2 className="mb-3 border-l-4 border-brand pl-3 text-2xl font-bold text-brand-dark">Kontakt</h2>
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Hlavný kontakt
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <IUser c="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Marek</div>
                <a href="tel:0915991413" className="text-sm text-slate-300">
                  0915 991 413
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <IUtensils c="h-4 w-4 text-slate-300" />
                <div>
                  <div className="text-xs text-slate-400">Obed a večera</div>
                  <div className="text-sm font-medium">Olym-Pic · poz. 7</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <IActivity c="h-4 w-4 text-slate-300" />
                <div>
                  <div className="text-xs text-slate-400">Hlavná šport. plocha</div>
                  <div className="text-sm font-medium">Pozícia 29</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <ICar c="h-4 w-4 text-slate-300" />
                <div>
                  <div className="text-xs text-slate-400">Parkovanie</div>
                  <div className="text-sm font-medium">v areáli x-bionic® sphere</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-2 text-center text-xs text-slate-600">
          Športový deň 2026 · Tribe Home Experience
        </footer>
      </main>

      {/* ── BOTTOM NAV ────────────────────────────────────── */}
      <nav className="fixed bottom-0 w-full rounded-t-2xl z-50 bg-slate-950/85 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-2 pb-safe">
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
