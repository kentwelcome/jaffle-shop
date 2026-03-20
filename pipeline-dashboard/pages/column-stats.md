---
title: Column Stats
---

# Column Stats

Schema reference for key mart models — column names and data types. Use this to quickly check what columns are available when writing queries, or to verify schema changes after a dbt migration.

```sql orders_cols
SELECT column_name, data_type as column_type
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position
```

```sql customers_cols
SELECT column_name, data_type as column_type
FROM information_schema.columns
WHERE table_name = 'customers'
ORDER BY ordinal_position
```

```sql order_items_cols
SELECT column_name, data_type as column_type
FROM information_schema.columns
WHERE table_name = 'order_items'
ORDER BY ordinal_position
```

## Orders

<DataTable data={orders_cols} rows=20>
  <Column id=column_name title="Column" />
  <Column id=column_type title="Type" />
</DataTable>

## Customers

<DataTable data={customers_cols} rows=20>
  <Column id=column_name title="Column" />
  <Column id=column_type title="Type" />
</DataTable>

## Order Items

<DataTable data={order_items_cols} rows=20>
  <Column id=column_name title="Column" />
  <Column id=column_type title="Type" />
</DataTable>
