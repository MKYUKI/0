/** postcss.config.js **/
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ここに "content" フィールドを書かないこと。
    // もし "content" があるなら削除。
  },
};
