'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

const services = [
  { name: 'Haircut', price: '$85+', icon: '✂️' },
  { name: 'Color', price: '$150+', icon: '🎨' },
  { name: 'Balayage', price: '$220+', icon: '✨' },
  { name: 'Highlights', price: '$140+', icon: '☀️' },
  { name: 'Treatment', price: '$100+', icon: '💆' },
  { name: 'Blowout', price: '$65+', icon: '💨' },
  { name: 'Bridal', price: '$250+', icon: '👑' },
  { name: "Men's", price: '$65+', icon: '🧔' },
]

const stylists = [
  { name: 'Irina V.', specialty: 'Master Stylist' },
  { name: 'Marcus C.', specialty: 'Colorist' },
  { name: 'Sofia R.', specialty: 'Cutting' },
  { name: 'David K.', specialty: "Men's Expert" },
  { name: 'Emma T.', specialty: 'Treatments' },
  { name: 'Any Available', specialty: 'First Available' },
]

const times = ['9:00', '10:00', '11:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00']

const steps = ['Service', 'Stylist', 'Date & Time', 'Confirm']

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>('11:00')

  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">RESERVE YOUR EXPERIENCE</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep">Book Appointment</h1>
      </section>

      <section className="py-20 px-10 max-w-content mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center gap-16 mb-16">
          {steps.map((label, i) => (
            <div key={label} className="text-center">
              <div
                className={`w-12 h-12 rounded-full font-accent text-sm font-semibold flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                  step > i + 1
                    ? 'bg-gold-primary text-emerald-deep'
                    : step === i + 1
                    ? 'bg-emerald-deep text-gold-light'
                    : 'bg-neutral-mist text-neutral-slate'
                }`}
              >
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span
                className={`font-accent text-[10px] tracking-wide-2 ${
                  step >= i + 1 ? 'text-emerald-deep' : 'text-neutral-silver'
                }`}
              >
                {label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="card p-12">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <>
              <h3 className="font-heading text-3xl text-emerald-deep mb-8 text-center">
                Select Your Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all duration-300 ${
                      selectedService === service.name
                        ? 'border-gold-primary bg-gold-champagne/30'
                        : 'border-emerald-deep/15 hover:border-gold-primary/50'
                    }`}
                  >
                    <span className="text-3xl">{service.icon}</span>
                    <div className="flex-1">
                      <p className="font-heading text-lg text-emerald-rich">{service.name}</p>
                    </div>
                    <span className="font-accent text-sm text-gold-primary">{service.price}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Choose Stylist */}
          {step === 2 && (
            <>
              <h3 className="font-heading text-3xl text-emerald-deep mb-8 text-center">
                Choose Your Stylist
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.name}
                    onClick={() => setSelectedStylist(stylist.name)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer text-center transition-all duration-300 ${
                      selectedStylist === stylist.name
                        ? 'border-gold-primary bg-gold-champagne/30'
                        : 'border-emerald-deep/15 hover:border-gold-primary/50'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-pale flex items-center justify-center mx-auto mb-3">
                      <span className="font-display text-xl text-emerald-deep">
                        {stylist.name.split(' ')[0][0]}
                      </span>
                    </div>
                    <p className="font-heading text-base text-emerald-rich mb-1">{stylist.name}</p>
                    <p className="font-body text-xs text-neutral-stone">{stylist.specialty}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <>
              <h3 className="font-heading text-3xl text-emerald-deep mb-8 text-center">
                Select Date & Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="form-label">SELECT DATE</label>
                  <input type="date" className="form-input" />
                </div>
                <div>
                  <label className="form-label">SELECT TIME</label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-lg border font-accent text-[11px] transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-gold-primary text-emerald-deep border-gold-primary'
                            : 'border-emerald-deep/20 text-neutral-slate hover:border-gold-primary'
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

          {/* Step 4: Confirm */}
          {step === 4 && (
            <>
              <h3 className="font-heading text-3xl text-emerald-deep mb-8 text-center">
                Confirm Your Booking
              </h3>

              {/* Summary */}
              <div className="p-8 rounded-2xl bg-gold-champagne/30 mb-8">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: 'SERVICE', value: selectedService || 'Haircut' },
                    { label: 'STYLIST', value: selectedStylist || 'Irina V.' },
                    { label: 'DATE & TIME', value: `March 15, 2026 • ${selectedTime || '11:00'} AM` },
                    { label: 'ESTIMATED PRICE', value: '$85+' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="font-accent text-[10px] tracking-wide-2 text-gold-primary mb-1">
                        {item.label}
                      </p>
                      <p className="font-heading text-lg text-emerald-rich">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">YOUR NAME</label>
                  <input type="text" placeholder="Full name" className="form-input" />
                </div>
                <div>
                  <label className="form-label">PHONE</label>
                  <input type="tel" placeholder="(555) 123-4567" className="form-input" />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">EMAIL</label>
                  <input type="email" placeholder="your@email.com" className="form-input" />
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-8 border-t border-gold-primary/15">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">
                ← BACK
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => (step < 4 ? setStep(step + 1) : null)}
              className="btn-primary"
            >
              {step === 4 ? 'CONFIRM BOOKING' : 'CONTINUE →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
