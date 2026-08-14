const express = require("express");

const {
    getProcessDesigner
} = require("../controllers/processDesigner.controller");

const router = express.Router();

router.get(
    "/:processId",
    getProcessDesigner
);

module.exports = router;