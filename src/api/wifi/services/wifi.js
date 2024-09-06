'use strict';


const {responseFail, responseSuccess} = require("../../../../utils/tools");
module.exports = ({strapi}) => ({
  async getWifiInfo ({id}) {
    const result = await strapi.db.query('api::wifi.wifi-list').findOne({
      where: {
        id
      }
    });
    if (result) {
      return responseSuccess(result,);
    }
    return responseFail('查询失败');

  },
  async createWifi (wifiInfo, user) {
    //参数不能为空
    const {name, address, phone, SSID, password, serverTime} = wifiInfo;
    if (!name || !address || !phone || !SSID || !password) {
      return responseFail('参数不能为空');
    }
    const result = await strapi.db.query('api::wifi.wifi-list').create({
      data: {
        name: name.trim(),
        address: address.trim(),
        phone: phone.trim(),
        SSID: SSID.trim(),
        password: password.trim(),
        user: user?.id,
        logo: wifiInfo?.logo,
        serverTime
      }
    });
    if (result) {
      return responseSuccess('创建成功');
    }
    return responseFail('创建失败');
  },
  async deleteWifi ({id}) {

  },
  async updateWifi (wifiInfo) {
    const {id} = wifiInfo;
    if (!id) {
      return responseFail('参数不能为空');
    }
    const result = await strapi.db.query('api::wifi.wifi-list').update({
      where: {
        id
      },
      data: wifiInfo
    });
    if (result) {
      return responseSuccess('更新成功');
    }
    return responseFail('更新失败');
  },
  async createPurWifi ({SSID, password}) {
    if (!SSID || !password) {
      return responseFail('参数不能为空');
    }
    return await strapi.service('api::qr.qr').genWxQr({
      pageName: 'home',
      scene: `id:${SSID}-pwd:${password}`
    })
  },
  async genWifiQR ({id}) {
    if (!id) {
      return responseFail('参数不能为空');
    }
    const wifi = await strapi.db.query('api::wifi.wifi-list').findOne({
      where: {
        id
      }
    });
    return await strapi.service('api::qr.qr').genWxQr({
      pageName: 'home',
      scene: `id:${wifi.id}`
    })
  }
})
;
