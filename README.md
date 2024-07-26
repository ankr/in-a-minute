# in-a-minute

Some arbritrary codebase :rolling-eyes:

## Installationm

Install dependencies.

```
npm install
```

Start docker container for databases.

```
docker compose up
```

Setup app and test database.

```
npm run migrate:dev
npm run migrate:test
```

## Testing

After test database has been properly configured using `npm run migrate:test` run:

```
npm test
```

## Design choices

I choose to use a layered approach using `controller`, `services` and `repositories` as the base.

**controllers**

- These are responsible for handling incoming requests and talk to the rest of the application using **services**.
- One could argue for adding an additional layer on top of this; **routes** which would just be mapping HTTP requests to Controllers.

**services**

- This is the bread and butter of the business logic, they take inputs from controller, do their magic and talk to the database through **repositories**.
- Additionally things like background workers etc. could be using services to do business logic.

**repositories**

- These are the entry point to the database and responsible for maintain data integrity.
- These are the only files that should be talking directly to the database and ORM.

Depending on the level of abstractions you could also introduce something like a **model** layer which would be representing the database structure in the application, however since I'm using **Prisma** for modelling the data I'm relying on their generated types.
