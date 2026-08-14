const Process = require("../models/process");
const Activity = require("../models/activity");
const Problem = require("../models/problem");

const createProcess = async (req, res) => {
    try {
        const {
            name,
            description,
            industry,
            activities = [],
            problems = []
        } = req.body;

        if (!name || !description || !industry) {
            return res.status(400).json({
                success: false,
                message: "Process name, description, and industry are required"
            });
        }

        const process = await Process.create({
            name: name.trim(),
            description: description.trim(),
            industry
        });

        const createdActivityIds = [];

        for (let i = 0; i < activities.length; i++) {
            const activityInput = activities[i];
            const activityData =
                typeof activityInput === "string"
                    ? {
                          name: activityInput,
                          description: activityInput
                      }
                    : activityInput;

            const activity = await Activity.create({
                process: process._id,
                name: activityData.name?.trim() || `Activity ${i + 1}`,
                description:
                    activityData.description?.trim() ||
                    activityData.name?.trim() ||
                    `Activity ${i + 1}`,
                sequence: activityData.sequence || i + 1,
                role: activityData.role || "Operations Team",
                activityType: activityData.activityType || "manual"
            });

            createdActivityIds.push(activity._id);
        }

        for (let i = 0; i < problems.length; i++) {
            const problemInput = problems[i];
            const problemData =
                typeof problemInput === "string"
                    ? {
                          title: problemInput,
                          description: problemInput
                      }
                    : problemInput;

            const activityId = createdActivityIds[i] || createdActivityIds[0];

            if (!activityId) {
                continue;
            }

            await Problem.create({
                process: process._id,
                activity: activityId,
                title: problemData.title?.trim() || `Problem ${i + 1}`,
                description:
                    problemData.description?.trim() ||
                    problemData.title?.trim() ||
                    `Problem ${i + 1}`,
                type: problemData.type || "other",
                severity: problemData.severity || "medium",
                impact:
                    problemData.impact ||
                    "The process is creating delays, rework, or customer experience issues."
            });
        }

        return res.status(201).json({
            success: true,
            message: "Process created successfully",
            data: process
        });
    } catch (error) {
        console.error("Create process error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create process",
            error: error.message
        });
    }
};

module.exports = {
    createProcess
};