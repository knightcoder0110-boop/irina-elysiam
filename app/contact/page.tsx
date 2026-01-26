import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Irina Elysian Hair Design Studio. Visit us in Beverly Hills or send us a message.',
}

const hours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 5:00 PM' },
]

export default function ContactPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
        <p className="section-label">GET IN TOUCH</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep">Contact Us</h1>
      </section>

      <section className="py-[100px] px-10 max-w-container-md mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="card p-12">
            <h3 className="font-heading text-3xl text-emerald-deep mb-8">Send Us a Message</h3>

            <form className="flex flex-col gap-6">
              <div>
                <label className="form-label">YOUR NAME</label>
                <input type="text" placeholder="Enter your name" className="form-input" />
              </div>

              <div>
                <label className="form-label">EMAIL ADDRESS</label>
                <input type="email" placeholder="your@email.com" className="form-input" />
              </div>

              <div>
                <label className="form-label">PHONE NUMBER</label>
                <input type="tel" placeholder="(555) 123-4567" className="form-input" />
              </div>

              <div>
                <label className="form-label">MESSAGE</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  className="form-input resize-y"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Address */}
            <div className="p-10 rounded-3xl bg-emerald-gradient">
              <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
                VISIT US
              </h4>
              <p className="font-heading text-xl text-neutral-pearl leading-relaxed">
                123 Elysian Boulevard
                <br />
                Suite 200
                <br />
                Beverly Hills, CA 90210
              </p>
            </div>

            {/* Hours */}
            <div className="card p-10">
              <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
                HOURS
              </h4>
              {hours.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between pb-3 mb-3 ${
                    i < hours.length - 1 ? 'border-b border-gold-primary/15' : ''
                  }`}
                >
                  <span className="font-body text-sm text-neutral-charcoal">{item.day}</span>
                  <span className="font-accent text-[12px] text-emerald-deep">{item.hours}</span>
                </div>
              ))}
            </div>

            {/* Contact Details */}
            <div className="p-10 rounded-3xl bg-gold-champagne/50">
              <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
                CONTACT
              </h4>
              <p className="font-body text-base text-emerald-deep mb-3">📞 (310) 555-HAIR</p>
              <p className="font-body text-base text-emerald-deep mb-3">
                ✉️ hello@irinaelysian.com
              </p>
              <p className="font-body text-base text-emerald-deep">📸 @irinaelysian</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
