const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req.params[name] }, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value.params) req.value.params = {};
        req.value.params[name] = result.value.param;
        next();
      }
    };
  },
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value.body) req.value.body = {};
        req.value.body = result.value;
        next();
      }
    };
  },
  schemas: {
    user: {
      post: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required()
      }),
      put: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required()
      }),
      patch: Joi.object().keys({
        first_name: Joi.string(),
        last_name: Joi.string(),
        email: Joi.string()
      })
    },
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-Z]{24}$/)
        .required()
    })
  }
};
