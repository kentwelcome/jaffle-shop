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
