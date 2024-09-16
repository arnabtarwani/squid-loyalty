DIR := $(PWD)
export POSTGRESQL_URL=postgresql://user:password@localhost:5432/postgres?sslmode=disable

.PHONY:
install: 
	@echo "Setting up the project..." && \
	direnv allow && \
	cp .env.example .env && \
	docker compose up -d 
	migrate -database ${POSTGRESQL_URL} -path ${DIR}/db/migrations up
	@echo "Installing dependencies..." && \
	pnpm install

.PHONY:
dev: 
	@echo "Running the project..." && \
	docker compose up -d && pnpm dev