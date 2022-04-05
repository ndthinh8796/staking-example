module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        black: '#111111',
      },
      backgroundImage: {
        gradient:
          'linear-gradient(65deg,#d726d7,#3064e0,#31e7ea,#714cdd,#d726d7)',
      },
      keyframes: {
        'gradient-position': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        'gradient-position': 'gradient-position 5s linear infinite',
      },
    },
  },
  plugins: [],
}
