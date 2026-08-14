const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: [true, "Process is required"]
        },

        name: {
            type: String,
            required: [true, "Activity name is required"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Activity description is required"],
            trim: true
        },

        sequence: {
            type: Number,
            required: [true, "Activity sequence is required"]
        },

        role: {
            type: String,
            required: [true, "Role is required"],
            trim: true
        },

        system: {
            type: String,
            trim: true
        },

        inputs: {
            type: [String],
            default: []
        },

        outputs: {
            type: [String],
            default: []
        },

        activityType: {
            type: String,
            enum: ["manual", "automated", "decision", "hybrid"],
            default: "manual"
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Activity ||
    mongoose.model("Activity", activitySchema);