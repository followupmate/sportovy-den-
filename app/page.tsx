import Image from 'next/image';

type ProgramDay = {
  day: string;
  blocks: { time: string; title: string }[];
};

type InfoCard = {
  title: string;
  text: string;
};

const quickInfo = [
  { label: 'Check-in', value: 'od 15:00' },
  { label: 'Check-out', value: '10:00' },
  { label: 'Parkovanie', value: 'v areáli x-bionic® sphere' },
  { label: 'Kontakt', value: '0915 991 413 (Marek)' },
];

const dayBlocks: ProgramDay[] = [
  {
    day: 'Deň 1 · 14.5.2026',
    blocks: [
      { time: '11:00 – 11:30', title: 'Príchod, registrácia / prezenčka' },
      { time: '11:30 – 12:30', title: 'Privítanie + obed (Olym-Pic)' },
      { time: '13:00 – 17:00', title: 'Športový program' },
      { time: '17:00 – 19:30', title: 'Wellness / bazén / gym' },
      { time: '19:30 – 21:00', title: 'Večera (Olym-Pic)' },
      { time: '21:00 – 02:00', title: 'Voľný večerný program' },
    ],
  },
  {
    day: 'Deň 2 · 15.5.2026',
    blocks: [
      { time: '09:00 – 12:00', title: 'Spoločná aktivita: bicykel / beh / prechádzka (Danubiana)' },
      { time: '12:00 – 13:00', title: 'Obed (individuálny, Olym-Pic)' },
    ],
  },
];

const disciplines = [
  {
    name: 'Lukostreľba',
    description: 'Individuálna disciplína zameraná na presnosť.',
    rules: ['Krátka inštruktáž pred začiatkom.', 'Každý má určený počet pokusov.', 'Dodržiavať pokyny obsluhy.'],
  },
  {
    name: 'Streľba zo vzduchovky',
    description: 'Presnostná disciplína pre jednotlivcov.',
    rules: ['Bezpečnosť je priorita.', 'Počíta sa výsledný zásah alebo súčet bodov.', 'Poradie určuje obsluha stanovišťa.'],
  },
  {
    name: 'Airsoft strelnica',
    description: 'Zábavná strelecká aktivita v kontrolovanom priestore.',
    rules: ['Použiť ochranné pomôcky podľa pokynov.', 'Strieľa sa len na určený cieľ.', 'Riadi sa pokynmi obsluhy.'],
  },
  {
    name: 'Penalty',
    description: 'Futbalová disciplína na presnosť zakončenia.',
    rules: ['Každý má určený počet pokusov.', 'Počíta sa počet úspešných zásahov.', 'Nasleduje sa podľa poradia na stanovišti.'],
  },
  {
    name: 'Hod oštepom',
    description: 'Silovo-technická disciplína v outdoor priestore.',
    rules: ['Počíta sa najlepší pokus.', 'Vstup do sektora len na pokyn obsluhy.', 'Dodržiavať bezpečnostné rozostupy.'],
  },
  {
    name: 'Discgolf',
    description: 'Voľnejšia individuálna disciplína s dôrazom na presnosť hodu.',
    rules: ['Formát doplniť po potvrdení agentúrou.', 'Počet pokusov doplniť neskôr.', 'Držať pravidlá stručné.'],
  },
];

const tournaments = [
  {
    name: 'Futbal',
    description: 'Tímový turnaj organizovaný agentúrou.',
    note: 'Presný rozpis, nasadenie a výsledky budú riešené na mieste agentúrou.',
  },
  {
    name: 'Volejbal',
    description: 'Tímový turnaj organizovaný agentúrou.',
    note: 'Poznámka z podkladov: prosíme natiahnuť sieť.',
  },
  {
    name: 'Streetball',
    description: 'Tímový turnaj organizovaný agentúrou.',
    note: 'Presný rozpis a výsledky sledovať priamo na mieste.',
  },
];

const teamTasks = [
  { name: 'Bludisko', description: 'Spoločná tímová úloha.' },
  { name: 'Lyže pre piatich', description: 'Koordinačná aktivita vyžadujúca spoluprácu.' },
  { name: 'Letné sane', description: 'Zábavná tímová úloha s pohybovým prvkom.' },
  { name: 'Amazonka', description: 'Spoločná aktivita / výzva pre tímy.' },
];

