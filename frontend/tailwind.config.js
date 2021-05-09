module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero': "url('/images/test.jpg')",
        'hero-sm': "url('/images/jade-scarlato-Kx7c8eqKlEI-unsplash.jpg')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
