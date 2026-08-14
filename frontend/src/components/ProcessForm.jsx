import { useEffect, useState } from "react";
import { createProcess, getIndustries } from "../services/api";

function ProcessForm({ onClose, onCreated }) {
    const [processName, setProcessName] = useState("");
    const [description, setDescription] = useState("");
    const [industry, setIndustry] = useState("");
    const [industryOptions, setIndustryOptions] = useState([]);

    const [activities, setActivities] = useState([""]);
    const [problems, setProblems] = useState([""]);

    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const response = await getIndustries();
                const options = response?.data?.data || response?.data || [];

                setIndustryOptions(options);

                if (options.length > 0 && !industry) {
                    setIndustry(options[0]._id);
                }
            } catch (fetchError) {
                console.error("FETCH INDUSTRIES ERROR:", fetchError);
            }
        };

        fetchIndustries();
    }, []);

    const addActivity = () => {
        setActivities([...activities, ""]);
    };

    const updateActivity = (index, value) => {
        const updated = [...activities];
        updated[index] = value;
        setActivities(updated);
    };

    const addProblem = () => {
        setProblems([...problems, ""]);
    };

    const updateProblem = (index, value) => {
        const updated = [...problems];
        updated[index] = value;
        setProblems(updated);
    };

    const handleCreateProcess = async () => {
        setError("");

        if (!processName.trim()) {
            setError("Please enter a process name.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter a description.");
            return;
        }

        if (!industry) {
            setError("Please select an industry.");
            return;
        }

        const validActivities = activities
            .map((activity) => activity.trim())
            .filter((activity) => activity !== "");

        const validProblems = problems
            .map((problem) => problem.trim())
            .filter((problem) => problem !== "");

        if (validActivities.length === 0) {
            setError("Please add at least one activity.");
            return;
        }

        try {
            setCreating(true);

            const response = await createProcess({
                name: processName.trim(),
                description: description.trim(),
                industry,
                activities: validActivities.map((name, index) => ({
                    name,
                    description: name,
                    sequence: index + 1,
                    role: "Operations Team"
                })),
                problems: validProblems.map((text, index) => ({
                    title: text,
                    description: text,
                    type: "other",
                    severity: "medium",
                    impact: `Problem ${index + 1} affects process quality and operational efficiency.`
                }))
            });

            console.log("PROCESS CREATED:", response.data);

            alert("Process created successfully!");

            if (onCreated) {
                onCreated(response.data);
            } else if (onClose) {
                onClose();
            }
        } catch (createError) {
            console.error("CREATE PROCESS ERROR:", createError);
            console.error("BACKEND ERROR:", createError.response?.data);

            setError(
                createError.response?.data?.message ||
                createError.response?.data?.error ||
                "Failed to create process."
            );
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="process-form-overlay">
            <div className="process-form">
                <button
                    type="button"
                    className="close-form-btn"
                    onClick={onClose}
                >
                    ✕ Close Process Form
                </button>

                <h2>Create Business Process</h2>

                {error && <div className="form-error">{error}</div>}

                <div className="form-grid">
                    <div className="form-group">
                        <label>Process Name</label>
                        <input
                            type="text"
                            value={processName}
                            onChange={(e) => setProcessName(e.target.value)}
                            placeholder="e.g. Returns & Refund Process"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the business process"
                        />
                    </div>

                    <div className="form-group">
                        <label>Industry</label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                        >
                            {industryOptions.length === 0 ? (
                                <option value="">Loading industries...</option>
                            ) : (
                                <>
                                    <option value="">Select an industry</option>
                                    {industryOptions.map((option) => (
                                        <option key={option._id} value={option._id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                </div>

                <h3>Current Activities</h3>

                {activities.map((activity, index) => (
                    <div className="dynamic-row" key={index}>
                        <input
                            type="text"
                            value={activity}
                            onChange={(e) => updateActivity(index, e.target.value)}
                            placeholder={`Activity ${index + 1}`}
                        />

                        {index === activities.length - 1 && (
                            <button type="button" onClick={addActivity}>
                                + Add Activity
                            </button>
                        )}
                    </div>
                ))}

                <h3>Current Problems</h3>

                {problems.map((problem, index) => (
                    <div className="dynamic-row" key={index}>
                        <input
                            type="text"
                            value={problem}
                            onChange={(e) => updateProblem(index, e.target.value)}
                            placeholder={`Problem ${index + 1}`}
                        />

                        {index === problems.length - 1 && (
                            <button type="button" onClick={addProblem}>
                                + Add Problem
                            </button>
                        )}
                    </div>
                ))}

                <button
                    className="create-process-btn"
                    type="button"
                    onClick={handleCreateProcess}
                    disabled={creating}
                >
                    {creating ? "Creating Process..." : "Create Process"}
                </button>
            </div>
        </div>
    );
}

export default ProcessForm;