const Validators = require('../validators');
const {
  UnprocessableEntityError,
  InternalServerError,
} = require('../helpers/customErrors');
const config = require('../config');
const logger = config.LOGGER;

module.exports = (validator) => {
  if (!Validators.hasOwnProperty(validator)) {
    throw new InternalServerError(`'${validator}' validator does not exist`);
  }

  return async (req, res, next) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (e) {
      if (e.isJoi) {
        logger.error(e.message);
        return next(new UnprocessableEntityError(e.message));
      }
      return next(new InternalServerError());
    }
  };
};
