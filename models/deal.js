// const { Schema, model } = require("mongoose");
// // const Joi = require("joi");

// const { handleMongooseError } = require("../helpers");

// // const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// // const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

// const dealSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Set name for deal"],
//     },
//     price: {
//       type: String,
//       //   match: emailRegexp,
//       //   required: [true, "Set email for contact"],
//     },
//     ticket: {
//       type: String,
//       //   match: phoneRegexp,
//       //   required: [true, "Set phone for contact"],
//     },
//     yield: {
//       type: String,
//       default: "9.25%",
//     },
//     daysLeft: {
//       type: String,
//     },
//     sold: {
//       type: String,

//       // required: true,
//     },
//     preview: {
//       type: String,
//       default:
//         "https://res.cloudinary.com/du82kgttw/image/upload/v1697308195/no-image_njimch.png",
//     },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// dealSchema.post("save", handleMongooseError);

// const addSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": `missing required "name" field`,
//     "string.empty": `"name" cannot be an empty field`,
//   }),
//   email: Joi.string().pattern(emailRegexp).required().messages({
//     "any.required": `missing required "email" field`,
//     "string.empty": `"email" cannot be an empty field`,
//     "string.pattern.base": `"email" must be a valid email address`,
//   }),
//   phone: Joi.string().pattern(phoneRegexp).required().messages({
//     "any.required": `missing required "phone" field`,
//     "string.empty": `"phone" cannot be an empty field`,
//     "string.pattern.base": `"phone" must be a 10-digit number in the following format: (XXX) XXX-XXXX`,
//   }),
//   favorite: Joi.boolean(),
// });

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     "any.required": `missing field "favorite"`,
//     "string.empty": `"favorite" cannot be an empty field`,
//   }),
// });

// const schemas = {
//   addSchema,
//   updateFavoriteSchema,
// };

// const Deal = model("deal", dealSchema);

// module.exports = { Deal };

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
    "any.required": `missing required "phone" field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
  yield: Joi.string(),
  daysLeft: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
  sold: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
  preview: Joi.string(),
});

module.exports = { addSchema, Deal };
