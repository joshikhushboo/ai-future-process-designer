const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema(
    {
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "business_system",
                "external_system",
                "ai_system",
                "database",
                "integration"
            ],
            required: true
        },

        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("System", systemSchema);