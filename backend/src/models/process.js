const mongoose = require("mongoose");

const processSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Process name is required"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Process description is required"],
            trim: true
        },

        industry: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Industry",
            required: [true, "Industry is required"]
        },

        status: {
            type: String,
            enum: ["draft", "active", "archived"],
            default: "draft"
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.models.Process || mongoose.model("Process", processSchema);