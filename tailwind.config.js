/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary1': '#0F4C5C', // blue
        'primary2': '#E36414', // orange
        'primary3': '#FB8B24', // yellow
        'primary4': '#9A031E', // red
        'primary5': '#5F0F40', // purple
        // https://coolors.co/5f0f40-9a031e-fb8b24-e36414-0f4c5c
      }
    },
  },
  plugins: [],
}
