const express = require("express");
const router = express.Router();
const UsersService = require("../services/UsersService");
const {
  authenticateToken,
  verifyUser,
  verifyDaysSinceChangePassword,
} = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR getMe requset gets the user token to vertified it end returns data about the user.
router.get("/getMe", authenticateToken, async (req, res) => {
  const user = await UsersService.getUserById(req.user.id);
  user ? res.send(user) : res.sendStatus(401);
});

// ANCHOR create new teacher user
router.post(
  "/teacher",
  verifyUser(["Admin"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Teacher");
    res.sendStatus(200);
  }
);

// ANCHOR create new therapist user
router.post(
  "/therapist",
  verifyUser(["Admin"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Therapist");
    res.sendStatus(200);
  }
);

// ANCHOR create new parent user
router.post(
  "/parent",
  verifyUser(["Teacher"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Parent");
    res.sendStatus(200);
  }
);

// ANCHOR returns a list of children (name and pic)
router.get(
  "/children/:id",
  verifyUser(["Parent", "Teacher"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    const children = await UsersService.getChildrenByUserId(req.params.id);
    res.send(children);
  }
);

router.patch(
  "/school",
  verifyUser(["Teacher", "Admin"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    if (req.body.userId === "") {
      await UsersService.addSchoolToUser(req.user.id, req.body.schoolId);
    } else {
      await UsersService.addSchoolToUser(req.body.userId, req.body.schoolId);
    }

    return res.sendStatus(200);
  }
);

router.patch(
  "/password",
  verifyUser(["Parent", "Teacher", "Admin", "Therapist"]),
  async (req, res) => {
    try {
      await UsersService.changePassword(req.body, req.user);
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  }
);

router.get(
  "/staffbyschool/:schoolId",
  verifyUser(["Teacher", "Admin"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    const users = await UsersService.getUsersBySchoolId(req.params.schoolId);
    res.send(users);
  }
);

router.get(
  "/staff",
  verifyUser(["Admin"]),
  verifyDaysSinceChangePassword,
  async (req, res) => {
    const users = await UsersService.getAllstaffs();
    res.send(users);
  }
);

module.exports = router;
