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

const sgMail = require("@sendgrid/mail");
const { userLoginSchema } = require("../DTOs/Login.dto");
const { validationMethod } = require("../utils/constants");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
router.get("/hello", (req, res) => {
    console.log("hello!!");
    const name = "yuval";
    const password = " f";
    const msg = {
        from: "kesherelwyn@gmail.com",
        to: "didi19289@gmail.com",
        subject: "ברוך הבא לאפליקציית קשר!",
        text: "",
        html: `<html><head><style>h1 {color:#804ED9;}</style></head><body> <h1>שלום ${name}, וברוכים הבאים לאפליקציית Kesher!<h1> <h3>הסיסמה שלך היא: ${password}</h3></body></html>`,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
    // mailService.sendWelcomeMail("didi19289@gmail.com", "יובל", "password");
    res.send("hello");
});

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
