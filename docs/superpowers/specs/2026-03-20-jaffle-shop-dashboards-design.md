# Jaffle Shop Dashboards — Design Spec

## Overview

Two web dashboards for different audiences, both running locally and querying the DuckDB database live.

1. **C-Level Business KPIs Dashboard** (Streamlit) — revenue, orders, customer metrics
2. **Data Team Pipeline Health Dashboard** (Evidence.dev) — model status, test coverage, lineage, data profiling

## Prerequisites

Before running either dashboard:

1. `dbt seed --target prod --vars '{"load_source_data": true}'` — load raw data
2. `dbt build --target prod` — build all models and run tests
3. `dbt docs generate --target prod` — generate `catalog.json` (required by pipeline dashboard)

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| C-level stack | Streamlit | Fastest to build, interactive filters, Python-native |
| Pipeline stack | Evidence.dev | SQL-first, multi-page, dbt-native, richer observability |
| Deployment | Local (`localhost`) | Simple, no infra needed |
| Data refresh | Live DuckDB queries | Always current after `dbt build` |

---

## Dashboard 1: C-Level Business KPIs (Streamlit)

### Location

`dashboard/` directory in project root.

### Tech Stack

- Python + Streamlit
- DuckDB (direct connection to `data/jaffle_shop.duckdb`)
- Plotly for charts

### Page Layout

**Filters (top bar):**
- Date range picker (ordered_at)
- Location multi-select (from locations table)

**Filter propagation:** When a location filter is active, all queries filter through `orders.location_id`. Customer metrics show only customers who have at least one order at the selected locations. Revenue/product metrics filter `order_items` via `order_items.order_id → orders.location_id`.

**KPI Cards (row of 4):**
- Total Revenue — `SUM(order_total)` from `orders`
- Total Orders — `COUNT(*)` from `orders`
- Total Customers — `COUNT(DISTINCT customer_id)` from `customers`
- Avg Order Value — `Total Revenue / Total Orders`

**Charts:**
- Revenue Over Time (monthly bar chart) — `orders` grouped by `DATE_TRUNC('month', ordered_at)`
- Revenue Split — food vs drink revenue: `SUM(product_price) WHERE is_food_item` vs `SUM(product_price) WHERE is_drink_item` from `order_items`. All products are either food (jaffle) or drink (beverage), so these are mutually exclusive and exhaustive.
- Orders by Location — horizontal bar chart, `orders` joined with `locations` on `orders.location_id = locations.location_id`
- Customer Breakdown — new vs returning ratio from `customers.customer_type`

**Table:**
- Top Products by Revenue — `order_items` joined with `products`, grouped by product, sorted by revenue desc

### Data Sources (all from prod schema)

| Mart Table | Used For |
|------------|----------|
| `orders` | Revenue, order counts, time trends |
| `order_items` | Product breakdown, food/drink split |
| `customers` | Customer counts, new vs returning |
| `products` | Product names and types |
| `locations` | Store names for filtering and breakdown |

### File Structure

```
dashboard/
├── app.py                  # Main Streamlit app
├── requirements.txt        # streamlit, duckdb, plotly
└── README.md               # How to run
```

### Run Command

```bash
cd dashboard && streamlit run app.py
```

---

## Dashboard 2: Data Team Pipeline Health (Evidence.dev)

### Location

`pipeline-dashboard/` directory in project root.

### Tech Stack

- Evidence.dev framework
- DuckDB connector (same `data/jaffle_shop.duckdb`)
- dbt artifacts (`target/manifest.json`, `target/run_results.json`, `target/catalog.json`)

### Page Structure

