'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────
   Constants — tweak card size here
───────────────────────────────────────────────────────────────*/
const CARD_W = 280   // px
const CARD_H = 500   // px
const GAP    = 24    // px between cards

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────*/
export interface VideoReel {
  src: string
  poster?: string
  title?: string
  caption?: string
  socialHandle?: string
  socialPlatform?: 'instagram' | 'tiktok' | 'youtube' | string
  link?: string
  linkLabel?: string
}

interface VideoReelCarouselProps {
  reels: VideoReel[]
  heading?: string
  subheading?: string
  autoAdvanceMs?: number
  className?: string
}

/* ─────────────────────────────────────────────────────────────
   Inline social icons
───────────────────────────────────────────────────────────────*/
function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  if (platform === 'instagram')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  if (platform === 'tiktok')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    )
  if (platform === 'youtube')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  return null
}

/* ─────────────────────────────────────────────────────────────
   Individual Reel Card
───────────────────────────────────────────────────────────────*/
function ReelCard({
  reel,
  isActive,
  distance,
  onClick,
}: {
  reel: VideoReel
  isActive: boolean
  distance: number
  onClick: () => void
}) {
  const videoRef              = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted,   setIsMuted]   = useState(true)   // start muted (browser autoplay policy)
  const [isHovering, setIsHovering] = useState(false)

  /* Sync isPlaying from actual video events */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlay  = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener('play',  onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('play',  onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  /* Play / pause when active state changes */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isActive) {
      v.currentTime = 0
      v.muted = isMuted
      v.play().catch(() => {})
    } else {
      v.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  /* ── Controls ── */
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isActive) { onClick(); return }      // clicking inactive → navigate, not play
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else          v.pause()
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const abs     = Math.abs(distance)
  const scale   = isActive ? 1 : Math.max(0.80, 1 - abs * 0.10)
  const opacity = isActive ? 1 : Math.max(0.40, 1 - abs * 0.30)

  /* Show center play/pause: always on active, or when inactive + paused */
  const showPlayPause = isActive

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex-shrink-0 cursor-pointer select-none"
      style={{
        width:  CARD_W,
        height: CARD_H,
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.6s cubic-bezier(0.34,1.4,0.64,1), opacity 0.5s ease',
        zIndex: isActive ? 10 : Math.max(1, 6 - abs),
      }}
    >
      <div
        className="relative w-full h-full rounded-[26px] overflow-hidden"
        style={{
          boxShadow: isActive
            ? '0 32px 80px rgba(0,0,0,0.75), 0 0 0 2px rgba(201,162,39,0.65)'
            : '0 10px 35px rgba(0,0,0,0.45)',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* ── Video ── */}
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,61,46,0.95) 0%, rgba(10,61,46,0.45) 40%, transparent 68%)',
          }}
        />

        {/* ── Centre Play / Pause button ── */}
        {showPlayPause && (
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="absolute inset-0 flex items-center justify-center z-10 group/pb"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {/* Only visible on hover or when paused */}
            <span
              className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold-primary/80 bg-black/40 backdrop-blur-sm transition-all duration-300"
              style={{
                opacity:   isPlaying && !isHovering ? 0 : 1,
                transform: isPlaying && !isHovering ? 'scale(0.8)' : 'scale(1)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                boxShadow: '0 0 24px rgba(201,162,39,0.35)',
              }}
            >
              {isPlaying ? (
                /* Pause icon */
                <svg className="w-6 h-6 text-gold-primary" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play icon */
                <svg className="w-6 h-6 text-gold-primary ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              )}
            </span>
          </button>
        )}

        {/* ── Top-right: social badge + mute button (stacked) ── */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
          {/* Social badge */}
          {reel.socialPlatform && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <SocialIcon platform={reel.socialPlatform} className="w-3.5 h-3.5 text-white" />
              <span className="font-accent text-[10px] text-white/90 tracking-wide capitalize">
                {reel.socialPlatform}
              </span>
            </div>
          )}

          {/* Mute / Unmute — only on active card */}
          {isActive && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/15 text-white hover:border-gold-primary hover:text-gold-primary transition-all duration-250 hover:scale-110"
            >
              {isMuted ? (
                /* Muted icon — speaker with x */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                /* Unmuted icon — speaker with waves */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Top-left: playing/live dot */}
        {isActive && (
          <div className="absolute top-4 left-4 z-20 w-7 h-7 rounded-full border-2 border-gold-primary flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full bg-gold-primary ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
        )}

        {/* Bottom: info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5 z-10">
          {reel.socialHandle && (
            <span className="font-accent text-[11px] text-gold-primary tracking-wide">
              {reel.socialHandle}
            </span>
          )}
          {reel.title && (
            <h3
              className="font-heading text-[19px] leading-snug text-white"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              {reel.title}
            </h3>
          )}
          {reel.caption && (
            <p className="font-body text-[12px] text-white/70 leading-relaxed line-clamp-2">
              {reel.caption}
            </p>
          )}
          {reel.link && (
            <Link
              href={reel.link}
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-[11px] font-accent font-semibold tracking-wide text-emerald-deep bg-gradient-to-r from-gold-primary to-gold-light shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {reel.linkLabel ?? 'Watch Now'}
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3l7 5-7 5V3z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Carousel
───────────────────────────────────────────────────────────────*/
export default function VideoReelCarousel({
  reels,
  heading    = 'Our Reels',
  subheading = 'Real transformations, real results.',
  autoAdvanceMs = 7000,
  className  = '',
}: VideoReelCarouselProps) {
  const [activeIndex, setActiveIndex]   = useState(0)
  const [isHovered,   setIsHovered]     = useState(false)
  const [progress,    setProgress]      = useState(0)
  const [containerW,  setContainerW]    = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  /* Measure container width accurately */
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width)
    })
    ro.observe(containerRef.current)
    // Initial measurement
    setContainerW(containerRef.current.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  /* Navigation */
  const goTo = useCallback(
    (i: number) => {
      setActiveIndex(Math.max(0, Math.min(i, reels.length - 1)))
      setProgress(0)
    },
    [reels.length]
  )
  const next = useCallback(
    () => setActiveIndex((i) => { setProgress(0); return (i + 1) % reels.length }),
    [reels.length]
  )
  const prev = useCallback(
    () => setActiveIndex((i) => { setProgress(0); return (i - 1 + reels.length) % reels.length }),
    [reels.length]
  )

  /* Auto-advance */
  useEffect(() => {
    if (!autoAdvanceMs || isHovered) return
    const id = setInterval(next, autoAdvanceMs)
    return () => clearInterval(id)
  }, [autoAdvanceMs, isHovered, next])

  /* Progress bar */
  useEffect(() => {
    if (!autoAdvanceMs || isHovered) { setProgress(0); return }
    setProgress(0)
    const step = 100 / (autoAdvanceMs / 50)
    const id = setInterval(() => setProgress((p) => Math.min(p + step, 100)), 50)
    return () => clearInterval(id)
  }, [activeIndex, autoAdvanceMs, isHovered])

  /* Keyboard */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [next, prev])

  if (!reels.length) return null

  /*
    The critical centering math:
    trackX = containerWidth/2 - CARD_W/2 - activeIndex * (CARD_W + GAP)

    This places the active card's center exactly at the container's center.
    containerW is measured from the DOM via ResizeObserver.
  */
  const trackX = containerW > 0
    ? containerW / 2 - CARD_W / 2 - activeIndex * (CARD_W + GAP)
    : 0

  return (
    <section
      className={`relative py-24 ${className}`}
      style={{
        background: 'linear-gradient(160deg, #071e15 0%, #0A3D2E 45%, #061a10 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,162,39,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Top & bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.45), transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.3), transparent)' }} />

      {/* Header */}
      <div className="text-center mb-14 px-6">
        <p className="font-accent text-[11px] tracking-wide-5 text-gold-primary uppercase mb-4">
          BEHIND THE CHAIR
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white mb-3">
          {heading}
        </h2>
        <p className="font-body text-sm text-white/50 max-w-md mx-auto">
          {subheading}
        </p>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: CARD_H + 60 }}        /* extra headroom for scale(1) card */
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left edge fade mask */}
        <div
          className="absolute inset-y-0 left-0 w-40 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #071e15 0%, transparent 100%)' }}
        />
        {/* Right edge fade mask */}
        <div
          className="absolute inset-y-0 right-0 w-40 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #061a10 0%, transparent 100%)' }}
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center border border-gold-primary/40 text-gold-primary bg-black/40 backdrop-blur-sm hover:bg-gold-primary hover:text-emerald-deep transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M11 3L4 8l7 5V3z" /></svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center border border-gold-primary/40 text-gold-primary bg-black/40 backdrop-blur-sm hover:bg-gold-primary hover:text-emerald-deep transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l7 5-7 5V3z" /></svg>
        </button>

        {/* Sliding track — overflow clipped by parent */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 flex items-center"
            style={{
              gap: GAP,
              transform: `translate(${trackX}px, -50%)`,
              transition: 'transform 0.65s cubic-bezier(0.34,1.2,0.64,1)',
              willChange: 'transform',
            }}
          >
            {reels.map((reel, i) => (
              <ReelCard
                key={i}
                reel={reel}
                isActive={i === activeIndex}
                distance={i - activeIndex}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {autoAdvanceMs > 0 && (
        <div className="flex justify-center mt-8">
          <div className="w-44 h-[3px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-primary to-gold-light"
              style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
            />
          </div>
        </div>
      )}

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {reels.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Reel ${i + 1}`}
            style={{
              width:  i === activeIndex ? 28 : 7,
              height: 7,
              borderRadius: 999,
              background: i === activeIndex
                ? 'linear-gradient(135deg,#C9A227,#8B6914)'
                : 'rgba(255,255,255,0.25)',
              transition: 'width 0.4s ease, background 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center font-accent text-[11px] text-white/30 mt-4 tracking-wide">
        {activeIndex + 1} / {reels.length}
      </p>
    </section>
  )
}
