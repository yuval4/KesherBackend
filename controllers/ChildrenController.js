const express = require("express");
const router = express.Router();
const ChildrenService = require("../services/ChildrenService");
const {
    authenticateToken,
    verifyUser,
    verifyDaysSinceChangePassword,
} = require("../auth/auth");
const { upload } = require("../utils/utils");

router.use(authenticateToken);
router.use(verifyDaysSinceChangePassword);

router.get(
    "/:id",
    verifyUser(["Parent", "Teacher", "Therapist"]),
    async (req, res) => {
        const child = await ChildrenService.getChildNameAndPic(req.params.id);
        res.send(child);
    }
);

router.post("/", verifyUser(["Teacher"]), async (req, res) => {
    const childId = await ChildrenService.createNewChild(req.body);
    res.send(childId);
});

router.patch(
    "/photo",
    verifyUser(["Parent", "Teacher"]),
    upload.single("photo"),
    async (req, res) => {
        await ChildrenService.updateChildPhoto(req.file.path, req.body.childId);
        res.sendStatus(200);
    }
);

router.patch("/active/:id", verifyUser(["Teacher"]), async (req, res) => {
    await ChildrenService.updateChildActive(req.params.id, req.body.isActive);
    res.sendStatus(200);
});

module.exports = router;
