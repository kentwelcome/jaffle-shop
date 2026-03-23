SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name
