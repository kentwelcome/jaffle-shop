import os

import duckdb
import pandas as pd
import streamlit as st
from pathlib import Path

DB_PATH = os.environ.get("JAFFLE_SHOP_DB_PATH", str(Path(__file__).parent.parent / "data" / "jaffel-shop.duckdb"))


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


def _build_query(sql: str, start_date: str, end_date: str, locations: list) -> tuple:
    """Build a parameterized query. Returns (sql_string, params_list).
    Use $1, $2 for date params. Location filter uses a subquery on unnest($3)."""
    params = [start_date, end_date]
    if locations:
        sql = sql.replace("{loc_filter}", "AND o.location_id IN (SELECT unnest($3::VARCHAR[]))")
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
