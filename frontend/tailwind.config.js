// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // เพิ่มเส้นทางที่ถูกต้อง
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
