'use strict';

/**
 * qr service
 */

const miniProgramQr = require('miniprogram-qrcode');
const fs = require('fs');
const path = require('path');
const {responseSuccess, responseFail} = require("../../../../utils/tools");

const QRCode = new miniProgramQr({
  appId: process.env.WX_APPID,
  appSecret: process.env.WX_APPSECRET
});

module.exports = ({strapi}) => ({
  async genWxQr (config) {
    const {pageName, scene, width = 400} = config;

    try {
      // 生成二维码
      const result = await QRCode.getWxQrcodeInfo({
        mode: "getWXACodeUnlimit",
        config: {
          scene: scene || "", // 确保场景值正确传递
          page: `pages/${pageName}/${pageName}`,
          width: width,
        }
      });
      if (!result.error) {
        // 获取二维码的 buffer 数组
        return result.image;
      } else {
        return responseFail('二维码生成出错');
      }

    } catch (error) {
      return responseFail('图片处理失败');
    }
  },
  async genQrFile (result) {
    if (!result.error) {
      // 获取二维码的 buffer 数组
      const imageBuffer = result.image;

      // 生成文件名
      const fileName = `wx_qr_${Date.now()}.png`;
      const filePath = path.join(__dirname, `../../../../public/uploads/${fileName}`);

      // 将 Buffer 写入文件
      await fs.writeFileSync(filePath, imageBuffer);

      // 获取文件的文件系统信息
      const fileStat = fs.statSync(filePath);

      // 准备上传文件的信息
      const uploadedFile = {
        path: filePath,
        name: fileName,
        size: fileStat.size,
        type: 'image/png', // 假设生成的二维码是 PNG 格式
      };

      // 使用 Strapi 的上传服务上传文件
      const uploadService = strapi.plugin('upload').service('upload');
      const uploadResult = await uploadService.upload({
        data: {},
        files: uploadedFile,
      });

      if (uploadResult && uploadResult[0]) {
        // 获取上传后的图片 URL
        return responseSuccess(uploadResult[0].url)
      } else {
        return responseFail('图片处理失败');
      }
    } else {
      return responseFail('二维码生成出错');
    }
  }
});
