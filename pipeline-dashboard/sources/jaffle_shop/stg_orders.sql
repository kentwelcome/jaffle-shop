SELECT
    id AS order_id,
    store_id AS location_id,
    customer AS customer_id,
    subtotal AS subtotal_cents,
    tax_paid AS tax_paid_cents,
    order_total AS order_total_cents,
    CAST((subtotal / 100) AS DECIMAL(16,2)) AS subtotal,
    CAST((tax_paid / 100) AS DECIMAL(16,2)) AS tax_paid,
    CAST((order_total / 100) AS DECIMAL(16,2)) AS order_total,
    date_trunc('day', ordered_at) AS ordered_at
FROM raw.raw_orders
