'use strict';

/**
 * A set of functions called "actions" for `wifi`
 */

module.exports = {
  async login (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.user').login(body);
  },
  async getUserInfo (ctx) {
    ctx.body = await strapi.service('api::wifi.user').getUserInfo(ctx.state.user);
  },
  async createUser (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.user').createUser(body);
  },
  async deleteUser (ctx) {
    const {id} = ctx.params;
    ctx.body = await strapi.service('api::wifi.user').deleteUser(id);

  },
  async updateUser (ctx) {
    const {body} = ctx.request;
    ctx.body = await strapi.service('api::wifi.user').updateUser(body);
  }
};
