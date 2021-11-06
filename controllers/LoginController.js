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

// router.get("/hello", async (req, res) => {
//     mailService.sendWelcomeMail(
//         "d9@gmail.com",
//         "data.parentFirstName",
//         "password"
//     );
//     res.sendStatus(200);
// });

// ANCHOR checks if the user is exist by his email and password and creact a uniqu token. else, send 401 status.
router.post(
    "/login",
    validateSchema(userLoginSchema, validationMethod.body),
    async (req, res) => {
        let token;
        let user = await UsersService.getUserByEmailAndPassword(
            req.body.email,
            req.body.password
        );

        token = user
            ? generateAccessToken({
                  id: user._id,
                  role: user.role,
                  daysSinceChangePassword: user.daysSinceChangePassword,
              })
            : null;

        token ? res.send(token) : res.sendStatus(401);
    }
);

// ANCHOR create new teacher user
router.get("/admin", verifyUser(["Admin"]), async (req, res) => {
    const userData = {
        fisrtName: "אא",
        lastName: "אא",
        city: "א",
        street: "א",
        number: "3",
        phoneNumber: "87",
        email: "a@fk.com",
    };
    await UsersService.createNewUser(userData, "Admin");
    res.sendStatus(200);
});

module.exports = router;
