function ResponsibilityPanel({ activities = [] }) {
    return (
        <section className="panel enhanced-panel">
            <div className="section-heading compact-header">
                <div className="section-number">04</div>
                <div>
                    <h2>Future Responsibilities</h2>
                    <p>Who owns each future step and how it is handled</p>
                </div>
            </div>

            {activities.length === 0 ? (
                <p className="empty-text">
                    AI-generated responsibilities will appear here after analysis.
                </p>
            ) : (
                <div className="responsibility-grid">
                    {activities.map((activity) => (
                        <div className="responsibility-card" key={activity._id || activity.name}>
                            <div className="card-top-row">
                                <span className="step-badge">{activity.sequence}</span>
                                <span className={`pill ${activity.responsibleType}`}>
                                    {activity.responsibleType}
                                </span>
                            </div>

                            <h3>{activity.name}</h3>

                            <div className="responsibility-info">
                                <p><strong>Automation:</strong> {activity.automationLevel}</p>
                                <p><strong>Change type:</strong> {activity.changeType}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ResponsibilityPanel;