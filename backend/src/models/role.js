const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
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
            enum: ["human", "ai", "system", "external"],
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

module.exports = mongoose.model("Role", roleSchema);