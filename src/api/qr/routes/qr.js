module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/qr',
     handler: 'qr.genWxQr',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
