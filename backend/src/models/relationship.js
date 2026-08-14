const mongoose = require("mongoose");

const relationshipSchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: true
        },

        sourceType: {
            type: String,
            enum: [
                "activity",
                "problem",
                "ai_opportunity",
                "role",
                "system"
            ],
            required: true
        },

        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        targetType: {
            type: String,
            enum: [
                "activity",
                "problem",
                "ai_opportunity",
                "role",
                "system"
            ],
            required: true
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        relationshipType: {
            type: String,
            enum: [
                "LEADS_TO",
                "CAUSES",
                "SOLVES",
                "PERFORMS",
                "USES",
                "AUTOMATES",
                "REPLACES",
                "SUPPORTS",
                "DECISION_TRUE",
                "DECISION_FALSE"
            ],
            required: true
        },

        condition: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Relationship ||
    mongoose.model("Relationship", relationshipSchema);