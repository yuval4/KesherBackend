const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  generateAccessToken,
  verifyUser,
  validateSchema,
} = require("../auth/auth");
const mailService = require("../mail/MailService");
const UsersService = require("../services/UsersService");
const { userLoginSchema } = require("../DTOs/Login.dto");
const { validationMethod } = require("../utils/constants");
const { User } = require("../models/UserModel");

// router.get("/hello", async (req, res) => {
//     mailService.sendWelcomeMail(
//         "d9@gmail.com",
//         "data.parentFirstName",
//         "password"
//     );
//     res.sendStatus(200);
// });

router.post(
  "/login",
  validateSchema(userLoginSchema, validationMethod.body),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = user
        ? generateAccessToken({
            id: user._id,
            role: user.role,
            daysSinceChangePassword: user.daysSinceChangePassword,
          })
        : null;

      token ? res.send(token) : res.sendStatus(401);
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  }
);

router.post("/forgetPassword", async (req, res) => {
  try {
    await UsersService.forgetPassword(req.body.email, req.body.phoneNumber);
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

router.get("/admin", async (req, res) => {
  const userData = {
    fisrtName: "אא",
    lastName: "אא",
    city: "א",
    street: "א",
    number: "35",
    phoneNumber: "875",
    email: "piti@mailinator.com",
  };
  await UsersService.createNewUser(userData, "Admin");
  res.sendStatus(200);
});

module.exports = router;
