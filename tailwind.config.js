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
        'bell': 'belling 6s .7s ease-in-out infinite ;'
      },
      keyframes: {
        bouncing: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-25%)' }
        },
        belling: {
          ' 0%': { transform: 'rotate(0)' },
          ' 1%': { transform: 'rotate(30deg) ' },
          ' 3%': { transform: 'rotate(-28deg)' },
          ' 5%': { transform: 'rotate(34deg) ' },
          ' 7%': { transform: 'rotate(-32deg)' },
          ' 9%': { transform: 'rotate(30deg) ' },
          '11%': { transform: 'rotate(-28deg)' },
          '13%': { transform: 'rotate(26deg) ' },
          '15%': { transform: 'rotate(-24deg)' },
          '17%': { transform: 'rotate(22deg) ' },
          '19%': { transform: 'rotate(-20deg)' },
          '21%': { transform: 'rotate(18deg) ' },
          '23%': { transform: 'rotate(-16deg)' },
          '25%': { transform: 'rotate(14deg) ' },
          '27%': { transform: 'rotate(-12deg)' },
          '29%': { transform: 'rotate(10deg) ' },
          '31%': { transform: 'rotate(-8deg) ' },
          '33%': { transform: 'rotate(6deg) ' },
          '35%': { transform: 'rotate(-4deg) ' },
          '37%': { transform: 'rotate(2deg) ' },
          '39%': { transform: 'rotate(-1deg)' },
          '41%': { transform: 'rotate(1deg) ' },
          '43%': { transform: 'rotate(0) ' },
          '100%': { transform: ' rotate(0)' }
        }
      }
    },
  },
  plugins: [],
}