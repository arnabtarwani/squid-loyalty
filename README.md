### Squid Loyalty Technical Test

### Requirements

To get started with this project, you need to have the following installed on your local machine. The assumption is that you are using Mac for the development.

- Makefile - [Make] `brew install make`
- pnpm - [pnpm](https://pnpm.io/installation)
- Node.js - [Node.js](https://nodejs.org/en/download/)
- Docker - [Docker](https://www.docker.com/get-started)
- or Postgres - [Postgres](https://www.postgresql.org/download/)
- DB migration tool - Migrate - [Migrate](https://github.com/golang-migrate/migrate) or `brew install golang-migrate`
- Direnv - [Direnv](https://direnv.net/docs/installation.html) (optional) - This is used to load environment variables from a `.env` file into the shell
- jq - [jq] `brew install jq` - This is used to format the JSON output from the curl requests in the terminal.

### Setup

1. Clone the repository
2. Run the `bash ./scripts/install.sh` script to install to check whether the requirements are available to install the dependencies of the project. If the script doesn't run and you get a permission error, you can run `chmod +x ./scripts/install.sh` to make the script executable.
3. Run `make install` to initialise the installation process of the backend app.
4. Once the installation completes, update the DB credentials in the `.env` file if necessary.
5. Run `make dev` to start the pnpm project. This will start the server on `http://localhost:4000`.
6. Once the server is up and running, open another terminal instance and make a `curl` request to the server to test the endpoint `/discovery`.
7. To run the tests, run `make test`.

```bash
# Example curl request for the discovery endpoint:
curl -X GET http://localhost:4000/discovery\?lat\=50\&long\=74.0060 | jq .
curl -X GET http://localhost:4000/discovery\?lat\=50\&long\=74.0060\&limit\=3 | jq .
curl -X GET http://localhost:4000/discovery\?lat\=50\&long\=74.0060\&limit\=3\&type\=Cafe | jq .
```

### FAQs

- Why pnpm? pnpm is a fast, disk space efficient package manager. It's much better than npm and yarn that extract the same package multiple times on disk. pnpm links all the same packages to a single version of the package on disk.
- Why postgres? Just a design decision, Postgres provides better efficiency and performance compared to other relational databases. Also, it's a popular choice for most projects.
- Why Migrate? Migrate is a tool for managing changes to a database schema. It's like a version control system for your database. I could've used Prisma or TypeORM for the migrations but since the requirement is to keep it simple, I decided to use Migrate.
- Why Direnv? Direnv is a shell extension that loads or unloads environment variables depending on the current directory. It's a good practice to keep sensitive information in a `.env` file and load it into the shell using Direnv. You can also use the `source` command to load the environment variables from the `.env` file into the shell.

### Improvements

- Test coverage can be improved by adding more test cases to cover all the scenarios.
- Add more error handling to the codebase. Currently, the error handling is minimal as the focus was on the core functionality.
