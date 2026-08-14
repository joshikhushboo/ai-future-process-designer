const Role = require("../models/Role");

const createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRolesByProcess = async (req, res) => {
    try {
        const roles = await Role.find({
            process: req.params.processId
        });

        res.status(200).json({
            success: true,
            count: roles.length,
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRole,
    getRolesByProcess
};