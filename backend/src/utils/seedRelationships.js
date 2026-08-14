const mongoose = require("mongoose");
require("dotenv").config();

const Relationship = require("../models/relationship.model");

const PROCESS_ID = "6a7c00adfc94a5cf64bba896";

const ACTIVITY_ID = "6a7c18e55505e735536c0b6e";

const AI_OPPORTUNITY_ID = "6a7c1f121564487ae9d36562";

const relationships = [
    {
        process: PROCESS_ID,
        sourceType: "activity",
        sourceId: ACTIVITY_ID,
        targetType: "ai_opportunity",
        targetId: AI_OPPORTUNITY_ID,
        relationshipType: "transformed_by",
        description:
            "The current inventory verification activity is transformed by AI-powered inventory verification."
    }
];

async function seedRelationships() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Relationship.deleteMany({
            process: PROCESS_ID
        });

        await Relationship.insertMany(
            relationships
        );

        console.log(
            "✅ Relationships inserted successfully"
        );

        process.exit(0);
    } catch (error) {
        console.error(
            "❌ Error:",
            error.message
        );

        process.exit(1);
    }
}

seedRelationships();