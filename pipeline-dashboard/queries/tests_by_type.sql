SELECT
    test_type,
    count(test_type) as total,
    sum(case when status = 'success' then 1 else 0 end) as passing,
    sum(case when status != 'success' then 1 else 0 end) as failing
FROM ${tests}
GROUP BY test_type
ORDER BY test_type
