---
title: Staging Layer
---

# Staging Layer

Staging models (`stg_*`) are views that clean and rename raw source columns. They sit between raw data and mart tables. Changes here mean the upstream source data changed — if a row count drops to zero, the raw source might be missing.

```sql staging_row_counts
SELECT 'stg_customers' as model, count(1) as rows FROM jaffle_shop.stg_customers
UNION ALL SELECT 'stg_orders', count(1) FROM jaffle_shop.stg_orders
UNION ALL SELECT 'stg_order_items', count(1) FROM jaffle_shop.stg_order_items
UNION ALL SELECT 'stg_products', count(1) FROM jaffle_shop.stg_products
UNION ALL SELECT 'stg_locations', count(1) FROM jaffle_shop.stg_locations
UNION ALL SELECT 'stg_supplies', count(1) FROM jaffle_shop.stg_supplies
ORDER BY rows DESC
```

## Row Counts

<BarChart
  data={staging_row_counts}
  x=model
  y=rows
  colorPalette={['#6366f1']}
/>

## Model Details

<DataTable data={staging_row_counts} rows=20>
  <Column id=model title="Model" />
  <Column id=rows title="Row Count" fmt="#,##0" />
</DataTable>
