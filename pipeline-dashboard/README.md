# Pipeline Health Dashboard

A data team operational dashboard built with [Evidence.dev](https://evidence.dev) for monitoring the Jaffle Shop dbt pipeline.

## Quick Start

```bash
# From the repo root
make pipeline-install    # Install dependencies (first time only)
make pipeline-sources    # Extract data from DuckDB
make pipeline-dashboard  # Launch at http://localhost:3000
```

## Pages

| Page | What it shows | When to check |
|------|--------------|---------------|
| **Home** (`/`) | Total row counts across all mart models with a bar chart breakdown. A quick health check — if numbers drop unexpectedly, something broke. | Daily / after each `dbt build` |
| **Run History** (`/run-history`) | Every node (model, test, seed) from the latest `dbt build` with status and execution time. Spot failures and slow models at a glance. | After each `dbt build` |
| **Test Coverage** (`/test-coverage`) | All dbt tests grouped by type (not_null, unique, relationships, etc.) with pass/fail counts. Shows where test coverage is strong and where gaps exist. | When adding models or reviewing data quality |
| **Staging Layer** (`/staging-layer`) | Row counts for all `stg_*` models. These are the cleaned views on top of raw sources — row count changes here mean source data changed. | When investigating data issues upstream |
| **Mart Layer** (`/mart-layer`) | Row counts for all mart models (customers, orders, products, etc.). These are the tables analysts query — monitor for unexpected growth or drops. | Daily / when validating pipeline output |
| **Model Lineage** (`/model-lineage`) | Shows how data flows from raw sources through staging to mart tables, with current row counts. Useful for understanding dependencies when debugging. | When onboarding or tracing data issues |
| **Data Freshness** (`/data-freshness`) | Latest record date per source table and staleness status. If a source shows "Stale", the upstream data hasn't been updated recently. | When data looks outdated |
| **Column Stats** (`/column-stats`) | Column names and types for key mart models (orders, customers, order_items). Quick schema reference without opening the DB. | When writing queries or reviewing schema changes |

## How Data Flows

```
DuckDB (jaffle_shop.duckdb)
    ↓  make pipeline-sources (evidence sources)
Parquet cache (.evidence/)
    ↓  make pipeline-dashboard (evidence dev)
Dashboard (localhost:3000)
```

The dashboard reads from a **parquet snapshot** of your DuckDB, not the live database. Run `make pipeline-sources` to refresh the data after a `dbt build`.

## Tech Stack

- **Evidence.dev** — SQL-in-markdown dashboard framework
- **DuckDB** — Source database (read-only)
- **pnpm** — Package manager
