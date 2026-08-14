const express = require("express");

const {
    createFutureActivity,
    getFutureActivitiesByProcess
} = require("../controllers/futureActivity.controller");

const router = express.Router();

router.post("/", createFutureActivity);

router.get(
    "/process/:processId",
    getFutureActivitiesByProcess
);

module.exports = router;