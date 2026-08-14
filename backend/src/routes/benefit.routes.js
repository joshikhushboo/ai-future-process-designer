const express = require("express");

const {
    createBenefit,
    getBenefitsByProcess
} = require("../controllers/benefit.controller");

const router = express.Router();

router.post("/", createBenefit);

router.get(
    "/process/:processId",
    getBenefitsByProcess
);

module.exports = router;