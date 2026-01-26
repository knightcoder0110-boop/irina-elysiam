import React, { useState, useEffect } from 'react';

const IrinaElysianWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const colors = {
    emerald: { deep: '#0A3D2E', rich: '#0D5740', medium: '#147858', light: '#1A9E70', pale: '#E8F5F0' },
    gold: { deep: '#8B6914', rich: '#B8860B', primary: '#C9A227', light: '#D4B847', champagne: '#F0E6C8', shimmer: '#E8D48A' },
    neutral: { black: '#0D0D0D', charcoal: '#1A1A1A', graphite: '#2D2D2D', slate: '#4A4A4A', stone: '#6B6B6B', silver: '#9B9B9B', mist: '#D4D4D4', pearl: '#F5F1E8', cream: '#FAF8F3', white: '#FFFFFF' },
    accent: { rose: '#8B4557', burgundy: '#5C1A33', bronze: '#8B5A2B', sage: '#7D8471' }
  };

  const typography = {
    display: "'Playfair Display', Georgia, serif",
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Raleway', 'Helvetica Neue', sans-serif",
    accent: "'Montserrat', 'Helvetica Neue', sans-serif"
  };

  const bgColor = colors.neutral.cream;
  const textColor = colors.neutral.charcoal;
  const cardBg = colors.neutral.white;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navigation = () => (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      backdropFilter: 'blur(20px)',
      backgroundColor: scrolled ? 'rgba(250, 248, 243, 0.95)' : 'transparent',
      borderBottom: scrolled ? `1px solid ${colors.emerald.deep}15` : 'none',
      transition: 'all 0.4s ease'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
          <div style={{
            width: '50px', height: '50px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 20px ${colors.gold.primary}40`
          }}>
            <span style={{ fontFamily: typography.display, fontSize: '20px', fontWeight: 700, color: colors.emerald.deep }}>IE</span>
          </div>
          <div>
            <h1 style={{
              fontFamily: typography.display, fontSize: '22px', fontWeight: 600, letterSpacing: '3px', margin: 0,
              background: `linear-gradient(135deg, ${colors.emerald.deep}, ${colors.emerald.rich})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>IRINA ELYSIAN</h1>
            <p style={{ fontFamily: typography.accent, fontSize: '9px', letterSpacing: '3px', margin: 0, color: colors.gold.primary, textTransform: 'uppercase' }}>Hair Design Studio</p>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['home', 'services', 'about', 'gallery', 'team', 'testimonials', 'contact'].map(id => (
            <span key={id} onClick={() => setCurrentPage(id)} style={{
              fontFamily: typography.accent, fontSize: '11px', letterSpacing: '2px', cursor: 'pointer',
              color: currentPage === id ? colors.emerald.deep : colors.neutral.slate,
              borderBottom: currentPage === id ? `2px solid ${colors.gold.primary}` : '2px solid transparent',
              paddingBottom: '4px', transition: 'all 0.3s ease', textTransform: 'uppercase'
            }}>{id === 'testimonials' ? 'Reviews' : id.charAt(0).toUpperCase() + id.slice(1)}</span>
          ))}
        </nav>
        <button onClick={() => setCurrentPage('booking')} style={{
          padding: '14px 32px', borderRadius: '50px', border: 'none',
          background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`,
          color: colors.emerald.deep, fontFamily: typography.accent, fontSize: '11px',
          fontWeight: 600, letterSpacing: '2px', cursor: 'pointer',
          boxShadow: `0 4px 20px ${colors.gold.primary}40`, transition: 'all 0.3s ease'
        }}>BOOK NOW</button>
      </div>
    </header>
  );

  const HomePage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse at 30% 20%, ${colors.gold.champagne}40 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, ${colors.emerald.pale}60 0%, transparent 50%),
                     linear-gradient(135deg, ${colors.neutral.cream}, ${colors.neutral.pearl})`
      }}>
        <div style={{ position: 'absolute', top: '15%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', border: `1px solid ${colors.gold.primary}20`, animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '200px', height: '200px', borderRadius: '50%', background: `linear-gradient(135deg, ${colors.gold.primary}10, transparent)`, animation: 'float 6s ease-in-out infinite reverse' }} />
        
        <div style={{ textAlign: 'center', maxWidth: '900px', padding: '40px', zIndex: 10 }}>
          <p style={{ fontFamily: typography.accent, fontSize: '13px', letterSpacing: '8px', color: colors.gold.primary, marginBottom: '24px', textTransform: 'uppercase' }}>Divine Beauty, For Everyone</p>
          <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 600, letterSpacing: '4px', margin: '0 0 32px', lineHeight: 1.1, color: colors.emerald.deep }}>
            Where Artistry
            <span style={{ display: 'block', background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Meets Elegance</span>
          </h1>
          <p style={{ fontFamily: typography.body, fontSize: '18px', lineHeight: 1.8, color: colors.neutral.slate, maxWidth: '600px', margin: '0 auto 48px' }}>
            Experience transformative hair design crafted with supreme skill and heavenly care. Every visit is a journey to your most radiant self.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage('booking')} style={{
              padding: '18px 48px', borderRadius: '50px', border: 'none',
              background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`,
              color: colors.emerald.deep, fontFamily: typography.accent, fontSize: '12px',
              fontWeight: 600, letterSpacing: '3px', cursor: 'pointer',
              boxShadow: `0 8px 30px ${colors.gold.primary}40`
            }}>RESERVE YOUR EXPERIENCE</button>
            <button onClick={() => setCurrentPage('services')} style={{
              padding: '18px 48px', borderRadius: '50px', border: `2px solid ${colors.emerald.deep}`,
              backgroundColor: 'transparent', color: colors.emerald.deep,
              fontFamily: typography.accent, fontSize: '12px', fontWeight: 500,
              letterSpacing: '3px', cursor: 'pointer'
            }}>EXPLORE SERVICES</button>
          </div>
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ fontFamily: typography.accent, fontSize: '10px', letterSpacing: '3px', color: colors.neutral.silver, marginBottom: '12px' }}>SCROLL TO DISCOVER</p>
          <div style={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, ${colors.gold.primary}, transparent)`, margin: '0 auto', animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      <section style={{ padding: '120px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>OUR EXPERTISE</p>
          <h2 style={{ fontFamily: typography.display, fontSize: 'clamp(36px, 5vw, 56px)', color: colors.emerald.deep, margin: 0 }}>Signature Services</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {[
            { icon: '✂️', title: 'Precision Cutting', description: 'Master-level cuts tailored to your face shape, lifestyle, and personal style.', price: 'From $75' },
            { icon: '🎨', title: 'Color Artistry', description: 'Balayage, highlights, full color—dimensional, natural-looking results.', price: 'From $150' },
            { icon: '✨', title: 'Treatments & Care', description: 'Keratin treatments, deep conditioning, and scalp therapies.', price: 'From $100' },
            { icon: '👑', title: 'Bridal & Special', description: 'Picture-perfect styling for your most important moments.', price: 'From $250' }
          ].map((service, i) => (
            <div key={i} style={{
              padding: '48px', borderRadius: '24px', backgroundColor: cardBg,
              border: `1px solid ${colors.emerald.deep}10`,
              boxShadow: `0 4px 30px ${colors.neutral.mist}40`, cursor: 'pointer'
            }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.gold.champagne}, ${colors.gold.primary}20)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px', fontSize: '32px'
              }}>{service.icon}</div>
              <h3 style={{ fontFamily: typography.heading, fontSize: '26px', fontWeight: 500, color: colors.emerald.deep, marginBottom: '16px' }}>{service.title}</h3>
              <p style={{ fontFamily: typography.body, fontSize: '15px', lineHeight: 1.7, color: colors.neutral.slate, marginBottom: '24px' }}>{service.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: `1px solid ${colors.gold.primary}20` }}>
                <span style={{ fontFamily: typography.display, fontSize: '20px', color: colors.gold.primary }}>{service.price}</span>
                <span style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '2px', color: colors.emerald.deep }}>LEARN MORE →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '120px 40px',
        background: `linear-gradient(135deg, ${colors.emerald.deep}, ${colors.emerald.rich})`,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${colors.gold.primary}08 20px, ${colors.gold.primary}08 21px)`
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.light})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 40px', fontSize: '36px'
          }}>👑</div>
          <h2 style={{ fontFamily: typography.display, fontSize: 'clamp(32px, 5vw, 52px)', color: colors.gold.light, marginBottom: '24px', fontStyle: 'italic' }}>"Divine Beauty, For Everyone"</h2>
          <p style={{ fontFamily: typography.body, fontSize: '18px', lineHeight: 1.9, color: colors.neutral.pearl, maxWidth: '700px', margin: '0 auto 48px' }}>
            At Irina Elysian, we believe premium quality shouldn't be exclusive. We serve every guest—women, men, children, families—with the same unwavering dedication to excellence.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginTop: '60px' }}>
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '10K+', label: 'Happy Clients' },
              { number: '25+', label: 'Expert Stylists' },
              { number: '50+', label: 'Awards Won' }
            ].map((stat, i) => (
              <div key={i}>
                <p style={{ fontFamily: typography.display, fontSize: '48px', color: colors.gold.primary, marginBottom: '8px' }}>{stat.number}</p>
                <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '2px', color: colors.gold.champagne }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>CLIENT LOVE</p>
          <h2 style={{ fontFamily: typography.display, fontSize: 'clamp(36px, 5vw, 52px)', color: colors.emerald.deep }}>What They Say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {[
            { quote: "The attention to detail is extraordinary. I've never felt more confident.", name: 'Sarah M.', service: 'Balayage & Cut' },
            { quote: "A truly transformative experience. The whole family comes here now.", name: 'Michael R.', service: 'Family Styling' },
            { quote: "My wedding day hair was absolutely perfect. Worth every penny.", name: 'Emily K.', service: 'Bridal Services' }
          ].map((testimonial, i) => (
            <div key={i} style={{
              padding: '40px', borderRadius: '20px', backgroundColor: cardBg,
              border: `1px solid ${colors.gold.primary}15`,
              boxShadow: `0 4px 30px ${colors.neutral.mist}30`
            }}>
              <div style={{ fontSize: '40px', color: colors.gold.primary, marginBottom: '20px', opacity: 0.5 }}>"</div>
              <p style={{ fontFamily: typography.heading, fontSize: '18px', fontStyle: 'italic', lineHeight: 1.7, color: colors.neutral.charcoal, marginBottom: '28px' }}>{testimonial.quote}</p>
              <div>
                <p style={{ fontFamily: typography.accent, fontSize: '13px', fontWeight: 600, color: colors.emerald.deep, marginBottom: '4px' }}>{testimonial.name}</p>
                <p style={{ fontFamily: typography.body, fontSize: '12px', color: colors.gold.primary }}>{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 40px', background: `linear-gradient(135deg, ${colors.gold.champagne}50, ${colors.neutral.pearl})`, textAlign: 'center' }}>
        <h2 style={{ fontFamily: typography.display, fontSize: 'clamp(32px, 4vw, 48px)', color: colors.emerald.deep, marginBottom: '20px' }}>Ready for Your Transformation?</h2>
        <p style={{ fontFamily: typography.body, fontSize: '16px', color: colors.neutral.slate, maxWidth: '500px', margin: '0 auto 40px' }}>
          Book your appointment today and discover the Irina Elysian difference.
        </p>
        <button onClick={() => setCurrentPage('booking')} style={{
          padding: '20px 60px', borderRadius: '50px', border: 'none',
          background: `linear-gradient(135deg, ${colors.emerald.deep}, ${colors.emerald.rich})`,
          color: colors.gold.light, fontFamily: typography.accent, fontSize: '13px',
          fontWeight: 600, letterSpacing: '3px', cursor: 'pointer',
          boxShadow: `0 8px 30px ${colors.emerald.deep}40`
        }}>BOOK YOUR APPOINTMENT</button>
      </section>
    </div>
  );

  const ServicesPage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
      <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.gold.champagne}30)` }}>
        <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>WHAT WE OFFER</p>
        <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep, marginBottom: '20px' }}>Our Services</h1>
        <p style={{ fontFamily: typography.body, fontSize: '18px', color: colors.neutral.slate, maxWidth: '600px', margin: '0 auto' }}>
          From precision cuts to transformative color, every service is executed with master-level technique.
        </p>
      </section>
      <section style={{ padding: '100px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        {[
          { title: 'Cutting & Styling', services: [
            { name: 'Signature Haircut', desc: 'Consultation, shampoo, precision cut, and style', price: '$85', time: '60 min' },
            { name: 'Express Cut', desc: 'Quick trim and refresh', price: '$55', time: '30 min' },
            { name: "Men's Grooming", desc: 'Cut, beard trim, and neck cleanup', price: '$65', time: '45 min' },
            { name: "Children's Cut", desc: 'Ages 12 and under', price: '$45', time: '30 min' },
            { name: 'Blowout & Style', desc: 'Shampoo and professional styling', price: '$65', time: '45 min' },
            { name: 'Special Occasion', desc: 'Updo or elaborate styling', price: '$120+', time: '90 min' }
          ]},
          { title: 'Color Artistry', services: [
            { name: 'Full Color', desc: 'Complete all-over color application', price: '$150+', time: '2 hrs' },
            { name: 'Root Touch-Up', desc: 'Refresh your color at the roots', price: '$95', time: '90 min' },
            { name: 'Balayage', desc: 'Hand-painted, natural-looking dimension', price: '$220+', time: '3 hrs' },
            { name: 'Full Highlights', desc: 'Foil highlights throughout', price: '$185+', time: '2.5 hrs' },
            { name: 'Partial Highlights', desc: 'Face-framing and top sections', price: '$140', time: '2 hrs' },
            { name: 'Gloss Treatment', desc: 'Shine-boosting toner treatment', price: '$65', time: '30 min' }
          ]},
          { title: 'Treatments & Care', services: [
            { name: 'Brazilian Blowout', desc: 'Smoothing treatment for frizz-free hair', price: '$300', time: '2.5 hrs' },
            { name: 'Keratin Treatment', desc: 'Long-lasting smoothing and shine', price: '$350', time: '3 hrs' },
            { name: 'Deep Conditioning', desc: 'Intensive moisture therapy', price: '$55', time: '30 min' },
            { name: 'Scalp Treatment', desc: 'Detoxifying and nourishing scalp therapy', price: '$75', time: '45 min' }
          ]}
        ].map((category, ci) => (
          <div key={ci} style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: typography.heading, fontSize: '36px', color: colors.emerald.deep, marginBottom: '40px', paddingBottom: '16px', borderBottom: `2px solid ${colors.gold.primary}30` }}>{category.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              {category.services.map((service, si) => (
                <div key={si} style={{
                  padding: '32px', borderRadius: '16px', backgroundColor: cardBg,
                  border: `1px solid ${colors.emerald.deep}10`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  boxShadow: `0 2px 20px ${colors.neutral.mist}30`
                }}>
                  <div>
                    <h4 style={{ fontFamily: typography.heading, fontSize: '22px', color: colors.emerald.deep, marginBottom: '8px' }}>{service.name}</h4>
                    <p style={{ fontFamily: typography.body, fontSize: '14px', color: colors.neutral.slate, marginBottom: '8px' }}>{service.desc}</p>
                    <span style={{ fontFamily: typography.accent, fontSize: '11px', color: colors.neutral.silver }}>{service.time}</span>
                  </div>
                  <p style={{ fontFamily: typography.display, fontSize: '24px', color: colors.gold.primary }}>{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ padding: '60px', borderRadius: '24px', background: `linear-gradient(135deg, ${colors.gold.champagne}40, ${colors.neutral.pearl})`, border: `1px solid ${colors.gold.primary}20`, textAlign: 'center' }}>
          <span style={{ fontSize: '48px', marginBottom: '24px', display: 'block' }}>👑</span>
          <h2 style={{ fontFamily: typography.display, fontSize: '42px', color: colors.emerald.deep, marginBottom: '16px' }}>Bridal Services</h2>
          <p style={{ fontFamily: typography.body, fontSize: '16px', color: colors.neutral.slate, maxWidth: '600px', margin: '0 auto 32px' }}>
            Your wedding day deserves perfection. Includes consultation, trial session, and day-of styling.
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ name: 'Bridal Trial', price: '$150' }, { name: 'Wedding Day Hair', price: '$300' }, { name: 'Bridal Party (each)', price: '$125' }].map((item, i) => (
              <div key={i} style={{ padding: '20px 32px', borderRadius: '12px', backgroundColor: cardBg, boxShadow: `0 2px 15px ${colors.neutral.mist}40` }}>
                <p style={{ fontFamily: typography.accent, fontSize: '12px', color: colors.emerald.deep, marginBottom: '4px' }}>{item.name}</p>
                <p style={{ fontFamily: typography.display, fontSize: '20px', color: colors.gold.primary }}>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
      <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.emerald.pale}30)` }}>
        <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>OUR STORY</p>
        <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep }}>About Irina Elysian</h1>
      </section>
      <section style={{ padding: '100px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h2 style={{ fontFamily: typography.heading, fontSize: '36px', color: colors.emerald.deep, marginBottom: '24px' }}>A Legacy of Excellence</h2>
            <p style={{ fontFamily: typography.body, fontSize: '16px', lineHeight: 1.8, color: colors.neutral.slate, marginBottom: '20px' }}>
              Founded in 2008 by master stylist Irina Volkov, our studio was born from a simple yet powerful belief: everyone deserves access to exceptional hair care.
            </p>
            <p style={{ fontFamily: typography.body, fontSize: '16px', lineHeight: 1.8, color: colors.neutral.slate }}>
              The name "Elysian" comes from the Greek concept of paradise—a heavenly realm of beauty and tranquility.
            </p>
          </div>
          <div style={{ height: '400px', borderRadius: '24px', background: `linear-gradient(135deg, ${colors.gold.champagne}, ${colors.emerald.pale})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '80px' }}>✨</span>
          </div>
        </div>
        <div style={{ padding: '60px', borderRadius: '24px', backgroundColor: cardBg, border: `1px solid ${colors.gold.primary}15`, boxShadow: `0 4px 30px ${colors.neutral.mist}30` }}>
          <h3 style={{ fontFamily: typography.display, fontSize: '32px', color: colors.emerald.deep, textAlign: 'center', marginBottom: '48px' }}>Our Core Values</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {[
              { title: 'Supreme Excellence', description: 'We never compromise on quality. Every service is executed with master-level precision.' },
              { title: 'Natural Elegance', description: 'We enhance your natural beauty, never mask it. Healthy hair is our foundation.' },
              { title: 'Inclusive Luxury', description: 'Premium service for everyone—regardless of age, gender, or background.' },
              { title: 'Continuous Growth', description: 'Our team constantly evolves, learning new techniques to serve you better.' }
            ].map((value, i) => (
              <div key={i}>
                <h4 style={{ fontFamily: typography.heading, fontSize: '22px', color: colors.gold.primary, marginBottom: '12px' }}>{value.title}</h4>
                <p style={{ fontFamily: typography.body, fontSize: '15px', lineHeight: 1.7, color: colors.neutral.slate }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const GalleryPage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
      <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.gold.champagne}30)` }}>
        <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>OUR WORK</p>
        <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep, marginBottom: '20px' }}>Gallery</h1>
        <p style={{ fontFamily: typography.body, fontSize: '18px', color: colors.neutral.slate, maxWidth: '600px', margin: '0 auto' }}>
          Browse our portfolio of transformations. Every style tells a story.
        </p>
      </section>
      <section style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
          {['All', 'Color', 'Cuts', 'Treatments', 'Bridal', 'Men'].map((cat, i) => (
            <button key={i} style={{
              padding: '12px 28px', borderRadius: '30px',
              border: i === 0 ? 'none' : `1px solid ${colors.emerald.deep}30`,
              backgroundColor: i === 0 ? colors.gold.primary : 'transparent',
              color: i === 0 ? colors.emerald.deep : colors.neutral.slate,
              fontFamily: typography.accent, fontSize: '11px', letterSpacing: '2px', cursor: 'pointer'
            }}>{cat.toUpperCase()}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { category: 'Balayage', style: colors.gold.champagne },
            { category: 'Precision Cut', style: colors.emerald.pale },
            { category: 'Bridal Updo', style: colors.accent.rose + '30' },
            { category: "Men's Grooming", style: colors.neutral.mist },
            { category: 'Color Correction', style: colors.gold.shimmer + '50' },
            { category: 'Brazilian Blowout', style: colors.emerald.pale },
            { category: 'Fashion Color', style: colors.accent.burgundy + '30' },
            { category: 'Natural Highlights', style: colors.gold.champagne },
            { category: 'Textured Layers', style: colors.neutral.pearl }
          ].map((item, i) => (
            <div key={i} style={{
              aspectRatio: '4/5', borderRadius: '20px',
              background: `linear-gradient(135deg, ${item.style}, ${colors.neutral.pearl})`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `1px solid ${colors.gold.primary}15`
            }}>
              <span style={{ fontSize: '48px', marginBottom: '20px' }}>✨</span>
              <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '2px', color: colors.emerald.deep }}>{item.category.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const TeamPage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
      <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.emerald.pale}30)` }}>
        <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>MEET THE ARTISTS</p>
        <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep, marginBottom: '20px' }}>Our Team</h1>
        <p style={{ fontFamily: typography.body, fontSize: '18px', color: colors.neutral.slate, maxWidth: '600px', margin: '0 auto' }}>
          Master stylists, color experts, and treatment specialists—united by a passion for transformative beauty.
        </p>
      </section>
      <section style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {[
            { name: 'Irina Volkov', role: 'Founder & Master Stylist', specialty: 'Color & Cutting', years: '20+ years', bio: 'Trained in Paris and Milan. Creator of the Elysian color technique.' },
            { name: 'Marcus Chen', role: 'Senior Colorist', specialty: 'Balayage & Vivids', years: '12 years', bio: 'Award-winning colorist specializing in dimensional color.' },
            { name: 'Sofia Rodriguez', role: 'Cutting Specialist', specialty: 'Precision Cuts', years: '8 years', bio: 'Known for transformative precision cuts and texture.' },
            { name: 'David Kim', role: "Men's Grooming Expert", specialty: 'Classic & Modern Barber', years: '10 years', bio: 'Master of traditional barbering with a modern edge.' },
            { name: 'Emma Thompson', role: 'Treatment Specialist', specialty: 'Keratin & Repair', years: '7 years', bio: 'Expert in restorative treatments and hair health.' },
            { name: 'Olivia Brown', role: 'Bridal Director', specialty: 'Special Occasions', years: '15 years', bio: 'Over 500 weddings styled with picture-perfect results.' }
          ].map((member, i) => (
            <div key={i} style={{ borderRadius: '24px', overflow: 'hidden', backgroundColor: cardBg, border: `1px solid ${colors.gold.primary}15`, boxShadow: `0 4px 30px ${colors.neutral.mist}30` }}>
              <div style={{ height: '200px', background: `linear-gradient(135deg, ${colors.gold.champagne}60, ${colors.emerald.pale}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: cardBg, border: `3px solid ${colors.gold.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: typography.display, fontSize: '32px', color: colors.emerald.deep }}>{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <div style={{ padding: '28px' }}>
                <h3 style={{ fontFamily: typography.heading, fontSize: '22px', color: colors.emerald.deep, marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ fontFamily: typography.accent, fontSize: '10px', letterSpacing: '1px', color: colors.gold.primary, marginBottom: '16px' }}>{member.role}</p>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: colors.emerald.pale, fontFamily: typography.body, fontSize: '11px', color: colors.emerald.deep }}>{member.specialty}</span>
                  <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: colors.gold.champagne, fontFamily: typography.body, fontSize: '11px', color: colors.gold.deep }}>{member.years}</span>
                </div>
                <p style={{ fontFamily: typography.body, fontSize: '14px', lineHeight: 1.6, color: colors.neutral.slate }}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const TestimonialsPage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
      <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.gold.champagne}30)` }}>
        <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>CLIENT STORIES</p>
        <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep }}>Reviews & Testimonials</h1>
      </section>
      <section style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ padding: '60px', borderRadius: '24px', background: `linear-gradient(135deg, ${colors.emerald.deep}, ${colors.emerald.rich})`, textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px', opacity: 0.4 }}>"</div>
          <p style={{ fontFamily: typography.heading, fontSize: '28px', fontStyle: 'italic', color: colors.gold.light, lineHeight: 1.6, maxWidth: '800px', margin: '0 auto 32px' }}>
            Irina Elysian transformed not just my hair, but my entire sense of self. From the moment I walked in, I knew I'd found my forever salon.
          </p>
          <p style={{ fontFamily: typography.accent, fontSize: '13px', letterSpacing: '2px', color: colors.gold.champagne }}>JENNIFER L. • CLIENT SINCE 2019</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {[
            { quote: "The balayage Marcus did is absolutely stunning. Everyone asks where I get my hair done!", name: 'Amanda S.', service: 'Balayage', rating: 5 },
            { quote: "Best haircut I've ever had. Sofia really understood what I wanted.", name: 'Rachel T.', service: 'Precision Cut', rating: 5 },
            { quote: "My husband and son both come here now. David is amazing with men's cuts.", name: 'Lisa M.', service: 'Family Services', rating: 5 },
            { quote: "The Brazilian blowout changed my life. My morning routine is so much easier!", name: 'Caroline H.', service: 'Brazilian Blowout', rating: 5 },
            { quote: "Olivia made me look like a princess on my wedding day. Couldn't be happier!", name: 'Jessica R.', service: 'Bridal', rating: 5 },
            { quote: "Finally found a colorist who gets it. My highlights look natural and expensive.", name: 'Megan K.', service: 'Highlights', rating: 5 }
          ].map((review, i) => (
            <div key={i} style={{ padding: '40px', borderRadius: '20px', backgroundColor: cardBg, border: `1px solid ${colors.gold.primary}15`, boxShadow: `0 4px 30px ${colors.neutral.mist}30` }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(review.rating)].map((_, j) => (<span key={j} style={{ color: colors.gold.primary, fontSize: '18px' }}>★</span>))}
              </div>
              <p style={{ fontFamily: typography.heading, fontSize: '18px', fontStyle: 'italic', lineHeight: 1.7, color: colors.neutral.charcoal, marginBottom: '24px' }}>"{review.quote}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: typography.accent, fontSize: '13px', fontWeight: 600, color: colors.emerald.deep }}>{review.name}</p>
                <span style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: colors.emerald.pale, fontFamily: typography.body, fontSize: '11px', color: colors.emerald.deep }}>{review.service}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '80px', padding: '50px', borderRadius: '24px', backgroundColor: colors.gold.champagne + '40', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[{ value: '4.9', label: 'Average Rating' }, { value: '500+', label: 'Google Reviews' }, { value: '98%', label: 'Would Recommend' }, { value: '#1', label: 'Rated Salon' }].map((stat, i) => (
            <div key={i}>
              <p style={{ fontFamily: typography.display, fontSize: '42px', color: colors.emerald.deep, marginBottom: '8px' }}>{stat.value}</p>
              <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '1px', color: colors.neutral.slate }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
      <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.emerald.pale}30)` }}>
        <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>GET IN TOUCH</p>
        <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep }}>Contact Us</h1>
      </section>
      <section style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div style={{ padding: '50px', borderRadius: '24px', backgroundColor: cardBg, border: `1px solid ${colors.gold.primary}15`, boxShadow: `0 4px 30px ${colors.neutral.mist}30` }}>
            <h3 style={{ fontFamily: typography.heading, fontSize: '28px', color: colors.emerald.deep, marginBottom: '32px' }}>Send Us a Message</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[{ label: 'YOUR NAME', type: 'text', placeholder: 'Enter your name' }, { label: 'EMAIL ADDRESS', type: 'email', placeholder: 'your@email.com' }].map((field, i) => (
                <div key={i}>
                  <label style={{ display: 'block', fontFamily: typography.accent, fontSize: '10px', letterSpacing: '2px', color: colors.gold.primary, marginBottom: '8px' }}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: `1px solid ${colors.emerald.deep}20`, backgroundColor: colors.neutral.cream, fontFamily: typography.body, fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontFamily: typography.accent, fontSize: '10px', letterSpacing: '2px', color: colors.gold.primary, marginBottom: '8px' }}>MESSAGE</label>
                <textarea placeholder="How can we help you?" rows={4} style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: `1px solid ${colors.emerald.deep}20`, backgroundColor: colors.neutral.cream, fontFamily: typography.body, fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <button style={{ padding: '18px 40px', borderRadius: '50px', border: 'none', background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`, color: colors.emerald.deep, fontFamily: typography.accent, fontSize: '12px', fontWeight: 600, letterSpacing: '2px', cursor: 'pointer', boxShadow: `0 4px 20px ${colors.gold.primary}40` }}>SEND MESSAGE</button>
            </div>
          </div>
          <div>
            <div style={{ padding: '40px', borderRadius: '24px', background: `linear-gradient(135deg, ${colors.emerald.deep}, ${colors.emerald.rich})`, marginBottom: '32px' }}>
              <h4 style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '3px', color: colors.gold.primary, marginBottom: '24px' }}>VISIT US</h4>
              <p style={{ fontFamily: typography.heading, fontSize: '22px', color: colors.neutral.pearl, lineHeight: 1.6 }}>123 Elysian Boulevard<br />Suite 200<br />Beverly Hills, CA 90210</p>
            </div>
            <div style={{ padding: '40px', borderRadius: '24px', backgroundColor: cardBg, border: `1px solid ${colors.gold.primary}15`, marginBottom: '32px' }}>
              <h4 style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '3px', color: colors.gold.primary, marginBottom: '24px' }}>HOURS</h4>
              {[{ day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' }, { day: 'Saturday', hours: '9:00 AM - 6:00 PM' }, { day: 'Sunday', hours: '10:00 AM - 5:00 PM' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', marginBottom: '12px', borderBottom: i < 2 ? `1px solid ${colors.gold.primary}15` : 'none' }}>
                  <span style={{ fontFamily: typography.body, fontSize: '14px', color: colors.neutral.charcoal }}>{item.day}</span>
                  <span style={{ fontFamily: typography.accent, fontSize: '12px', color: colors.emerald.deep }}>{item.hours}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '40px', borderRadius: '24px', backgroundColor: colors.gold.champagne + '50' }}>
              <h4 style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '3px', color: colors.gold.primary, marginBottom: '24px' }}>CONTACT</h4>
              <p style={{ fontFamily: typography.body, fontSize: '16px', color: colors.emerald.deep, marginBottom: '12px' }}>📞 (310) 555-HAIR</p>
              <p style={{ fontFamily: typography.body, fontSize: '16px', color: colors.emerald.deep, marginBottom: '12px' }}>✉️ hello@irinaelysian.com</p>
              <p style={{ fontFamily: typography.body, fontSize: '16px', color: colors.emerald.deep }}>📸 @irinaelysian</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedStylist, setSelectedStylist] = useState(null);

    return (
      <div style={{ animation: 'fadeIn 0.6s ease', paddingTop: '120px' }}>
        <section style={{ padding: '80px 40px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.neutral.pearl}, ${colors.gold.champagne}30)` }}>
          <p style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '5px', color: colors.gold.primary, marginBottom: '16px' }}>RESERVE YOUR EXPERIENCE</p>
          <h1 style={{ fontFamily: typography.display, fontSize: 'clamp(42px, 6vw, 72px)', color: colors.emerald.deep }}>Book Appointment</h1>
        </section>
        <section style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginBottom: '60px' }}>
            {['Service', 'Stylist', 'Date & Time', 'Confirm'].map((label, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: step > i ? colors.gold.primary : (step === i + 1 ? colors.emerald.deep : colors.neutral.mist), color: step > i ? colors.emerald.deep : (step === i + 1 ? colors.gold.light : colors.neutral.slate), fontFamily: typography.accent, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{step > i ? '✓' : i + 1}</div>
                <span style={{ fontFamily: typography.accent, fontSize: '10px', letterSpacing: '1px', color: step >= i + 1 ? colors.emerald.deep : colors.neutral.silver }}>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '50px', borderRadius: '24px', backgroundColor: cardBg, border: `1px solid ${colors.gold.primary}15`, boxShadow: `0 4px 30px ${colors.neutral.mist}30` }}>
            {step === 1 && (
              <>
                <h3 style={{ fontFamily: typography.heading, fontSize: '28px', color: colors.emerald.deep, marginBottom: '32px', textAlign: 'center' }}>Select Your Service</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[{ name: 'Haircut', price: '$85+', icon: '✂️' }, { name: 'Color', price: '$150+', icon: '🎨' }, { name: 'Balayage', price: '$220+', icon: '✨' }, { name: 'Highlights', price: '$140+', icon: '☀️' }, { name: 'Treatment', price: '$100+', icon: '💆' }, { name: 'Blowout', price: '$65+', icon: '💨' }, { name: 'Bridal', price: '$250+', icon: '👑' }, { name: "Men's", price: '$65+', icon: '🧔' }].map((service, i) => (
                    <div key={i} onClick={() => setSelectedService(service.name)} style={{ padding: '24px', borderRadius: '16px', border: `2px solid ${selectedService === service.name ? colors.gold.primary : colors.emerald.deep + '15'}`, backgroundColor: selectedService === service.name ? colors.gold.champagne + '30' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '28px' }}>{service.icon}</span>
                      <div style={{ flex: 1 }}><p style={{ fontFamily: typography.heading, fontSize: '18px', color: colors.emerald.deep }}>{service.name}</p></div>
                      <span style={{ fontFamily: typography.accent, fontSize: '14px', color: colors.gold.primary }}>{service.price}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h3 style={{ fontFamily: typography.heading, fontSize: '28px', color: colors.emerald.deep, marginBottom: '32px', textAlign: 'center' }}>Choose Your Stylist</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {[{ name: 'Irina V.', specialty: 'Master Stylist' }, { name: 'Marcus C.', specialty: 'Colorist' }, { name: 'Sofia R.', specialty: 'Cutting' }, { name: 'David K.', specialty: "Men's Expert" }, { name: 'Emma T.', specialty: 'Treatments' }, { name: 'Any Available', specialty: 'First Available' }].map((stylist, i) => (
                    <div key={i} onClick={() => setSelectedStylist(stylist.name)} style={{ padding: '24px', borderRadius: '16px', textAlign: 'center', border: `2px solid ${selectedStylist === stylist.name ? colors.gold.primary : colors.emerald.deep + '15'}`, backgroundColor: selectedStylist === stylist.name ? colors.gold.champagne + '30' : 'transparent', cursor: 'pointer' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: colors.emerald.pale, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <span style={{ fontFamily: typography.display, fontSize: '20px', color: colors.emerald.deep }}>{stylist.name.split(' ')[0][0]}</span>
                      </div>
                      <p style={{ fontFamily: typography.heading, fontSize: '16px', color: colors.emerald.deep, marginBottom: '4px' }}>{stylist.name}</p>
                      <p style={{ fontFamily: typography.body, fontSize: '12px', color: colors.neutral.slate }}>{stylist.specialty}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 style={{ fontFamily: typography.heading, fontSize: '28px', color: colors.emerald.deep, marginBottom: '32px', textAlign: 'center' }}>Select Date & Time</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: typography.accent, fontSize: '10px', letterSpacing: '2px', color: colors.gold.primary, marginBottom: '12px' }}>SELECT DATE</label>
                    <input type="date" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: `1px solid ${colors.emerald.deep}20`, backgroundColor: colors.neutral.cream, fontFamily: typography.body, fontSize: '14px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: typography.accent, fontSize: '10px', letterSpacing: '2px', color: colors.gold.primary, marginBottom: '12px' }}>SELECT TIME</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {['9:00', '10:00', '11:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'].map((time, i) => (
                        <button key={i} style={{ padding: '12px', borderRadius: '8px', border: `1px solid ${colors.emerald.deep}20`, backgroundColor: i === 2 ? colors.gold.primary : 'transparent', color: i === 2 ? colors.emerald.deep : colors.neutral.slate, fontFamily: typography.accent, fontSize: '11px', cursor: 'pointer' }}>{time}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h3 style={{ fontFamily: typography.heading, fontSize: '28px', color: colors.emerald.deep, marginBottom: '32px', textAlign: 'center' }}>Confirm Your Booking</h3>
                <div style={{ padding: '32px', borderRadius: '16px', backgroundColor: colors.gold.champagne + '30', marginBottom: '32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {[{ label: 'SERVICE', value: selectedService || 'Haircut' }, { label: 'STYLIST', value: selectedStylist || 'Irina V.' }, { label: 'DATE & TIME', value: 'March 15, 2026 • 11:00 AM' }, { label: 'ESTIMATED PRICE', value: '$85+' }].map((item, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: typography.accent, fontSize: '10px', letterSpacing: '2px', color: colors.gold.primary, marginBottom: '4px' }}>{item.label}</p>
                        <p style={{ fontFamily: typography.heading, fontSize: '18px', color: colors.emerald.deep }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[{ label: 'YOUR NAME', placeholder: 'Full name' }, { label: 'PHONE', placeholder: '(555) 123-4567' }].map((field, i) => (
                    <div key={i}>
                      <label style={{ display: 'block', fontFamily: typography.accent, fontSize: '10px', letterSpacing: '2px', color: colors.gold.primary, marginBottom: '8px' }}>{field.label}</label>
                      <input type="text" placeholder={field.placeholder} style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', border: `1px solid ${colors.emerald.deep}20`, backgroundColor: colors.neutral.cream, fontFamily: typography.body, fontSize: '14px', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '32px', borderTop: `1px solid ${colors.gold.primary}15` }}>
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} style={{ padding: '16px 36px', borderRadius: '50px', border: `2px solid ${colors.emerald.deep}`, backgroundColor: 'transparent', color: colors.emerald.deep, fontFamily: typography.accent, fontSize: '11px', letterSpacing: '2px', cursor: 'pointer' }}>← BACK</button>
              ) : <div />}
              <button onClick={() => step < 4 ? setStep(step + 1) : null} style={{ padding: '16px 40px', borderRadius: '50px', border: 'none', background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`, color: colors.emerald.deep, fontFamily: typography.accent, fontSize: '11px', fontWeight: 600, letterSpacing: '2px', cursor: 'pointer', boxShadow: `0 4px 20px ${colors.gold.primary}40` }}>{step === 4 ? 'CONFIRM BOOKING' : 'CONTINUE →'}</button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const Footer = () => (
    <footer style={{ padding: '80px 40px 40px', backgroundColor: colors.emerald.deep, color: colors.neutral.pearl }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: typography.display, fontSize: '20px', fontWeight: 700, color: colors.emerald.deep }}>IE</span>
              </div>
              <h3 style={{ fontFamily: typography.display, fontSize: '20px', letterSpacing: '3px', color: colors.gold.light, margin: 0 }}>IRINA ELYSIAN</h3>
            </div>
            <p style={{ fontFamily: typography.body, fontSize: '14px', lineHeight: 1.7, opacity: 0.8, maxWidth: '300px' }}>Divine beauty, for everyone. Experience transformative hair design crafted with supreme skill and heavenly care.</p>
          </div>
          {[
            { title: 'QUICK LINKS', items: ['Services', 'About', 'Team', 'Gallery', 'Contact'] },
            { title: 'SERVICES', items: ['Haircuts', 'Color', 'Treatments', 'Bridal', "Men's Grooming"] },
            { title: 'CONTACT', items: ['123 Elysian Boulevard', 'Beverly Hills, CA 90210', '(310) 555-HAIR', 'hello@irinaelysian.com'] }
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: typography.accent, fontSize: '11px', letterSpacing: '3px', color: colors.gold.primary, marginBottom: '24px' }}>{col.title}</h4>
              {col.items.map((item, j) => (<p key={j} style={{ fontFamily: typography.body, fontSize: '14px', marginBottom: '12px', cursor: i < 2 ? 'pointer' : 'default', opacity: 0.8 }}>{item}</p>))}
            </div>
          ))}
        </div>
        <div style={{ paddingTop: '32px', borderTop: `1px solid ${colors.gold.primary}20`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: typography.body, fontSize: '12px', opacity: 0.6 }}>© 2026 Irina Elysian Hair Design Studio. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Instagram', 'Facebook', 'Pinterest', 'TikTok'].map((social, i) => (<span key={i} style={{ fontFamily: typography.accent, fontSize: '10px', letterSpacing: '1px', cursor: 'pointer', opacity: 0.7 }}>{social.toUpperCase()}</span>))}
          </div>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'services': return <ServicesPage />;
      case 'about': return <AboutPage />;
      case 'gallery': return <GalleryPage />;
      case 'team': return <TeamPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'contact': return <ContactPage />;
      case 'booking': return <BookingPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor, fontFamily: typography.body }}>
      <Navigation />
      {renderPage()}
      <Footer />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Raleway:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        button:hover { transform: translateY(-2px); transition: all 0.3s ease; }
        button:active { transform: translateY(0); }
        input:focus, textarea:focus { outline: none; border-color: #C9A227 !important; box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.2); }
        ::selection { background: rgba(201, 162, 39, 0.4); color: #0A3D2E; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #FAF8F3; }
        ::-webkit-scrollbar-thumb { background: rgba(201, 162, 39, 0.6); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #C9A227; }
      `}</style>
    </div>
  );
};

export default IrinaElysianWebsite;
