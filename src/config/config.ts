import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  PORT: Joi.number().default(3000),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().optional(),
  MYSQL_PORT: Joi.number().default(3306),
  MYSQL_HOST: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required().default('2h'),

  THROTTLE_TTL: Joi.number().default(6e4),
  THROTTLE_LIMIT: Joi.number().default(10),
});
