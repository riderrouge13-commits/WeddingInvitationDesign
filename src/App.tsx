import { useState, useEffect, useRef, type ReactNode } from 'react'

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = {
  primaryColor: '#7D0A26',
  secondaryColor: '#5C0719',
  deepColor: '#3E0510',
  accentColor: '#C9A227',
  accentLight: '#E8C97A',
  accentPale: '#F5E9C0',
  pineColor: '#1B4332',
  pineLight: '#2D6A4F',
  cream: '#FDF8F0',
  coupleA: 'Stella-Maris',
  coupleALast: 'Alegimenlen',
  coupleAScript: 'Ivie',
  coupleB: 'Success',
  coupleBLast: 'Ugiagbe',
  coupleBScript: 'Ogie',
  monogram: 'OI',
  hashtag: '#IvieAndOgie2026',
  weddingDate: new Date('2026-10-03T10:00:00'),
  dateDisplay: 'Saturday, October 3rd, 2026',
  dateShort: 'OCT 03, 2026',
  time: '10:00 AM',
  ceremonyVenue: "St Albert's Catholic Church, University of Benin / UBTH Ugbowo",
  ceremonyCity: 'Benin City, Edo State',
  receptionVenue: 'UYI Grand Marquee GRA',
  receptionCity: 'Benin City, Edo State',
  familyA: {
    title: 'The Alegimenlen Family',
    parent: 'Mr Clement Akhigbe Alegimenlen',
    community: 'Jabge Community',
    lga: 'Etsako-West LGA, Edo State',
  },
  familyB: {
    title: 'The Ugiagbe Family',
    parent: 'Dr Osayande Ugiagbe JP',
    community: 'Isihior Community',
    lga: 'Ovia North East LGA, Edo State',
  },
  rsvpPhone1: '08036969442',
  rsvpPhone2: '08130772993',
  colors: 'Pine Green · Burgundy · Gold',
  bankName: 'First Bank Nigeria',
  accountName: 'Stella-Maris Alegimenlen',
  accountNumber: '3098765432',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function GoldDivider({ className = '' }: { className?: string }) {
  return <div className={`gold-divider my-6 ${className}`} />
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-center font-cinzel tracking-[0.35em] text-xs uppercase mb-2"
       style={{ color: theme.accentColor, fontFamily: "'Cinzel', serif" }}>
      {children}
    </p>
  )
}

