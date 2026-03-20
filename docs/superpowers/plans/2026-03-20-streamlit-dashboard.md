# C-Level Business KPIs Dashboard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Streamlit dashboard that shows business KPIs (revenue, orders, customers) to C-level executives, querying DuckDB live.

**Architecture:** Single-page Streamlit app with top-bar filters (date range, location), KPI metric cards, Plotly charts, and a data table. All data comes from live SQL queries against the `prod` schema in `data/jaffle_shop.duckdb`.

**Tech Stack:** Python, Streamlit, DuckDB, Plotly

**Spec:** `docs/superpowers/specs/2026-03-20-jaffle-shop-dashboards-design.md`

---

## File Structure

```
dashboard/
├── app.py              # Main Streamlit app — page config, filters, layout, all charts
├── queries.py          # All SQL queries as functions returning DataFrames
├── requirements.txt    # Python dependencies
├── README.md           # How to run
```

- `queries.py` — owns the DuckDB connection and all SQL. Every function takes a `connection`, `start_date`, `end_date`, and `locations` list, returns a DataFrame.
- `app.py` — owns the Streamlit layout, calls `queries.py`, renders Plotly charts.

---

## Chunk 1: Project Setup and Data Layer

### Task 1: Scaffold project and install dependencies

**Files:**
- Create: `dashboard/requirements.txt`
- Create: `dashboard/queries.py`

- [ ] **Step 1: Create requirements.txt**

```
streamlit==1.45.1
duckdb==1.3.0
plotly==6.1.2
```

- [ ] **Step 2: Create empty queries.py with DuckDB connection helper**

```python
import duckdb
import pandas as pd
import streamlit as st
from pathlib import Path

DB_PATH = str(Path(__file__).parent.parent / "data" / "jaffle_shop.duckdb")


@st.cache_resource
def get_connection():
    return duckdb.connect(DB_PATH, read_only=True)


def get_date_range(con) -> tuple:
    """Return (min_date, max_date) from orders for default filter range."""
    result = con.execute("""
        SELECT MIN(ordered_at)::DATE as min_date, MAX(ordered_at)::DATE as max_date
        FROM prod.orders
    """).fetchdf()
    return result["min_date"].iloc[0], result["max_date"].iloc[0]


def get_locations(con) -> pd.DataFrame:
    """Return all locations for the filter dropdown."""
    return con.execute("""
        SELECT location_id, location_name
        FROM prod.locations
        ORDER BY location_name
    """).fetchdf()
```

- [ ] **Step 3: Install dependencies**

Run: `cd dashboard && pip install -r requirements.txt`
Expected: Successful installation

- [ ] **Step 4: Verify DuckDB connection works**

Run: `cd dashboard && python -c "from queries import get_connection, get_locations; con = get_connection(); print(get_locations(con))"`
Expected: Prints a DataFrame with 6 locations

- [ ] **Step 5: Commit**

```bash
git add dashboard/requirements.txt dashboard/queries.py
git commit -m "feat(dashboard): scaffold Streamlit project with DuckDB connection"
```

---

### Task 2: Implement all SQL query functions

**Files:**
- Modify: `dashboard/queries.py`

All query functions follow the same pattern: accept `con`, `start_date`, `end_date`, `locations` (list of location_ids, empty = all). Return a pandas DataFrame.

- [ ] **Step 1: Add the KPI summary query**

Append to `queries.py`:

```python
def _build_query(sql: str, start_date: str, end_date: str, locations: list) -> tuple:
    """Build a parameterized query. Returns (sql_string, params_list).
    Use $1, $2 for date params. Location filter uses a subquery on unnest($3)."""
    params = [start_date, end_date]
    if locations:
        sql = sql.replace("{loc_filter}", "AND o.location_id IN (SELECT unnest($3::INTEGER[]))")
        params.append(locations)
    else:
        sql = sql.replace("{loc_filter}", "")
    return sql, params


def get_kpis(con, start_date: str, end_date: str, locations: list) -> pd.DataFrame:
    """Return single-row DataFrame with total_revenue, total_orders, total_customers, avg_order_value."""
    sql, params = _build_query("""
        SELECT
            SUM(o.order_total) AS total_revenue,
            COUNT(*) AS total_orders,
            COUNT(DISTINCT o.customer_id) AS total_customers,
            CASE WHEN COUNT(*) > 0
                 THEN SUM(o.order_total) / COUNT(*)
                 ELSE 0 END AS avg_order_value
        FROM prod.orders o
        WHERE o.ordered_at BETWEEN $1 AND $2
        {loc_filter}
    """, start_date, end_date, locations)
    return con.execute(sql, params).fetchdf()
```

