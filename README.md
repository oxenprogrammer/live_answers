## Live Answers

This repository contains a small NodeJs server app as back-end.

## Live Demo
[Home page](https://murmuring-coast-31015.herokuapp.com)

[Answer List](https://murmuring-coast-31015.herokuapp.com/api/v1/answers)

### Main Technology Used
- Server-sent Events
- Rest API
- NodeJs
- TypeScript
- JavaScript
- PostgreSQL
- TypeORM (Data Mapper Pattern).
- Jest

## Prerequisites
- node
- PostgreSQL

The Database setup uses the default `psql` but you can set your own using `process.env` as seen in the `src/config/database.ts`. 

### Project Setup
- `clone` the repo.
- `cd` into the root directory.
- run `npm i` to install the dependencies.
- run `npm run dev` to start the local `development env`.
- run `npm run build` to build the `production env` and `npm run start` to start the build.
- open your browser `127.0.0.1:4001/api/v1/answers` for the `get response`.
- Use `curl` on the `terminal` to post a new answer. You can copy and paste the command below.

    ```
      curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"content": "my new answer is here"}'\
      -s http://localhost:4001/api/v1/answers
    ```
### Test
- run `npm run test` to run the test and see the test coverage.

**Author**
- Emanuel Okello

**Contribution**
- Checkout the github issues

