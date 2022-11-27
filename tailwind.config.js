/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'Helvetica', 'sans-serif']
      },
      animation: {
        'bouncing-first': 'bouncing 1s ease-in-out 0s 1 alternate backwards;',
        'bouncing-second': 'bouncing 1s ease-in-out .2s 1 alternate backwards;',
        'bouncing-third': 'bouncing 1s ease-in-out .4s 1 alternate backwards;',
        'bouncing-fourth': 'bouncing 1s ease-in-out .6s 1 alternate backwards;',
        'bouncing-fifth': 'bouncing 1s ease-in-out .8s 1 alternate backwards;',
      },
      keyframes: {
        bouncing: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-25%)' }
        }
      }
    },
  },
  plugins: [],
}