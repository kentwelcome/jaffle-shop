SELECT
    r.unique_id,
    r.status,
    r.execution_time,
    r.adapter_response->>'rows_affected' as rows_affected,
    CASE
        WHEN r.unique_id LIKE 'model.%' THEN 'model'
        WHEN r.unique_id LIKE 'test.%' THEN 'test'
        WHEN r.unique_id LIKE 'seed.%' THEN 'seed'
        WHEN r.unique_id LIKE 'unit_test.%' THEN 'unit_test'
        ELSE 'other'
    END as node_type,
    split_part(r.unique_id, '.', 3) as name
FROM read_json_auto('/Users/kent/Dev/InfuseAI/GitHub/jaffle-shop/target/run_results.json') rr,
     unnest(rr.results) as t(r)
ORDER BY r.execution_time DESC
