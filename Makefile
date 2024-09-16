.PHONY:
db-init:
	@echo "Initializing the database..." && \ 
	export POSTGRESQL_URL='postgresql://user:password@100.69.220.19:5432/postgres?sslmode=disable' && \ 
	migrate -database ${POSTGRESQL_URL} -path db/migrations up && \ 
	@echo "✅ Migration complete!"

.PHONY:
install: 
	@echo "Installing dependencies..." && \
	direnv allow && \
	cp .env.example .env && \
	docker compose up -d && \
	export POSTGRESQL_URL='postgresql://user:password@100.69.220.19:5432/postgres?sslmode=disable' && \ 
	@echo migrate -database ${POSTGRESQL_URL} -path db/migrations up && \
	pnpm install
	@echo "✅ Done!"

.PHONY:
dev: 
	@echo "Running the project..." && \
	docker compose up -d && pnpm dev