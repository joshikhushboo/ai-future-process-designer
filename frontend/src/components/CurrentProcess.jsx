function CurrentProcess({ activities, problems }) {
    return (
        <section className="section">
            <div className="section-heading">
                <div className="section-number">01</div>

                <div>
                    <h2>Current Process</h2>
                    <p>
                        How the order fulfillment process
                        works today
                    </p>
                </div>
            </div>

            <div className="current-flow">
                {activities.map((activity, index) => {
                    const activityProblems =
                        problems.filter(
                            (problem) =>
                                problem.activity?._id ===
                                activity._id
                        );

                    return (
                        <div
                            className="current-step"
                            key={activity._id}
                        >
                            <div className="step-number">
                                {String(
                                    activity.sequence
                                ).padStart(2, "0")}
                            </div>

                            <div className="step-content">
                                <h3>
                                    {activity.name}
                                </h3>

                                <p>
                                    {activity.description}
                                </p>

                                <div className="meta">
                                    <span>
                                        👤{" "}
                                        {activity.role ||
                                            "Not specified"}
                                    </span>

                                    <span>
                                        ⚙️{" "}
                                        {activity.system ||
                                            "Not specified"}
                                    </span>

                                    <span>
                                        {activity.activityType}
                                    </span>
                                </div>

                                {activityProblems.length >
                                    0 && (
                                    <div className="problem-box">
                                        <div className="problem-label">
                                            ⚠ Problem
                                        </div>

                                        {activityProblems.map(
                                            (problem) => (
                                                <div
                                                    key={
                                                        problem._id
                                                    }
                                                >
                                                    <strong>
                                                        {
                                                            problem.title
                                                        }
                                                    </strong>

                                                    <p>
                                                        {
                                                            problem.description
                                                        }
                                                    </p>

                                                    <span className="severity">
                                                        {
                                                            problem.severity
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {index <
                                activities.length -
                                    1 && (
                                <div className="flow-line">
                                    ↓
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default CurrentProcess;