- [ ] **Step 2: Add the revenue over time query**

```python
def get_revenue_over_time(con, start_date: str, end_date: str, locations: list) -> pd.DataFrame:
    """Return monthly revenue: month, revenue."""
    sql, params = _build_query("""
        SELECT
            DATE_TRUNC('month', o.ordered_at) AS month,
            SUM(o.order_total) AS revenue
        FROM prod.orders o
        WHERE o.ordered_at BETWEEN $1 AND $2
        {loc_filter}
        GROUP BY 1
        ORDER BY 1
    """, start_date, end_date, locations)
    return con.execute(sql, params).fetchdf()
```

- [ ] **Step 3: Add the revenue split query**

```python
def get_revenue_split(con, start_date: str, end_date: str, locations: list) -> pd.DataFrame:
    """Return food_revenue, drink_revenue."""
    sql, params = _build_query("""
        SELECT
            SUM(CASE WHEN oi.is_food_item THEN oi.product_price ELSE 0 END) AS food_revenue,
            SUM(CASE WHEN oi.is_drink_item THEN oi.product_price ELSE 0 END) AS drink_revenue
        FROM prod.order_items oi
        JOIN prod.orders o ON oi.order_id = o.order_id
        WHERE o.ordered_at BETWEEN $1 AND $2
        {loc_filter}
    """, start_date, end_date, locations)
    return con.execute(sql, params).fetchdf()
```

- [ ] **Step 4: Add the orders by location query**

```python
def get_orders_by_location(con, start_date: str, end_date: str, locations: list) -> pd.DataFrame:
    """Return location_name, order_count sorted by count desc."""
    sql, params = _build_query("""
        SELECT
            l.location_name,
            COUNT(*) AS order_count
        FROM prod.orders o
        JOIN prod.locations l ON o.location_id = l.location_id
        WHERE o.ordered_at BETWEEN $1 AND $2
        {loc_filter}
        GROUP BY 1
        ORDER BY 2 DESC
    """, start_date, end_date, locations)
    return con.execute(sql, params).fetchdf()
```

- [ ] **Step 5: Add the customer breakdown query**

```python
def get_customer_breakdown(con, start_date: str, end_date: str, locations: list) -> pd.DataFrame:
    """Return customer_type, count for customers with orders in the date/location range."""
    sql, params = _build_query("""
        WITH filtered_customers AS (
            SELECT DISTINCT o.customer_id
            FROM prod.orders o
            WHERE o.ordered_at BETWEEN $1 AND $2
            {loc_filter}
        )
        SELECT
            c.customer_type,
            COUNT(*) AS customer_count
        FROM prod.customers c
        JOIN filtered_customers fc ON c.customer_id = fc.customer_id
        GROUP BY 1
    """, start_date, end_date, locations)
    return con.execute(sql, params).fetchdf()
```

- [ ] **Step 6: Add the top products query**

```python
def get_top_products(con, start_date: str, end_date: str, locations: list, limit: int = 10) -> pd.DataFrame:
    """Return product_name, product_type, order_count, revenue sorted by revenue desc."""
    sql, params = _build_query("""
        SELECT
            oi.product_name,
            p.product_type,
            COUNT(*) AS order_count,
            SUM(oi.product_price) AS revenue
        FROM prod.order_items oi
        JOIN prod.orders o ON oi.order_id = o.order_id
        JOIN prod.products p ON oi.product_id = p.product_id
        WHERE o.ordered_at BETWEEN $1 AND $2
        {loc_filter}
        GROUP BY 1, 2
        ORDER BY 4 DESC
        LIMIT """ + str(limit) + """
    """, start_date, end_date, locations)
    return con.execute(sql, params).fetchdf()
```

