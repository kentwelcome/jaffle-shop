---
title: Mart Layer
---

# Mart Layer

Denormalized analytics tables built from staging models.

```sql mart_row_counts
SELECT 'customers' as model, count(*) as rows FROM jaffle_shop.customers
UNION ALL SELECT 'orders', count(*) FROM jaffle_shop.orders
UNION ALL SELECT 'order_items', count(*) FROM jaffle_shop.order_items
UNION ALL SELECT 'products', count(*) FROM jaffle_shop.products
UNION ALL SELECT 'locations', count(*) FROM jaffle_shop.locations
UNION ALL SELECT 'supplies', count(*) FROM jaffle_shop.supplies
UNION ALL SELECT 'metricflow_time_spine', count(*) FROM jaffle_shop.metricflow_time_spine
ORDER BY rows DESC
```

## Row Counts

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
