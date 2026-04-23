import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f6f7f5",
        ink: "#101715",
        pine: "#163a31",
        mint: "#56d39b",
        sand: "#f0ebdf",
        line: "#d9e1dc"
      },
      boxShadow: {
        card: "0 18px 40px rgba(10, 18, 15, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(86, 211, 155, 0.22), transparent 42%)"
      }
    }
  },
  plugins: []
};

export default config;
