const express = require("express");

const {
    createIndustry,
    getIndustries
} = require("../controllers/industry.controller");

const router = express.Router();

router.post("/", createIndustry);
router.get("/", getIndustries);

module.exports = router;