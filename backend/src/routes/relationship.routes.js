const express = require("express");

const {
    createRelationship,
    getRelationshipsByProcess
} = require("../controllers/relationship.controller");

const router = express.Router();

router.post("/", createRelationship);

router.get(
    "/process/:processId",
    getRelationshipsByProcess
);

module.exports = router;