'use strict';

/**
 * A set of functions called "actions" for `wifi`
 */

module.exports = {
  async getWifiInfo (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.wifi').getWifiInfo(body);
  },
  async createWifi (ctx) {
    const {body} = ctx.request;
    const {user} = ctx.state;
    ctx.body = await strapi.service('api::wifi.wifi').createWifi(body, user);
  },
  async deleteWifi (ctx) {
    const {id} = ctx.params;
    ctx.body = await strapi.service('api::wifi.wifi').deleteWifi(id);

  },
  async updateWifi (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.wifi').updateWifi(body);
  },
  async createPurWifi (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.wifi').createPurWifi(body);
  },
  async genWifiQR (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.wifi').genWifiQR(body);
  }
};