const wellnessInfo: InfoCard[] = [
  {
    title: 'Wellness a bazény',
    text: 'Počas poobedného bloku je možné využiť bazény a wellness. Na oficiálnej mape ide o pozície 11–14.',
  },
  {
    title: 'Gym',
    text: 'Fitness centrum je dostupné pre individuálny tréning. Na mape je označené ako pozícia 5.',
  },
  {
    title: 'Olym-Pic',
    text: 'Obedy a večera prebiehajú v reštaurácii Olym-Pic. Na mape je označená ako pozícia 7.',
  },
];

const infoCards: InfoCard[] = [
  {
    title: 'Primárna športová zóna',
    text: 'Hlavné miesto eventu je pri pozícii 29 a na zelenej ploche za ňou.',
  },
  {
    title: 'Rozmiestnenie disciplín',
    text: 'Presné rozloženie jednotlivých športových stanovíšť bude doplnené po potvrdení od agentúry.',
  },
  {
    title: 'Turnaje a organizácia',
    text: 'Turnajovú časť zabezpečuje externá agentúra. Tento web slúži najmä na orientáciu a základné informácie.',
  },
  {
    title: 'Čo si priniesť',
    text: 'Športové oblečenie, vhodnú obuv, veci do bazéna alebo wellness a oblečenie na večerný program.',
  },
];

const contacts = [
  { role: 'Hlavný kontakt', value: 'Marek · 0915 991 413' },
  { role: 'Miesto obeda a večere', value: 'Olym-Pic · pozícia 7 na mape' },
  { role: 'Hlavná športová plocha', value: 'Pozícia 29 + zelená plocha za ňou' },
];

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-md px-4 py-6">
        <header className="mb-6 rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Firemný event</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">Športový deň 2026 | Tribe Home Experience</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Prehľad programu, športových aktivít a orientácie počas dvojdňového firemného eventu v x-bionic® sphere.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 p-3">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Miesto</div>
              <div className="mt-1 font-medium">x-bionic® sphere, Šamorín</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Termín</div>
              <div className="mt-1 font-medium">14.5.2026 – 15.5.2026</div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-3">
          {quickInfo.map((item) => (
            <Card key={item.label}>
              <div className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</div>
              <div className="mt-1 text-sm font-medium text-slate-900">{item.value}</div>
            </Card>
          ))}
        </section>

        <section className="mb-8">
          <SectionTitle title="Program" description="Presný harmonogram podľa aktuálne potvrdených informácií." />
          <div className="space-y-4">
            {dayBlocks.map((day) => (
              <Card key={day.day}>
                <h3 className="mb-3 text-base font-semibold text-slate-900">{day.day}</h3>
                <div className="space-y-2">
                  {day.blocks.map((block) => (
                    <div key={`${block.time}-${block.title}`} className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                      <div className="min-w-[92px] shrink-0 text-slate-500">{block.time}</div>
                      <div className="text-right text-slate-800">{block.title}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle title="Mapa areálu" description="Oficiálna mapa x-bionic® sphere pre lepšiu orientáciu." />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/mapa-xbionic.jpg"
              alt="Mapa areálu x-bionic sphere"
              width={1536}
              height={1314}
              className="h-auto w-full"
              priority
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Kľúčové body: hlavná športová zóna 29 • Olym-Pic 7 • Gym 5 • Wellness a bazény 11–14
          </p>
        </section>

        <section className="mb-8">
          <SectionTitle title="Športové disciplíny" description="Zoznam plánovaných individuálnych disciplín." />
          <div className="space-y-4">
            {disciplines.map((item) => (
              <Card key={item.name}>
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {item.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle title="Turnaje" description="Tímové turnaje zabezpečuje agentúra priamo na mieste." />
          <div className="space-y-4">
            {tournaments.map((item) => (
              <Card key={item.name}>
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.note}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle title="Tímové úlohy" description="Spoločné aktivity zamerané na koordináciu a spoluprácu tímov." />
          <div className="grid grid-cols-2 gap-3">
            {teamTasks.map((item) => (
              <Card key={item.name}>
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle title="Wellness & relax" description="Stručný prehľad možností počas poobedného bloku." />
          <div className="space-y-4">
            {wellnessInfo.map((item) => (
              <Card key={item.title} className="bg-slate-900 text-white border-slate-800">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle title="Info" description="Organizačné a praktické informácie k eventu." />
          <div className="space-y-4">
            {infoCards.map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle title="Kontakty" />
          <div className="space-y-4">
            {contacts.map((item) => (
              <Card key={item.role}>
                <div className="text-sm text-slate-500">{item.role}</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{item.value}</div>
              </Card>
            ))}
          </div>
        </section>

        <footer className="pt-2 text-center text-xs text-slate-400">Športový deň 2026 · Tribe Home Experience</footer>
      </div>
    </main>
  );
}