function SectionTitle({ children, script = false }: { children: ReactNode; script?: boolean }) {
  if (script) {
    return (
      <h2 className="text-center mb-4" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: theme.accentLight }}>
        {children}
      </h2>
    )
  }
  return (
    <h2 className="text-center mb-4 font-cinzel tracking-widest uppercase"
        style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: theme.accentColor }}>
      {children}
    </h2>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = ['Story', 'Families', 'Venue', 'Schedule', 'Contacts']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Monogram */}
        <a href="#hero" className="flex items-center gap-2 no-underline">
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem', color: theme.accentColor, lineHeight: 1 }}>
            {theme.monogram}
          </span>
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
               className="font-cinzel text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-white no-underline"
               style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
              {l}
            </a>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(v => !v)}>
          {[0,1,2].map(i => (
            <span key={i} className="block w-6 h-0.5 transition-all duration-300"
                  style={{ background: theme.accentColor,
                    transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' : undefined,
                    opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-nav px-6 py-6 flex flex-col gap-4 border-t" style={{ borderColor: 'rgba(201,162,39,0.2)' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
               onClick={() => setMenuOpen(false)}
               className="font-cinzel text-sm tracking-[0.2em] uppercase no-underline"
               style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = theme.weddingDate.getTime() - Date.now()
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex justify-center gap-4 sm:gap-8 mt-8">
      {[['Days', time.days], ['Hours', time.hours], ['Minutes', time.minutes], ['Seconds', time.seconds]].map(([label, val]) => (
        <div key={label as string} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2 mb-2"
               style={{ borderColor: theme.accentColor, background: 'rgba(201,162,39,0.08)' }}>
            <span className="font-cinzel font-bold text-xl sm:text-2xl" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>
              {String(val).padStart(2, '0')}
            </span>
          </div>
          <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden"
             style={{ background: theme.deepColor }}>
      {/* Faceless Nigerian-inspired artwork left half */}
      <div className="absolute inset-0 flex">
        <div className="w-full md:w-2/5 overflow-hidden relative" style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(201,162,39,0.28), transparent 18%), linear-gradient(135deg, #100d10 0%, #3E0510 42%, #1B4332 100%)',
        }}>
          <div className="absolute inset-0 opacity-70" style={{
            backgroundImage: 'linear-gradient(rgba(201,162,39,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          <div className="absolute inset-6 border border-[rgba(201,162,39,0.28)] rounded-sm" />
          <div className="absolute inset-x-10 top-10 bottom-10 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-[rgba(201,162,39,0.28)] bg-[rgba(13,8,10,0.26)] backdrop-blur-[1px]">
              <span className="select-none" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(5rem, 17vw, 12rem)', color: 'rgba(232,201,122,0.85)' }}>OI</span>
            </div>
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(62,5,16,1) 100%)' }} />
        </div>
        <div className="hidden md:block w-3/5" style={{ background: theme.primaryColor }} />
      </div>
      <div className="absolute inset-0 hero-overlay md:hidden" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center min-h-screen py-24">
        {/* Left spacer on desktop */}
        <div className="hidden md:block md:w-2/5" />
        {/* Card content */}
        <div className="w-full md:w-3/5 flex flex-col items-center text-center">
          {/* Monogram */}
          <div className="mb-6 animate-fade-in">
            <span className="gold-text-shimmer" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', lineHeight: 1 }}>
              {theme.monogram}
            </span>
          </div>

          <GoldDivider />

          <div className="animate-fade-up delay-200">
            <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
              The Families Of
            </p>
            <p className="font-cinzel font-semibold text-xs sm:text-sm tracking-wider mb-1 uppercase" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>
              {theme.familyA.parent}
            </p>
            <p className="font-lora text-xs italic mb-2" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.8 }}>
              {theme.familyA.community}, {theme.familyA.lga}
            </p>
            <p className="font-cinzel text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>&amp;</p>
            <p className="font-cinzel font-semibold text-xs sm:text-sm tracking-wider mt-2 mb-1 uppercase" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>
              {theme.familyB.parent}
            </p>
            <p className="font-lora text-xs italic" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.8 }}>
              {theme.familyB.community}, {theme.familyB.lga}
            </p>
          </div>

          <GoldDivider />

          <div className="animate-fade-up delay-300">
            <p className="font-cinzel tracking-[0.3em] text-xs uppercase mb-6" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
              Invite You To The Solemnization Of The Holy Matrimony Between Their Children
            </p>
          </div>

          {/* Couple names */}
          <div className="animate-fade-up delay-400 w-full">
            <div className="flex flex-col items-center gap-0">
              <span className="gold-text-shimmer" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3rem, 9vw, 6rem)', lineHeight: 1.1 }}>
                {theme.coupleAScript}
              </span>
              <p className="font-lora italic text-xs tracking-widest" style={{ fontFamily: "'Lora', serif", color: theme.accentColor }}>
                {theme.coupleA} {theme.coupleALast}
              </p>
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: theme.accentColor, lineHeight: 1.5 }}>&amp;</span>
              <span className="gold-text-shimmer" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3rem, 9vw, 6rem)', lineHeight: 1.1 }}>
                {theme.coupleBScript}
              </span>
              <p className="font-lora italic text-xs tracking-widest" style={{ fontFamily: "'Lora', serif", color: theme.accentColor }}>
                {theme.coupleB} {theme.coupleBLast}
              </p>
            </div>
          </div>

          <GoldDivider />

          {/* Date block */}
          <div className="animate-fade-up delay-500 flex items-center justify-center gap-4">
            <div className="font-cinzel text-right" style={{ fontFamily: "'Cinzel', serif" }}>
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: theme.accentColor }}>Saturday</p>
            </div>
            <div className="w-px h-12" style={{ background: theme.accentColor }} />
            <div className="font-cinzel text-center" style={{ fontFamily: "'Cinzel', serif" }}>
              <p className="text-4xl font-bold leading-none" style={{ color: theme.accentLight }}>03</p>
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: theme.accentColor }}>OCT 2026</p>
            </div>
            <div className="w-px h-12" style={{ background: theme.accentColor }} />
            <div className="font-cinzel text-left" style={{ fontFamily: "'Cinzel', serif" }}>
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: theme.accentColor }}>10:00 AM</p>
            </div>
          </div>

          {/* Venue */}
          <div className="animate-fade-up delay-600 mt-4 text-center">
            <p className="font-cinzel text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
              {theme.ceremonyVenue}
            </p>
            <p className="font-lora italic text-xs mt-1" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.75 }}>
              {theme.ceremonyCity}
            </p>
          </div>

          <Countdown />

          {/* Colors */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ background: theme.pineColor }} />
            <div className="w-3 h-3 rounded-full" style={{ background: theme.primaryColor, border: '1px solid rgba(201,162,39,0.5)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: theme.accentColor }} />
            <span className="font-cinzel text-xs tracking-wider ml-1" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
              {theme.colors}
            </span>
          </div>

          <p className="mt-4 font-cinzel text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.6 }}>
            {theme.hashtag}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center pt-1.5" style={{ borderColor: theme.accentColor }}>
          <div className="w-1 h-2 rounded-full" style={{ background: theme.accentColor }} />
        </div>
      </div>
    </section>
  )
}

