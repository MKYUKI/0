/** next.config.js **/
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // ここで assetPrefix や basePath を変えていると /js/quantum3D.js が 404 になる可能性
  // basePath: '/someBase',
  // assetPrefix: '/anotherPrefix'
}
