---
title: Column Stats
---

# Column Stats

Column-level profiling for mart models using DuckDB SUMMARIZE.

```sql orders_profile
SUMMARIZE jaffle_shop.prod.orders
```

```sql customers_profile
SUMMARIZE jaffle_shop.prod.customers
```

```sql order_items_profile
SUMMARIZE jaffle_shop.prod.order_items
```

## Orders

<DataTable data={orders_profile} rows=20>
  <Column id=column_name title="Column" />
  <Column id=column_type title="Type" />
  <Column id=count title="Count" fmt="#,##0" />
  <Column id=null_percentage title="Null %" />
  <Column id=approx_unique title="Distinct" fmt="#,##0" />
  <Column id=min title="Min" />
  <Column id=max title="Max" />
</DataTable>

## Customers

<DataTable data={customers_profile} rows=20>
  <Column id=column_name title="Column" />
  <Column id=column_type title="Type" />
  <Column id=count title="Count" fmt="#,##0" />
  <Column id=null_percentage title="Null %" />
  <Column id=approx_unique title="Distinct" fmt="#,##0" />
  <Column id=min title="Min" />
  <Column id=max title="Max" />
</DataTable>

## Order Items

<DataTable data={order_items_profile} rows=20>
  <Column id=column_name title="Column" />
  <Column id=column_type title="Type" />
  <Column id=count title="Count" fmt="#,##0" />
  <Column id=null_percentage title="Null %" />
  <Column id=approx_unique title="Distinct" fmt="#,##0" />
  <Column id=min title="Min" />
  <Column id=max title="Max" />
</DataTable>
