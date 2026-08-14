const mongoose = require("mongoose");
require("dotenv").config();

const Benefit = require("../models/benefit.model");

const PROCESS_ID = "6a7c00adfc94a5cf64bba896";

const AI_OPPORTUNITY_ID = "6a7c1f121564487ae9d36562";

const benefits = [
    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Faster Inventory Verification",
        description:
            "AI automatically verifies product availability using real-time inventory data.",
        metric: "Inventory verification time",
        expectedImprovement:
            "Reduce verification time from minutes to seconds",
        impactLevel: "high"
    },

    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Reduced Inventory Errors",
        description:
            "AI identifies stock mismatches before an order is confirmed.",
        metric: "Inventory mismatch rate",
        expectedImprovement:
            "Significantly reduce stock mismatch errors",
        impactLevel: "high"
    },

    {
        process: PROCESS_ID,
        aiOpportunity: AI_OPPORTUNITY_ID,
        name: "Faster Order Processing",
        description:
            "Automated verification and confirmation reduce manual processing steps.",
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
            "Automation reduces repetitive manual work performed by warehouse staff.",
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
            "Faster and more reliable order processing improves delivery predictability.",
        metric: "Order fulfillment experience",
        expectedImprovement:
            "Improve order confirmation and fulfillment speed",
        impactLevel: "high"
    }
];

const seedBenefits = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Benefit.deleteMany({
            process: PROCESS_ID
        });

        await Benefit.insertMany(benefits);

        console.log(
            "✅ Benefits created successfully"
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

seedBenefits();