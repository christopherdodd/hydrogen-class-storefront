module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
