---
title: Data Quality
---

Test health and data consistency across pipeline layers. Check here when investigating issues or during weekly review.

```sql tests
SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name
```

```sql by_type
SELECT
    test_type,
    count(test_type) as total,
    sum(case when status = 'success' then 1 else 0 end) as passing,
    sum(case when status != 'success' then 1 else 0 end) as failing
FROM ${tests}
GROUP BY test_type
ORDER BY test_type
```

```sql failing_tests
SELECT test_name, test_type, status
FROM ${tests}
WHERE status != 'success'
```

```sql row_comparison
SELECT 'customers' as model,
    (SELECT count(1) FROM jaffle_shop.stg_customers) as staging_rows,
    (SELECT count(1) FROM jaffle_shop.customers) as mart_rows
UNION ALL SELECT 'orders',
    (SELECT count(1) FROM jaffle_shop.stg_orders),
    (SELECT count(1) FROM jaffle_shop.orders)
UNION ALL SELECT 'order_items',
    (SELECT count(1) FROM jaffle_shop.stg_order_items),
    (SELECT count(1) FROM jaffle_shop.order_items)
UNION ALL SELECT 'products',
    (SELECT count(1) FROM jaffle_shop.stg_products),
    (SELECT count(1) FROM jaffle_shop.products)
UNION ALL SELECT 'locations',
    (SELECT count(1) FROM jaffle_shop.stg_locations),
    (SELECT count(1) FROM jaffle_shop.locations)
UNION ALL SELECT 'supplies',
    (SELECT count(1) FROM jaffle_shop.stg_supplies),
    (SELECT count(1) FROM jaffle_shop.supplies)
ORDER BY model
```

## Test Results by Type

Green = passing, red = failing. All bars should be green.

- **not_null** — column must not have NULL values
- **unique** — column values must be unique
- **relationships** — foreign key references must exist in the parent table
- **accepted_values** — column values must be within an allowed set
- **expression_is_true** — custom SQL expression must evaluate to true

<BarChart
  data={by_type}
  x="test_type"
  y={["passing", "failing"]}
  type="stacked"
  colorPalette={['#22c55e', '#ef4444']}
/>

## Failing Tests

{#if failing_tests.length > 0}

<DataTable data={failing_tests}>
  <Column id="test_name" title="Test" />
  <Column id="test_type" title="Type" />
  <Column id="status" title="Status" />
</DataTable>

{:else}

All tests passing.

{/if}

## All Tests

<DataTable data={tests} rows=50>
  <Column id="test_name" title="Test" />
  <Column id="test_type" title="Type" />
  <Column id="status" title="Status" />
  <Column id="execution_time" title="Duration (s)" fmt="0.000" />
</DataTable>

## Row Count Comparison

Compares row counts between staging and mart layers. If staging and mart counts differ, the transformation may be filtering or duplicating rows — not always a bug, but worth knowing.

<DataTable data={row_comparison}>
  <Column id="model" title="Model" />
  <Column id="staging_rows" title="Staging Rows" fmt="#,##0" />
  <Column id="mart_rows" title="Mart Rows" fmt="#,##0" />
</DataTable>
