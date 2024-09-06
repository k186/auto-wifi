module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/wifi/getWifiInfo',
      handler: 'wifi.getWifiInfo',
      // 走微信的code 校验
      config: {
        middlewares: ['api::wifi.check-wx-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/createPurWifi',
      handler: 'wifi.createPurWifi',
      config: {
        middlewares: ['api::wifi.check-wx-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/genWifiQR',
      handler: 'wifi.genWifiQR',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/createWifi',
      handler: 'wifi.createWifi',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/updateWifi',
      handler: 'wifi.updateWifi',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/user/deleteWifi',
      handler: 'wifi.deleteWifi',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
  ],
};
