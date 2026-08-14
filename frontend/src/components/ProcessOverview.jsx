function ProcessOverview({ process }) {
    return (
        <section className="overview">
            <span className="badge">
                {process.industry?.name}
            </span>

            <h2>{process.name}</h2>

            <p>{process.description}</p>
        </section>
    );
}

export default ProcessOverview;