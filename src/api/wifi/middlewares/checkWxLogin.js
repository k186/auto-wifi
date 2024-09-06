const {responseFail, wxLogin} = require("../../../../utils/tools");
module.exports = (config, {strapi}) => {
  return async (ctx, next) => {

    // 获取 Authorization header 中的 token
    const code = ctx.request.header.code;
    // 如果 token 不存在，返回 401 未授权错误
    if (!code) {
      ctx.body = responseFail('未登录', 401);
      return
    }

    try {
      const {success, data} = await wxLogin(code);
      if (!success) {
        ctx.body = responseFail('登录失败', 401);
        return;
      }
      // 继续处理后续中间件
      await next();

    } catch (error) {
      // 如果 oken 非法或验证失败，返回 401 未授权错误
      ctx.body = responseFail('非法code', 401);
      return;
    }
  };
};
