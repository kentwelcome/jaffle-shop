SELECT name, node_type, status
FROM ${run_results}
WHERE status != 'success'