- [ ] **Step 7: Verify all queries run**

Run: `cd dashboard && python -c "
from queries import *
con = get_connection()
print('KPIs:', get_kpis(con, '2023-01-01', '2025-12-31', []).to_dict())
print('Revenue:', get_revenue_over_time(con, '2023-01-01', '2025-12-31', []).shape)
print('Split:', get_revenue_split(con, '2023-01-01', '2025-12-31', []).to_dict())
print('Locations:', get_orders_by_location(con, '2023-01-01', '2025-12-31', []).shape)
print('Customers:', get_customer_breakdown(con, '2023-01-01', '2025-12-31', []).to_dict())
print('Products:', get_top_products(con, '2023-01-01', '2025-12-31', []).shape)
con.close()
"`
Expected: All queries return data without errors

- [ ] **Step 8: Commit**

```bash
git add dashboard/queries.py
git commit -m "feat(dashboard): add all SQL query functions for KPIs and charts"
```

---

## Chunk 2: Streamlit App Layout and Charts

### Task 3: Build the Streamlit app with filters and KPI cards

**Files:**
- Create: `dashboard/app.py`

- [ ] **Step 1: Create app.py with page config, filters, and KPI cards**

```python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from queries import get_connection, get_date_range, get_locations, get_kpis, get_revenue_over_time, get_revenue_split, get_orders_by_location, get_customer_breakdown, get_top_products

st.set_page_config(page_title="Jaffle Shop — Executive Dashboard", layout="wide")
st.title("Jaffle Shop — Executive Dashboard")

# --- Connection (cached via @st.cache_resource) ---
con = get_connection()

# --- Filters ---
col_date, col_loc = st.columns([2, 1])

min_date, max_date = get_date_range(con)

with col_date:
    date_range = st.date_input(
        "Date Range",
        value=(min_date, max_date),
    )
    if isinstance(date_range, tuple) and len(date_range) == 2:
        start_date, end_date = str(date_range[0]), str(date_range[1])
    else:
        start_date, end_date = str(min_date), str(max_date)

with col_loc:
    locations_df = get_locations(con)
    selected_locations = st.multiselect(
        "Locations",
        options=locations_df["location_id"].tolist(),
        format_func=lambda x: locations_df[locations_df["location_id"] == x]["location_name"].iloc[0],
        default=[],
    )

st.divider()

# --- KPI Cards ---
kpis = get_kpis(con, start_date, end_date, selected_locations)
c1, c2, c3, c4 = st.columns(4)
c1.metric("Total Revenue", f"${kpis['total_revenue'].iloc[0]:,.2f}")
c2.metric("Total Orders", f"{kpis['total_orders'].iloc[0]:,}")
c3.metric("Total Customers", f"{kpis['total_customers'].iloc[0]:,}")
c4.metric("Avg Order Value", f"${kpis['avg_order_value'].iloc[0]:,.2f}")

st.divider()
```

- [ ] **Step 2: Run to verify filters and KPI cards render**

Run: `cd dashboard && streamlit run app.py`
Expected: Browser opens showing date picker, location filter, and 4 KPI metric cards

- [ ] **Step 3: Commit**

```bash
git add dashboard/app.py
git commit -m "feat(dashboard): add Streamlit app with filters and KPI cards"
```

---

### Task 4: Add all charts and the products table

**Files:**
- Modify: `dashboard/app.py`

- [ ] **Step 1: Add Revenue Over Time and Revenue Split charts**

Append to `app.py` after the KPI cards section:

```python
# --- Charts Row 1: Revenue Over Time + Revenue Split ---
chart_col1, chart_col2 = st.columns([2, 1])

with chart_col1:
    st.subheader("Revenue Over Time")
    revenue_df = get_revenue_over_time(con, start_date, end_date, selected_locations)
    if not revenue_df.empty:
        fig = px.bar(revenue_df, x="month", y="revenue",
                     labels={"month": "", "revenue": "Revenue ($)"},
                     color_discrete_sequence=["#6366f1"])
        fig.update_layout(margin=dict(l=0, r=0, t=10, b=0), height=350)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data for selected filters.")

with chart_col2:
    st.subheader("Revenue Split")
    split_df = get_revenue_split(con, start_date, end_date, selected_locations)
    if not split_df.empty:
        food = float(split_df["food_revenue"].iloc[0] or 0)
        drink = float(split_df["drink_revenue"].iloc[0] or 0)
        fig = go.Figure(data=[go.Pie(
            labels=["Food", "Drinks"],
            values=[food, drink],
            marker_colors=["#f59e0b", "#6366f1"],
            hole=0.4,
        )])
        fig.update_layout(margin=dict(l=0, r=0, t=10, b=0), height=350, showlegend=True)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data for selected filters.")
```

