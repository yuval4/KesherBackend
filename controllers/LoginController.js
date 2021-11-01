const express = require("express");
const router = express.Router();
const {
    authenticateToken,
    generateAccessToken,
    verifyUser,
} = require("../auth/auth");
const mailService = require("../mail/MailService");
const UsersService = require("../services/UsersService");

router.get("/hello", (req, res) => {
    console.log("hello!!");
    mailService.sendWelcomeMail("didi19289@gmail.com", "יובל", "password");
    res.send("hello");
});

// ANCHOR checks if the user is exist by his email and password and creact a uniqu token. else, send 401 status.
router.post("/login", async (req, res) => {
    let token;
    let user = await UsersService.getUserByEmailAndPassword(
        req.body.data.email,
        req.body.data.password
    );

    token = user
        ? generateAccessToken({
              id: user._id,
              role: user.role,
              daysSinceChangePassword: user.daysSinceChangePassword,
          })
        : null;

    token ? res.send(token) : res.sendStatus(401);
});

// ANCHOR getMe requset gets the user token to vertified it end returns data about the user.
router.get("/getMe", authenticateToken, async (req, res) => {
    const user = await UsersService.getUserById(req.user.id);
    user ? res.send(user) : res.sendStatus(401);
});

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
