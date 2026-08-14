const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Industry name is required"],
            unique: true,
            trim: true
        },

        description: {
            type: String,
            required: [true, "Industry description is required"],
            trim: true
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Industry", industrySchema);