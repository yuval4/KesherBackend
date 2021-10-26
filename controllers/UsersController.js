const express = require("express");
const router = express.Router();
const UsersService = require("../services/UsersService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR create new teacher user
router.post("/teacher", async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Teacher");
    res.sendStatus(200);
});

// ANCHOR create new teacher user
router.post("/parent", async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Parent");
    res.sendStatus(200);
});

// ANCHOR returns a list of children (name and pic)
router.get("/children/:id", async (req, res) => {
    const children = await UsersService.getChildrenByUserId(req.params.id);
    res.send(children);
});

router.patch("/school", async (req, res) => {
    if (req.body.userId === "") {
        await UsersService.addSchoolToUser(req.user.id, req.body.schoolId);
    } else {
        await UsersService.addSchoolToUser(req.body.userId, req.body.schoolId);
    }

    return res.sendStatus(200);
});

router.patch("/password", async (req, res) => {
    await UsersService.changePassword(req.body, req.user);
    return res.sendStatus(200);
});

router.get("/staffbyschool/:schoolId", async (req, res) => {
    const users = await UsersService.getUsersBySchoolId(req.params.schoolId);
    res.send(users);
});

router.get("/staff", async (req, res) => {
    const users = await UsersService.getAllstaffs();
    res.send(users);
});

module.exports = router;
