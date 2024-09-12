/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#121212",
        panel: "#15181A",
        panelborder: "#262C2F",
        input: "#27282A",
        hlblue: "#0075DE",
        hlred: "#ED1C24",
        hlpink: "#F74242",
        hlyellow: "#FEB92C",
        hlgreen: "#7AC44A",
        altdark: "#18191B",
        sidebaricontext: "#939598",
        searchinputstroke: "#829BA4",
        white: "#fff",
      },
      flexGrow: {
        2: "2",
        3: "3",
        4: "4",
      },
    },
    fontFamily: {
      sans: ["Helvetica Neue", "Helvetica", "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Arial"],
      serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      mono: ["ui-monospace", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"],
      display: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      body: ["Helvetica Neue", "Helvetica", "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Arial"],
    },
    fontSize: {
      "2xl": ["1.375rem", "2rem"], // 22px
      "3xl": ["2rem", "2.25rem"], // 32px
      "4xl": ["2.5rem", "2.75rem"], // 44px
    },
  },
  plugins: [],
};
