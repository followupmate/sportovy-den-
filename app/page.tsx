'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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

const quickNav = [
  { label: 'Program',    href: '#program',    icon: '📅' },
  { label: 'Mapa',       href: '#mapa',       icon: '🗺️' },
  { label: 'Disciplíny', href: '#discipliny', icon: '🎯' },
  { label: 'Turnaje',    href: '#turnaje',    icon: '🏆' },
  { label: 'Wellness',   href: '#wellness',   icon: '💆' },
  { label: 'Kontakt',    href: '#kontakt',    icon: '📞' },
];

export default function Page() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">

      {/* ── STICKY NAVBAR ────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2.5">
          <a href="#" className="flex items-center gap-2">
            <ITrophy c="h-5 w-5 text-brand" />
            <span className="text-sm font-bold text-brand-dark">Športový deň <span className="text-xs font-normal text-slate-400">2026</span></span>
          </a>
          <div className="hidden md:flex items-center gap-3 text-xs font-medium text-slate-600">
            <a href="#program" className="hover:text-brand">Program</a>
            <a href="#mapa" className="hover:text-brand">Mapa</a>
            <a href="#discipliny" className="hover:text-brand">Disciplíny</a>
            <a href="#wellness" className="hover:text-brand">Wellness</a>
            <a href="#prakticke-info" className="hover:text-brand">Info</a>
            <a href="#kontakt" className="hover:text-brand">Kontakt</a>
          </div>
        </div>
      </nav>

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

      <div className="mx-auto max-w-md space-y-16 px-4 py-6">

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

        {/* ── PROGRAM TIMELINE ──────────────────────────────── */}
        <section id="program">
          <h2 className="mb-3 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Program</h2>

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
                return (
                  <div key={idx} className="flex gap-3">
                    <div className={`relative z-10 mt-[14px] h-3 w-3 shrink-0 -translate-x-[3px] rounded-full ring-2 ring-white ${cfg.dot}`} />
                    <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400">{block.time}</div>
                          <div className="mt-0.5 text-sm font-semibold text-slate-900">{block.title}</div>
                          {block.location && (
                            <div className="mt-0.5 text-xs text-slate-500">📍 {block.location}</div>
                          )}
                        </div>
                        <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.cls}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── MAPA ──────────────────────────────────────────── */}
        <section id="mapa">
          <h2 className="mb-3 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Mapa areálu</h2>

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
            <Image
              src="/mapa-xbionic.jpg"
              alt="Mapa areálu x-bionic sphere"
              width={1536}
              height={1314}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        {/* ── DISCIPLÍNY ────────────────────────────────────── */}
        <section id="discipliny">
          <h2 className="mb-1 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Športové disciplíny</h2>
          <p className="mb-4 text-sm text-slate-500">Individuálne disciplíny — každý hráč, vlastný výkon.</p>

          <div className="space-y-3">
            {disciplines.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  <div className="flex shrink-0 flex-wrap justify-end gap-1">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {item.badge}
                    </span>
                    {item.pending && (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                        Čaká na potvrdenie
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                <ul className="mt-3 space-y-1">
                  {item.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0 text-slate-300">›</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── TURNAJE ───────────────────────────────────────── */}
        <section id="turnaje">
          <h2 className="mb-1 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Turnaje</h2>
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
        <section id="wellness">
          <h2 className="mb-3 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Wellness & relax</h2>
          <div className="space-y-2">
            {[
              { icon: '💧', title: 'Bazény & Wellness', text: 'Dostupné počas poobedného bloku (17:00–19:30). Pozície 11–14 na mape.' },
              { icon: '💪', title: 'Gym',               text: 'Fitness centrum pre individuálny tréning. Pozícia 5 na mape.'          },
              { icon: '🍽️', title: 'Olym-Pic',          text: 'Reštaurácia — obedy a večera. Pozícia 7 na mape.'                     },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-slate-900 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <span className="text-xl">{item.icon}</span>
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
        <section id="prakticke-info">
          <h2 className="mb-3 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Praktické info</h2>

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
        <section id="kontakt">
          <h2 className="mb-3 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">Kontakt</h2>
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Hlavný kontakt
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
                👤
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
                <span className="text-base">🍽️</span>
                <div>
                  <div className="text-xs text-slate-400">Obed a večera</div>
                  <div className="text-sm font-medium">Olym-Pic · poz. 7</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <span className="text-base">🏃</span>
                <div>
                  <div className="text-xs text-slate-400">Hlavná šport. plocha</div>
                  <div className="text-sm font-medium">Pozícia 29</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <span className="text-base">🚗</span>
                <div>
                  <div className="text-xs text-slate-400">Parkovanie</div>
                  <div className="text-sm font-medium">v areáli x-bionic® sphere</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-2 text-center text-xs text-slate-400">
          Športový deň 2026 · Tribe Home Experience
        </footer>
      </div>

      {/* ── STICKY BOTTOM BAR ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md">
          <a
            href="#program"
            className="flex flex-1 flex-col items-center gap-0.5 py-3 text-slate-600 active:bg-slate-50"
          >
            <span className="text-lg">📅</span>
            <span className="text-[11px] font-medium">Program</span>
          </a>
          <a
            href="#mapa"
            className="flex flex-1 flex-col items-center gap-0.5 py-3 text-slate-600 active:bg-slate-50"
          >
            <span className="text-lg">🗺️</span>
            <span className="text-[11px] font-medium">Mapa</span>
          </a>
          <a
            href="#kontakt"
            className="flex flex-1 flex-col items-center gap-0.5 py-3 text-slate-600 active:bg-slate-50"
          >
            <span className="text-lg">📞</span>
            <span className="text-[11px] font-medium">Kontakt</span>
          </a>
        </div>
      </div>
    </main>
  );
}
