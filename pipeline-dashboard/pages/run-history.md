---
title: Run History
---

# Run History

Latest build results from the most recent `dbt build`.

```sql results
SELECT
    r.unique_id,
    r.status,
    r.execution_time,
    CASE
        WHEN r.unique_id LIKE 'model.%' THEN 'model'
        WHEN r.unique_id LIKE 'test.%' THEN 'test'
        WHEN r.unique_id LIKE 'seed.%' THEN 'seed'
        WHEN r.unique_id LIKE 'unit_test.%' THEN 'unit_test'
        ELSE 'other'
    END as node_type,
    split_part(r.unique_id, '.', 3) as name
FROM read_json_auto('/Users/kent/Dev/InfuseAI/GitHub/jaffle-shop/target/run_results.json') rr,
     unnest(rr.results) as r
ORDER BY r.execution_time DESC
```

```sql status_summary
SELECT status, count(*) as count FROM ${results} GROUP BY 1
```

## Results by Status

<BarChart
  data={status_summary}
  x=status
  y=count
  colorPalette={['#22c55e', '#f59e0b', '#ef4444']}
/>

## All Results

<DataTable data={results} rows=50>
  <Column id=name title="Name" />
  <Column id=node_type title="Type" />
  <Column id=status title="Status" />
  <Column id=execution_time title="Duration (s)" fmt="0.000" />
</DataTable>
