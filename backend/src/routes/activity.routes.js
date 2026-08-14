const express = require("express");

const {
    createActivity,
    getActivitiesByProcess,
    getActivityById
} = require("../controllers/activity.controller");

const router = express.Router();

router.post("/", createActivity);

router.get(
    "/process/:processId",
    getActivitiesByProcess
);

router.get("/:id", getActivityById);

module.exports = router;