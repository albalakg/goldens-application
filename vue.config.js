module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Goldens',
    short_name: 'GS',
    themeColor: '#0c2036',
    msTileColor: '#d5b26e',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#0c2036',

    manifestOptions: {
      description: 'A platform for developing and improving abilities in the field of sports',
      start_url: process.env.VUE_APP_BASE_URL,
    },

    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon-big.png',
    },

    // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // }
  }
}
