const express = require("express");
const router = express.Router();
const ReportsService = require("../services/ReportsService");
const { authenticateToken, verifyUser } = require("../auth/auth");
const { upload } = require("../utils/utils");

router.use(authenticateToken);

router.get(
    "/:id",
    verifyUser(["Parent", "Teacher", "Therapist"]),
    async (req, res) => {
        const reports = await ReportsService.getChildReports(req.params.id);
        res.send(reports);
    }
);

router.get(
    "/latestreport/:id",
    verifyUser(["Parent", "Teacher"]),
    async (req, res) => {
        const report = await ReportsService.getChildLatestReport(req.params.id);
        res.send(report);
    }
);

router.post("/attendances", verifyUser(["Teacher"]), async (req, res) => {
    const childrenAttendance =
        await ReportsService.getAndCreateChildrenAttendance(req.body.ids);
    res.send(childrenAttendance);
});

router.post(
    "/newreport/:id",
    verifyUser(["Teacher", "Therapist"]),
    async (req, res) => {
        await ReportsService.createDailyReport([req.params.id]);
        res.sendStatus(200);
    }
);

router.patch("/child/:id", verifyUser(["Teacher"]), async (req, res) => {
    await ReportsService.updateChildAttendance(
        req.params.id,
        req.body.attendance
    );
    res.sendStatus(200);
});

router.patch(
    "/subreport/:id",
    verifyUser(["Teacher", "Therapist"]),
    async (req, res) => {
        await ReportsService.addSubReportToReport(
            req.params.id,
            req.body.subReports,
            req.user._id
        );
        res.sendStatus(200);
    }
);

router.patch(
    "/comment/:reportId",
    verifyUser(["Parent", "Teacher", "Therapist"]),
    async (req, res) => {
        await ReportsService.addCommentToReport(
            req.user.id,
            req.user.role,
            req.params.reportId,
            req.body.comment
        );
        res.sendStatus(200);
    }
);

router.post(
    "/image",
    verifyUser(["Parent", "Teacher", "Therapist"]),
    upload.single("photo"),
    async (req, res) => {
        req.body.profilePic = req.file.path;
        await ReportsService.addImageToReport(
            req.body,
            req.user.id,
            req.user.role
        );
        res.sendStatus(200);
    }
);

module.exports = router;