// ─── Our Story ────────────────────────────────────────────────────────────────
const stories = [
  { num: '01', title: 'How We Met', desc: 'Two souls from different paths crossed in the halls of the University of Benin — a chance meeting that neither of them could have planned, yet felt written in the stars. She smiled first. He never recovered.', art: '❧' },
  { num: '02', title: 'Our Journey', desc: "Through shared laughter, long conversations, and life's quiet seasons, they built something rare — a friendship first, a love story second, and a lifelong partnership that grew stronger with every passing year.", art: '✦' },
  { num: '03', title: 'The Proposal', desc: 'He made his intentions known in the time-honoured way — with prayers, with family, and with a ring that said everything his words could not. She said yes before the question was finished.', art: '◈' },
  { num: '04', title: 'The Engagement', desc: 'Families gathered, prayers were offered, and blessings were given. Two families became one in the warmth of Benin City — a celebration of heritage, love, and the beautiful future ahead.', art: '✝' },
  { num: '05', title: 'Countdown to Forever', desc: 'On October 3rd, 2026, in the presence of God, family and friends, Jvie and Ogie will seal their covenant of love — a promise that begins not at the altar, but in every quiet moment they chose each other.', art: '◎' },
]

function Story() {
  return (
    <section id="story" className="py-24 px-6" style={{ background: theme.deepColor }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionLabel>Chapter by Chapter</SectionLabel>
          <SectionTitle script>Our Story</SectionTitle>
          <GoldDivider className="max-w-xs mx-auto" />
        </Reveal>

        <div className="mt-16 space-y-20">
          {stories.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                <div className="w-full md:w-1/2 overflow-hidden rounded-sm relative" style={{ border: `1px solid rgba(201,162,39,0.25)`, background: 'radial-gradient(circle at 35% 25%, rgba(201,162,39,0.28), transparent 20%), linear-gradient(135deg, rgba(2,8,10,0.95), rgba(62,5,16,0.9), rgba(27,67,50,0.9))', minHeight: '16rem' }}>
                  <div className="absolute inset-4 border border-[rgba(201,162,39,0.3)]" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(4rem, 10vw, 7rem)', color: 'rgba(232,201,122,0.8)' }}>{s.art}</div>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="font-cinzel font-bold text-5xl mb-2" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(201,162,39,0.18)' }}>{s.num}</p>
                  <h3 className="font-cinzel font-semibold tracking-widest uppercase mb-3 text-lg" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
                    {s.title}
                  </h3>
                  <div className="w-8 h-px mb-4" style={{ background: theme.accentColor }} />
                  <p className="font-lora leading-relaxed text-sm" style={{ fontFamily: "'Lora', serif", color: theme.accentLight, opacity: 0.85 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Families ─────────────────────────────────────────────────────────────────
function Families() {
  return (
    <section id="families" className="py-24 px-6" style={{ background: theme.primaryColor }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionLabel>United in Love</SectionLabel>
          <SectionTitle>The Families</SectionTitle>
          <GoldDivider className="max-w-xs mx-auto" />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[theme.familyA, theme.familyB].map((fam, i) => (
            <Reveal key={fam.title} delay={i * 150}>
              <div className="relative p-8 text-center" style={{ border: '1px solid rgba(201,162,39,0.4)', background: 'rgba(62,5,16,0.5)' }}>
                {/* Corner ornaments */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: theme.accentColor }} />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: theme.accentColor }} />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l" style={{ borderColor: theme.accentColor }} />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r" style={{ borderColor: theme.accentColor }} />

                <p className="font-cinzel font-bold tracking-widest uppercase text-xs mb-6" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
                  {fam.title}
                </p>
                <GoldDivider className="max-w-24 mx-auto" />
                <p className="font-cinzel font-semibold tracking-wider uppercase text-sm mt-6 mb-2" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>
                  {fam.parent}
                </p>
                <p className="font-lora italic text-xs mb-1" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.75 }}>
                  {fam.community}
                </p>
                <p className="font-lora text-xs" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.65 }}>
                  {fam.lga}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <p className="font-lora italic text-base leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Lora', serif", color: theme.accentLight, opacity: 0.8 }}>
              "Two families, two heritages, one love — rooted in the rich soil of Edo State."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Venue ────────────────────────────────────────────────────────────────────
