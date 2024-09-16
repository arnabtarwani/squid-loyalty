### Squid Loyalty Technical Test

### Requirements

To get started with this project, you need to have the following installed on your local machine:

- pnpm - [pnpm](https://pnpm.io/installation)
- Node.js - [Node.js](https://nodejs.org/en/download/)
- Makefile - [Make] `brew install make`
- Docker - [Docker](https://www.docker.com/get-started)
- or Postgres - [Postgres](https://www.postgresql.org/download/)
- DB migration tool - Migrate - [Migrate](https://github.com/golang-migrate/migrate) or `brew install golang-migrate`
- Direnv - [Direnv](https://direnv.net/docs/installation.html) (optional) - This is used to load environment variables from a `.env` file into the shell. You can also use the `source` command to load the environment variables from the `.env` file into the shell.

### Setup

1. Clone the repository
2. Ensure Postgres is running in your machine. You can also use Docker to run Postgres. Run `make start-db` to start the Postgres container.
3. Run `make install` to run the startup script
4. Update the DB credentials

### FAQs

- Why pnpm? pnpm is a fast, disk space efficient package manager. It's much better than npm and yarn that extract the same package multiple times on disk. pnpm links all the same packages to a single version of the package on disk.
- Why postgres? Just a design decision, Postgres provides better efficiency and performance compared to other relational databases. Also, it's a popular choice for most projects.
- Why Migrate? Migrate is a tool for managing changes to a database schema. It's like a version control system for your database.
