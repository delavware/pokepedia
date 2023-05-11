/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myred: '#FF1E36',
        myfuchsia: '#FF1E54',
        myblack: '#383838',
        mygray: '#DFE4EC',
        myorange: '#FF993A',
        myyellow: '#F5CE02',
        myblue: '#197ED6',
        myoceanblue: '#27B4D6',
        mygreen: '#02F572',
        mylemongreen: '#A8FF3A',
        mypink: '#FF6C6C',
      },
    },
    fontFamily: {
      'title' : ['Alfa Slab One', 'cursive'],
      'text': ['Inder', 'sans-serif'],
      'highlight' : ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
}

