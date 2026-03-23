SELECT name, node_type, execution_time
FROM ${run_results}
ORDER BY execution_time DESC
LIMIT 5
