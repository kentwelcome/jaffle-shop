---
title: Run History
---

# Run History

Latest build results from the most recent `dbt build`.

```sql results
SELECT unique_id, status, execution_time, rows_affected, node_type, name
FROM jaffle_shop.run_results
```

```sql status_summary
SELECT status, count(status) as count FROM ${results} GROUP BY 1
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
