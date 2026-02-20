function Filters({ filters, onChange, searchQuery, onSearchChange, sortKey, sortDir, onSortChange }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const [key, dir] = value.split(":");
    onSortChange({ key, dir });
  };

  const sortValue = sortKey ? `${sortKey}:${sortDir}` : "days_since_last_pickup:desc";

  return (
    <section className="filters" aria-label="Filters and sorting">
      <div className="filters-row">
        <div className="field">
          <label htmlFor="search">Search Bin ID</label>
          <input
            id="search"
            type="text"
            placeholder="e.g., BIN-002"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="location_type">Location Type</label>
          <select
            id="location_type"
            name="location_type"
            value={filters.location_type}
            onChange={handleInput}
          >
            <option value="">All</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="is_full">Full Status</label>
          <select id="is_full" name="is_full" value={filters.is_full} onChange={handleInput}>
            <option value="">All</option>
            <option value="1">Full</option>
            <option value="0">Not Full</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="festival_week">Festival Week</label>
          <select
            id="festival_week"
            name="festival_week"
            value={filters.festival_week}
            onChange={handleInput}
          >
            <option value="">All</option>
            <option value="1">Festival Week</option>
            <option value="0">Normal Week</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="weather">Weather</label>
          <select id="weather" name="weather" value={filters.weather} onChange={handleInput}>
            <option value="">All</option>
            <option value="Normal">Normal</option>
            <option value="Rainy">Rainy</option>
            <option value="missing">Missing</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort">Sort By</label>
          <select id="sort" value={sortValue} onChange={handleSortChange}>
            <option value="days_since_last_pickup:desc">Days since last pickup (High → Low)</option>
            <option value="days_since_last_pickup:asc">Days since last pickup (Low → High)</option>
            <option value="avg_daily_waste_kg:desc">Avg daily waste (High → Low)</option>
            <option value="avg_daily_waste_kg:asc">Avg daily waste (Low → High)</option>
          </select>
        </div>
      </div>
    </section>
  );
}
