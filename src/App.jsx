import introHero from './assets/intro-hero.mp4';
import charterCateringHero from './assets/charter-catering.jpg';
import charterDinnerHero from './assets/charter-dinner.jpg';
import waterActivitiesHero from './assets/water-activities.jpg';
import { useCallback, useEffect, useRef, useState } from 'react';

// Shared section links for desktop side nav + mobile dropdown.
const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Offers', href: '#offers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
];

// Hero media order: intro video first, then sequential photos.
const HERO_MEDIA = [
  { type: 'video', src: introHero },
  {
    type: 'image',
    src: charterCateringHero,
    alt: 'Luxury catering on a yacht',
    frameClass: 'object-[50%_center] sm:object-[58%_center] lg:object-[50%_40%] [@media_(width:1024px)_and_(height:1366px)]:object-[72%_34%]',
  },
  {
    type: 'image',
    src: charterDinnerHero,
    alt: 'Yacht dinner party',
    frameClass: 'object-[46%_center] sm:object-[52%_center] lg:object-[50%_38%] [@media_(width:1024px)_and_(height:1366px)]:object-[50%_37%]',
  },
  {
    type: 'image',
    src: waterActivitiesHero,
    alt: 'Water activities on a yacht',
    frameClass: 'object-[45%_center] sm:object-[60%_center] lg:object-[54%_42%] [@media_(width:1024px)_and_(height:1366px)]:object-[55%_36%]',
  },
];

const PHOTO_DISPLAY_MS = 7000;
const VIDEO_TO_PHOTO_DELAY_MS = 1000; // Delay after video ends before showing next photo
const CROSSFADE_MS = 900;

