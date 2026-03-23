# Pipeline Dashboard Redesign Spec

## Problem

The current 8-page pipeline dashboard shows static snapshots (row counts, test lists) without actionable context. Most pages don't answer "so what?" — team members can't tell at a glance whether the pipeline is healthy or needs attention.

## Goal

Consolidate into 3 focused pages where every section answers a specific question. Problems surface themselves — a healthy pipeline shows a mostly empty/green dashboard.

## Pages

### Page 1: Pipeline Status (`/`)

**Question:** Is anything broken right now?

Checked after every `dbt build`. Must answer in 5 seconds.

**Sections (top to bottom):**

1. **Health banner** — Single Alert component.
   - Green if all run_results have `status = 'success'`
   - Red with failure count if any failures exist

2. **Build stats** — Four BigValue cards in a row:
   - Models run (count where node_type = 'model')
   - Tests passed (count where node_type = 'test' and status = 'success')
   - Build duration (sum of execution_time from run_results)
   - Stale sources (count of sources where latest date > 90 days old)

3. **Failures table** — Only shown when failures exist. Columns: Name, Type, Status. If all pass, show "No failures — all nodes passed."

4. **Stale sources table** — Only sources where status = Stale. Columns: Source Table, Latest Date, Days Since Latest. If all fresh, show "All sources within 90-day freshness window."

### Page 2: Data Quality (`/data-quality`)

**Question:** Are tests passing and is the data consistent?

Weekly review page for data quality investigation.

**Sections (top to bottom):**

1. **Test summary chart** — Stacked bar chart: passing (green) vs failing (red) grouped by test type. Inline legend explaining test types:
   - not_null: column must not have NULL values
   - unique: column values must be unique
   - relationships: foreign key references must exist
   - accepted_values: values must be in allowed set
   - expression_is_true: custom SQL expression must hold

2. **Failing tests table** — Only tests with status != 'success'. Columns: Test, Type, Status. If none failing, show "All tests passing."

3. **All tests table** — Full list for reference. Columns: Test, Type, Status, Duration.

4. **Row count comparison** — Side-by-side staging vs mart counts. Columns: Model, Staging Rows, Mart Rows, Match (Yes/No). Derived by pairing stg_X with X where mapping exists:
   - stg_customers → customers
   - stg_orders → orders
   - stg_order_items → order_items
   - stg_products → products
   - stg_locations → locations
   - stg_supplies → supplies

### Page 3: Reference (`/reference`)

**Question:** How does the pipeline work and what's slow?

For onboarding and debugging. Not a daily page.

**Sections (top to bottom):**

1. **Model lineage** — Static table showing data flow. Columns: Raw Source, Staging View, Mart Table.

2. **Slow models** — Top 5 slowest nodes from latest build sorted by execution_time DESC. Columns: Name, Type, Duration (s).

3. **Schema reference** — Column name and type tables for orders, customers, order_items mart models. Three stacked tables with headings.

## Data Sources

All queries use the existing `jaffle_shop` Evidence source (extracted from DuckDB via `evidence sources`).

- **run_results** — dbt build results extracted from `target/run_results.json`
- **Model tables** — customers, orders, order_items, products, locations, supplies
- **Staging tables** — stg_customers, stg_orders, stg_order_items, stg_products, stg_locations, stg_supplies
- **Raw tables** — raw_orders, raw_stores (for freshness dates)

## Pages Removed

The 8 existing pages (index, run-history, test-coverage, staging-layer, mart-layer, model-lineage, data-freshness, column-stats) are replaced by the 3 new pages.

## Tech Stack

No changes — Evidence.dev, DuckDB, pnpm. Same source queries, same deployment via `make pipeline-deploy`.
