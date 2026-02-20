function SummaryCards({ bins }) {
  const total = bins.length;
  const full = bins.filter((b) => Number(b.is_full) === 1).length;
  const highPriority = bins.filter((b) => calculatePriority(b) === PRIORITY_LEVELS.HIGH).length;

  return (
    <section className="summary" aria-label="Summary statistics">
      <div className="summary-card">
        <span className="summary-label">Total Bins</span>
        <span className="summary-value">{total}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Full Bins</span>
        <span className="summary-value summary-full">{full}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">High-Priority Pickups</span>
        <span className="summary-value summary-high">{highPriority}</span>
      </div>
    </section>
  );
}
