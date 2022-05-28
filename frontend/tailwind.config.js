module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      backgroundImage: {
        'setup-image': "url('/src/assets/setup3.avif')",
        'setup-image2': "url('/src/assets/setup2.jpg')",
      },
    screens: {
      sm: '640px',
      md:'768px',
      lg:'1024px',
      xl:'1280px',
      '2xl':'1536px',
    },
  },
  plugins: [require("daisyui")],
}