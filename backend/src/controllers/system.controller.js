const System = require("../models/System");

const createSystem = async (req, res) => {
    try {
        const system = await System.create(req.body);

        res.status(201).json({
            success: true,
            message: "System created successfully",
            data: system
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSystemsByProcess = async (req, res) => {
    try {
        const systems = await System.find({
            process: req.params.processId
        });

        res.status(200).json({
            success: true,
            count: systems.length,
            data: systems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createSystem,
    getSystemsByProcess
};