function ChartSummary({ bins }) {
  const byLocation = bins.reduce(
    (acc, bin) => {
      const key = bin.location_type || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  const fullCount = bins.filter((b) => Number(b.is_full) === 1).length;
  const notFullCount = bins.length - fullCount;

  const maxLocationCount = Object.values(byLocation).reduce(
    (max, v) => (v > max ? v : max),
    0
  );

  return (
    <section className="charts" aria-label="Quick charts">
      <div className="chart-card">
        <h2 className="chart-title">Bins by Location Type</h2>
        <div className="chart-bars">
          {Object.entries(byLocation).map(([key, value]) => {
            const widthPct = maxLocationCount ? (value / maxLocationCount) * 100 : 0;
            return (
              <div key={key} className="chart-row">
                <span className="chart-label">{key}</span>
                <div className="chart-bar-wrapper" aria-hidden="true">
                  <div
                    className="chart-bar chart-bar-location"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <span className="chart-value">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Full vs Not Full</h2>
        <div className="chart-bars">
          <div className="chart-row">
            <span className="chart-label">Full</span>
            <div className="chart-bar-wrapper" aria-hidden="true">
              <div
                className="chart-bar chart-bar-full"
                style={{ width: bins.length ? `${(fullCount / bins.length) * 100}%` : "0%" }}
              />
            </div>
            <span className="chart-value">{fullCount}</span>
          </div>
          <div className="chart-row">
            <span className="chart-label">Not Full</span>
            <div className="chart-bar-wrapper" aria-hidden="true">
              <div
                className="chart-bar chart-bar-ok"
                style={{ width: bins.length ? `${(notFullCount / bins.length) * 100}%` : "0%" }}
              />
            </div>
            <span className="chart-value">{notFullCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
