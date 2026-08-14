const mongoose = require("mongoose");

const aiOpportunitySchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: true
        },

        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: true
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: false
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        technology: {
            type: String,
            required: true,
            trim: true
        },

        interventionType: {
            type: String,
            enum: [
                "automation",
                "prediction",
                "classification",
                "recommendation",
                "generative_ai",
                "computer_vision",
                "optimization"
            ],
            required: true
        },

        maturity: {
            type: String,
            enum: ["emerging", "developing", "available", "mature"],
            default: "available"
        },

        expectedImpact: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.AIOpportunity ||
    mongoose.model("AIOpportunity", aiOpportunitySchema);