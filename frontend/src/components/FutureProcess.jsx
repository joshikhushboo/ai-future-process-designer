function FutureProcess({ activities = [] }) {
    const uniqueActivities = activities.filter((activity, index, array) => {
        const currentName = (activity?.name || "").trim().toLowerCase();
        const isOrderPlaced = currentName.includes("order placed");

        if (isOrderPlaced) {
            return array.findIndex((item) =>
                (item?.name || "").trim().toLowerCase().includes("order placed")
            ) === index;
        }

        return true;
    });

    return (
        <section className="panel enhanced-panel">
            <div className="section-heading compact-header">
                <div className="section-number">03</div>
                <div>
                    <h2>Future Process</h2>
                    <p>Target-state workflow and operating model</p>
                </div>
            </div>

            {uniqueActivities.length === 0 ? (
                <p className="empty-text">
                    Run AI Analysis to generate the future process.
                </p>
            ) : (
                <div className="future-grid">
                    {uniqueActivities.map((activity) => (
                        <div className="future-card" key={activity._id || activity.name}>
                            <div className="card-top-row">
                                <span className="step-badge">Step {activity.sequence}</span>
                                <span className={`pill ${activity.responsibleType}`}>
                                    {activity.responsibleType}
                                </span>
                            </div>

                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>

                            <div className="meta-row">
                                <span>{activity.automationLevel}</span>
                                <span>{activity.changeType}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default FutureProcess;