| Page | Content | Data Source |
|------|---------|-------------|
| **Dashboard** (home) | Health banner, KPI cards (models/tests/seeds/sources), row count chart | manifest.json + DuckDB |
| **Run History** | Latest build results, pass/fail summary, duration | run_results.json (latest only; historical trends are future work) |
| **Staging Layer** | All staging models: row counts, columns, source mapping | catalog.json + DuckDB |
| **Mart Layer** | All mart models: row counts, columns, downstream metrics | catalog.json + DuckDB |
| **Model Lineage** | Interactive DAG with color-coded nodes, click-to-detail panel | manifest.json + DuckDB |
| **Test Coverage** | Test matrix: model × test type, pass/fail, coverage gaps | run_results.json |
| **Data Freshness** | Max dates per source table, staleness alerts | DuckDB queries on raw schema |
| **Column Stats** | Per-model column profiling: types, nulls, distinct, min/max | DuckDB `SUMMARIZE` |

**Future work pages** (require historical snapshot logging, not in v1):
- Row Count Trends — historical row counts per model over time
- Anomaly Detection — flag unexpected row count drops, null spikes, or value drift

### Model Lineage Page Detail

- Color-coded DAG: gray (sources) → purple (staging) → green (marts) → yellow (metrics)
- Layer filter tabs: All / Sources / Staging / Marts
- Row counts displayed on each node
- Click any node to show:
  - Upstream & downstream dependencies
  - Tests and pass/fail status
  - Connected metrics and saved queries
  - Compiled SQL preview
- Parameterized drill-down pages: `/models/[model_name]`
- Visualization approach: Mermaid diagram rendered in Evidence.dev markdown for v1. Can upgrade to a custom Svelte component with dagre-d3 for interactivity in a future iteration.

### Dashboard Home KPI Cards

Dynamically computed from `manifest.json` at runtime. Current values for reference:

- Models: 13 (6 views, 7 tables)
- Test Pass Rate: 27/27 data tests + 3 unit tests
- Seeds: 7 (1.86M total rows)
- Sources: 6 (ecom schema)
- Metrics: 19 (3 saved queries)

### Data Freshness Logic

Query `MAX(ordered_at)` from `raw.raw_orders`, `MAX(opened_at)` from `raw.raw_stores`, etc. Flag as stale if max date is older than a configurable threshold.

### Column Profiling Logic

Use DuckDB `SUMMARIZE` statement per model table to get:
- Column name, type
- Count, null count, null percentage
- Distinct count
- Min, max, avg (for numeric/date columns)

### File Structure

```
pipeline-dashboard/
├── evidence.plugins.yaml     # DuckDB source config
├── pages/
│   ├── index.md              # Dashboard home
│   ├── run-history.md
│   ├── staging-layer.md
│   ├── mart-layer.md
│   ├── model-lineage.md
│   ├── test-coverage.md
│   ├── data-freshness.md
│   └── column-stats.md
├── sources/
│   └── jaffle_shop/          # DuckDB connection config
├── components/               # Shared components (if needed)
├── package.json
└── README.md
```

### Run Command

```bash
cd pipeline-dashboard && npm run dev
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   DuckDB (local)                     │
│              data/jaffle_shop.duckdb                 │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │raw schema│→ │stg views │→ │  mart tables     │  │
│  │(seeds)   │  │(staging) │  │  (orders, etc.)  │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└──────────┬──────────────────────────┬───────────────┘
           │                          │
    ┌──────┴──────┐           ┌──────┴──────┐
    │  Evidence   │           │  Streamlit  │
    │  Pipeline   │           │  Business   │
    │  Dashboard  │           │  Dashboard  │
    │             │           │             │
    │ + artifacts │           │ Live SQL    │
    │  manifest   │           │ queries     │
    │  run_results│           │             │
    │  catalog    │           │             │
    └─────────────┘           └─────────────┘
    localhost:3000             localhost:8501
    (Data Team)               (C-Level)
```

## Dependencies

### Streamlit Dashboard
- `streamlit`
- `duckdb`
- `plotly`

### Evidence.dev Dashboard
- `@evidence-dev/evidence` (via npm)
- `@evidence-dev/duckdb` connector
- Node.js 18+

## Out of Scope

- Authentication / access control (local only)
- Automated refresh / scheduling
- Deployment to cloud
- Email/Slack alerts
- Historical run logging (requires future work to persist run_results.json snapshots)
