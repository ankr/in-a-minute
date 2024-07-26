# in-a-minute

Some arbritrary codebase :rolling-eyes:

So this is obviously not a complete product due to the limited timeline. However I think I have covered a lot of the basics in regards to data structure and developer experience. Please see the "Considerations" section down below.

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

Depending on the level of abstractions you could also introduce something like a **model** layer which would be representing the database structure in the application, however since I'm using **Prisma** for modelling the data I'm mostly relying on their generated types.

## Conderations

- Auth
  Both authentication as well as authorization could be handled using JWTs which are then intepreted by the application. There would need to be a service in place for dispatching and refreshing these tokens. Out of scope for this assignment.

- Error handling
  Ideally any errors should be caught and sent to a monitoring system like NewRelic, Datadog, Sentry or likewise.
  Remember to listen for the `unhandledRejection` and `uncaughtException` etc events, to ensure you catch any error happening outside the application.
  Implementing a set of predefined exception types as well as a generic error handler that inspect those could aid in this process.

- Logging
  `pino` is the preferred logger in node world and can dispatch to any desired persistent storage.
  Unfortunately I didn't have time to implement proper logging.

- Documentation
  If this was an ongoing project I would definitely look into OpenAPI, and any npm plugins that could automate this process.
  It's also possible to generate TS types from OAS specs and use them in codebase, but again a bit out of scope for this application.

- Migrations
  Any communication with the database is handled by the Prisma module. This also provides tools for creating and applying database migrations.

- Security
  I did not have time to implement any authentication or authorization mechanisms due to the time restraint. However I would default to be using JWTs for handling this part of the application.
  In terms of SQL injection attacks they should be mitigated as I'm using the Prisma ORM. Even [raw queries](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#executeraw) are "safe" provided you utilize tagged template strings.

- Stability
  Synchronous requests are easy, you just tell the user that there was an error - as opposed to asynchronous requests where you will need to implement retry mechanisms.
  There are many levels to this issue from just retrying jobs when they fail and put them back into the queue, to something like [curcuit breakers](https://microservices.io/patterns/reliability/circuit-breaker.html) which retries requests on the service level - allowing for small hickups in the infrastructure without restarting the entire job.
  If every automated process fails it's essential that a report is raised to a human being so the issue can be inspected and handled manually.

- Testing
  This setup is creating an additional Postgres database used only for testing. However due to limitations in Prisma it's not feasible to run tests within a transaction (which would prevent database updates from leaking across tests). And thus tests are not able to run in parallel due to race conditions, this is the reason for the `--runInBand` flag I have in `package.json` for the `test` command.

- Validation/Sanitization of input
  For the `/guests/signup` I implemented a very simple validation function using Zod schemas.
  Ideally every request should be validated and respond with errors accordingly - but again; time constraint.

- Versioning of endpoints
  Always a fun issue to tackle. But I believe this codebase allows for easy introduction of versioned endpoints. Firstly controllers are isolated to a single file as well as a "base path" as seen in `app.ts`.
  This makes it easy to introduce an additional level in the api path schema for versioning.
