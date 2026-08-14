const mongoose = require("mongoose");

const futureActivitySchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: true
        },

        currentActivity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity"
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        sequence: {
            type: Number,
            required: true
        },

        responsibleType: {
            type: String,
            enum: ["human", "ai", "system", "hybrid"],
            required: true
        },

        responsibleRole: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        },

        system: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "System"
        },

        aiOpportunity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AIOpportunity"
        },

        automationLevel: {
            type: String,
            enum: [
                "none",
                "assisted",
                "partial",
                "full"
            ],
            default: "none"
        },

        changeType: {
            type: String,
            enum: [
                "unchanged",
                "automated",
                "augmented",
                "replaced",
                "new"
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.FutureActivity ||
    mongoose.model("FutureActivity", futureActivitySchema);