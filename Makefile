export JAFFLE_SHOP_DB_PATH ?= $(CURDIR)/data/jaffel-shop.duckdb

.PHONY: help prepare dashboard pipeline-dashboard pipeline-build pipeline-deploy dashboard-install pipeline-install pipeline-sources seed run run-prod

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2}'

# --- Preparation ---

prepare: ## Ensure data directory exists
	@mkdir -p $(CURDIR)/data

# --- dbt Pipeline ---

seed: prepare ## Seed source data to raw schema
	dbt seed --vars '{load_source_data: true}'

run: ## Run dbt models in dev and generate docs
	dbt run --target dev && dbt docs generate --target dev

run-prod: ## Run dbt models in prod and generate docs
	dbt run --target prod && dbt docs generate --target prod

# --- C-Level Executive Dashboard (Streamlit) ---

dashboard-install: ## Install C-level dashboard dependencies
	pip install -r dashboard/requirements.txt

dashboard: ## Launch C-level executive dashboard (Streamlit, port 8501)
	cd dashboard && streamlit run app.py

# --- Data Pipeline Dashboard (Evidence.dev) ---

pipeline-install: ## Install pipeline dashboard dependencies
	cd pipeline-dashboard && pnpm install

pipeline-sources: ## Extract source data from DuckDB for pipeline dashboard
	cd pipeline-dashboard && pnpm exec evidence sources

pipeline-build: ## Build static site for GitHub Pages
	cd pipeline-dashboard && pnpm run build

pipeline-deploy: ## Deploy built static site to GitHub Pages
	cd pipeline-dashboard && npx gh-pages -d .evidence/template/build -t --nojekyll

pipeline-dashboard: ## Launch pipeline health dashboard (Evidence.dev, port 3000)
	cd pipeline-dashboard && pnpm dev
