/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    "colors": {
      "transparent": "transparent",
      "current": "currentColor",
      "black": "#000",
      "white": "#fff",
      "gray": {
        "50": "#f9fafb",
        "100": "#f4f5f7",
        "200": "#e5e7eb",
        "300": "#d2d6dc",
        "400": "#9fa6b2",
        "500": "#6b7280",
        "600": "#4b5563",
        "700": "#374151",
        "800": "#252f3f",
        "900": "#161e2e",
        "main":"#333333",
        "second":"#3B4248",
        "third":"#7C848B"
      },
      "blue": {
        "100": "#F5FAFF", // bg-color/white
        "200": "#D9EFFF",
        "300": "#B8E0FF",

        "400": "#53B1FD", // main-color
        "500": "#2E90FA",
        "600": "#1570EF", // secondary-color
        "700": "#175CD3", 
        "800": "#1849A9",
        "900": "#194185"
      },
      "red": {
        "100": "#FFF5F5",
        "200": "#FFE5E5",
        "300": "#FFCACA",
        "400": "#FF8A8A",
        "500": "#FF5A5A",
        "600": "#FF3B3B",
        "700": "#E62E2E",
        "800": "#C81E1E",
        "900": "#A91C1C"
      },
      "icons":{
        "done":"#32D583",
        "rank":"#F04438",
        "days":"#7A5AF8",
        "answers":"#FEC84B"
      }
    }
  },
  plugins: [],
}
