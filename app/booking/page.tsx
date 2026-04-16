'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────*/
const services = [
  { name: 'Haircut', icon: '✂️', desc: 'Precision cut & style' },
  { name: 'Color', icon: '🎨', desc: 'Full or partial color' },
  { name: 'Balayage', icon: '✨', desc: 'Hand-painted dimension' },
  { name: 'Highlights', icon: '☀️', desc: 'Foil highlights' },
  { name: 'Treatment', icon: '💆', desc: 'Keratin / blowout' },
  { name: 'Blowout & Style', icon: '💨', desc: 'Shampoo & styling' },
  { name: 'Bridal', icon: '👑', desc: 'Wedding & special events' },
  { name: "Men's Grooming", icon: '🧔', desc: 'Cut, beard & cleanup' },
]

const stylists = [
  { name: 'Irina', specialty: 'Master Stylist & Colorist', initials: 'I' },
]

const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']

const steps = ['Service', 'Stylist', 'Date & Time', 'Confirm']

/* ─────────────────────────────────────────────────────────────
   Toast Component
───────────────────────────────────────────────────────────────*/
function Toast({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, 6000)
    return () => clearTimeout(id)
  }, [onClose])

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex items-start gap-4 max-w-sm w-full"
      style={{ animation: 'slideUpFade 0.4s cubic-bezier(0.34,1.4,0.64,1) forwards' }}
    >
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
      `}</style>

      <div
        className="w-full rounded-2xl p-5 flex items-start gap-4 shadow-2xl border"
        style={{
          background: type === 'success'
            ? 'linear-gradient(135deg, #0A3D2E, #0D5740)'
            : 'linear-gradient(135deg, #3D0A0A, #5C1A1A)',
          borderColor: type === 'success' ? 'rgba(201,162,39,0.5)' : 'rgba(180,60,60,0.5)',
        }}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: type === 'success' ? 'rgba(201,162,39,0.2)' : 'rgba(200,60,60,0.2)', border: `1px solid ${type === 'success' ? 'rgba(201,162,39,0.5)' : 'rgba(200,60,60,0.5)'}` }}
        >
          {type === 'success' ? (
            <svg className="w-5 h-5 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" style={{ color: '#e05555' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="font-accent text-[12px] tracking-wide mb-1" style={{ color: type === 'success' ? '#C9A227' : '#e07070' }}>
            {type === 'success' ? 'BOOKING CONFIRMED' : 'BOOKING FAILED'}
          </p>
          <p className="font-body text-sm text-white/90 leading-relaxed">{message}</p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white/80 transition-colors mt-0.5"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Booking Summary Card
───────────────────────────────────────────────────────────────*/
function SummaryRow({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gold-primary/15 last:border-0">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-gold-champagne/50 flex items-center justify-center text-xl flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className="font-accent text-[10px] tracking-wide-2 text-gold-primary mb-0.5">{label}</p>
        <p className="font-heading text-lg text-emerald-deep">{value}</p>
      </div>
      <svg className="w-4 h-4 text-gold-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Booking Page
───────────────────────────────────────────────────────────────*/
export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService]   = useState<typeof services[0] | null>(null)
  const [selectedStylist, setSelectedStylist]   = useState<typeof stylists[0] | null>(null)
  const [selectedDate,    setSelectedDate]       = useState('')
  const [selectedTime,    setSelectedTime]       = useState('11:00 AM')
  const [name,            setName]               = useState('')
  const [phone,           setPhone]              = useState('')
  const [email,           setEmail]              = useState('')
  const [notes,           setNotes]              = useState('')
  const [isSubmitting,    setIsSubmitting]       = useState(false)
  const [toast,           setToast]              = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const canContinue = () => {
    if (step === 1) return !!selectedService
    if (step === 2) return !!selectedStylist
    if (step === 3) return !!selectedDate && !!selectedTime
    if (step === 4) return name.trim().length > 1 && phone.trim().length > 6 && email.includes('@')
    return false
  }

  const handleSubmit = async () => {
    if (!canContinue()) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800))
    setIsSubmitting(false)
    // 90% success for demo
    const success = Math.random() > 0.1
    if (success) {
      setToast({
        type: 'success',
        message: `Your appointment for ${selectedService?.name} with ${selectedStylist?.name} on ${formatDate(selectedDate)} at ${selectedTime} is confirmed! We'll send a reminder to ${email}.`,
      })
      // Reset to step 1 after success
      setTimeout(() => {
        setStep(1)
        setSelectedService(null)
        setSelectedStylist(null)
        setSelectedDate('')
        setSelectedTime('11:00 AM')
        setName('')
        setPhone('')
        setEmail('')
        setNotes('')
      }, 1000)
    } else {
      setToast({
        type: 'error',
        message: 'We couldn\'t confirm your booking right now. Please call us directly or try again in a moment.',
      })
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="animate-fade-in pt-32 pb-24">
      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">RESERVE YOUR EXPERIENCE</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep">Book Appointment</h1>
        <p className="font-body text-base text-neutral-stone max-w-md mx-auto mt-4">
          A few simple steps to your next beautiful transformation.
        </p>
      </section>

      <section className="py-16 px-6 md:px-10 max-w-content-sm mx-auto">
        {/* ── Step Progress ── */}
        <div className="flex items-center justify-center mb-14">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => step > i + 1 && setStep(i + 1)}
                  className={`w-11 h-11 rounded-full font-accent text-sm font-semibold flex items-center justify-center transition-all duration-400 ${
                    step > i + 1
                      ? 'bg-gold-primary text-emerald-deep cursor-pointer hover:scale-110 shadow-gold'
                      : step === i + 1
                      ? 'bg-emerald-deep text-gold-light shadow-emerald'
                      : 'bg-neutral-mist text-neutral-silver cursor-default'
                  }`}
                >
                  {step > i + 1 ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </button>
                <span className={`font-accent text-[10px] tracking-wide-2 mt-2 whitespace-nowrap ${step >= i + 1 ? 'text-emerald-deep' : 'text-neutral-silver'}`}>
                  {label.toUpperCase()}
                </span>
              </div>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="w-16 md:w-24 h-[2px] mx-2 mb-5 rounded-full overflow-hidden bg-neutral-mist">
                  <div
                    className="h-full bg-gold-primary rounded-full transition-all duration-500"
                    style={{ width: step > i + 1 ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Step Content Card ── */}
        <div className="card p-8 md:p-12">

          {/* ── STEP 1: Service ── */}
          {step === 1 && (
            <>
              <h2 className="font-heading text-3xl text-emerald-deep mb-2 text-center">Select Your Service</h2>
              <p className="font-body text-sm text-neutral-stone text-center mb-10">What are you coming in for today?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setSelectedService(service)}
                    className={`p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-300 group ${
                      selectedService?.name === service.name
                        ? 'border-gold-primary bg-gradient-to-r from-gold-champagne/50 to-gold-champagne/20 shadow-gold'
                        : 'border-emerald-deep/15 hover:border-gold-primary/50 hover:bg-gold-champagne/10'
                    }`}
                  >
                    <span className="text-3xl">{service.icon}</span>
                    <div className="flex-1">
                      <p className="font-heading text-lg text-emerald-rich">{service.name}</p>
                      <p className="font-body text-xs text-neutral-stone">{service.desc}</p>
                    </div>
                    {selectedService?.name === service.name && (
                      <div className="w-6 h-6 rounded-full bg-gold-primary flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-emerald-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── STEP 2: Stylist ── */}
          {step === 2 && (
            <>
              <h2 className="font-heading text-3xl text-emerald-deep mb-2 text-center">Choose Your Stylist</h2>
              <p className="font-body text-sm text-neutral-stone text-center mb-10">Who would you like to work with?</p>
              <div className="flex flex-wrap justify-center gap-6">
                {stylists.map((stylist) => (
                  <button
                    key={stylist.name}
                    onClick={() => setSelectedStylist(stylist)}
                    className={`w-52 p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                      selectedStylist?.name === stylist.name
                        ? 'border-gold-primary bg-gradient-to-b from-gold-champagne/50 to-gold-champagne/10 shadow-gold'
                        : 'border-emerald-deep/15 hover:border-gold-primary/50'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-pale flex items-center justify-center mx-auto mb-4 border-2 border-gold-primary/30">
                      <span className="font-display text-2xl text-emerald-deep">{stylist.initials}</span>
                    </div>
                    <p className="font-heading text-lg text-emerald-rich mb-1">{stylist.name}</p>
                    <p className="font-body text-xs text-neutral-stone">{stylist.specialty}</p>
                    {selectedStylist?.name === stylist.name && (
                      <div className="mt-4 inline-flex items-center gap-1 text-gold-primary">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-accent text-[10px] tracking-wide">SELECTED</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── STEP 3: Date & Time ── */}
          {step === 3 && (
            <>
              <h2 className="font-heading text-3xl text-emerald-deep mb-2 text-center">Pick a Date & Time</h2>
              <p className="font-body text-sm text-neutral-stone text-center mb-10">When would you like to come in?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="form-label">SELECT DATE</label>
                  <input
                    type="date"
                    className="form-input"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  {selectedDate && (
                    <p className="font-body text-xs text-gold-primary mt-2">
                      📅 {formatDate(selectedDate)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="form-label">SELECT TIME</label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl border font-accent text-[11px] transition-all duration-250 ${
                          selectedTime === time
                            ? 'bg-gold-primary text-emerald-deep border-gold-primary font-semibold shadow-gold'
                            : 'border-emerald-deep/20 text-neutral-slate hover:border-gold-primary hover:bg-gold-champagne/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 4: Confirm ── */}
          {step === 4 && (
            <>
              <h2 className="font-heading text-3xl text-emerald-deep mb-2 text-center">Confirm Your Booking</h2>
              <p className="font-body text-sm text-neutral-stone text-center mb-10">Review your selections and enter your details.</p>

              {/* Booking Summary */}
              <div className="rounded-2xl overflow-hidden border border-gold-primary/20 mb-10">
                {/* Header */}
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{ background: 'linear-gradient(135deg, #0A3D2E, #0D5740)' }}
                >
                  <svg className="w-5 h-5 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-accent text-[12px] tracking-wide-2 text-gold-primary">YOUR BOOKING SUMMARY</span>
                </div>
                {/* Rows */}
                <div className="px-6 bg-gradient-to-b from-gold-champagne/20 to-transparent">
                  <SummaryRow
                    label="SERVICE"
                    value={selectedService?.name ?? '—'}
                    icon={selectedService?.icon}
                  />
                  <SummaryRow
                    label="STYLIST"
                    value={selectedStylist?.name ?? '—'}
                    icon="💇"
                  />
                  <SummaryRow
                    label="DATE"
                    value={selectedDate ? formatDate(selectedDate) : '—'}
                    icon="📅"
                  />
                  <SummaryRow
                    label="TIME"
                    value={selectedTime}
                    icon="🕐"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-5">
                <h3 className="font-heading text-xl text-emerald-deep">Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">FULL NAME *</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">PHONE *</label>
                    <input
                      type="tel"
                      placeholder="(720) 555-0100"
                      className="form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">EMAIL *</label>
                    <input
                      type="email"
                      placeholder="jane@email.com"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">NOTES (OPTIONAL)</label>
                    <textarea
                      rows={3}
                      placeholder="Any notes, requests, or allergies we should know about…"
                      className="form-input resize-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Navigation Buttons ── */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gold-primary/15">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M11 3L4 8l7 5V3z" /></svg>
                BACK
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => canContinue() && setStep(step + 1)}
                disabled={!canContinue()}
                className={`btn-primary flex items-center gap-2 transition-opacity duration-300 ${!canContinue() ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                CONTINUE
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l7 5-7 5V3z" /></svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canContinue() || isSubmitting}
                className={`px-10 py-4 rounded-full font-accent text-[12px] font-semibold tracking-wide-2 flex items-center gap-3 transition-all duration-300 ${
                  !canContinue() || isSubmitting
                    ? 'bg-neutral-mist text-neutral-silver cursor-not-allowed'
                    : 'bg-gold-gradient text-emerald-deep shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    CONFIRMING…
                  </>
                ) : (
                  <>
                    CONFIRM BOOKING
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Help text */}
        <p className="text-center font-body text-xs text-neutral-stone mt-8">
          Prefer to call?{' '}
          <a href="tel:+17205550134" className="text-gold-primary hover:text-emerald-deep transition-colors">
            (720) 555-0134
          </a>{' '}
          · Appointments confirmed via email within 30 minutes.
        </p>
      </section>
    </div>
  )
}
