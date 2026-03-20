---
title: Mart Layer
---

# Mart Layer

Mart models are the final tables that analysts and downstream tools query. These are built from staging models with joins, aggregations, and business logic applied. Monitor these row counts to catch issues before they reach reports and dashboards.

```sql mart_row_counts
SELECT 'customers' as model, count(1) as rows FROM jaffle_shop.customers
UNION ALL SELECT 'orders', count(1) FROM jaffle_shop.orders
UNION ALL SELECT 'order_items', count(1) FROM jaffle_shop.order_items
UNION ALL SELECT 'products', count(1) FROM jaffle_shop.products
UNION ALL SELECT 'locations', count(1) FROM jaffle_shop.locations
UNION ALL SELECT 'supplies', count(1) FROM jaffle_shop.supplies
UNION ALL SELECT 'metricflow_time_spine', count(1) FROM jaffle_shop.metricflow_time_spine
ORDER BY rows DESC
```

## Row Counts

Large bars (order_items, orders) should grow over time as new data arrives. Small bars (products, locations) are reference data and should stay relatively stable.

<BarChart
  data={mart_row_counts}
  x=model
  y=rows
  colorPalette={['#22c55e']}
/>

## Model Details

<DataTable data={mart_row_counts} rows=20>
  <Column id=model title="Model" />
  <Column id=rows title="Row Count" fmt="#,##0" />
</DataTable>
