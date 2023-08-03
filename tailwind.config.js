module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "orange": "var(--red-orange-dark)",
        "yellow": "var(--sunglow-dark)",
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  
}
