const express = require("express");

const {
    createRole,
    getRolesByProcess
} = require("../controllers/role.controller");

const router = express.Router();

router.post("/", createRole);

router.get(
    "/process/:processId",
    getRolesByProcess
);

module.exports = router;