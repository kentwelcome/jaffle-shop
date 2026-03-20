---
title: Model Lineage
---

# Model Lineage

Data flow from raw sources through staging to mart models.

**Pipeline flow:** Raw Sources → Staging Views → Mart Tables

| Sources | Staging | Marts |
|---------|---------|-------|
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
