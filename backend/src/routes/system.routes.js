const express = require("express");

const {
    createSystem,
    getSystemsByProcess
} = require("../controllers/system.controller");

const router = express.Router();

router.post("/", createSystem);

router.get(
    "/process/:processId",
    getSystemsByProcess
);

module.exports = router;