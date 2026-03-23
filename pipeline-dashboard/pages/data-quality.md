---
title: Data Quality
queries:
  - tests.sql
  - tests_by_type.sql
  - failing_tests.sql
  - row_comparison.sql
---

<style>
  :global(.over-container) { display: none; }
</style>

Test health and data consistency across pipeline layers. Check here when investigating issues or during weekly review.

## Test Results by Type

Green = passing, red = failing. All bars should be green.

- **not_null** — column must not have NULL values
- **unique** — column values must be unique
- **relationships** — foreign key references must exist in the parent table
- **accepted_values** — column values must be within an allowed set
- **expression_is_true** — custom SQL expression must evaluate to true

<BarChart
  data={tests_by_type}
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
