import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        maple: {
          leaf: '#CC3333',
          wood: '#8B4513',
          bark: '#5E3A1C',
          forest: {
            light: '#7AC74F',
            DEFAULT: '#5A9C3D',
            dark: '#2E5E1A'
          },
          mushroom: {
            orange: '#FF9843',
            yellow: '#FFCB47',
            red: '#D63E3E'
          },
          sky: '#87CEEB',
          ground: '#8D7547'
        },
        // New cosmic colors for MapleStory Universe aesthetic
        cosmic: {
          blue: '#1E1B4B',
          purple: '#4B2A99',
        },
        glow: {
          yellow: '#FFD700',
          green: '#00FF99',
          purple: '#9333EA',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      fontFamily: {
        pixel: ['VT323', 'monospace'],
        maple: ['Maplestory', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in': 'slide-in 0.4s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite'
      },
      backgroundImage: {
        'forest-pattern': "url('/public/lovable-uploads/734faf37-4b2a-4294-b127-e6b88156676f.png')",
        'starry-pattern': "url('/public/lovable-uploads/starry-pattern.png')",
        'mp-background': "url('/mpbackground.png')", // ✅ 여기에 추가됨
      },
      boxShadow: {
        'glow': '0 0 15px rgba(147, 51, 234, 0.5)',
      },
      textShadow: {
        'glow-yellow': '0 0 5px rgba(255, 215, 0, 0.5)',
        'glow-green': '0 0 5px rgba(0, 255, 153, 0.5)',
        'glow-purple': '0 0 5px rgba(147, 51, 234, 0.5)',
      },
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-shadow-glow-yellow': {
          textShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
        },
        '.text-shadow-glow-green': {
          textShadow: '0 0 5px rgba(0, 255, 153, 0.5)',
        },
        '.text-shadow-glow-purple': {
          textShadow: '0 0 5px rgba(147, 51, 234, 0.5)',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
} satisfies Config;
