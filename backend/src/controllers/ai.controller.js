const Process = require("../models/process");
const Activity = require("../models/activity");
const Problem = require("../models/problem");

const AIOpportunity = require("../models/aiOpportunity");
const FutureActivity = require("../models/futureActivity");
const Benefit = require("../models/benefit");
const Relationship = require("../models/relationship");

const { analyzeProcess } = require("../services/ai.service");

const generateAIAnalysis = async (req, res) => {
    try {
        console.log("\n===== AI ANALYSIS STARTED =====");

        const { processId } = req.params;

        console.log("Process ID:", processId);

        // --------------------------------
        // 1. FIND PROCESS
        // --------------------------------

        const process = await Process
            .findById(processId)
            .populate("industry");

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Process not found"
            });
        }

        console.log(
            "✅ Process found:",
            process.name
        );

        // --------------------------------
        // 2. FIND ACTIVITIES
        // --------------------------------

        const activities = await Activity
            .find({
                process: processId
            })
            .sort({
                sequence: 1
            });

        console.log(
            "✅ Activities found:",
            activities.length
        );

        // --------------------------------
        // 3. FIND PROBLEMS
        // --------------------------------

        const problems = await Problem.find({
            process: processId
        });

        console.log(
            "✅ Problems found:",
            problems.length
        );

        // --------------------------------
        // 4. SEND DATA TO GEMINI
        // --------------------------------

        console.log(
            "4. Sending data to Gemini..."
        );

        const aiResult = await analyzeProcess({
            process,
            activities,
            problems
        });

        console.log(
            "✅ Gemini analysis received"
        );

        console.log(
            "AI Opportunities:",
            aiResult.aiOpportunities?.length
        );

        console.log(
            "Future Activities:",
            aiResult.futureActivities?.length
        );

        console.log(
            "Benefits:",
            aiResult.benefits?.length
        );

        // --------------------------------
        // 5. CLEAR OLD AI RESULTS
        // --------------------------------

        await AIOpportunity.deleteMany({
            process: processId
        });

        await FutureActivity.deleteMany({
            process: processId
        });

        await Benefit.deleteMany({
            process: processId
        });

        console.log(
            "✅ Old AI results cleared"
        );

        // --------------------------------
        // 6. SAVE AI OPPORTUNITIES
        // --------------------------------

        const savedOpportunities = [];

        const normalizeFutureActivities = (items = []) => {
            const unique = [];
            const seen = new Set();

            for (const item of items || []) {
                const name = String(item?.name || "").trim();

                if (!name) {
                    continue;
                }

                const key = name.toLowerCase();
                const isOrderPlaced = key.includes("order placed");

                if (isOrderPlaced) {
                    if (seen.has("order_placed")) {
                        continue;
                    }

                    seen.add("order_placed");
                    unique.push({
                        ...item,
                        name: "Order Placed"
                    });
                    continue;
                }

                if (seen.has(key)) {
                    continue;
                }

                seen.add(key);
                unique.push(item);
            }

            return unique;
        };

        const normalizeInterventionType = (val) => {
            if (!val) {
                return null;
            }

            const v = String(val)
                .toLowerCase()
                .trim();

            const map = {
                generative: "generative_ai",
                "generative ai": "generative_ai",
                generative_ai: "generative_ai",
                "gen ai": "generative_ai",
                generation: "generative_ai",
                generate: "generative_ai",
                detection: "computer_vision",

                "computer vision": "computer_vision",
                computer_vision: "computer_vision",
                cv: "computer_vision",
                vision: "computer_vision",

                automation: "automation",
                automate: "automation",

                prediction: "prediction",
                predictive: "prediction",

                classification: "classification",

                recommendation: "recommendation",
                recommend: "recommendation",

                optimization: "optimization",
                optimise: "optimization",
                optimiseation: "optimization"
            };

            if (map[v]) {
                return map[v];
            }

            const normalized = v.replace(
                /\s+/g,
                "_"
            );

            const allowed = [
                "automation",
                "prediction",
                "classification",
                "recommendation",
                "generative_ai",
                "computer_vision",
                "optimization"
            ];

            return allowed.includes(normalized)
                ? normalized
                : null;
        };

        const normalizeMaturity = (val) => {
            if (!val) {
                return "available";
            }

            const v = String(val)
                .toLowerCase()
                .trim();

            const map = {
                emerging: "emerging",
                developing: "developing",
                development: "developing",
                "in_development": "developing",
                "in development": "developing",
                available: "available",
                mature: "mature",
                matured: "mature"
            };

            return map[v] || "available";
        };

        const normalizeResponsibleType = (val) => {
            if (!val) {
                return "ai";
            }

            const v = String(val).toLowerCase().trim();
            const map = {
                human: "human",
                ai: "ai",
                "artificial intelligence": "ai",
                system: "system",
                hybrid: "hybrid"
            };

            return map[v] || "ai";
        };

        const normalizeAutomationLevel = (val) => {
            if (!val) {
                return "partial";
            }

            const v = String(val).toLowerCase().trim();
            const map = {
                none: "none",
                assisted: "assisted",
                partial: "partial",
                full: "full",
                automated: "full",
                automation: "full",
                autonomous: "full"
            };

            return map[v] || "partial";
        };

        const normalizeChangeType = (val) => {
            if (!val) {
                return "new";
            }

            const v = String(val).toLowerCase().trim();
            const map = {
                unchanged: "unchanged",
                automated: "automated",
                augment: "augmented",
                augmented: "augmented",
                replace: "replaced",
                replaced: "replaced",
                new: "new"
            };

            return map[v] || "new";
        };

        const normalizeImpactLevel = (val) => {
            if (!val) {
                return "medium";
            }

            const v = String(val).toLowerCase().trim();
            const map = {
                low: "low",
                medium: "medium",
                high: "high"
            };

            return map[v] || "medium";
        };

        const normalizeRelationshipType = (val) => {
            if (!val) {
                return "AUTOMATES";
            }

            const v = String(val).trim();
            const upper = v.toUpperCase();
            const lower = v.toLowerCase();

            const map = {
                leads_to: "LEADS_TO",
                causes: "CAUSES",
                solves: "SOLVES",
                performs: "PERFORMS",
                uses: "USES",
                automates: "AUTOMATES",
                replaces: "REPLACES",
                supports: "SUPPORTS",
                decision_true: "DECISION_TRUE",
                decision_false: "DECISION_FALSE",
                "decision true": "DECISION_TRUE",
                "decision false": "DECISION_FALSE"
            };

            return map[lower] || upper;
        };

        for (
            const opportunity
            of aiResult.aiOpportunities || []
        ) {
            const activity =
                activities[
                    opportunity.activityIndex
                ];

            if (!activity) {
                continue;
            }

            const interventionType =
                normalizeInterventionType(
                    opportunity.interventionType
                ) || "automation";

            const maturity = normalizeMaturity(
                opportunity.maturity
            );

            const saved =
                await AIOpportunity.create({
                    process: processId,

                    activity: activity._id,

                    title: opportunity.title,

                    description:
                        opportunity.description,

                    technology:
                        opportunity.technology,

                    interventionType,

                    maturity,

                    expectedImpact:
                        opportunity.expectedImpact
                });

            savedOpportunities.push(saved);
        }

        console.log(
            "✅ AI opportunities saved:",
            savedOpportunities.length
        );

        // --------------------------------
        // 7. SAVE FUTURE ACTIVITIES
        // --------------------------------

        const savedFutureActivities = [];

        const normalizedFutureActivities =
            normalizeFutureActivities(
                aiResult.futureActivities || []
            );

        for (const future of normalizedFutureActivities) {
            const saved =
                await FutureActivity.create({
                    process: processId,

                    name: future.name,

                    description:
                        future.description,

                    sequence:
                        future.sequence,

                    responsibleType:
                        normalizeResponsibleType(
                            future.responsibleType
                        ),

                    automationLevel:
                        normalizeAutomationLevel(
                            future.automationLevel
                        ),

                    changeType:
                        normalizeChangeType(
                            future.changeType
                        )
                });

            savedFutureActivities.push(saved);
        }

        console.log(
            "✅ Future activities saved:",
            savedFutureActivities.length
        );

        // --------------------------------
        // 8. SAVE BENEFITS
        // --------------------------------

        const savedBenefits = [];

        for (
            const benefit
            of aiResult.benefits || []
        ) {
            const saved =
                await Benefit.create({
                    process: processId,

                    name:
                        benefit.name,

                    description:
                        benefit.description,

                    metric:
                        benefit.metric,

                    expectedImprovement:
                        benefit.expectedImprovement,

                    impactLevel:
                        normalizeImpactLevel(
                            benefit.impactLevel
                        )
                });

            savedBenefits.push(saved);
        }

        console.log(
            "✅ Benefits saved:",
            savedBenefits.length
        );

        // --------------------------------
        // 9. SAVE RELATIONSHIPS
        // --------------------------------

        const savedRelationships = [];

        await Relationship.deleteMany({
            process: processId
        });

        for (
            const relationship
            of aiResult.relationships || []
        ) {
            const activity =
                activities[relationship.activityIndex];

            const opportunity =
                savedOpportunities[
                    relationship.opportunityIndex
                ];

            if (!activity || !opportunity) {
                continue;
            }

            const saved =
                await Relationship.create({
                    process: processId,

                    sourceType: "activity",
                    sourceId: activity._id,

                    targetType: "ai_opportunity",
                    targetId: opportunity._id,

                    relationshipType:
                        normalizeRelationshipType(
                            relationship.relationshipType
                        ),

                    condition:
                        relationship.condition
                });

            savedRelationships.push(saved);
        }

        console.log(
            "✅ Relationships saved:",
            savedRelationships.length
        );

        // --------------------------------
        // 10. RESPONSE
        // --------------------------------

        console.log(
            "===== AI ANALYSIS COMPLETED =====\n"
        );

        return res.status(200).json({
            success: true,
            message:
                "AI process analysis completed successfully",
            data: {
                aiOpportunities:
                    savedOpportunities,
                futureActivities:
                    savedFutureActivities,
                benefits:
                    savedBenefits,
                relationships:
                    savedRelationships
            }
        });

    } catch (error) {
        console.error("\n========== AI ERROR ==========");
        console.error("NAME:", error.name);
        console.error("MESSAGE:", error.message);
        console.error("STACK:", error.stack);
        console.error("FULL ERROR:", error);
        console.error("==============================\n");

        return res.status(500).json({
            success: false,
            message: "AI process analysis failed",
            error: error.message
        });
    }
};

module.exports = {
    generateAIAnalysis
};