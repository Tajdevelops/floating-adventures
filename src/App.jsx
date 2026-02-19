import introHero from './assets/intro-hero.mp4';
import { useState, useEffect } from 'react';

function Header() {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [headerPaddingY, setHeaderPaddingY] = useState(40); // py-10 = 40px


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.min(scrollY / 300, 1); // Fades in over 300px of scroll
      setScrollOpacity(opacity);
      setHeaderPaddingY(40 - (20 * opacity)); // Shrinks from py-10 (40px) to py-5 (20px)

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{ 
        backgroundColor: `rgba(15, 51, 96, ${1 * scrollOpacity})`,
        backdropFilter: `blur(${4 * scrollOpacity}px)` // Blur fades in from 0 to 4px
      }}
    >
        <div
        className="mx-auto max-w-7xl px-10 flex justify-between items-center transition-all duration-200"
        style={{ paddingTop: `${headerPaddingY}px`, paddingBottom: `${headerPaddingY}px` }}
        >
        {/* Logo/Title on the left */}
        <div className="text-white text-xl" style={{ fontFamily: 'Arial Narrow' }}>
          Floating Adventures
        </div>
        
        {/* Social media icons on the right */}
        <div className="flex gap-6">
          <a href="#" className="text-white/80 hover:text-white transition" title="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-white/80 hover:text-white transition" title="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.875 2.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        autoPlay
        muted
        playsInline
      >
        <source src={introHero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero content */}
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="max-w-xl text-left ml-[-50px]">
          <h1 className="mt-3 text-5xl font-bold text-white" style={{ fontFamily: 'Arial Black' }}>
            <span className="block text-[#eec07b]">Yacht Charters</span>
            <span className="block italic">in Sint Maarten</span>
          </h1>
          <p className="mt-4 text-white/80">
            Step aboard a private yacht and experience Sint Maarten like never before.
          </p>

          <button className="mt-16 rounded-3xl bg-white px-10 py-2.5 text-lg font-bold text-[#0f3360] hover:bg-[#0f3360] hover:text-white hover:py-3 hover:px-12 transition-all duration-200" style={{ fontFamily: 'Arial Black' }}>
            Reserve Your Experience
          </button>
        </div>
      </div>
    </section>
  );
}

function SideNav() {
  // Static for now (we'll wire active state to scroll later)
  const items = [
    { label: 'Home', href: '#home' },
    { label: 'Offers', href: '#offers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
  ];

  const activeHref = '#home';

  return (
    <div className="fixed right-30 top-1/2 z-40 -translate-y-1/2">
      <div className="relative flex flex-col items-end gap-12">
        {/* Vertical line (on the right) */}
        <div className="absolute right-1 top-[18px] h-53 w-0.5 bg-white/50" />

        {items.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <a
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-6"
            >
              {/* Label */}
              <span
                className={
                  isActive
                    ? 'text-[#eec07b] font-semibold underline underline-offset-8'
                    : 'text-white/90'
                }
              >
                {item.label}
              </span>

              {/* Dot (aligned to the line) */}
              <span
                className={
                  'h-3 w-3 rounded-full bg-white ' +
                  (isActive ? 'outline outline-2 outline-white/80' : '')
                }
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="pt-0">
      <Header />
      <SideNav />
      <Hero />

      <section id="offers" className="min-h-screen bg-black text-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold">Offers</h2>
          <p className="mt-4 text-white/70">Placeholder section — we’ll build the cards next.</p>
        </div>
      </section>

      <section id="gallery" className="min-h-screen bg-black text-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold">Gallery</h2>
          <p className="mt-4 text-white/70">Placeholder section — we’ll add images + lightbox later.</p>
        </div>
      </section>

      <section id="about" className="min-h-screen bg-black text-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold">About</h2>
          <p className="mt-4 text-white/70">Placeholder section — we’ll write the brand story here.</p>
        </div>
      </section>
    </div>
  );
}