function Venue() {
  const venues = [
    {
      type: 'Church Ceremony',
      icon: '✝',
      name: theme.ceremonyVenue,
      city: theme.ceremonyCity,
      date: 'Saturday, October 3rd, 2026',
      time: '10:00 AM',
      map: 'https://maps.google.com/?q=St+Alberts+Catholic+Church+UBTH+Benin+City',
      art: '❧',
    },
    {
      type: 'Reception',
      icon: '♡',
      name: theme.receptionVenue,
      city: theme.receptionCity,
      date: 'Saturday, October 3rd, 2026',
      time: 'Immediately After The Wedding',
      map: 'https://maps.google.com/?q=UYI+Grand+Marquee+GRA+Benin+City',
      art: '✦',
    },
  ]
  return (
    <section id="venue" className="py-24 px-6" style={{ background: theme.deepColor }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionLabel>You Are Invited</SectionLabel>
          <SectionTitle>Venue &amp; Schedule</SectionTitle>
          <GoldDivider className="max-w-xs mx-auto" />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {venues.map((v, i) => (
            <Reveal key={v.type} delay={i * 150}>
              <div className="overflow-hidden" style={{ border: '1px solid rgba(201,162,39,0.3)', background: 'rgba(93,7,25,0.4)' }}>
                <div className="relative overflow-hidden h-52" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(201,162,39,0.26), transparent 18%), linear-gradient(135deg, rgba(20,10,12,0.98), rgba(62,5,16,0.95), rgba(27,67,50,0.86))' }}>
                  <div className="absolute inset-4 border border-[rgba(201,162,39,0.25)]" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(4rem, 12vw, 7rem)', color: 'rgba(232,201,122,0.85)' }}>{v.art}</div>
                  <div className="absolute bottom-4 left-4">
                    <span className="font-cinzel text-xs tracking-[0.3em] uppercase px-3 py-1" style={{ fontFamily: "'Cinzel', serif", background: theme.accentColor, color: theme.deepColor }}>
                      {v.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-2xl mb-3" style={{ color: theme.accentColor }}>{v.icon}</div>
                  <h3 className="font-cinzel font-semibold tracking-wider text-sm uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>
                    {v.name}
                  </h3>
                  <p className="font-lora italic text-xs mb-4" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.75 }}>
                    {v.city}
                  </p>
                  <GoldDivider className="my-3" />
                  <div className="flex justify-between text-xs">
                    <div>
                      <p className="font-cinzel tracking-wider uppercase mb-0.5" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.6, fontSize: '0.6rem' }}>Date</p>
                      <p className="font-cinzel" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>{v.date}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="font-cinzel tracking-wider uppercase mb-0.5" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.6, fontSize: '0.6rem' }}>Time</p>
                    <p className="font-cinzel" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>{v.time}</p>
                  </div>
                  <a href={v.map} target="_blank" rel="noopener noreferrer"
                     className="mt-5 block text-center font-cinzel text-xs tracking-[0.2em] uppercase py-2.5 border transition-all duration-300 hover:bg-gold hover:text-deep no-underline"
                     style={{ fontFamily: "'Cinzel', serif", borderColor: theme.accentColor, color: theme.accentColor }}>
                    Get Directions
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
const schedule = [
  { time: '9:00 AM',  event: 'Arrival & Seating',      desc: 'Guests arrive and are escorted to their seats by the wedding ushers' },
  { time: '10:00 AM', event: 'Church Ceremony Begins',  desc: 'The holy matrimony solemnization commences at St Albert\'s Catholic Church' },
  { time: '11:30 AM', event: 'Exchange of Vows',        desc: 'Stella-Maris and Success exchange their sacred vows before God and witnesses' },
  { time: '12:00 PM', event: 'Photography Session',     desc: 'Formal photography session with the couple, bridal party, and families' },
  { time: '1:30 PM',  event: 'Reception Opens',         desc: 'Guests proceed to UYI Grand Marquee GRA for the reception celebration' },
  { time: '2:00 PM',  event: 'Introduction of Couple',  desc: 'Grand entrance of the newlyweds to a roaring ovation from all present' },
  { time: '3:00 PM',  event: 'Dinner &amp; Celebration', desc: 'Sumptuous feast, toasts, and heartfelt speeches from family and friends' },
  { time: '5:00 PM',  event: 'First Dance',             desc: 'The couple shares their first dance as husband and wife' },
  { time: '7:00 PM',  event: 'Open Dancing',            desc: 'The celebration continues with music, dancing, and jubilation' },
]

