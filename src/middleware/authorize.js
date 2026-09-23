import ApiError from '../utils/ApiError.js';

export default (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to perform this action'));
    }

    next();
  };