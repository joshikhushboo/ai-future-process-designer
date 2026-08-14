const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: true
        },

        aiOpportunity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AIOpportunity"
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        metric: {
            type: String,
            required: true
        },

        expectedImprovement: {
            type: String,
            required: true
        },

        impactLevel: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Benefit ||
    mongoose.model("Benefit", benefitSchema);