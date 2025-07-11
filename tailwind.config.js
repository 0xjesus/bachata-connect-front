/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // BachataConnect custom colors usando CSS variables
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',

        // Colores complementarios
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
        pink: 'rgb(var(--color-pink) / <alpha-value>)',
        blue: 'rgb(var(--color-blue) / <alpha-value>)',

        // Colores de texto y fondo
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
        'bkg-secondary': 'rgb(var(--color-bkg-secondary) / <alpha-value>)',

        // Estados
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)), rgb(var(--color-accent)))',
        'brand-gradient-reverse': 'linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-secondary)), rgb(var(--color-primary)))',
        'dance-gradient': 'linear-gradient(135deg, rgb(var(--color-primary) / 0.2), rgb(var(--color-purple) / 0.2), rgb(var(--color-pink) / 0.2))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'brand': '0 10px 25px rgb(var(--color-primary) / 0.3)',
        'brand-lg': '0 15px 35px rgb(var(--color-primary) / 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'dance': 'dance 4s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      }
    },
  },
  plugins: [],
}
