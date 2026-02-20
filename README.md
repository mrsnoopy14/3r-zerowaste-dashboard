## 3R ZeroWaste – Waste Bin Dashboard

Small dashboard to help an operations team see which bins need attention and quickly filter/sort them.

## Tech stack

- React 18 (via CDN)
- JavaScript (ES6 + JSX)
- ReactDOM 18
- Babel Standalone (JSX compiled in the browser, no build step)
- Plain HTML + CSS

## Project structure

- `index.html` – base HTML, loads React + Babel and mounts the app
- `styles.css` – layout, colors and responsive styles
- `src/`
  - `App.jsx` – main dashboard and state
  - `main.jsx` – renders `<App />`
  - `helpers.jsx` – CSV parsing, sample data, priority rules
  - `components/`
    - `SummaryCards.jsx` – top cards
    - `ChartSummary.jsx` – small charts
    - `Filters.jsx` – filters, search and sort controls
    - `BinTable.jsx` – table view
    - `StatusBadge.jsx` – Full / Not Full pill
- `bins.csv` – dataset exported from the Google Sheet

## Running it locally

1. Export the provided Google Sheet as CSV and save it next to `index.html` as `bins.csv`.
2. Clone or download this repo.
3. Open `index.html` in a modern browser (Chrome / Edge / Firefox).

The app first tries to load `bins.csv`. If that fails, it falls back to a small in-memory sample with the same shape.

If you prefer, you can also use a small static server (for example: `npx serve .`).

## Features

- Summary at the top: total bins, full bins, and high‑priority bins.
- Simple charts for bins by location type and full vs not full.
- Table with bin details: ID, location type, fill level, days since last pickup, weather, priority and status.
- Filters for location type, full/not full, festival week and weather.
- Search by Bin ID and basic sorting (days since last pickup, average daily waste).
- Handles missing/invalid fields by showing `N/A`/`Unknown` instead of breaking the UI.
- Works on desktop and mobile; on small screens layout becomes single‑column and hides a few less important columns.

## Data

- Primary source is `bins.csv` exported from the shared Google Sheet.
- CSV is parsed on the frontend; numeric fields are cleaned and converted where possible.
- A small hard‑coded sample dataset is kept only as a fallback so the UI still works if the CSV is missing.

## Live demo

Once GitHub Pages is enabled for this repository, the dashboard will be available at:

- https://mrsnoopy14.github.io/3r-zerowaste-dashboard/

## Notes / future work

- Hook the dashboard up to a real backend API instead of a static CSV.
- Add a light/dark theme toggle.
- Use a bundler like Vite and split code into modules for a more production‑like setup.
