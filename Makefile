.PHONY: help dashboard pipeline-dashboard pipeline-build dashboard-install pipeline-install pipeline-sources

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2}'

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

pipeline-build: ## Build static site for GitHub Pages deployment
	cd pipeline-dashboard && pnpm run build

pipeline-dashboard: ## Launch pipeline health dashboard (Evidence.dev, port 3000)
	cd pipeline-dashboard && pnpm dev
