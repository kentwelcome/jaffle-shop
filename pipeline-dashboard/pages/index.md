---
title: Pipeline Health Dashboard
---

# Pipeline Health Dashboard

Real-time pipeline monitoring from dbt artifacts and DuckDB.

```sql row_counts
SELECT 'customers' as model, count(1) as rows FROM jaffle_shop.customers
UNION ALL SELECT 'orders', count(1) FROM jaffle_shop.orders
UNION ALL SELECT 'order_items', count(1) FROM jaffle_shop.order_items
UNION ALL SELECT 'products', count(1) FROM jaffle_shop.products
UNION ALL SELECT 'locations', count(1) FROM jaffle_shop.locations
UNION ALL SELECT 'supplies', count(1) FROM jaffle_shop.supplies
ORDER BY rows DESC
```

```sql total_rows
SELECT sum(rows) as total FROM ${row_counts}
```

## Overview

<BigValue data={total_rows} value="total" title="Total Rows" />

<BigValue data={[{value: row_counts.length}]} value="value" title="Models" />

## Row Counts by Model

<BarChart
  data={row_counts}
  x="model"
  y="rows"
  colorPalette={['#6366f1']}
/>

## Model Details

<DataTable data={row_counts}>
  <Column id="model" title="Model" />
  <Column id="rows" title="Row Count" fmt="#,##0" />
</DataTable>
