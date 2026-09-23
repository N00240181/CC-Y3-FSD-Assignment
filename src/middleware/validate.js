import ApiError from '../utils/ApiError.js';

const REQUEST_PARTS = ['params', 'query', 'body'];

export default (schemas) =>
  (req, res, next) => {
    for (const part of REQUEST_PARTS) {
      const schema = schemas[part];
      if (!schema) continue;

      const result = schema.safeParse(req[part]);
      if (!result.success) {
        const details = result.error.issues.map((issue) => ({
          field: issue.path.join('.') || part,
          message: issue.message,
        }));
        return next(new ApiError(400, 'Validation failed', details));
      }
      req[part] = result.data;
    }

    next();
  };