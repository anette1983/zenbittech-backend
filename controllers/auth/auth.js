const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify e-mail</a>`,
  };
  try {
    await sendEmail(verifyEmail);
    res.status(201).json({
      user: {
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ where: { verificationToken } });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(404, "Email is already verified");
  }

  await User.update(
    { verify: true, verificationToken: null },
    {
      where: { id: user.id },
    }
  );
  res.json({
    message: "Email verified successfully",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify e-mail</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Unathorized");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  user.token = token;
  await user.save();
  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: users,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  // цей параметр є у об'єкті юзера, який робить запит, нічого додатково вводити не треба
  const user = await User.findOne({ where: { id } });
  if (user) {
    user.token = null;
    await user.save();
  }

  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getAllUsers: ctrlWrapper(getAllUsers),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};

// const createDeal = async (deal) => {
//   await Deal.create({
//     ...deal,
//   });
// };

// createDeal(deals[0]);

// [{ deal1 }, { deal2 }].forEach(createDeal);
