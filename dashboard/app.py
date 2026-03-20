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
