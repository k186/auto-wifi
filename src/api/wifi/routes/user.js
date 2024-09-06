module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/wifi/user/login',
      handler: 'user.login',
    },
    {
      method: 'POST',
      path: '/wifi/user/userInfo',
      handler: 'user.getUserInfo',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/user/create',
      handler: 'user.createUser',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/user/update',
      handler: 'user.updateUser',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
    {
      method: 'POST',
      path: '/wifi/user/delete',
      handler: 'user.deleteUser',
      config: {
        middlewares: ['api::wifi.check-login'],
      },
    },
  ],
};