- [ ] **Step 2: Add Orders by Location and Customer Breakdown charts**

```python
# --- Charts Row 2: Orders by Location + Customer Breakdown ---
chart_col3, chart_col4 = st.columns(2)

with chart_col3:
    st.subheader("Orders by Location")
    loc_df = get_orders_by_location(con, start_date, end_date, selected_locations)
    if not loc_df.empty:
        fig = px.bar(loc_df, x="order_count", y="location_name", orientation="h",
                     labels={"order_count": "Orders", "location_name": ""},
                     color_discrete_sequence=["#22c55e"])
        fig.update_layout(margin=dict(l=0, r=0, t=10, b=0), height=300, yaxis=dict(autorange="reversed"))
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data for selected filters.")

with chart_col4:
    st.subheader("Customer Breakdown")
    cust_df = get_customer_breakdown(con, start_date, end_date, selected_locations)
    if not cust_df.empty:
        fig = go.Figure(data=[go.Pie(
            labels=cust_df["customer_type"].tolist(),
            values=cust_df["customer_count"].tolist(),
            marker_colors=["#6366f1", "#f59e0b"],
            hole=0.4,
        )])
        fig.update_layout(margin=dict(l=0, r=0, t=10, b=0), height=300, showlegend=True)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data for selected filters.")
```

- [ ] **Step 3: Add Top Products table**

```python
# --- Top Products Table ---
st.divider()
st.subheader("Top Products by Revenue")
products_df = get_top_products(con, start_date, end_date, selected_locations)
if not products_df.empty:
    products_df.columns = ["Product", "Type", "Orders", "Revenue"]
    products_df["Revenue"] = products_df["Revenue"].apply(lambda x: f"${x:,.2f}")
    products_df["Orders"] = products_df["Orders"].apply(lambda x: f"{x:,}")
    st.dataframe(products_df, use_container_width=True, hide_index=True)
else:
    st.info("No data for selected filters.")

# Note: connection is cached via @st.cache_resource — no manual close needed
```

- [ ] **Step 4: Run full app and verify all sections render**

Run: `cd dashboard && streamlit run app.py`
Expected: Full dashboard with filters, 4 KPI cards, 4 charts, and products table. Changing filters updates all sections.

- [ ] **Step 5: Commit**

```bash
git add dashboard/app.py
git commit -m "feat(dashboard): add revenue, location, customer charts and products table"
```

---

### Task 5: Final polish and verification

**Files:**
- Verify: `dashboard/app.py`, `dashboard/queries.py`

- [ ] **Step 1: Test with location filter**

Run: `cd dashboard && streamlit run app.py`
Action: Select a single location in the filter. Verify all charts and KPIs update to show only that location's data.

- [ ] **Step 2: Test with date range filter**

Action: Change date range to a single year (e.g., 2024-01-01 to 2024-12-31). Verify revenue chart shows only that year's months.

- [ ] **Step 3: Test with both filters combined**

Action: Select a location AND a narrower date range. Verify all metrics are consistent (e.g., total orders matches the sum visible in the orders by location chart).

- [ ] **Step 4: Create README.md**

```markdown
# Jaffle Shop — Executive Dashboard

Business KPIs dashboard for C-level executives.

## Prerequisites

```bash
dbt seed --target prod --vars '{"load_source_data": true}'
dbt build --target prod
```

## Setup

```bash
pip install -r requirements.txt
```

## Run

```bash
streamlit run app.py
```

Opens at http://localhost:8501
```

- [ ] **Step 5: Commit final state**

```bash
git add -A dashboard/
git commit -m "feat(dashboard): complete C-level business KPIs dashboard"
```
