const Problem = require("../models/Problem");
const Process = require("../models/Process");
const Activity = require("../models/Activity");

const createProblem = async (req, res) => {
    try {
        const {
            process,
            activity,
            title,
            description,
            type,
            severity,
            impact
        } = req.body;

        const existingProcess = await Process.findById(process);

        if (!existingProcess) {
            return res.status(404).json({
                success: false,
                message: "Process not found"
            });
        }

        const existingActivity = await Activity.findById(activity);

        if (!existingActivity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found"
            });
        }

        const problem = await Problem.create({
            process,
            activity,
            title,
            description,
            type,
            severity,
            impact
        });

        res.status(201).json({
            success: true,
            message: "Problem created successfully",
            data: problem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProblemsByProcess = async (req, res) => {
    try {
        const problems = await Problem.find({
            process: req.params.processId
        })
            .populate("activity", "name sequence")
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: problems.length,
            data: problems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id)
            .populate("process", "name")
            .populate("activity", "name sequence");

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        res.status(200).json({
            success: true,
            data: problem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProblem,
    getProblemsByProcess,
    getProblemById
};