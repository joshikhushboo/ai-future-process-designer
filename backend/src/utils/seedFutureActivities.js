const mongoose = require("mongoose");
require("dotenv").config();

const FutureActivity = require("../models/futureActivity.model");

const PROCESS_ID = "6a7c00adfc94a5cf64bba896";

const AI_OPPORTUNITY_ID = "6a7c1f121564487ae9d36562";

const CURRENT_ACTIVITY_ID = "6a7c18e55505e735536c0b6e";

const futureActivities = [
    {
        process: PROCESS_ID,
        currentActivity: CURRENT_ACTIVITY_ID,
        name: "AI Inventory Verification",
        description:
            "AI automatically checks real-time inventory availability and identifies possible stock mismatches.",
        sequence: 1,
        responsibleType: "ai",
        aiOpportunity: AI_OPPORTUNITY_ID,
        automationLevel: "full",
        changeType: "automated"
    },

    {
        process: PROCESS_ID,
        name: "AI Stock Availability Prediction",
        description:
            "AI predicts whether sufficient stock will be available for order fulfillment using inventory and demand data.",
        sequence: 2,
        responsibleType: "ai",
        aiOpportunity: AI_OPPORTUNITY_ID,
        automationLevel: "full",
        changeType: "new"
    },

    {
        process: PROCESS_ID,
        name: "Automatic Order Confirmation",
        description:
            "The system automatically confirms the order when inventory and payment conditions are satisfied.",
        sequence: 3,
        responsibleType: "system",
        automationLevel: "full",
        changeType: "automated"
    },

    {
        process: PROCESS_ID,
        name: "Warehouse Picking and Packing",
        description:
            "Warehouse staff pick and pack the confirmed order based on system-generated fulfillment instructions.",
        sequence: 4,
        responsibleType: "human",
        automationLevel: "assisted",
        changeType: "augmented"
    },

    {
        process: PROCESS_ID,
        name: "Automated Shipping",
        description:
            "The system automatically generates shipping information and assigns the order for delivery.",
        sequence: 5,
        responsibleType: "system",
        automationLevel: "full",
        changeType: "automated"
    }
];

const seedFutureActivities = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await FutureActivity.deleteMany({
            process: PROCESS_ID
        });

        await FutureActivity.insertMany(
            futureActivities
        );

        console.log(
            "✅ Future activities created successfully"
        );

        process.exit(0);
    } catch (error) {
        console.error(
            "❌ Error:",
            error.message
        );

        process.exit(1);
    }
};

seedFutureActivities();