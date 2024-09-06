'use strict';

/**
 * A set of functions called "actions" for `qr`
 */

module.exports = {
  async genWxQr (ctx, next) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('qr').genWxQr(body);
  }
};
