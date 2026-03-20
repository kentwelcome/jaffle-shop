# Jaffle Shop — Executive Dashboard

Business KPIs dashboard for C-level executives.

## Prerequisites

```bash
dbt seed --target prod --vars '{"load_source_data": true}'
dbt build --target prod
```

## Setup

```bash
pip install -r requirements.txt
```

## Run

```bash
streamlit run app.py
```

Opens at http://localhost:8501
