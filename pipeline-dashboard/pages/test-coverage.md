---
title: Test Coverage
---

# Test Coverage

Test results matrix from the latest `dbt build`.

```sql tests
SELECT
    r.unique_id,
    r.status,
    r.execution_time,
    split_part(r.unique_id, '.', 3) as test_name,
    CASE
        WHEN r.unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN r.unique_id LIKE '%unique%' THEN 'unique'
        WHEN r.unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN r.unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN r.unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        WHEN r.unique_id LIKE 'unit_test.%' THEN 'unit_test'
        ELSE 'other'
    END as test_type
FROM read_json_auto('/Users/kent/Dev/InfuseAI/GitHub/jaffle-shop/target/run_results.json') rr,
     unnest(rr.results) as r
WHERE r.unique_id LIKE 'test.%' OR r.unique_id LIKE 'unit_test.%'
ORDER BY test_type, test_name
```

```sql by_type
SELECT
    test_type,
    count(*) as total,
    count(*) FILTER (WHERE status = 'pass') as passing,
    count(*) FILTER (WHERE status = 'fail') as failing
FROM ${tests}
GROUP BY 1
ORDER BY 1
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
