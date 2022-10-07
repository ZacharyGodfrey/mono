# Mono

**A template for mono repo development**

![Version][shield-version]
![Commit][shield-commit]
![Coverage][shield-coverage]

![CI Workflow][shield-ci]
![Build][shield-build]

## Architecture

This is a single repository containing all of the code for each layer of the application stack.

Any code change pushed to the `main` branch of the repo will trigger a new build and deployment of both the API and client application.

## Tech Stack

- General
  - [GitHub Actions](https://github.com/features/actions) for running unit tests and coverage reports on each pull request
  - Unit Testing
    - [Mocha](https://www.npmjs.com/package/mocha) for running unit tests
    - [NYC](https://www.npmjs.com/package/nyc) for generating test coverage reports
    - [Chai](https://www.npmjs.com/package/chai), [Sinon](https://www.npmjs.com/package/sinon), and [Proxyquire](https://www.npmjs.com/package/proxyquire) for testing functionality
- [The API](#the-api)
  - [Netlify Functions](https://www.netlify.com/products/functions) for serverless hosting
- [The Client](#the-client)
  - [Netlify](https://www.netlify.com) for static file hosting
  - Custom-built static site generator for now, to be replaced with [Eleventy](https://www.11ty.dev)
  - **TBD** for content management system
- [The Database](#the-database)
  - **TBD** for data storage

## The API

The API is a minimal wrapper of HTTP over a series of "actions" that can be performed by the application.

The following rules apply to requests:

- The only HTTP method accepted is `POST`
- All input data is supplied in the request body
- URI segments, query string parameters, headers, and cookies are all ignored
- Endpoints requiring authentication use a simplified, JWT-like token

### Example Request

```json
{
  "action": "Create Blog Post",
  "token": "A1B2C3.D4E5F6",
  "data": {
    "title": "Sample Blog Post",
    "body": "This is a sample blog post."
  }
}
```

The following rules apply to responses:

- The only HTTP status code returned is `200` (to ensure client-side promises resolve)
- The `ok` body property is the real indication of success or failure
- The `message` body property is a string (success message or error message depending on `ok` value)
- The `token` body property, when present, is an updated token to be used for future requests
- The `data` body property is the output of the action (always `null` when `ok` is `false`)

### Example Response (Success)

```json
{
  "ok": true,
  "message": "Blog post created successfully.",
  "token": "A1B2C3.D4E5F6",
  "data": {
    "id": "7a682d74-852a-4cd0-be34-40a488cdca98",
    "title": "Sample Blog Post",
    "body": "This is a sample blog post."
  }
}
```

### Example Response (Error)

```json
{
  "ok": false,
  "message": "You do not have permission to create blog posts.",
  "token": "A1B2C3.D4E5F6",
  "data": null
}
```

## The Client

The client is a statically generated website. It renders the pages once at build time and then relies on the API to interact with dynamic data.

## The Database

Database information is **TBD** at the moment.

---

[shield-version]: https://img.shields.io/github/package-json/v/ZacharyGodfrey/mono?style=flat-square
[shield-commit]: https://img.shields.io/github/last-commit/ZacharyGodfrey/mono/main?style=flat-square
[shield-coverage]: https://img.shields.io/badge/dynamic/json?style=flat-square&color=blue&label=coverage&query=$.total.statements.pct&suffix=%&url=https://raw.githubusercontent.com/ZacharyGodfrey/mono/main/api/_coverage/coverage-summary.json

[shield-ci]: https://github.com/ZacharyGodfrey/mono/actions/workflows/ci-workflow.yml/badge.svg
[shield-build]: https://api.netlify.com/api/v1/badges/bff64e91-c255-4ca6-93e2-ead733e79abd/deploy-status