function RelationshipPanel({ relationships = [] }) {
    const visibleRelationships = (relationships || []).slice(0, 6);

    return (
        <section className="panel enhanced-panel">
            <div className="section-heading compact-header">
                <div className="section-number">06</div>
                <div>
                    <h2>Process Relationships</h2>
                    <p>Key connections between activities, problems, and AI interventions</p>
                </div>
            </div>

            {visibleRelationships.length === 0 ? (
                <div className="empty-state">
                    No relationships defined
                </div>
            ) : (
                <div className="relationship-list">
                    {visibleRelationships.map((relationship, index) => (
                        <div className="relationship-card" key={relationship._id || index}>
                            <div className="relationship-top-row">
                                <span className="relationship-type">
                                    {relationship.relationshipType}
                                </span>
                            </div>

                            <div className="relationship-line">
                                <span>{(relationship.sourceType || "activity").replace("_", " ")}</span>
                                <strong>→</strong>
                                <span>{(relationship.targetType || "ai_opportunity").replace("_", " ")}</span>
                            </div>

                            {relationship.condition && (
                                <p>{relationship.condition}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default RelationshipPanel;