/** @type {import('tailwindcss').Config} */
module.exports = {
  // ★ ここでpagesフォルダ or src/pagesフォルダなどを指定。
  //   今回はpages/に_app.tsxやindex.tsxがある想定で「./pages」も含める
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
