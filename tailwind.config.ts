import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'container': '1400px',
        'container-md': '1200px',
        'container-sm': '1000px',
        'content': '900px',
        'content-sm': '700px',
        'text': '600px',
        'text-sm': '500px',
      },
      colors: {
        // Emerald Palette
        emerald: {
          deep: '#0A3D2E',
          rich: '#0D5740',
          medium: '#147858',
          light: '#1A9E70',
          pale: '#E8F5F0',
        },
        // Gold Palette
        gold: {
          deep: '#8B6914',
          rich: '#B8860B',
          primary: '#C9A227',
          light: '#D4B847',
          champagne: '#F0E6C8',
          shimmer: '#E8D48A',
        },
        // Neutral Palette
        neutral: {
          black: '#0D0D0D',
          charcoal: '#1A1A1A',
          graphite: '#2D2D2D',
          slate: '#4A4A4A',
          stone: '#6B6B6B',
          silver: '#9B9B9B',
          mist: '#D4D4D4',
          pearl: '#F5F1E8',
          cream: '#FAF8F3',
          white: '#FFFFFF',
        },
        // Accent Palette
        accent: {
          rose: '#8B4557',
          burgundy: '#5C1A33',
          bronze: '#8B5A2B',
          sage: '#7D8471',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Raleway', 'Helvetica Neue', 'sans-serif'],
        accent: ['Montserrat', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        'wide-2': '2px',
        'wide-3': '3px',
        'wide-5': '5px',
        'wide-8': '8px',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-reverse': 'float 6s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'diagonal-pattern': `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201, 162, 39, 0.03) 20px, rgba(201, 162, 39, 0.03) 21px)`,
        'gold-gradient': 'linear-gradient(135deg, #C9A227, #8B6914)',
        'emerald-gradient': 'linear-gradient(135deg, #0A3D2E, #0D5740)',
        'hero-gradient': `radial-gradient(ellipse at 30% 20%, rgba(240, 230, 200, 0.4) 0%, transparent 50%),
                          radial-gradient(ellipse at 70% 80%, rgba(232, 245, 240, 0.6) 0%, transparent 50%),
                          linear-gradient(135deg, #FAF8F3, #F5F1E8)`,
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 162, 39, 0.4)',
        'gold-lg': '0 8px 30px rgba(201, 162, 39, 0.4)',
        'emerald': '0 8px 30px rgba(10, 61, 46, 0.4)',
        'card': '0 4px 30px rgba(212, 212, 212, 0.4)',
        'card-sm': '0 2px 20px rgba(212, 212, 212, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
