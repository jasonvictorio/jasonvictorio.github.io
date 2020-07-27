module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('postcss-font-magician'),
    require('cssnano')({ preset: 'default' }),
  ],
}
