const Process = require("../models/Process");
const Activity = require("../models/Activity");
const Problem = require("../models/Problem");
const AIOpportunity = require("../models/AIOpportunity");
const Role = require("../models/Role");
const System = require("../models/System");
const Relationship = require("../models/Relationship");
const FutureActivity = require("../models/FutureActivity");
const Benefit = require("../models/Benefit");

const getProcessDesigner = async (req, res) => {
    try {
        const processId = req.params.processId;

        const [
            process,
            activities,
            problems,
            aiOpportunities,
            roles,
            systems,
            relationships,
            futureActivities,
            benefits
        ] = await Promise.all([
            Process.findById(processId)
                .populate("industry", "name description"),

            Activity.find({
                process: processId
            }).sort({ sequence: 1 }),

            Problem.find({
                process: processId
            }).populate(
                "activity",
                "name sequence"
            ),

            AIOpportunity.find({
                process: processId
            })
                .populate("activity", "name sequence")
                .populate("problem", "title severity"),

            Role.find({
                process: processId
            }),

            System.find({
                process: processId
            }),

            Relationship.find({
                process: processId
            }),

            FutureActivity.find({
                process: processId
            })
                .populate(
                    "currentActivity",
                    "name sequence"
                )
                .populate(
                    "responsibleRole",
                    "name type"
                )
                .populate(
                    "system",
                    "name type"
                )
                .populate(
                    "aiOpportunity",
                    "title technology"
                )
                .sort({ sequence: 1 }),

            Benefit.find({
                process: processId
            }).populate(
                "aiOpportunity",
                "title technology"
            )
        ]);

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Process not found"
            });
        }

        res.status(200).json({
            success: true,

            data: {
                process,

                current: {
                    activities,
                    problems
                },

                transformation: {
                    aiOpportunities,
                    relationships
                },

                resources: {
                    roles,
                    systems
                },

                future: {
                    activities: futureActivities,
                    benefits
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProcessDesigner
};