const express = require("express");

const router = express.Router();

const {
    createProcess
} = require("../controllers/process.controller");

router.post("/", createProcess);

module.exports = router;