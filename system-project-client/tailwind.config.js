export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        customRed: "#ef6f6f",
        customBlue: "#000435",
      },
    },
  },
  plugins: [require("daisyui")],
};
