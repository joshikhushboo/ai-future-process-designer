const mongoose = require("mongoose");
require("dotenv").config();

const FutureActivity = require("../models/futureActivity.model");
const Benefit = require("../models/benefit.model");

const PROCESS_ID = "6a7c00adfc94a5cf64bba896";

const AI_OPPORTUNITY_ID = "6a7c1f121564487ae9d36562";

const CURRENT_ACTIVITY_ID = "6a7c18e55505e735536c0b6e";

const futureActivities = [
    {
        process: PROCESS_ID,
        currentActivity: CURRENT_ACTIVITY_ID,
        name: "AI Inventory Verification",
        description:
            "AI automatically checks real-time inventory availability and identifies stock mismatches.",
        sequence: 1,
        responsibleType: "ai",
        aiOpportunity: AI_OPPORTUNITY_ID,
        automationLevel: "full",
        changeType: "automated"
    },
    {
        process: PROCESS_ID,
        name: "AI Stock Prediction",
        description:
            "AI predicts stock availability using inventory and demand data.",
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
            "The system automatically confirms valid orders after inventory verification.",
        sequence: 3,
        responsibleType: "system",
        automationLevel: "full",
        changeType: "automated"
    },
    {
        process: PROCESS_ID,
        name: "Warehouse Picking and Packing",
        description:
            "Warehouse staff pick and pack orders using system-generated fulfillment instructions.",
        sequence: 4,
        responsibleType: "human",
        automationLevel: "assisted",
        changeType: "augmented"
    },
    {
        process: PROCESS_ID,
        name: "Automated Shipping",
        description:
            "The system generates shipping information and assigns the order for delivery.",
        sequence: 5,
        responsibleType: "system",
        automationLevel: "full",
        changeType: "automated"
    }
];

const benefits = [
    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Faster Inventory Verification",
        description:
            "AI reduces the time required to verify product availability.",
        metric: "Verification time",
        expectedImprovement:
            "Reduce verification time from minutes to seconds",
        impactLevel: "high"
    },
    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Reduced Inventory Errors",
        description:
            "AI identifies stock mismatches before order confirmation.",
        metric: "Inventory mismatch rate",
        expectedImprovement:
            "Significantly reduce inventory mismatch errors",
        impactLevel: "high"
    },
    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Faster Order Processing",
        description:
            "Automation removes repetitive manual verification steps.",
        metric: "Order processing time",
        expectedImprovement:
            "Reduce overall order processing time",
        impactLevel: "high"
    },
    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Lower Operational Cost",
        description:
            "Automation reduces repetitive manual workload.",
        metric: "Manual processing effort",
        expectedImprovement:
            "Reduce repetitive operational workload",
        impactLevel: "medium"
    },
    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Improved Customer Experience",
        description:
            "Faster order confirmation improves the customer fulfillment experience.",
        metric: "Order fulfillment experience",
        expectedImprovement:
            "Improve order confirmation and fulfillment speed",
        impactLevel: "high"
    }
];

async function seedFutureData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await FutureActivity.deleteMany({
            process: PROCESS_ID
        });

        await Benefit.deleteMany({
            process: PROCESS_ID
        });

        await FutureActivity.insertMany(
            futureActivities
        );

        await Benefit.insertMany(benefits);

        console.log(
            "✅ Future activities inserted:",
            futureActivities.length
        );

        console.log(
            "✅ Benefits inserted:",
            benefits.length
        );

        console.log("🎉 Future data completed");

        process.exit(0);
    } catch (error) {
        console.error(
            "❌ Error:",
            error.message
        );

        process.exit(1);
    }
}

seedFutureData();