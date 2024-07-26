# in-a-minute

Some arbitrary codebase :shrug:

So this is obviously not a complete product due to the limited timeline. However I think I have covered a lot of the basics in regards to data structure and developer experience. Please see the "Design choices" section down below.

The ratio of files to LOC might seem a bit excessive, but it allows for easy expansion and seperation of concerns going forward.

## Installation

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

- These are responsible for handling incoming requests and talk to the rest of the application through **services**.
- One could argue for adding an additional layer on top of this; **routes** which would just be mapping HTTP requests to Controllers.

**services**

- This is the bread and butter of the business logic, they take inputs from controller (or other), do their magic and talk to the database through **repositories**.
- Additionally things like workers etc. could be using services to do business logic.

**repositories**

- These are the entry point to the database and responsible for maintaining data integrity.
- These are the only files that should be talking directly to the database and ORM.

Depending on the level of abstractions you could also introduce something like a **model** layer which would be representing the data structure in the application - connecting the ORM and application.

## Conderations

- Auth
  Both authentication as well as authorization could be handled using JWTs which are then intepreted by the application.
  The JWTs would contain _claims_ as to which level of authorization they contain.
  There would need to be a service in place for dispatching and refreshing these tokens - but of scope for this assignment.

- Error handling
  Ideally any errors should be caught and sent to a monitoring system like NewRelic, Datadog, Sentry or likewise.
  Remember to listen for the `unhandledRejection` and `uncaughtException` etc events, to ensure you catch any error happening outside the application.
  Implementing a set of predefined exception types as well as a generic error handler that inspect those could aid in this process.
  Having either _repository layer_, the _service layer_ (or both) implementing a pattern using an [Either](https://www.sandromaglione.com/articles/either-error-handling-functional-programming) type could ease the error handling as well as helping making the application typesafe.

- Logging
  `pino` is the preferred logger in node world and can dispatch to any desired persistent storage.
  Unfortunately I didn't have time to implement proper logging.

- Documentation
  If I had the time I would definitely look into OpenAPI, and any npm plugins that could automate this process.
  It's also possible to generate TS types from OA specs and use them in codebase, but again a bit out of scope for this application.

- Migrations
  Any communication with the database is handled by the Prisma module. This also [provides tools](https://www.prisma.io/docs/orm/prisma-migrate) for creating and applying database migrations.

- Security
  I did not have time to implement any authentication or authorization mechanisms due to the time restraint. However I would default to be using JWTs for handling this part of the application.
  In terms of SQL injection attacks they don't apply as I'm using the Prisma ORM. Even [raw queries](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#executeraw) are "safe" provided you utilize tagged template strings.

- Stability
  Synchronous requests are easy, you just tell the user that there was an error - as opposed to asynchronous requests where you will need to implement retry mechanisms.
  There are many levels to this issue from just retrying jobs when they fail and put them back into the queue, to something like [curcuit breakers](https://microservices.io/patterns/reliability/circuit-breaker.html) which retries requests on the service level - allowing for small hickups in the infrastructure without restarting the entire job.
  If every automated process fails it's essential that a report is raised to a human being so the issue can be inspected and handled manually.

- Testing
  This setup is creating an additional Postgres database used only for testing. However due to limitations in Prisma it's not feasible to run tests within a transaction (which would prevent database updates from leaking across tests). And thus tests are not able to run in parallel due to race conditions.
  This is the reason for the `--runInBand` flag I have in `package.json` for the `test` command.
  Test coverage is low (to say the least), but I think I've shown examples of how I would approach both unit and integration tests.

- Validation/Sanitization of input
  For the `/guests/signup` endpoint I implemented a very simple validation function using Zod schemas.
  Ideally every request should be validated and respond with errors accordingly - but again; time constraint.

- Versioning of endpoints
  Always a fun issue to tackle. But I believe this codebase allows for easy introduction of versioned endpoints. Firstly controllers are isolated to a single file as well as a "base path" as seen in `app.ts`.
  This makes it trivial to introduce an additional level in the api paths for versioning.

## Missing parts

Regarding shortcomings of this application there are quite a few.

- Authentication and authorization
  This is a major part and would start by implementing JWTs into the request flow which could then be validated by the server.
  One layer could be added to the controller level just to ensure that the user is actually able to access this endpoint based on IDs and _claims_ in the request (and JWT).
  An additional layer could be added in the **reposotiry** level to ensure proper authorization to the individual entities.
  The exact implementation can be tricky, but you could utilize something like `AsyncLocalStorage` to propagate the userId from the controller to the rest of the application.

- Idempotency
  Nothing is this solution takes into account retries and idempotency, meaning that any endpoint simply accepts any input and processes it.
  This issue can be tackled on various levels of the application, but seeings as this closely ties into business logic - it ought to be handled in the service layer.

- Error handling
  No errors are being caught or handled in my submission. As mentioned before you would have a predefined set of Exception classes that can be thrown from with the application - and handled by an "ErrorHandler" which will report to an external system as well as reply the user accordingly.

- Throttling
  This sounds like something that should be handled outside the application - probably in [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html).
