export const validateBody = (schema) => {
  return async (ctx, next) => {
    const { error } = schema.validate(ctx.request.body);
    if (error) {
      ctx.status = 400;
      ctx.body = { error: error.details[0].message };
      return;
    }
    await next();
  };
};
