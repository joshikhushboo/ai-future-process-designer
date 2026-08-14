const express = require("express");

const {
    createAIOpportunity,
    getAIOpportunitiesByProcess
} = require("../controllers/aiOpportunity.controller");

const router = express.Router();

router.post("/", createAIOpportunity);

router.get(
    "/process/:processId",
    getAIOpportunitiesByProcess
);

module.exports = router;