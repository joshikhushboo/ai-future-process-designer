const express = require("express");

const {
    createProblem,
    getProblemsByProcess,
    getProblemById
} = require("../controllers/problem.controller");

const router = express.Router();

router.post("/", createProblem);

router.get(
    "/process/:processId",
    getProblemsByProcess
);

router.get("/:id", getProblemById);

module.exports = router;