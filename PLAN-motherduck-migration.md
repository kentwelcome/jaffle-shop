# Migration Plan: Local DuckDB → MotherDuck

## Overview

Migrate from local DuckDB file (`data/jaffel-shop.duckdb`) to MotherDuck (cloud-hosted DuckDB). The connection string changes from a local file path to `md:jaffle_shop`.

Both dashboards (Streamlit and Evidence.dev) will read the DB path from a single environment variable `JAFFLE_SHOP_DB_PATH`, eliminating hardcoded paths.

## Files to Change

| # | File | Change |
|---|------|--------|
| 1 | `.env.example` | **New file** — document required env vars |
| 2 | `profiles.yml` | Read `path` from env var `JAFFLE_SHOP_DB_PATH` |
| 3 | `dashboard/queries.py` | Read `DB_PATH` from env var `JAFFLE_SHOP_DB_PATH` |
| 4 | `pipeline-dashboard/sources/jaffle_shop/connection.yaml` | Read `filename` from env var `JAFFLE_SHOP_DB_PATH` |
| 5 | `pipeline-dashboard/.evidence/template/sources/jaffle_shop/connection.yaml` | Same as above |

## Steps

### 1. MotherDuck Account Setup (manual)

- Create a MotherDuck account at <https://motherduck.com>
- Generate an authentication token from the MotherDuck UI

### 2. Create `.env` with Single Source of Truth

Create a `.env` file (already gitignored) with both the DB path and MotherDuck token:

```bash
# .env
JAFFLE_SHOP_DB_PATH=md:jaffle_shop
MOTHERDUCK_TOKEN=<your_token>
```

Create a `.env.example` (committed) to document the required variables:

```bash
# .env.example
JAFFLE_SHOP_DB_PATH=md:jaffle_shop    # or data/jaffel-shop.duckdb for local
MOTHERDUCK_TOKEN=                      # required for MotherDuck, get from https://motherduck.com
```

### 3. Update `profiles.yml`

Use dbt's `env_var` Jinja function to read from the environment:

```yaml
jaffle_shop:
  outputs:
    dev:
      type: duckdb
      path: "{{ env_var('JAFFLE_SHOP_DB_PATH', 'data/jaffel-shop.duckdb') }}"
      threads: 24
      schema: dev
    prod:
      type: duckdb
      path: "{{ env_var('JAFFLE_SHOP_DB_PATH', 'data/jaffel-shop.duckdb') }}"
      threads: 24
      schema: prod
  target: dev
```

The fallback `data/jaffel-shop.duckdb` preserves local-only usage when the env var is not set.

### 5. Update `dashboard/queries.py`

Read the DB path from the environment variable:

```python
import os

DB_PATH = os.environ.get("JAFFLE_SHOP_DB_PATH", str(Path(__file__).parent.parent / "data" / "jaffel-shop.duckdb"))

@st.cache_resource
def get_connection():
    return duckdb.connect(DB_PATH, read_only=True)
```

Falls back to the local file if `JAFFLE_SHOP_DB_PATH` is not set.

### 6. Update Evidence.dev Connection

In both `pipeline-dashboard/sources/jaffle_shop/connection.yaml` and `pipeline-dashboard/.evidence/template/sources/jaffle_shop/connection.yaml`, use Evidence's environment variable interpolation:

```yaml
name: jaffle_shop
type: duckdb
options:
  filename: ${JAFFLE_SHOP_DB_PATH}
```

> **Note:** Verify that Evidence.dev supports `${VAR}` syntax in connection YAML. If not, a build-time script can template the value from `.env` before starting Evidence.

### 7. Seed and Build on MotherDuck (first time)

After all config changes are in place, populate the remote database:

```bash
# Load seed data (source CSVs) into MotherDuck
dbt seed --target prod

# Run the full pipeline to build all models
dbt run --target prod
```

`dbt seed` uploads the source CSV data to MotherDuck on the first run. After that, `dbt run` is the standard command to rebuild the production pipeline.

### 8. Environment Variable Management

- **Local dev**: Load from `.env` (already gitignored)
- **CI/CD**: Add `JAFFLE_SHOP_DB_PATH` and `MOTHERDUCK_TOKEN` to GitHub Actions secrets
- **Makefile / Taskfile.yml**: If commands don't auto-load `.env`, add `source .env &&` or use a tool like `dotenv`

## Considerations

- **Evidence.dev WASM**: The pipeline dashboard uses `@duckdb/duckdb-wasm` for in-browser SQL. MotherDuck `md:` connections require a server-side connection and won't work in-browser via WASM. Options: pre-extract query results at build time, or switch Evidence to server-side mode.
- **Read-only access**: The Streamlit dashboard currently uses `read_only=True`. Verify this works with MotherDuck connections.
- **dbt seed / jafgen**: Seeding writes to MotherDuck instead of local disk — expect slower writes but centralized data. Only needed on first setup; after that use `dbt run` for pipeline updates.
- **Offline development**: All config falls back to local DuckDB when `JAFFLE_SHOP_DB_PATH` is not set, so offline dev still works out of the box.
