const PRIORITY_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

// Fallback sample data in case CSV fails to load
const sampleData = [
  {
    bin_id: "BIN-001",
    location_type: "Residential",
    avg_daily_waste_kg: 18,
    days_since_last_pickup: 3,
    weather: "Normal",
    festival_week: 0,
    bin_capacity_kg: 25,
    is_full: 0,
  },
  {
    bin_id: "BIN-002",
    location_type: "Commercial",
    avg_daily_waste_kg: 40,
    days_since_last_pickup: 1,
    weather: "Rainy",
    festival_week: 1,
    bin_capacity_kg: 50,
    is_full: 1,
  },
  {
    bin_id: "BIN-003",
    location_type: "Industrial",
    avg_daily_waste_kg: null,
    days_since_last_pickup: 5,
    weather: null,
    festival_week: 0,
    bin_capacity_kg: 80,
    is_full: 1,
  },
  {
    bin_id: "BIN-004",
    location_type: "Residential",
    avg_daily_waste_kg: 10,
    days_since_last_pickup: null,
    weather: "Normal",
    festival_week: 0,
    bin_capacity_kg: 30,
    is_full: 0,
  },
  {
    bin_id: "BIN-005",
    location_type: "Commercial",
    avg_daily_waste_kg: 32,
    days_since_last_pickup: 4,
    weather: "Rainy",
    festival_week: 1,
    bin_capacity_kg: 40,
    is_full: 1,
  },
];

function parseNumber(raw) {
  if (raw === undefined || raw === null) return null;
  const trimmed = String(raw).trim();
  if (!trimmed) return null;
  const num = Number(trimmed);
  return Number.isNaN(num) ? null : num;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const dataLines = lines.slice(1);

  return dataLines.map((line) => {
    const cols = line.split(",");
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] !== undefined ? cols[idx] : "";
    });

    return {
      bin_id: row.bin_id,
      location_type: row.location_type || null,
      avg_daily_waste_kg: parseNumber(row.avg_daily_waste_kg),
      days_since_last_pickup: parseNumber(row.days_since_last_pickup),
      weather: row.weather || null,
      festival_week: parseNumber(row.festival_week) ?? 0,
      bin_capacity_kg: parseNumber(row.bin_capacity_kg),
      is_full: parseNumber(row.is_full) ?? 0,
    };
  });
}

function calculateFillPercentage(bin) {
  if (!bin || bin.bin_capacity_kg == null || bin.avg_daily_waste_kg == null) {
    return null;
  }
  const approxLoad = bin.avg_daily_waste_kg;
  const pct = Math.min(100, Math.round((approxLoad / bin.bin_capacity_kg) * 100));
  return pct;
}

function calculatePriority(bin) {
  if (!bin) return PRIORITY_LEVELS.LOW;

  const isFull = Number(bin.is_full) === 1;
  const days = bin.days_since_last_pickup ?? 0;
  const isFestival = Number(bin.festival_week) === 1;

  if (isFull && (days >= 2 || isFestival)) {
    return PRIORITY_LEVELS.HIGH;
  }
  if (isFull || days >= 4 || isFestival) {
    return PRIORITY_LEVELS.MEDIUM;
  }
  return PRIORITY_LEVELS.LOW;
}

function getPriorityClass(priority) {
  if (priority === PRIORITY_LEVELS.HIGH) return "priority-badge priority-high";
  if (priority === PRIORITY_LEVELS.MEDIUM) return "priority-badge priority-medium";
  return "priority-badge priority-low";
}
