function App() {
  const [bins, setBins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [filters, setFilters] = React.useState({
    location_type: "",
    is_full: "",
    festival_week: "",
    weather: "",
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    key: "days_since_last_pickup",
    dir: "desc",
  });

  React.useEffect(() => {
    // Load real dataset if available (CSV), otherwise fall back to sample data.
    fetch("bins.csv")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load CSV");
        }
        return res.text();
      })
      .then((text) => {
        const parsed = parseCsv(text);
        if (!parsed.length) {
          setBins(sampleData);
        } else {
          setBins(parsed);
        }
        setLoading(false);
      })
      .catch(() => {
        setBins(sampleData);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedBins = React.useMemo(() => {
    let result = [...bins];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((b) => String(b.bin_id).toLowerCase().includes(q));
    }

    if (filters.location_type) {
      result = result.filter((b) => b.location_type === filters.location_type);
    }

    if (filters.is_full !== "") {
      result = result.filter((b) => String(b.is_full) === filters.is_full);
    }

    if (filters.festival_week !== "") {
      result = result.filter((b) => String(b.festival_week) === filters.festival_week);
    }

    if (filters.weather) {
      if (filters.weather === "missing") {
        result = result.filter((b) => !b.weather);
      } else {
        result = result.filter((b) => b.weather === filters.weather);
      }
    }

    if (sortConfig.key) {
      const { key, dir } = sortConfig;
      const factor = dir === "asc" ? 1 : -1;
      result.sort((a, b) => {
        const va = a[key] ?? -Infinity;
        const vb = b[key] ?? -Infinity;
        if (va === vb) return 0;
        return va > vb ? factor : -factor;
      });
    }

    return result;
  }, [bins, filters, searchQuery, sortConfig]);

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Waste Bin Monitoring Dashboard</h1>
          <p className="subtitle">
            Designed for operations teams to instantly spot full and high-priority bins.
          </p>
        </div>
        <div className="brand">3R ZeroWaste</div>
      </header>

      {loading && (
        <div className="state-message" role="status">
          <p>Loading bin data…</p>
        </div>
      )}

      {!loading && (
        <main>
          <SummaryCards bins={bins} />
          <ChartSummary bins={bins} />
          <Filters
            filters={filters}
            onChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortKey={sortConfig.key}
            sortDir={sortConfig.dir}
            onSortChange={setSortConfig}
          />
          <BinTable bins={filteredAndSortedBins} />
        </main>
      )}
    </div>
  );
}
