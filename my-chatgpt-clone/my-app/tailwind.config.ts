// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 必要に応じて追加
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
