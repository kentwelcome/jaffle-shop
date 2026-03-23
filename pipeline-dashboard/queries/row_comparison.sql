SELECT 'customers' as model,
    (SELECT count(1) FROM jaffle_shop.stg_customers) as staging_rows,
    (SELECT count(1) FROM jaffle_shop.customers) as mart_rows
UNION ALL SELECT 'orders',
    (SELECT count(1) FROM jaffle_shop.stg_orders),
    (SELECT count(1) FROM jaffle_shop.orders)
UNION ALL SELECT 'order_items',
    (SELECT count(1) FROM jaffle_shop.stg_order_items),
    (SELECT count(1) FROM jaffle_shop.order_items)
UNION ALL SELECT 'products',
    (SELECT count(1) FROM jaffle_shop.stg_products),
    (SELECT count(1) FROM jaffle_shop.products)
UNION ALL SELECT 'locations',
    (SELECT count(1) FROM jaffle_shop.stg_locations),
    (SELECT count(1) FROM jaffle_shop.locations)
UNION ALL SELECT 'supplies',
    (SELECT count(1) FROM jaffle_shop.stg_supplies),
    (SELECT count(1) FROM jaffle_shop.supplies)
ORDER BY model
