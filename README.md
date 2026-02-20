## 3R ZeroWaste – Waste Bin Monitoring Dashboard

Frontend assignment for the Frontend Engineer Intern role.

The goal is to help an operations team quickly see which bins need attention (full or high priority) and filter/sort them without the UI breaking on bad or missing data.

### Folder structure

- `index.html` – shell HTML page, React + Babel scripts, mounts the app
- `styles.css` – layout, colors, responsive design
- `src/`
  - `components/`
    - `BinTable.jsx` – table view + row styling
    - `Filters.jsx` – filters, search, sort controls
    - `SummaryCards.jsx` – top summary cards
    - `StatusBadge.jsx` – small component for Full / Not Full pill
    - `ChartSummary.jsx` – small charts for distribution and full vs not full
  - `App.jsx` – main dashboard logic and state
  - `main.jsx` – bootstraps React and renders `<App />`
  - `helpers.jsx` – shared helpers (priority rules, CSV parsing, sample data)
- `bins.csv` – dataset exported from the Google Sheet
- `README.md` – tech stack, how to run, design decisions, assumptions

### Tech stack

- React 18 (via CDN, single-page app)
- JavaScript (ES6 + JSX)
- ReactDOM 18
- Babel Standalone (compiles JSX in the browser, so no build step)
- Plain HTML + custom CSS (responsive dark UI)

### How to run

1. Export the provided Google Sheet as a CSV file and save it next to `index.html` as `bins.csv`.
2. Clone or download this repository.
3. Open `index.html` in a modern browser (Chrome / Edge / Firefox).
4. The dashboard will try to load `bins.csv` (the real dataset). If that fails for any reason, it falls back to a small in-memory sample.

If you prefer, you can also serve the folder with any static server (for example: `npx serve .`) and then open `http://localhost:3000` (or the port it shows).

### Main features

- **Bin list view**
  - Table shows: Bin ID, Location Type, Waste Level (% bar), Days Since Last Pickup, Weather, Priority, and Full / Not Full status.
  - Missing or invalid values are shown as `N/A` or `Unknown` instead of breaking the layout.

- **Filters and sorting**
  - Filters by:
    - Location type (Residential / Commercial / Industrial)
    - Full / Not full
    - Festival week (0 / 1)
    - Weather (Normal / Rainy / Missing)
  - Search box for Bin ID.
  - Sorting by:
    - Days since last pickup (high → low / low → high)
    - Average daily waste (high → low / low → high)

- **Visual hierarchy**
  - Full bins and high-priority bins are highlighted with stronger colors and row accents so they pop out first.
  - Priority badges (Low / Medium / High) and status pills (Full / Not Full) make it easy to scan the table.
  - Summary cards at the top show total bins, full bins, and high-priority pickups.
  - Simple bar-style charts show:
    - Bins by location type
    - Full vs Not full

- **Responsiveness**
  - Works on desktop and mobile.
  - On small screens the layout becomes single-column and some less important table columns are hidden to keep it readable.

### Key design decisions

- Put **summary cards and small charts at the top** so a city official can get a quick picture before scrolling.
- Use a **dark theme** with strong accent colors so full and high-priority rows are easy to spot on a control-room screen.
- Keep **filters in a single panel** above the table so changes immediately update the list without extra clicks.
- Derive a simple **priority level** from `is_full`, `days_since_last_pickup`, and `festival_week` to give one clear signal instead of multiple numbers.

### Assumptions

- The real dataset is provided as a Google Sheet. For this project it is used by exporting it to `bins.csv` and loading it on the frontend, with `sampleData` kept only as a fallback.
- Exact business rules for priority are not defined, so the priority logic is a reasonable heuristic to surface urgent pickups first.
- Some fields can be missing; the UI should keep working and show text fallbacks instead of crashing.

### If I had more time

- Load the actual CSV and parse it instead of using a hard-coded sample.
- Add a proper light/dark mode toggle.
- Extract components into separate files and use a bundler like Vite for a more realistic setup.
- Add more detailed analytics over time (e.g. trends in days since last pickup vs bin fullness).
