---
title: Run History
---

# Run History

Results from the latest `dbt build` — every model, test, and seed that ran. Look for any **non-success** status in the chart. If you see failures, check the table below to find which specific node failed and how long it took.

```sql results
SELECT unique_id, status, execution_time, rows_affected, node_type, name
FROM jaffle_shop.run_results
```

```sql status_summary
SELECT status, count(status) as count FROM ${results} GROUP BY 1
```

## Results by Status

All bars should be green (success). Any red or yellow bars mean something failed or was skipped.

<BarChart
  data={status_summary}
  x=status
  y=count
  colorPalette={['#22c55e', '#f59e0b', '#ef4444']}
/>

## All Results

Sort by **Duration** to find slow models, or by **Status** to quickly find failures.

<DataTable data={results} rows=50>
  <Column id=name title="Name" />
  <Column id=node_type title="Type" />
  <Column id=status title="Status" />
  <Column id=execution_time title="Duration (s)" fmt="0.000" />
</DataTable>