// Top header with brand, socials, and mobile menu.
function Header() {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [headerPaddingY, setHeaderPaddingY] = useState(40); // py-10 = 40px
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


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
        backgroundColor: `rgba(15, 51, 96, ${0.8 * scrollOpacity})`,
        backdropFilter: `blur(${4 * scrollOpacity}px)` // Blur fades in from 0 to 4px
      }}
    >
      <div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center transition-all duration-200"
        style={{ paddingTop: `${headerPaddingY}px`, paddingBottom: `${headerPaddingY}px` }}
        >
        {/* Logo/Title on the left */}
        <div className="text-white text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Arial Narrow' }}>
          Floating Adventures
        </div>
        
        {/* Social media icons + mobile menu */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="text-white/80 hover:text-white transition" title="Facebook">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-white/80 hover:text-white transition" title="Instagram">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.875 2.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>
            </svg>
          </a>
          <button
            type="button"
            className="md:hidden text-white/90 hover:text-white transition"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="md:hidden border-t border-white/20 bg-[#0f3360]/95 backdrop-blur-sm">
          <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#eec07b] transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  // Slideshow state: active media + crossfade tracking.
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [outgoingMediaIndex, setOutgoingMediaIndex] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const mediaTimeoutRef = useRef(null);
  const crossfadeTimeoutRef = useRef(null);
  const crossfadeFrameRef = useRef(null);
  const videoRef = useRef(null);

  const activeMedia = HERO_MEDIA[activeMediaIndex];
  const outgoingMedia = outgoingMediaIndex !== null ? HERO_MEDIA[outgoingMediaIndex] : null;

  // Advance to next media item in the playlist cycle.
  const nextMedia = useCallback(() => {
    setOutgoingMediaIndex(activeMediaIndex);
    setIsCrossfading(false);
    setActiveMediaIndex((prev) => (prev + 1) % HERO_MEDIA.length);
  }, [activeMediaIndex]);

  useEffect(() => {
    // Image slides auto-advance after PHOTO_DISPLAY_MS.
    if (mediaTimeoutRef.current) {
      clearTimeout(mediaTimeoutRef.current);
      mediaTimeoutRef.current = null;
    }

    if (activeMedia.type === 'image') {
      mediaTimeoutRef.current = setTimeout(nextMedia, PHOTO_DISPLAY_MS);
    }

    return () => {
      if (mediaTimeoutRef.current) {
        clearTimeout(mediaTimeoutRef.current);
        mediaTimeoutRef.current = null;
      }
    };
  }, [activeMediaIndex, activeMedia.type, nextMedia]);

  useEffect(() => {
    // Crossfade lifecycle: keep outgoing image briefly, then remove.
    if (outgoingMediaIndex === null) {
      return undefined;
    }

    if (crossfadeFrameRef.current) {
      cancelAnimationFrame(crossfadeFrameRef.current);
    }
    if (crossfadeTimeoutRef.current) {
      clearTimeout(crossfadeTimeoutRef.current);
    }

    crossfadeFrameRef.current = requestAnimationFrame(() => {
      setIsCrossfading(true);
    });

    crossfadeTimeoutRef.current = setTimeout(() => {
      setOutgoingMediaIndex(null);
      setIsCrossfading(false);
      crossfadeTimeoutRef.current = null;
    }, CROSSFADE_MS);

    return () => {
      if (crossfadeFrameRef.current) {
        cancelAnimationFrame(crossfadeFrameRef.current);
        crossfadeFrameRef.current = null;
      }
      if (crossfadeTimeoutRef.current) {
        clearTimeout(crossfadeTimeoutRef.current);
        crossfadeTimeoutRef.current = null;
      }
    };
  }, [outgoingMediaIndex]);

  useEffect(() => {
    // Video behavior: play when active, pause/freeze when not.
    if (!videoRef.current) {
      return;
    }

    if (activeMedia.type === 'video') {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      return;
    }

    videoRef.current.pause();
  }, [activeMedia.type, activeMediaIndex]);

  const handleIntroEnded = () => {
    // After video ends, advance to the next media item.
    if (mediaTimeoutRef.current) {
      clearTimeout(mediaTimeoutRef.current);
    }
    mediaTimeoutRef.current = setTimeout(nextMedia, VIDEO_TO_PHOTO_DELAY_MS);
  };

  const videoMediaClasses =
    'absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-[80%_center] lg:object-[50%_40%] [@media_(width:1024px)_and_(height:1366px)]:object-[80%_30%] transition-opacity duration-[900ms]';
  const imageMediaBaseClasses =
    'absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms]';
  const defaultImageFrameClass =
    'object-[70%_center] sm:object-[47%_center] lg:object-[50%_40%] [@media_(width:1024px)_and_(height:1366px)]:object-[80%_30%]';

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Persistent intro video layer: stays paused on last frame */}
      <video
        ref={videoRef}
        className={`${videoMediaClasses} z-0 opacity-100`}
        muted
        playsInline
        preload="auto"
        onEnded={handleIntroEnded}
      >
        <source src={introHero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Active image layer: fades over the paused video frame. */}
      {activeMedia.type === 'image' ? (
        <img
          key={`hero-image-${activeMediaIndex}`}
          src={activeMedia.src}
          alt={activeMedia.alt}
          className={`${imageMediaBaseClasses} ${activeMedia.frameClass || defaultImageFrameClass} z-0 ${outgoingMediaIndex !== null && !isCrossfading ? 'opacity-0' : 'opacity-100'}`}
          loading="eager"
          decoding="async"
        />
      ) : null}

      {/* Outgoing image layer used only during crossfade transitions. */}
      {outgoingMedia && outgoingMedia.type === 'image' ? (
        <img
          key={`hero-outgoing-image-${outgoingMediaIndex}`}
          src={outgoingMedia.src}
          alt=""
          loading="eager"
          decoding="async"
          aria-hidden="true"
          className={`${imageMediaBaseClasses} ${outgoingMedia.frameClass || defaultImageFrameClass} z-0 ${isCrossfading ? 'opacity-0' : 'opacity-100'}`}
        />
      ) : null}

      {/* Photo-only darkening overlay for stronger text contrast. */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none bg-black transition-opacity duration-[900ms] ${
          activeMedia.type === 'image' ? 'opacity-70' : 'opacity-0'
        }`}
      />

      {/* Hero headline, supporting copy, and CTA. */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl items-end min-[988px]:items-center [@media_(width:1024px)_and_(height:1366px)]:items-end px-4 sm:px-6 md:px-7 lg:px-9 pb-14 sm:pb-16 md:pb-20 min-[988px]:pb-0 [@media_(width:1024px)_and_(height:1366px)]:pb-20 [@media_(width:1024px)_and_(height:1366px)]:pl-[6.25rem]">
        <div className="max-w-[92vw] sm:max-w-xl text-left ml-0 lg:ml-[-90px] hero-text-entrance">
          <h1 className="mt-2 sm:mt-3 text-[2rem] sm:text-5xl lg:text-6xl leading-[1.05] sm:leading-tight font-bold text-white" style={{ fontFamily: 'Arial Black' }}>
            <span className="block text-[#eec07b]">Yacht Charters</span>
            <span className="block italic">in Sint Maarten</span>
          </h1>
          <p className="mt-3 sm:mt-4 max-w-md text-[1.02rem] sm:text-lg leading-relaxed text-white/80">
            Step aboard a private yacht and experience Sint Maarten like never before.
          </p>

          <button className="mt-8 sm:mt-12 lg:mt-16 w-full sm:w-auto rounded-full bg-white px-7 sm:px-10 py-2.5 text-base sm:text-lg font-bold text-[#0f3360] hover:bg-[#0f3360] hover:text-[#eec07b] hover:py-3 hover:px-12 transition-all duration-200" style={{ fontFamily: 'Arial Black' }}>
            Reserve Your Experience
          </button>
        </div>
      </div>
      {/* Social proof badge. */}
      <div className="absolute inset-x-0 top-[6.5rem] sm:top-28 md:top-auto md:bottom-20 md:left-100 lg:bottom-20 lg: [@media_(width:1024px)_and_(height:1366px)_and_(hover:none)_and_(pointer:coarse)]:top-auto [@media_(width:1024px)_and_(height:1366px)_and_(hover:none)_and_(pointer:coarse)]:bottom-20 z-30 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center hero-text-entrance">
        <div className="rounded-2xl border border-[#eec07b]/70 bg-black/35 backdrop-blur-xl px-4 sm:px-5 py-3 sm:py-3.5">
          <div className="flex items-center justify-center gap-1.5" aria-label="5 star rating">
            {[...Array(5)].map((_, idx) => (
              <svg key={idx} className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:w-[24px] md:h-[24px] lg:w-[38px] lg:h-[38px] text-[#eec07b]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.25l2.886 5.85 6.456.938-4.671 4.553 1.103 6.43L12 16.98l-5.774 3.04 1.103-6.43-4.671-4.553 6.456-.938L12 2.25z" />
              </svg>
            ))}
          </div>
          <p className="mt-1.5 text-center text-white text-sm sm:text-[0.95rem] lg:text-base">
            <span className="font-semibold">5.0</span> from 120+ happy guests
          </p>
        </div>
      </div>
    </section>
  );
}

function SideNav() {
  // Desktop section progress/navigation rail.
  const activeHref = '#home';

  return (
    <div className="hidden md:block fixed right-4 lg:right-8 xl:right-33 top-1/2 z-40 -translate-y-1/2 hero-text-entrance">
      <div className="relative flex flex-col items-end gap-8 lg:gap-10 xl:gap-12">
        {/* Vertical line (on the right) */}
        <div className="absolute right-1 top-[14px] lg:top-[18px] h-[182px] lg:h-[212px] w-0.5 bg-white/50" />

        {NAV_ITEMS.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <a
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-4 lg:gap-5 xl:gap-6"
            >
              {/* Label */}
              <span
                className={
                  isActive
                    ? 'text-[#eec07b] text-base lg:text-[1.08rem] font-semibold underline underline-offset-8'
                    : 'text-white/90 text-base lg:text-[1.08rem]'
                }
              >
                {item.label}
              </span>

              {/* Dot (aligned to the line) */}
              <span
                className={
                  'h-2.5 w-2.5 xl:h-3 xl:w-3 rounded-full bg-white ' +
                  (isActive ? 'outline outline-2 outline-white/80 bg-[#eec07b]' : '')
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
      {/* Fixed navigation layers */}
      <Header />
      <SideNav />

      {/* Hero media + primary messaging */}
      <Hero />

      {/* Main content sections */}
      <section id="offers" className="min-h-screen bg-black text-white px-5 sm:px-7 md:px-8 lg:px-10 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold">Offers</h2>
          <p className="mt-4 text-white/70">Placeholder section — we’ll build the cards next.</p>
        </div>
      </section>

      <section id="gallery" className="min-h-screen bg-black text-white px-5 sm:px-7 md:px-8 lg:px-10 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold">Gallery</h2>
          <p className="mt-4 text-white/70">Placeholder section — we’ll add images + lightbox later.</p>
        </div>
      </section>

      <section id="about" className="min-h-screen bg-black text-white px-5 sm:px-7 md:px-8 lg:px-10 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold">About</h2>
          <p className="mt-4 text-white/70">Placeholder section — we’ll write the brand story here.</p>
        </div>
      </section>
    </div>
  );
}
