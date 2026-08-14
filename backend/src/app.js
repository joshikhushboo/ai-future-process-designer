const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173"
];

// ========================
// Middlewares
// ========================

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);

app.use(express.json());

// ========================
// Routes
// ========================

const industryRoutes = require("./routes/industry.routes");
const processRoutes = require("./routes/process.routes");
const activityRoutes = require("./routes/activity.routes");
const problemRoutes = require("./routes/problem.routes");
const aiOpportunityRoutes = require("./routes/aiOpportunity.routes");
const roleRoutes = require("./routes/role.routes");
const systemRoutes = require("./routes/system.routes");
const relationshipRoutes = require("./routes/relationship.routes");
const futureActivityRoutes = require("./routes/futureActivity.routes");
const benefitRoutes = require("./routes/benefit.routes");
const processDesignerRoutes = require("./routes/processDesigner.routes");
const aiRoutes = require("./routes/ai.routes");


// ========================
// API Routes
// ========================

app.use("/api/industries", industryRoutes);
app.use("/api/processes", processRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/ai-opportunities", aiOpportunityRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/systems", systemRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/future-activities", futureActivityRoutes);
app.use("/api/benefits", benefitRoutes);
app.use("/api/process-designer", processDesignerRoutes);
app.use(
    "/api/ai",
    aiRoutes
);
// ========================
// Test Route
// ========================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Future Process Designer API is running"
    });
});

// ========================
// Export
// ========================

module.exports = app;