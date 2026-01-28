module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 0.5s ease forwards",
        fadeInUp: "fadeInUp 0.7s ease forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
};
