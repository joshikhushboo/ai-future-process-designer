function BenefitsPanel({ benefits = [] }) {
    return (
        <section className="panel enhanced-panel">
            <div className="section-heading compact-header">
                <div className="section-number">05</div>
                <div>
                    <h2>Expected Benefits</h2>
                    <p>Estimated value and impact of the future state</p>
                </div>
            </div>

            {benefits.length === 0 ? (
                <p className="empty-text">
                    AI-generated benefits will appear here after analysis.
                </p>
            ) : (
                <div className="benefits-grid">
                    {benefits.map((benefit) => (
                        <div className="benefit-card" key={benefit._id || benefit.name}>
                            <div className="card-top-row">
                                <span className="step-badge">Impact</span>
                                <span className={`impact ${benefit.impactLevel || "medium"}`}>
                                    {benefit.impactLevel || "medium"}
                                </span>
                            </div>

                            <h3>{benefit.name}</h3>
                            <p>{benefit.description}</p>

                            <div className="metric-box">
                                <strong>Metric</strong>
                                <span>{benefit.metric}</span>
                            </div>

                            <div className="metric-box">
                                <strong>Expected improvement</strong>
                                <span>{benefit.expectedImprovement}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default BenefitsPanel;