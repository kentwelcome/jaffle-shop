---
title: Staging Layer
---

# Staging Layer

All staging models — views that clean and standardize raw source data.

```sql staging_row_counts
SELECT 'stg_customers' as model, count(*) as rows FROM jaffle_shop.prod.stg_customers
UNION ALL SELECT 'stg_orders', count(*) FROM jaffle_shop.prod.stg_orders
UNION ALL SELECT 'stg_order_items', count(*) FROM jaffle_shop.prod.stg_order_items
UNION ALL SELECT 'stg_products', count(*) FROM jaffle_shop.prod.stg_products
UNION ALL SELECT 'stg_locations', count(*) FROM jaffle_shop.prod.stg_locations
UNION ALL SELECT 'stg_supplies', count(*) FROM jaffle_shop.prod.stg_supplies
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
