const {responseFail} = require("../../../../utils/tools");
module.exports = (config, {strapi}) => {
  return async (ctx, next) => {

    // 获取 Authorization header 中的 token
    const token = ctx.request.header.token;
    // 如果 token 不存在，返回 401 未授权错误
    if (!token) {
      ctx.body = responseFail('未登录', 401);
      return
    }

    try {
      // 验证 JWT token
      const decoded = await strapi.plugins['users-permissions'].services.jwt.verify(token);

      // 检查 token 是否过期
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        ctx.body = responseFail('登录过期', 401);
        return;
      }

      // token 有效，将解码后的用户信息存储到 ctx.state 中，供后续使用
      ctx.state.user = decoded;

      // 继续处理后续中间件
      await next();

    } catch (error) {
      // 如果 oken 非法或验证失败，返回 401 未授权错误
      ctx.body = responseFail('非法token', 401);
      return;
    }
  };
};
