const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        timeout: 180000
    }
});

const analyzeProcess = async ({
    process,
    activities,
    problems
}) => {

    const prompt = `
You are an AI business process transformation expert.

Analyze this e-commerce business process and redesign it using AI,
automation and emerging technologies.

PROCESS:
${JSON.stringify(process, null, 2)}

CURRENT ACTIVITIES:
${JSON.stringify(activities, null, 2)}

CURRENT PROBLEMS:
${JSON.stringify(problems, null, 2)}

Return ONLY valid JSON.

Use exactly this structure:

{
  "aiOpportunities": [
    {
      "activityIndex": 0,
      "title": "string",
      "description": "string",
      "technology": "string",
      "interventionType": "automation",
      "maturity": "mature",
      "expectedImpact": "string"
    }
  ],

  "futureActivities": [
    {
      "name": "string",
      "description": "string",
      "sequence": 1,
      "responsibleType": "ai",
      "automationLevel": "full",
      "changeType": "automated"
    }
  ],

  "benefits": [
    {
      "name": "string",
      "description": "string",
      "metric": "string",
      "expectedImprovement": "string",
      "impactLevel": "high"
    }
  ],
  "relationships": [
    {
        "activityIndex": 0,
        "opportunityIndex": 0,
        "relationshipType": "AUTOMATES",
        "condition": "AI automates manual inventory verification."
    }
]
}

Rules:
IMPORTANT RULES:

1. Do NOT duplicate existing current process activities.
2. Preserve the original current process activities exactly.
3. Only identify problems and opportunities in the current process.
4. Every future activity must have a unique step number.
5. Clearly distinguish:
   - replaced
   - augmented
   - new
   - unchanged
6. Do not invent unrealistic technologies.
7. Do not claim business improvements as guaranteed facts.
8. Benefits must be expressed as estimated/potential improvements.
9. Generate relationships between:
   - current activities
   - problems
   - AI interventions
   - future activities
10. Always return processRelationships.
11. processRelationships must never be empty if AI interventions or future activities exist.

responsibleType:
human, ai, system, hybrid

automationLevel:
none, assisted, partial, full

changeType:
unchanged, automated, augmented, replaced, new

interventionType:
prediction, recommendation, automation, generation, detection

maturity:
emerging, developing, mature

impactLevel:
low, medium, high

Do not return markdown.
Do not return explanations outside JSON.
- activityIndex must refer to an existing activity.
- opportunityIndex must refer to an existing AI opportunity.
- relationshipType must be one of:
  LEADS_TO, CAUSES, SOLVES, PERFORMS, USES,
  AUTOMATES, REPLACES, SUPPORTS,
  DECISION_TRUE, DECISION_FALSE
- Generate at least 1 relationship when an AI opportunity exists.
`;


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    const text = response.text;

    const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanText);
};

module.exports = {
    analyzeProcess
};