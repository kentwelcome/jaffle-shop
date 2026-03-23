---
title: Reference
---

<style>
  :global(.over-container) { display: none !important; }
</style>

Pipeline structure, performance, and schema. For onboarding and debugging — not a daily page.

```sql run_results
SELECT unique_id, status, execution_time, node_type, name
FROM jaffle_shop.run_results
```

```sql slow_models
SELECT name, node_type, execution_time
FROM ${run_results}
ORDER BY execution_time DESC
LIMIT 5
```

```sql orders_cols
SELECT column_name, data_type as column_type
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position
```

```sql customers_cols
SELECT column_name, data_type as column_type
FROM information_schema.columns
WHERE table_name = 'customers'
ORDER BY ordinal_position
```

```sql order_items_cols
SELECT column_name, data_type as column_type
FROM information_schema.columns
WHERE table_name = 'order_items'
ORDER BY ordinal_position
```

## Model Lineage

How data flows through the pipeline. Trace issues right to left: if `orders` looks wrong, check `stg_orders`, then `raw_orders`.

| Raw Source | Staging View | Mart Table |
|-----------|-------------|------------|
| raw_customers | stg_customers | customers |
| raw_orders | stg_orders | orders |
| raw_items | stg_order_items | order_items |
| raw_products | stg_products | products |
| raw_stores | stg_locations | locations |
| raw_supplies | stg_supplies | supplies |

## Slow Models

Top 5 slowest nodes from the latest build. If the build is getting slow, start here.

<DataTable data={slow_models}>
  <Column id="name" title="Name" />
  <Column id="node_type" title="Type" />
  <Column id="execution_time" title="Duration (s)" fmt="0.000" />
</DataTable>

## Schema Reference

Column names and types for the main mart models.

### Orders

<DataTable data={orders_cols}>
  <Column id="column_name" title="Column" />
  <Column id="column_type" title="Type" />
</DataTable>

### Customers

<DataTable data={customers_cols}>
  <Column id="column_name" title="Column" />
  <Column id="column_type" title="Type" />
</DataTable>

### Order Items

<DataTable data={order_items_cols}>
  <Column id="column_name" title="Column" />
  <Column id="column_type" title="Type" />
</DataTable>
