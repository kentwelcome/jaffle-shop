---
title: Pipeline Status
---

<style>
  :global(.over-container) { display: none; }
</style>


```sql run_results
SELECT unique_id, status, execution_time, node_type, name
FROM jaffle_shop.run_results
```

```sql failure_count
SELECT count(1) as cnt FROM ${run_results} WHERE status != 'success'
```

```sql model_count
SELECT count(1) as cnt FROM ${run_results} WHERE node_type = 'model'
```

```sql test_passed
SELECT count(1) as cnt FROM ${run_results} WHERE node_type = 'test' AND status = 'success'
```

```sql build_duration
SELECT round(sum(execution_time), 1) as seconds FROM ${run_results}
```

```sql freshness
SELECT
    'raw_orders' as source_table,
    MAX(ordered_at)::DATE as latest_date,
    CURRENT_DATE - MAX(ordered_at)::DATE as days_since
FROM jaffle_shop.raw_orders
UNION ALL
SELECT
    'raw_stores',
    MAX(opened_at)::DATE,
    CURRENT_DATE - MAX(opened_at)::DATE
FROM jaffle_shop.raw_stores
ORDER BY source_table
```

```sql stale_sources
SELECT source_table, latest_date, days_since
FROM ${freshness}
WHERE days_since > 90
```

```sql stale_count
SELECT count(1) as cnt FROM ${stale_sources}
```

```sql failures
SELECT name, node_type, status
FROM ${run_results}
WHERE status != 'success'
```

{#if failure_count[0].cnt > 0}
<Alert status="negative">
  {failure_count[0].cnt} failure(s) detected in the latest build
</Alert>
{:else}
<Alert status="positive">
  All {run_results.length} nodes passed
</Alert>
{/if}

<BigValue data={model_count} value="cnt" title="Models Run" />
<BigValue data={test_passed} value="cnt" title="Tests Passed" />
<BigValue data={build_duration} value="seconds" title="Duration (s)" />
<BigValue data={stale_count} value="cnt" title="Stale Sources" />

Check here after each `dbt build`. If the banner is green, you're good. If it's red, check the failures below.

## Failures

{#if failure_count[0].cnt > 0}

<DataTable data={failures}>
  <Column id="name" title="Name" />
  <Column id="node_type" title="Type" />
  <Column id="status" title="Status" />
</DataTable>

{:else}

No failures — all nodes passed.

{/if}

## Stale Sources

{#if stale_count[0].cnt > 0}

Sources with no new data in over 90 days. Check the ingestion pipeline or upstream provider.

<DataTable data={stale_sources}>
  <Column id="source_table" title="Source" />
  <Column id="latest_date" title="Latest Date" />
  <Column id="days_since" title="Days Since Latest" />
</DataTable>

{:else}

All sources within 90-day freshness window.

{/if}
