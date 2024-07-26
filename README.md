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
