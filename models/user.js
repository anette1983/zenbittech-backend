const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required "password" field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required "password" field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

module.exports = {
  schemas,
  User,
};
