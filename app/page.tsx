'use client';

import Image from 'next/image';
import { useState } from 'react';

type BlockType = 'sport' | 'food' | 'wellness' | 'free' | 'info';

const blockTypeConfig: Record<BlockType, { label: string; cls: string; dot: string }> = {
  sport:    { label: 'Šport',      cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400' },
  food:     { label: 'Jedlo',      cls: 'bg-orange-100 text-orange-700',   dot: 'bg-orange-400'  },
  wellness: { label: 'Wellness',   cls: 'bg-sky-100 text-sky-700',         dot: 'bg-sky-400'     },
  free:     { label: 'Voľný čas', cls: 'bg-violet-100 text-violet-700',   dot: 'bg-violet-400'  },
  info:     { label: 'Príchod',   cls: 'bg-slate-100 text-slate-500',     dot: 'bg-slate-400'   },
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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="bg-slate-900 px-4 pt-8 pb-6 text-white">
        <div className="mx-auto max-w-md">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Firemný event</div>
          <h1 className="mt-1.5 text-2xl font-bold leading-tight">Športový deň 2026</h1>
          <p className="mt-1 text-sm leading-5 text-slate-300">
            Tribe Home Experience · x-bionic® sphere, Šamorín · 14–15. 5. 2026
          </p>

          {/* CTA buttons */}
          <div className="mt-4 flex gap-2">
            <a
              href="#program"
              className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-center text-sm font-semibold text-white"
            >
              Program
            </a>
            <a
              href="#mapa"
              className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-sm font-semibold text-white"
            >
              Mapa
            </a>
            <a
              href="#kontakt"
              className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-sm font-semibold text-white"
            >
              Kontakt
            </a>
          </div>

          {/* 4 info cards */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: 'Miesto',    value: 'x-bionic® sphere',  sub: 'Šamorín'       },
              { label: 'Termín',    value: '14. – 15. 5. 2026', sub: '2 dni'         },
              { label: 'Check-in',  value: 'od 15:00',          sub: 'Check-out 10:00' },
              { label: 'Parkovanie', value: 'v areáli',         sub: 'x-bionic® sphere' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{item.label}</div>
                <div className="mt-1 text-sm font-semibold leading-5">{item.value}</div>
                <div className="text-xs text-slate-400">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md space-y-8 px-4 py-6">

        {/* ── QUICK NAV ─────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-3 gap-2">
            {quickNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white py-3 px-2 text-center shadow-sm active:bg-slate-50"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium text-slate-700">{item.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── PROGRAM TIMELINE ──────────────────────────────── */}
        <section id="program">
          <h2 className="mb-3 text-lg font-bold text-slate-900">Program</h2>

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
          <h2 className="mb-3 text-lg font-bold text-slate-900">Mapa areálu</h2>

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
          <h2 className="mb-1 text-lg font-bold text-slate-900">Športové disciplíny</h2>
          <p className="mb-4 text-sm text-slate-500">Individuálne disciplíny — každý hráč, vlastný výkon.</p>

          <div className="space-y-3">
            {disciplines.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  <div className="flex shrink-0 flex-wrap justify-end gap-1">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {item.badge}
                    </span>
                    {item.pending && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
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
          <h2 className="mb-1 text-lg font-bold text-slate-900">Turnaje</h2>
          <p className="mb-4 text-sm text-slate-500">Tímové turnaje organizuje agentúra priamo na mieste.</p>

          <div className="space-y-3">
            {tournaments.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  {item.pending && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
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
          <h2 className="mb-3 text-lg font-bold text-slate-900">Wellness & relax</h2>
          <div className="space-y-2">
            {[
              { icon: '💧', title: 'Bazény & Wellness', text: 'Dostupné počas poobedného bloku (17:00–19:30). Pozície 11–14 na mape.' },
              { icon: '💪', title: 'Gym',               text: 'Fitness centrum pre individuálny tréning. Pozícia 5 na mape.'          },
              { icon: '🍽️', title: 'Olym-Pic',          text: 'Reštaurácia — obedy a večera. Pozícia 7 na mape.'                     },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-slate-900 p-4">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-5 text-slate-300">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRAKTICKÉ INFO ────────────────────────────────── */}
        <section id="info">
          <h2 className="mb-3 text-lg font-bold text-slate-900">Praktické info</h2>

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
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
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
          <h2 className="mb-3 text-lg font-bold text-slate-900">Kontakt</h2>
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
