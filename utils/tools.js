const dayjs = require('dayjs');
const axios = require('axios');
module.exports = {
  responseSuccess (data) {
    return {
      success: true, data
    };
  },
  responseFail (message, code) {
    if (code) {
      return {
        success: false, message, code
      };
    }
    return {
      success: false, message
    };
  },
  formatDate (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(fmt);
  },
  async wxLogin (code) {
    try {
      const APPID = process.env.WX_APPID;
      const SECRET = process.env.WX_APPSECRET;
      // 在这里进行GET请求调用第三方API
      const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`);

      // 处理第三方API的响应数据
      const {unionid, openid} = response.data;

      return {success: true, data: {unionid, openId: openid}};
    } catch (error) {
      return {success: false, message: error.message};
    }
  }
}
