const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");
const Joi = require("joi");

class Deal extends Model {}

Deal.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
    },
    ticket: {
      type: DataTypes.STRING,
    },
    yield: {
      type: DataTypes.STRING,
      defaultValue: "9.25%",
    },
    daysLeft: {
      type: DataTypes.STRING,
    },
    sold: {
      type: DataTypes.STRING,
    },
    preview: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/du82kgttw/image/upload/v1697308195/no-image_njimch.png",
    },
  },
  {
    sequelize,
    modelName: "deal",
  }
);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  price: Joi.string().required().messages({
    "any.required": `missing required "price" field`,
    "string.empty": `"price" cannot be an empty field`,
  }),
  ticket: Joi.string().required().messages({
    "any.required": `missing required "ticket" field`,
    "string.empty": `"ticket" cannot be an empty field`,
  }),
  yield: Joi.string(),
  daysLeft: Joi.string().required().messages({
    "any.required": `missing required "yield" field`,
    "string.empty": `"yield" cannot be an empty field`,
  }),
  sold: Joi.string().required().messages({
    "any.required": `missing required "sold" field`,
    "string.empty": `"sold" cannot be an empty field`,
  }),
  preview: Joi.string(),
});

module.exports = { addSchema, Deal };
