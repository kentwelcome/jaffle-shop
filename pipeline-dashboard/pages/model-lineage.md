---
title: Model Lineage
---

# Model Lineage

Data flow from raw sources through staging to mart models.

```mermaid
graph LR
    subgraph Sources
        raw_customers[raw_customers]
        raw_orders[raw_orders]
        raw_items[raw_items]
        raw_products[raw_products]
        raw_stores[raw_stores]
        raw_supplies[raw_supplies]
    end

    subgraph Staging
        stg_customers[stg_customers]
        stg_orders[stg_orders]
        stg_order_items[stg_order_items]
        stg_products[stg_products]
        stg_locations[stg_locations]
        stg_supplies[stg_supplies]
    end

    subgraph Marts
        customers[customers]
        orders[orders]
        order_items[order_items]
        products[products]
        locations[locations]
        supplies[supplies]
    end

    raw_customers --> stg_customers
    raw_orders --> stg_orders
    raw_items --> stg_order_items
    raw_products --> stg_products
    raw_stores --> stg_locations
    raw_supplies --> stg_supplies

    stg_customers --> customers
    stg_orders --> orders
    stg_orders --> order_items
    stg_order_items --> order_items
    stg_products --> products
    stg_products --> order_items
    stg_supplies --> supplies
    stg_supplies --> order_items
    stg_locations --> locations
    order_items --> orders
    orders --> customers

    style raw_customers fill:#f1f5f9,stroke:#94a3b8
    style raw_orders fill:#f1f5f9,stroke:#94a3b8
    style raw_items fill:#f1f5f9,stroke:#94a3b8
    style raw_products fill:#f1f5f9,stroke:#94a3b8
    style raw_stores fill:#f1f5f9,stroke:#94a3b8
    style raw_supplies fill:#f1f5f9,stroke:#94a3b8
    style stg_customers fill:#eef2ff,stroke:#6366f1
    style stg_orders fill:#eef2ff,stroke:#6366f1
    style stg_order_items fill:#eef2ff,stroke:#6366f1
    style stg_products fill:#eef2ff,stroke:#6366f1
    style stg_locations fill:#eef2ff,stroke:#6366f1
    style stg_supplies fill:#eef2ff,stroke:#6366f1
    style customers fill:#f0fdf4,stroke:#22c55e
    style orders fill:#f0fdf4,stroke:#22c55e
    style order_items fill:#f0fdf4,stroke:#22c55e
    style products fill:#f0fdf4,stroke:#22c55e
    style locations fill:#f0fdf4,stroke:#22c55e
    style supplies fill:#f0fdf4,stroke:#22c55e
```

**Legend:**
- Gray = Raw sources (seeds)
- Purple = Staging views
- Green = Mart tables

> This is the v1 static Mermaid DAG. Interactive features (layer filter tabs, click-to-detail panels, parameterized drill-down pages) are planned for a future iteration.

```sql row_counts
SELECT 'customers' as model, count(*) as rows FROM jaffle_shop.customers
UNION ALL SELECT 'orders', count(*) FROM jaffle_shop.orders
UNION ALL SELECT 'order_items', count(*) FROM jaffle_shop.order_items
UNION ALL SELECT 'products', count(*) FROM jaffle_shop.products
UNION ALL SELECT 'locations', count(*) FROM jaffle_shop.locations
UNION ALL SELECT 'supplies', count(*) FROM jaffle_shop.supplies
ORDER BY rows DESC
```

## Current Row Counts

<DataTable data={row_counts}>
  <Column id=model title="Model" />
  <Column id=rows title="Rows" fmt="#,##0" />
</DataTable>
