const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: [true, "Process is required"]
        },

        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: [true, "Activity is required"]
        },

        title: {
            type: String,
            required: [true, "Problem title is required"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Problem description is required"],
            trim: true
        },

        type: {
            type: String,
            enum: [
                "manual_work",
                "delay",
                "human_error",
                "high_cost",
                "data_issue",
                "decision_bottleneck",
                "poor_customer_experience",
                "other"
            ],
            required: true
        },

        severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium"
        },

        impact: {
            type: String,
            required: [true, "Problem impact is required"],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Problem ||
    mongoose.model("Problem", problemSchema);