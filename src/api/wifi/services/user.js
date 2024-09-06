'use strict';


const {responseFail, responseSuccess, formatDate} = require("../../../../utils/tools");
module.exports = ({strapi}) => ({
  async login ({phone, password}) {
    if (!phone || !password) {
      return responseFail('参数错误');
    }
    const user = await strapi.db.query('api::wifi.wifi-user').findOne({
      where: {
        $and: [
          {
            phone: phone.trim()
          },
          {
            password: password.trim()
          }
        ]
      }
    });
    if (user) {
      //token 有效期 为7天
      await strapi.db.query('api::wifi.wifi-user').update({
        where: {id: user.id},
        data: {lastLoginTime: new Date()}
      })
      const token = strapi.plugins['users-permissions'].services.jwt.issue({id: user.id});
      return responseSuccess({token});
    }
    return responseFail('用户不存在或密码错误');
  },
  async getUserInfo ({id}) {
    const user = await strapi.db.query('api::wifi.wifi-user').findOne({
      where: {id},
      populate: {
        permissions: true,
        status: true,
        upUserId: true,
        wifiLists: true,
      }
    });

    if (user) {
      user.permissions = user.permissions.map(item => item.permissionCode);
      user.status = user.status[0]?.statusName;
      user.upUserId = user.upUserId?.userName;
      delete user.updatedAt
      user.createdAt = formatDate(user.createdAt);
      user.lastLoginTime = formatDate(user.lastLoginTime);
      return responseSuccess(user);
    }
    return responseFail('用户不存在');
  },
  async createUser (userInfo) {
    const {userName, password, phone, upUserId} = userInfo;
    if (!userName || !password || !phone) {
      return responseFail('参数错误');
    }
    const existUser = await strapi.db.query('api::wifi.wifi-user').findOne({where: {phone: phone.trim()}});
    if (existUser) {
      return responseFail('用户已存在');
    }
    const inviteUser = await strapi.db.query('api::wifi.wifi-user').findOne({
      where: {
        phone: upUserId.trim()
      }
    });

    const user = await strapi.db.query('api::wifi.wifi-user').create({
      data: {
        userName: userName.trim(),
        password: password.trim(),
        phone: phone.trim(),
        upUserId: inviteUser?.id,
        registrationTime: new Date(),
        lastLoginTime: new Date(),
        status: 1
      }
    });

    if (user) {
      return responseSuccess(user);
    }
    return responseFail('创建用户失败');
  },

  async deleteUser (userId) {

  },

  async updateUser (userInfo) {
    const {id, ...others} = userInfo;
    if (!id) {
      return responseFail('参数错误');
    }
    const user = await strapi.db.query('api::wifi.wifi-user').findOne({id});
    if (!user) {
      return responseFail('用户不存在');
    }
    const updateUser = await strapi.db.query('api::wifi.wifi-user').update({
      where: {id},
      data: others
    });
    if (updateUser) {
      return responseSuccess(updateUser);
    }
    return responseFail('更新用户失败');
  }
});
