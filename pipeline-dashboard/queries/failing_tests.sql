SELECT test_name, test_type, status
FROM ${tests}
WHERE status != 'success'
