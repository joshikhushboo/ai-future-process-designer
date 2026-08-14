import { useEffect, useState } from "react";
import "./App.css";

import {
    getProcessDesigner,
    analyzeProcessWithAI
} from "./services/api";

import ProcessOverview from "./components/ProcessOverview";
import CurrentProcess from "./components/CurrentProcess";
import TransitionPanel from "./components/TransitionPanel";
import FutureProcess from "./components/FutureProcess";
import ResponsibilityPanel from "./components/ResponsibilityPanel";
import BenefitsPanel from "./components/BenefitsPanel";
import RelationshipPanel from "./components/RelationshipPanel";
import ProcessForm from "./components/ProcessForm";

function App() {
    const [processData, setProcessData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [aiLoading, setAiLoading] = useState(false);
const [showForm, setShowForm] = useState(false);

    // Current process ID
    const processId = "6a7c00adfc94a5cf64bba896";

    // ==========================================
    // LOAD PROCESS
    // ==========================================

    const loadProcess = async (includeExistingAI = false) => {
        try {
            setLoading(true);

            const response = await getProcessDesigner(processId);

            const data = response.data || {};

            const normalizedData = {
                ...data,

                transformation: {
                    ...(data.transformation || {}),

                    aiOpportunities: includeExistingAI
                        ? data.transformation?.aiOpportunities || []
                        : []
                },

                future: {
                    ...(data.future || {}),

                    activities: includeExistingAI
                        ? data.future?.activities || []
                        : [],

                    benefits: includeExistingAI
                        ? data.future?.benefits || []
                        : []
                }
            };

            setProcessData(normalizedData);

        } catch (error) {
            console.error("Process loading error:", error);

            setError(
                "Unable to load process data."
            );

        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // AI ANALYSIS
    // ==========================================

    const handleAIAnalysis = async () => {
        try {
            setAiLoading(true);

            await analyzeProcessWithAI(processId);

            await loadProcess(true);

            alert(
                "AI analysis completed successfully!"
            );

        } catch (error) {
            console.error(
                "AI Analysis Error:",
                error
            );

            console.error(
                "BACKEND ERROR:",
                error.response?.data
            );

            alert(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "AI analysis failed"
            );

        } finally {
            setAiLoading(false);
        }
    };

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        loadProcess(false);
    }, []);

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="loading">
                Loading AI Future Process Designer...
            </div>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return (
            <div className="error">
                {error}
            </div>
        );
    }

    // ==========================================
    // NO DATA
    // ==========================================

    if (!processData) {
        return (
            <div className="error">
                No process data found.
            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="app">

            {/* HEADER */}

            <header className="header">
                <div className="container">

                    <h1>
                        AI Future Process Designer
                    </h1>

                    <p>
                        Transforming business processes
                        with AI, automation and emerging
                        technology
                    </p>

                </div>
            </header>

            <main className="container">

                {/* CREATE NEW PROCESS */}

                <div className="new-process-action">

                    <button
                        onClick={() =>
                            setShowForm(!showForm)
                        }
                    >
                        {showForm
                            ? "✕ Close Process Form"
                            : "＋ Create New Process"}
                    </button>

                </div>

                {/* PROCESS FORM */}

                {showForm && (
                    <ProcessForm
                        onClose={() => setShowForm(false)}
                        onCreated={() => {
                            setShowForm(false);
                            loadProcess(true);
                        }}
                    />
                )}
                

                {/* PROCESS OVERVIEW */}

                <ProcessOverview
                    process={processData.process}
                />

                {/* AI ANALYSIS */}

                <div className="ai-action">

                    <button
                        onClick={handleAIAnalysis}
                        disabled={aiLoading}
                    >
                        {aiLoading
                            ? "🤖 Analyzing Process..."
                            : "🤖 Analyze Process with AI"}
                    </button>

                    <p>
                        Let AI identify opportunities,
                        future activities and expected
                        business benefits.
                    </p>

                </div>

                {/* CURRENT PROCESS */}

                <CurrentProcess
                    activities={
                        processData.current?.activities || []
                    }
                    problems={
                        processData.current?.problems || []
                    }
                />

                {/* AI TRANSITION */}

                <TransitionPanel
                    opportunities={
                        processData.transformation
                            ?.aiOpportunities || []
                    }
                />

                {/* FUTURE PROCESS */}

                <FutureProcess
                    activities={
                        processData.future?.activities || []
                    }
                />

                {/* FUTURE RESPONSIBILITIES */}

                <ResponsibilityPanel
                    activities={
                        processData.future?.activities || []
                    }
                />

                {/* BENEFITS */}

                <BenefitsPanel
                    benefits={
                        processData.future?.benefits || []
                    }
                />

                {/* RELATIONSHIPS */}

                <RelationshipPanel
                    relationships={
                        processData.transformation
                            ?.relationships || []
                    }
                />

            </main>
        </div>
    );
}

export default App;