function Schedule() {
  return (
    <section id="schedule" className="py-24 px-6 section-bg-pine">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <SectionLabel>The Big Day</SectionLabel>
          <SectionTitle>Wedding Schedule</SectionTitle>
          <GoldDivider className="max-w-xs mx-auto" />
        </Reveal>

        <div className="mt-16 relative">
          {/* center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: 'rgba(201,162,39,0.3)' }} />

          <div className="space-y-8">
            {schedule.map((item, i) => (
              <Reveal key={item.time} delay={i * 60}>
                <div className={`flex flex-col md:flex-row gap-4 md:gap-0 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 p-5 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}
                       style={{ background: 'rgba(15,43,30,0.6)', border: '1px solid rgba(201,162,39,0.2)' }}>
                    <p className="font-cinzel font-semibold text-sm tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
                      {item.time}
                    </p>
                    <h4 className="font-cinzel font-bold tracking-widest uppercase text-xs mt-1 mb-2" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}
                        dangerouslySetInnerHTML={{ __html: item.event }} />
                    <p className="font-lora text-xs leading-relaxed" style={{ fontFamily: "'Lora', serif", color: 'rgba(232,201,122,0.7)' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center items-center">
                    <div className="w-3 h-3 rounded-full border-2 animate-pulse-gold" style={{ background: theme.accentColor, borderColor: theme.accentLight }} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Celebration Quote ────────────────────────────────────────────────────────
function Celebration() {
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: theme.primaryColor }}>
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '30vw', color: theme.accentColor, lineHeight: 1 }}>
          {theme.monogram}
        </span>
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <Reveal>
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2rem,5vw,3rem)', color: theme.accentColor }}>
            ❧
          </span>
          <p className="font-lora italic text-lg sm:text-xl leading-relaxed mt-4 mb-6" style={{ fontFamily: "'Lora', serif", color: theme.accentLight }}>
            "Two are better than one, because they have a good return for their labor: if either of them falls down, one can help the other up."
          </p>
          <p className="font-cinzel text-xs tracking-[0.35em] uppercase" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
            Ecclesiastes 4:9–10
          </p>
          <GoldDivider className="max-w-48 mx-auto mt-8" />
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase mt-6" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
            {theme.hashtag}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
const contacts = [
  { name: 'Bridal Coordinator', phone: '08056789012', role: 'Coordinator' },
  { name: 'Event Planner', phone: '08034567890', role: 'Planner' },
]

function Contacts() {
  const share = () => {
    if (navigator.share) {
      navigator.share({ title: `${theme.coupleA} & ${theme.coupleB}'s Wedding`, text: `You're invited! ${theme.dateDisplay}`, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }
  return (
    <section id="contacts" className="py-24 px-6" style={{ background: theme.primaryColor }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionLabel>Reach Out</SectionLabel>
          <SectionTitle>Contacts</SectionTitle>
          <GoldDivider className="max-w-xs mx-auto" />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 gap-5">
          {contacts.map((c, i) => (
            <Reveal key={c.phone} delay={i * 80}>
              <div className="p-5 flex items-center justify-between" style={{ border: '1px solid rgba(201,162,39,0.3)', background: 'rgba(62,5,16,0.4)' }}>
                <div>
                  <p className="font-cinzel text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.6 }}>{c.role}</p>
                  <p className="font-cinzel font-semibold text-sm tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: theme.accentLight }}>{c.name}</p>
                  <p className="font-lora text-xs mt-1" style={{ fontFamily: "'Lora', serif", color: theme.accentColor }}>{c.phone}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${c.phone}`}
                     className="w-9 h-9 flex items-center justify-center border transition-all hover:bg-gold no-underline"
                     style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    <span className="text-sm">☎</span>
                  </a>
                  <a href={`https://wa.me/234${c.phone.slice(1)}`} target="_blank" rel="noopener noreferrer"
                     className="w-9 h-9 flex items-center justify-center border transition-all no-underline"
                     style={{ borderColor: theme.pineLight, color: theme.pineLight, background: 'rgba(27,67,50,0.4)' }}>
                    <span className="text-sm">✉</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={350}>
          <div className="mt-12 text-center">
            <button onClick={share}
                    className="font-cinzel text-sm tracking-[0.3em] uppercase px-10 py-4 border-2 transition-all duration-300 hover:bg-gold hover:text-deep"
                    style={{ fontFamily: "'Cinzel', serif", borderColor: theme.accentColor, color: theme.accentColor }}>
              Share Invitation
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: theme.deepColor, borderTop: `1px solid rgba(201,162,39,0.25)` }}>
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <span className="gold-text-shimmer" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3rem, 7vw, 4.5rem)', display: 'block', lineHeight: 1.2 }}>
          {theme.coupleAScript} &amp; {theme.coupleBScript}
        </span>
        <p className="font-lora italic text-xs mt-2 mb-6" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.7 }}>
          {theme.coupleA} {theme.coupleALast} &amp; {theme.coupleB} {theme.coupleBLast}
        </p>
        <GoldDivider className="max-w-48 mx-auto" />
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase mt-6 mb-2" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
          {theme.dateDisplay}
        </p>
        <p className="font-cinzel text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.65 }}>
          {theme.ceremonyCity}
        </p>
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase mt-6" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.5 }}>
          {theme.hashtag}
        </p>
        <p className="font-lora italic text-xs mt-4" style={{ fontFamily: "'Lora', serif", color: theme.accentColor, opacity: 0.35 }}>
          With Love · Crafted with Joy
        </p>
      </div>
    </footer>
  )
}

// ─── Music Player ─────────────────────────────────────────────────────────────
function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      if (audioContextRef.current) {
        void audioContextRef.current.close()
      }
    }
  }, [])

  const playTone = (frequency: number, startTime: number, duration: number, volume: number, type: OscillatorType = 'sine') => {
    const context = audioContextRef.current
    if (!context) return

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = type
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, startTime)
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
  }

  const startMusic = () => {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return

    const context = audioContextRef.current ?? new AudioCtx()
    audioContextRef.current = context
    if (context.state === 'suspended') {
      void context.resume()
    }

    const melody = [220, 261.63, 329.63, 392, 349.23, 329.63, 293.66, 261.63, 293.66, 329.63, 392, 440]
    const harmony = [164.81, 196, 246.94, 293.66, 246.94, 220, 196, 174.61]
    let step = 0

    const scheduleNext = () => {
      if (!isPlayingRef.current) return

      const now = context.currentTime
      const baseFrequency = melody[step % melody.length]
      const harmonyFrequency = harmony[step % harmony.length]
      playTone(baseFrequency, now, 0.8, 0.035, 'sine')
      playTone(harmonyFrequency, now + 0.06, 1.0, 0.02, 'triangle')
      step += 1
      timerRef.current = window.setTimeout(scheduleNext, 620)
    }

    isPlayingRef.current = true
    scheduleNext()
  }

  const stopMusic = () => {
    isPlayingRef.current = false
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const onToggleMusic = () => {
    if (playing) {
      stopMusic()
      setPlaying(false)
      return
    }

    startMusic()
    setPlaying(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {expanded && (
        <div className="glass-card p-4 rounded-sm text-center animate-scale-in" style={{ minWidth: '180px' }}>
          <p className="font-cinzel text-xs tracking-wider uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor }}>
            Our Song
          </p>
          <p className="font-lora italic text-xs" style={{ fontFamily: "'Lora', serif", color: theme.accentLight }}>
            A soft romantic melody
          </p>
          <GoldDivider className="my-2" />
          <p className="font-cinzel text-xs" style={{ fontFamily: "'Cinzel', serif", color: theme.accentColor, opacity: 0.6, fontSize: '0.6rem' }}>
            Starts when you tap play
          </p>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <button onClick={() => setExpanded(v => !v)}
                className="w-10 h-10 flex items-center justify-center border transition-all"
                style={{ borderColor: theme.accentColor, color: theme.accentColor, background: 'rgba(62,5,16,0.8)' }}>
          <span className="text-xs font-cinzel">♪</span>
        </button>
        <button onClick={onToggleMusic}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all animate-pulse-gold"
                style={{ background: theme.accentColor, color: theme.deepColor }}>
          <span className="text-lg">{playing ? '⏸' : '▶'}</span>
        </button>
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Lora', serif" }}>
      <Navbar />
      <Hero />
      <Story />
      <Families />
      <Venue />
      <Schedule />
      <Celebration />
      <Contacts />
      <Footer />
      <MusicPlayer />
    </div>
  )
}
