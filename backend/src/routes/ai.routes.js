const express = require("express");

const {
    generateAIAnalysis
} = require("../controllers/ai.controller");

const router = express.Router();

router.post(
    "/analyze/:processId",
    generateAIAnalysis
);

module.exports = router;