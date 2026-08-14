const Activity = require("../models/Activity");
const Process = require("../models/Process");

// Create Activity
const createActivity = async (req, res) => {
    try {
        const {
            process,
            name,
            description,
            sequence,
            role,
            system,
            inputs,
            outputs,
            activityType
        } = req.body;

        // Check whether process exists
        const existingProcess = await Process.findById(process);

        if (!existingProcess) {
            return res.status(404).json({
                success: false,
                message: "Process not found"
            });
        }

        const activity = await Activity.create({
            process,
            name,
            description,
            sequence,
            role,
            system,
            inputs,
            outputs,
            activityType
        });

        res.status(201).json({
            success: true,
            message: "Activity created successfully",
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get activities for a process
const getActivitiesByProcess = async (req, res) => {
    try {
        const activities = await Activity.find({
            process: req.params.processId
        }).sort({ sequence: 1 });

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single activity
const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id)
            .populate("process", "name description");

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found"
            });
        }

        res.status(200).json({
            success: true,
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createActivity,
    getActivitiesByProcess,
    getActivityById
};