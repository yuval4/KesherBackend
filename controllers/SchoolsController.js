const express = require("express");
const router = express.Router();
const SchoolsService = require("../services/SchoolsService");
const {
    authenticateToken,
    verifyUser,
    verifyDaysSinceChangePassword,
} = require("../auth/auth");
const { roles } = require("../utils/constants");

router.use(authenticateToken);
router.use(verifyDaysSinceChangePassword);

router.get(
    "/:id",
    verifyUser(["Teacher", "Therapist", roles.admin]),
    async (req, res) => {
        const children = await SchoolsService.getChildrenBySchoolId(
            req.params.id
        );
        res.send(children);
    }
);

router.post("/", verifyUser(["Admin"]), async (req, res) => {
    const schoolId = await SchoolsService.createNewSchool(req.body);
    res.send(schoolId);
});

router.patch("/children", verifyUser(["Teacher"]), async (req, res) => {
    await SchoolsService.addChildToSchool(req.body.schoolId, req.body.childId);
    return res.sendStatus(200);
});

router.get(
    "/events/:id",
    verifyUser(["Parent", "Teacher"]),
    async (req, res) => {
        const events = await SchoolsService.getEventsBySchoolId(req.params.id);
        res.send(events);
    }
);

router.patch("/events/:schoolId", verifyUser(["Teacher"]), async (req, res) => {
    await SchoolsService.addNewEventToSchool(
        req.params.schoolId,
        req.body.event,
        req.user.id
    );
    return res.sendStatus(200);
});

module.exports = router;
