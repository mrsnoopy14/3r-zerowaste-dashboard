function BinTable({ bins }) {
  if (!bins.length) {
    return (
      <div className="empty-state" role="status">
        <p>No bins match the current filters. Try broadening your search.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper" role="region" aria-label="Bin list">
      <table className="bin-table">
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Location Type</th>
            <th>Waste Level</th>
            <th>Days Since Last Pickup</th>
            <th>Weather</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => {
            const pct = calculateFillPercentage(bin);
            const priority = calculatePriority(bin);
            const isFull = Number(bin.is_full) === 1;

            const rowClassNames = [
              "bin-row",
              isFull ? "bin-row-full" : "",
              priority === PRIORITY_LEVELS.HIGH ? "bin-row-high" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <tr key={bin.bin_id} className={rowClassNames}>
                <td>{bin.bin_id}</td>
                <td>{bin.location_type || "N/A"}</td>
                <td>
                  {pct == null ? (
                    <span className="value-muted">N/A</span>
                  ) : (
                    <div className="waste-bar-cell">
                      <span className="waste-bar-label">{pct}%</span>
                      <div className="waste-bar-outer" aria-hidden="true">
                        <div
                          className="waste-bar-inner"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </td>
                <td>{bin.days_since_last_pickup ?? <span className="value-muted">Unknown</span>}</td>
                <td>{bin.weather || <span className="value-muted">Unknown</span>}</td>
                <td>
                  <span className={getPriorityClass(priority)}>{priority}</span>
                </td>
                <td>
                  <StatusBadge isFull={isFull} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
