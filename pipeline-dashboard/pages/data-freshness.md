---
title: Data Freshness
---

# Data Freshness

Latest record dates per source table.

```sql freshness
SELECT
    'raw_orders' as source_table,
    'ordered_at' as date_column,
    MAX(ordered_at)::DATE as latest_date,
    CURRENT_DATE - MAX(ordered_at)::DATE as days_since_latest,
    CASE WHEN MAX(ordered_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END as status
FROM jaffle_shop.raw.raw_orders
UNION ALL
SELECT 'raw_customers', 'N/A (static seed)', NULL, NULL, 'Static seed'
UNION ALL
SELECT
    'raw_stores',
    'opened_at',
    MAX(opened_at)::DATE,
    CURRENT_DATE - MAX(opened_at)::DATE,
    CASE WHEN MAX(opened_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END
FROM jaffle_shop.raw.raw_stores
UNION ALL
SELECT 'raw_items', 'N/A (linked to orders)', NULL, NULL, 'Linked to orders'
ORDER BY source_table
```

## Source Freshness

<DataTable data={freshness}>
  <Column id=source_table title="Source Table" />
  <Column id=date_column title="Date Column" />
  <Column id=latest_date title="Latest Date" />
  <Column id=days_since_latest title="Days Since Latest" />
  <Column id=status title="Status" />
</DataTable>
