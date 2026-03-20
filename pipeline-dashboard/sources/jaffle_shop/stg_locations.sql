SELECT
    id AS location_id,
    name AS location_name,
    tax_rate,
    date_trunc('day', opened_at) AS opened_date
FROM raw.raw_stores
