function TransitionPanel({ opportunities = [] }) {
    return (
        <section className="section">

            <div className="section-heading">
                <div className="section-number">
                    02
                </div>

                <div>
                    <h2>AI Transition</h2>
                    <p>
                        How AI transforms the current process
                        into the future process
                    </p>
                </div>
            </div>

            <div className="transition-flow">

                <div className="flow-column current-column">
                    <div className="flow-label">
                        CURRENT
                    </div>

                    <div className="flow-box">
                        Manual Process
                    </div>

                    <div className="flow-box">
                        Human Verification
                    </div>
                </div>


                <div className="flow-arrow">
                    →
                </div>


                <div className="flow-column ai-column">
                    <div className="flow-label">
                        AI INTERVENTION
                    </div>

                    {opportunities.length === 0 ? (
                        <div className="flow-box">
                            No AI opportunities
                        </div>
                    ) : (
                        opportunities.map(
                            (opportunity) => (
                                <div
                                    className="ai-opportunity"
                                    key={opportunity._id}
                                >
                                    <div className="ai-icon">
                                        AI
                                    </div>

                                    <h3>
                                        {opportunity.title}
                                    </h3>

                                    <p>
                                        {
                                            opportunity.description
                                        }
                                    </p>

                                    <span>
                                        {
                                            opportunity.technology
                                        }
                                    </span>
                                </div>
                            )
                        )
                    )}
                </div>


                <div className="flow-arrow">
                    →
                </div>


                <div className="flow-column future-column">
                    <div className="flow-label">
                        FUTURE
                    </div>

                    <div className="flow-box">
                        Automated Verification
                    </div>

                    <div className="flow-box">
                        AI-Assisted Fulfillment
                    </div>
                </div>

            </div>

        </section>
    );
}

export default TransitionPanel;