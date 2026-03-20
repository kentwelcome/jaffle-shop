---
title: Model Lineage
---

# Model Lineage

How data flows through the pipeline. Each row shows a raw source, its staging view, and the final mart table. Use this to trace where data comes from when debugging issues — if `orders` looks wrong, check `stg_orders`, then `raw_orders`.

**Pipeline flow:** Raw Sources → Staging Views → Mart Tables

| Raw Source | Staging View | Mart Table |
|-----------|-------------|------------|
| raw_customers | stg_customers | customers |
| raw_orders | stg_orders | orders |
| raw_items | stg_order_items | order_items |
| raw_products | stg_products | products |
| raw_stores | stg_locations | locations |
| raw_supplies | stg_supplies | supplies |

> Interactive DAG visualization is planned for a future iteration.

```sql row_counts
SELECT 'customers' as model, count(1) as rows FROM jaffle_shop.customers
UNION ALL SELECT 'orders', count(1) FROM jaffle_shop.orders
UNION ALL SELECT 'order_items', count(1) FROM jaffle_shop.order_items
UNION ALL SELECT 'products', count(1) FROM jaffle_shop.products
UNION ALL SELECT 'locations', count(1) FROM jaffle_shop.locations
UNION ALL SELECT 'supplies', count(1) FROM jaffle_shop.supplies
ORDER BY rows DESC
```

## Current Row Counts

<DataTable data={row_counts}>
  <Column id="model" title="Model" />
  <Column id="rows" title="Rows" fmt="#,##0" />
</DataTable>
