---
title: Test Coverage
---

# Test Coverage

Test results matrix from the latest `dbt build`.

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

## Coverage by Test Type

<BarChart
  data={by_type}
  x=test_type
  y={["passing", "failing"]}
  type=stacked
  colorPalette={['#22c55e', '#ef4444']}
/>

## All Tests

<DataTable data={tests} rows=50>
  <Column id=test_name title="Test" />
  <Column id=test_type title="Type" />
  <Column id=status title="Status" />
  <Column id=execution_time title="Duration (s)" fmt="0.000" />
</DataTable>
