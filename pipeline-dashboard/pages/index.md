---
title: Pipeline Status
queries:
  - run_results.sql
  - failure_count.sql
  - model_count.sql
  - test_passed.sql
  - build_duration.sql
  - freshness.sql
  - stale_sources.sql
  - stale_count.sql
  - failures.sql
---

<style>
  :global(.over-container) { display: none; }
</style>

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
