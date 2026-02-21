import introHero from './assets/Intro-hero.mp4';
import charterCateringHero from './assets/charter-catering.jpg';
import charterDinnerHero from './assets/charter-dinner.jpg';
import waterActivitiesHero from './assets/water-activities.jpg';
import offersBackgroundImage from './assets/main-offer-hero.jpg';
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

const GALLERY_ITEMS = [
  { src: offersBackgroundImage, alt: 'Yacht at sunset in Sint Maarten' },
  { src: charterDinnerHero, alt: 'Gourmet dining onboard' },
  { src: waterActivitiesHero, alt: 'Guests enjoying water activities' },
  { src: introHero, alt: 'Hero video preview frame', type: 'video' },
  { src: charterCateringHero, alt: 'Premium charter catering' },
];

const PHOTO_DISPLAY_MS = 7000;
const VIDEO_TO_PHOTO_DELAY_MS = 1000; // Delay after video ends before showing next photo
const CROSSFADE_MS = 900;
const FULL_DAY_CALENDLY_URL = 'https://calendly.com/tajcreates1/full-day-private-charter';

function openFullDayBooking() {
  if (!window.Calendly) {
    console.error('Calendly not loaded yet');
    return;
  }

  window.Calendly.initPopupWidget({
    url: FULL_DAY_CALENDLY_URL,
  });
}

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
          activeMedia.type === 'image' ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {/* Hero headline, supporting copy, and CTA. */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl items-end min-[988px]:items-center [@media_(width:1024px)_and_(height:1366px)]:items-end px-4 sm:px-6 md:px-7 lg:px-9 pb-14 sm:pb-16 md:pb-20 min-[988px]:pb-0 [@media_(width:1024px)_and_(height:1366px)]:pb-20 [@media_(width:1024px)_and_(height:1366px)]:pl-[8rem]">
        <div className="max-w-[92vw] sm:max-w-xl text-left ml-0 lg:ml-[-90px] hero-text-entrance">
          <h1 className="mt-2 sm:mt-3 text-[2rem] sm:text-5xl lg:text-6xl leading-[1.05] sm:leading-tight font-bold text-white" style={{ fontFamily: 'Times New Roman, serif' }}>
            <span className="block text-[#eec07b]">Yacht Charters</span>
            <span className="block italic">in Sint Maarten</span>
          </h1>
          <p className="mt-3 sm:mt-4 max-w-md text-[1.02rem] sm:text-lg leading-relaxed text-white/80 lg:text-2xl">
            Step aboard a private yacht and experience Sint Maarten like never before.
          </p>

          <a href="/offer-page.html" className="mt-8 sm:mt-12 lg:mt-16 inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white px-7 sm:px-10 py-2.5 text-base sm:text-xl sm:py-5 [@media_(width:1024px)_and_(height:1366px)]:px-20 [@media_(width:1024px)_and_(height:1366px)]:py-7 [@media_(width:1024px)_and_(height:1366px)]:text-2xl font-bold text-[#0f3360] hover:bg-[#0f3360] hover:text-[#eec07b] hover:py-5 hover:px-12 transition-all duration-200" style={{ fontFamily: 'Arial Black' }}>
            Reserve Your Experience
          </a>
        </div>
      </div>
      {/* Social proof badge. */}
      <div className="absolute inset-x-0 top-[6.5rem] sm:top-28 md:top-auto md:bottom-20 md:left-100 lg:bottom-10 lg:left-0 [@media_(width:1024px)_and_(height:1366px)_and_(hover:none)_and_(pointer:coarse)]:top-auto [@media_(width:1024px)_and_(height:1366px)_and_(hover:none)_and_(pointer:coarse)]:bottom-20 [@media_(width:1024px)_and_(height:1366px)_and_(hover:none)_and_(pointer:coarse)]:left-120 z-30 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center hero-text-entrance">
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
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const sectionElements = NAV_ITEMS
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sectionElements.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.4;
      let currentHref = NAV_ITEMS[0].href;

      sectionElements.forEach((section) => {
        if (section.offsetTop <= scrollMarker) {
          currentHref = `#${section.id}`;
        }
      });

      setActiveHref(currentHref);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <div className="hidden md:block fixed right-[max(env(safe-area-inset-right),2rem)] lg:right-11 xl:right-12 top-1/2 [@media_(hover:none)_and_(pointer:coarse)]:top-[50%] z-40 -translate-y-1/2 hero-text-entrance">
      <div className="relative flex flex-col items-end gap-7 md:gap-20 lg:gap-30 xl:gap-12">
        {/* Vertical line (on the right) */}
        <div className="absolute right-1 top-[12px] md:top-[14px] lg:top-[18px] h-[160px] md:h-[310px] lg:h-[220px] [@media_(width:1024px)_and_(height:1366px)]:h-[435px] w-0.5 bg-white/50" />

        {NAV_ITEMS.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveHref(item.href)}
              className="relative flex items-center gap-3.5 md:gap-4 lg:gap-5 xl:gap-6"
            >
              {/* Label */}
              <span
                className={
                  isActive
                    ? 'text-[#eec07b] text-sm md:text-base lg:text-[1.08rem] font-semibold underline underline-offset-8'
                    : 'text-white/90 text-sm md:text-base lg:text-[1.08rem]'
                }
              >
                {item.label}
              </span>

              {/* Dot (aligned to the line) */}
              <span
                className={
                  isActive
                    ? 'h-2 w-2 md:h-2.5 md:w-2.5 xl:h-3 xl:w-3 rounded-full bg-[#eec07b] outline outline-2 outline-white/80'
                    : 'h-2 w-2 md:h-2.5 md:w-2.5 xl:h-3 xl:w-3 rounded-full bg-white'
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
  // Gallery carousel state.
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const activeGalleryItem = GALLERY_ITEMS[activeGalleryIndex];

  useEffect(() => {
    if (window.Tally?.loadEmbeds) {
      window.Tally.loadEmbeds();
    }
  }, []);

  // Gallery navigation handlers.
  const showPreviousGalleryItem = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const showNextGalleryItem = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  return (
    <div className="pt-0">
      {/* Fixed navigation layers */}
      <Header />
      <SideNav />

      {/* Hero media + primary messaging */}
      <Hero />
      {/* Section divider: Home -> Offers */}
      <div className="h-4 w-full bg-[#eec07b]" aria-hidden="true" />

      {/* Main content sections */}

      {/* Offers page */}
      <section id="offers" className="relative min-h-screen overflow-hidden text-white px-5 sm:px-7 md:px-8 lg:px-10 pt-14 sm:pt-20 md:pt-20 lg:pt-24 xl:pt-28 pb-24 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-40">
        {/* Offers background image */}
        <img
          src={offersBackgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />

        {/* Offers content wrapper */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between">
          {/* Top intro copy + primary CTA */}
          <div className="max-w-2xl lg:mt-4">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#eec07b]" style={{ fontFamily: 'cursive' }}>
              The Ultimate
            </p>
            <h2 className="mt-1 text-3xl sm:text-4xl md:text-5xl leading-[0.98] font-semibold" style={{ fontFamily: 'Times New Roman, serif' }}>
              Sint Maarten
              <span className="block">Private Charter</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm sm:text-base md:text-lg text-white/90">
              A full-day luxury yacht experience designed for comfort, privacy, and unforgettable moments.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <button onClick={openFullDayBooking} className="rounded-full bg-[#eec07b] px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-bold text-black transition hover:brightness-105">
                Reserve Your Experience
              </button>
              <a href="#" className="text-lg sm:text-xl font-semibold text-white/95 underline underline-offset-6 decoration-white/45">
                View Full Details
              </a>
            </div>
          </div>

          {/* Bottom composition: feature chips + details grid + secondary CTA */}
          <div className="pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14 lg:mt-8 xl:mt-10">
            {/* Feature chip row */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                'Premium Open Bar',
                'Gourmet Dining',
                'Water Activities',
                'Starlink Wi-Fi',
                'Fully Private',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/25 bg-[#0d2236]/70 px-4 py-3 text-center text-sm sm:text-base font-semibold text-white/95 backdrop-blur-sm shadow-[inset_0_-1px_0_0_rgba(238,192,123,0.35)]"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Three-column lower layout */}
            <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1.5fr_1fr] items-stretch">
              {/* Included list card */}
              <div className="rounded-2xl border border-white/20 bg-[#0a1827]/70 p-5 backdrop-blur-sm">
                <h3 className="text-3xl sm:text-4xl text-white leading-none" style={{ fontFamily: 'cursive' }}>
                  What&apos;s <span className="text-[#eec07b]" style={{ fontFamily: 'Times New Roman, serif' }}>Included</span>
                </h3>
                <ul className="mt-4 space-y-2.5 text-base sm:text-xl text-white/90">
                  {[
                    'Snorkeling & Paddleboard',
                    'Fresh Gourmet Lunch',
                    'Organic Local Ingredients',
                    'Towels & Premium Service',
                  ].map((line) => (
                    <li key={line} className="flex items-center justify-between gap-3">
                      <span>{line}</span>
                      <span className="text-[#eec07b] text-xl">✓</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supporting media cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { src: waterActivitiesHero, alt: 'Water activity cove view' },
                  { src: charterDinnerHero, alt: 'Gourmet dining' },
                  { src: charterCateringHero, alt: 'Paddleboard activity' },
                ].map((card) => (
                  <div key={card.alt} className="overflow-hidden rounded-2xl border border-white/20 bg-black/40">
                    <img src={card.src} alt={card.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Right-side availability CTA card */}
              <div className="rounded-2xl border border-white/20 bg-[#0a1827]/75 p-5 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl sm:text-4xl leading-tight text-white" style={{ fontFamily: 'Times New Roman, serif' }}>
                    Ready to <span className="text-[#eec07b]" style={{ fontFamily: 'cursive' }}>Set Sail?</span>
                  </h3>
                  <p className="mt-2 text-xl tracking-[0.08em] text-white/85">LIMITED AVAILABILITY</p>
                </div>
                <button className="mt-5 rounded-full bg-white px-6 py-3 text-lg font-bold text-black hover:bg-white/90 transition">
                  CHECK AVAILABILITY
                </button>
              </div>
            </div>

            {/* Secondary section CTA */}
            <div className="mt-10 flex justify-center">
              <a
                href="/offer-page.html"
                className="rounded-full border border-[#eec07b]/70 bg-black/35 px-7 sm:px-9 py-2.5 sm:py-3 text-base sm:text-lg font-semibold text-white hover:bg-[#eec07b] hover:text-black transition"
              >
                More Offers
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Section divider: Offers -> Gallery */}
      <div className="h-4 w-full bg-[#eec07b]" aria-hidden="true" />

      {/* Gallery page */}
      <section id="gallery" className="relative min-h-screen overflow-hidden bg-[#020914] text-white px-5 sm:px-7 md:px-8 lg:px-10 py-16 sm:py-20 md:py-24">
        {/* Background glow treatment */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(14,69,109,0.45),transparent_45%),radial-gradient(circle_at_20%_90%,rgba(238,192,123,0.18),transparent_35%)]" />

        {/* Framed gallery shell */}
        <div className="relative z-10 mx-auto max-w-7xl rounded-3xl border border-[#eec07b]/30 bg-[#031121]/65 p-5 sm:p-7 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {/* Gallery title block */}
          <div className="text-center">
            <p className="text-lg sm:text-2xl text-white/70 tracking-[0.18em]">- Gallery -</p>
            <h2 className="mt-2 text-3xl sm:text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
              Capture a <span className="text-[#eec07b]">Day in Luxury</span>
            </h2>
            <p className="mt-4 text-base sm:text-xl text-white/80">
              Experience the best of yacht life, from gourmet dining to tropical escapes.
            </p>
          </div>

          {/* Active gallery item (image/video) */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#eec07b]/35 bg-black/30">
            {activeGalleryItem.type === 'video' ? (
              <video
                key={`gallery-video-${activeGalleryIndex}`}
                src={activeGalleryItem.src}
                className="h-[250px] sm:h-[380px] md:h-[520px] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                key={`gallery-image-${activeGalleryIndex}`}
                src={activeGalleryItem.src}
                alt={activeGalleryItem.alt}
                className="h-[250px] sm:h-[380px] md:h-[520px] w-full object-cover"
              />
            )}
          </div>

          {/* Thumbnail rail + previous/next controls */}
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={showPreviousGalleryItem}
              className="shrink-0 rounded-full border border-[#eec07b]/55 bg-black/40 p-2.5 text-[#eec07b] hover:bg-[#eec07b] hover:text-black transition"
              aria-label="Show previous gallery image"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="grid flex-1 grid-cols-2 sm:grid-cols-5 gap-3">
              {GALLERY_ITEMS.map((item, index) => {
                const isActive = index === activeGalleryIndex;
                return (
                  <button
                    key={`${item.alt}-${index}`}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    className={
                      'overflow-hidden rounded-xl border bg-black/30 transition ' +
                      (isActive
                        ? 'border-[#eec07b] ring-2 ring-[#eec07b]/60'
                        : 'border-white/20 hover:border-[#eec07b]/60')
                    }
                    aria-label={`Show gallery item ${index + 1}`}
                  >
                    {item.type === 'video' ? (
                      <video src={item.src} className="h-20 sm:h-24 md:h-28 w-full object-cover" muted playsInline />
                    ) : (
                      <img src={item.src} alt={item.alt} className="h-20 sm:h-24 md:h-28 w-full object-cover" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={showNextGalleryItem}
              className="shrink-0 rounded-full border border-[#eec07b]/55 bg-black/40 p-2.5 text-[#eec07b] hover:bg-[#eec07b] hover:text-black transition"
              aria-label="Show next gallery image"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <div className="h-4 w-full bg-[#eec07b]" aria-hidden="true" />

      <section id="about" className="relative min-h-screen overflow-hidden bg-[#030a15] text-white px-5 sm:px-7 md:px-8 lg:px-10 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_80%,rgba(238,192,123,0.2),transparent_30%),radial-gradient(circle_at_60%_25%,rgba(18,71,112,0.35),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-7xl rounded-3xl border border-[#eec07b]/25 bg-[#051224]/70 p-5 sm:p-7 md:p-8 lg:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <div className="mb-5 text-center text-[#eec07b] tracking-[0.18em] text-lg sm:text-xl">
            - About Us -
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
            <div className="rounded-2xl border border-white/15 bg-black/20 p-5 sm:p-6">
              <h2 className="text-4xl sm:text-5xl leading-none text-white" style={{ fontFamily: 'Times New Roman, serif' }}>
                Floating <span className="text-[#eec07b]" style={{ fontFamily: 'cursive' }}>Adventures</span>
              </h2>

              <p className="mt-5 text-lg sm:text-2xl leading-relaxed text-white/90">
                We are a <span className="text-[#eec07b]">family-owned</span> company built from a passion for exceptional Caribbean escapes.
              </p>
              <p className="mt-4 text-base sm:text-xl leading-relaxed text-white/85">
                From Bobby&apos;s Marina in Sint Maarten, our private charters deliver hidden bays, clear waters, and unforgettable moments designed for comfort and privacy.
              </p>
              <p className="mt-4 text-base sm:text-xl leading-relaxed text-white/85">
                Every itinerary is curated for effortless luxury, personal space, and authentic island adventure.
              </p>

              <p className="mt-6 text-2xl sm:text-3xl text-white leading-snug" style={{ fontFamily: 'Times New Roman, serif' }}>
                Casual Elegance <span className="text-[#eec07b]">&amp;</span> Privacy on Caribbean Waters.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-rows-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/25">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1767724347148!6m8!1m7!1sCAoSHENJQUJJaEFkRktUeXBrRlhRUmtUZFdoY3VDQ2I.!2m2!1d18.02028340816918!2d-63.0433419097216!3f191.79479911345362!4f-11.295208891181417!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Floating Adventures Marina View"
                  className="h-full w-full"
                />
              </div>

              <div className="rounded-2xl border border-white/20 bg-[#061426]/80 p-4 sm:p-5">
                <div className="h-full rounded-xl border border-[#eec07b]/30 bg-[radial-gradient(circle_at_40%_50%,rgba(238,192,123,0.22),transparent_35%),radial-gradient(circle_at_60%_60%,rgba(20,88,132,0.35),transparent_40%)] p-4 sm:p-5 flex flex-col justify-between">
                  <div className="h-36 sm:h-40 w-full overflow-hidden rounded-lg border border-white/15 bg-black/25">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7509.9825227377905!2d-63.0448645546064!3d18.02010680303474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c0e6f00675acbd3%3A0xd782f938e83b74b8!2sFloating%20Adventures%20B.V!5e1!3m2!1spl!2snl!4v1764778875337!5m2!1spl!2snl"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Floating Adventures Location"
                    />
                  </div>

                  <p className="mt-3 text-right text-xl sm:text-3xl text-[#eec07b]" style={{ fontFamily: 'cursive' }}>
                    Located at Bobby&apos;s Marina
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative -rotate-2 rounded-md border border-[#eec07b]/45 bg-white text-black p-2 shadow-lg">
              <img src={charterCateringHero} alt="Family on board welcome moment" className="h-32 sm:h-36 w-full rounded-sm object-cover" />
              <p className="mt-1 text-center text-sm sm:text-base italic" style={{ fontFamily: 'Times New Roman, serif' }}>Welcome Aboard</p>
            </div>

            {[charterDinnerHero, waterActivitiesHero, offersBackgroundImage].map((src, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-white/20 bg-black/35">
                <img src={src} alt="About section moment" className="h-36 sm:h-44 w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-3xl sm:text-5xl leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
              Floating <span className="text-[#eec07b]">Adventures</span> is not just about chartering.
            </h3>
            <p className="mt-3 text-lg sm:text-2xl text-white/85">
              This is your personal Caribbean adventure, full of space, freedom, and carefree relaxation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form section */}
      <section id="contact" className="relative overflow-hidden bg-[#020a14] text-white px-5 sm:px-7 md:px-8 lg:px-10 py-14 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(238,192,123,0.14),transparent_30%),radial-gradient(circle_at_80%_78%,rgba(16,78,120,0.25),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-7xl rounded-2xl border border-[#eec07b]/30 bg-[#051224]/70 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
          <p className="text-center text-[#eec07b] tracking-[0.12em] text-sm sm:text-base uppercase">Contact Us</p>
          <iframe
            data-tally-src="https://tally.so/embed/81KMQA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
            loading="lazy"
            width="100%"
            height="313"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Contact us"
            className="mt-4 w-full"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-[#eec07b]/30 bg-[#020a14] text-white px-5 sm:px-7 md:px-8 lg:px-10 py-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(238,192,123,0.12),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(16,78,120,0.25),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-3xl sm:text-4xl leading-none" style={{ fontFamily: 'Times New Roman, serif' }}>
                Floating <span className="text-[#eec07b]" style={{ fontFamily: 'cursive' }}>Adventures</span>
              </h3>
              <p className="mt-3 max-w-md text-white/80">
                Private yacht charters in Sint Maarten curated for comfort, privacy, and unforgettable moments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              <div>
                <p className="text-sm tracking-[0.12em] text-[#eec07b] uppercase">Navigate</p>
                <div className="mt-3 flex flex-col gap-2 text-white/90">
                  <a href="#home" className="hover:text-[#eec07b] transition">Home</a>
                  <a href="#offers" className="hover:text-[#eec07b] transition">Offers</a>
                  <a href="#gallery" className="hover:text-[#eec07b] transition">Gallery</a>
                  <a href="#about" className="hover:text-[#eec07b] transition">About</a>
                </div>
              </div>

              <div>
                <p className="text-sm tracking-[0.12em] text-[#eec07b] uppercase">Connect</p>
                <div className="mt-3 flex flex-col gap-2 text-white/90">
                  <a href="#" className="hover:text-[#eec07b] transition">Instagram</a>
                  <a href="#" className="hover:text-[#eec07b] transition">Facebook</a>
                  <a href="#" className="hover:text-[#eec07b] transition">Email Us</a>
                  <a href="#" className="hover:text-[#eec07b] transition">Reserve Now</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/15 pt-5 text-sm text-white/65 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Floating Adventures. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/policy.html" className="hover:text-[#eec07b] transition">Privacy Policy</a>
              <span className="text-white/30">|</span>
              <a href="/charter-regulations.html" className="hover:text-[#eec07b] transition">Charter Regulations</a>
              <span className="text-white/30">|</span>
              <p>Designed for Caribbean Luxury Charters</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
