const express = require("express");
const router = express.Router();
const UsersService = require("../services/UsersService");
const { authenticateToken, verifyUser } = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR create new teacher user
router.post("/teacher", verifyUser(["Admin"]), async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Teacher");
    res.sendStatus(200);
});

// ANCHOR create new therapist user
router.post("/therapist", verifyUser(["Admin"]), async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Therapist");
    res.sendStatus(200);
});

// ANCHOR create new parent user
router.post("/parent", verifyUser(["Teacher"]), async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Parent");
    res.sendStatus(200);
});

// ANCHOR returns a list of children (name and pic)
router.get(
    "/children/:id",
    verifyUser(["Parent", "Teacher"]),
    async (req, res) => {
        const children = await UsersService.getChildrenByUserId(req.params.id);
        res.send(children);
    }
);

router.patch("/school", verifyUser(["Teacher", "Admin"]), async (req, res) => {
    if (req.body.userId === "") {
        await UsersService.addSchoolToUser(req.user.id, req.body.schoolId);
    } else {
        await UsersService.addSchoolToUser(req.body.userId, req.body.schoolId);
    }

    return res.sendStatus(200);
});

router.patch(
    "/password",
    verifyUser(["Parent", "Teacher", "Admin"]),
    async (req, res) => {
        await UsersService.changePassword(req.body, req.user);
        return res.sendStatus(200);
    }
);

router.get(
    "/staffbyschool/:schoolId",
    verifyUser(["Teacher", "Admin"]),
    async (req, res) => {
        const users = await UsersService.getUsersBySchoolId(
            req.params.schoolId
        );
        res.send(users);
    }
);

router.get("/staff", verifyUser(["Admin"]), async (req, res) => {
    const users = await UsersService.getAllstaffs();
    res.send(users);
});

module.exports = router;
