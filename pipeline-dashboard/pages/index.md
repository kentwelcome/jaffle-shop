---
title: Pipeline Health Dashboard
---

# Pipeline Health Dashboard

Testing DuckDB connection...

```sql models
SELECT count(*) as model_count FROM information_schema.tables
WHERE table_schema = 'prod'
```

Found <Value data={models} column="model_count" /> tables in the prod schema.
