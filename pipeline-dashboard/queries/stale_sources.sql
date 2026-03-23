SELECT source_table, latest_date, days_since
FROM ${freshness}
WHERE days_since > 90
