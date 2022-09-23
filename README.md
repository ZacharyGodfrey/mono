# netlify-template

**A template repo for web apps deployed to Netlify**

## Architecture

This is a mono repo - a single repository containing all of the code for each layer of the application stack.

Any code change pushed to the `main` branch of the repo will trigger a new build and deployment of both the API and client application.

## Tech Stack

- API
  - [GitHub Actions](https://github.com/features/actions) for running unit tests and coverage reports on each pull request
  - [Netlify Functions](https://www.netlify.com/products/functions) for serverless hosting
  - Unit Testing
    - [NYC]() for running unit tests
    - [Mocha]() for generating test coverage reports
    - [Chai](https://www.npmjs.com/package/chai), [Sinon](https://www.npmjs.com/package/sinon), and [Proxyquire](https://www.npmjs.com/package/proxyquire) for testing functionality
- Client
  - [Eleventy](https://www.11ty.dev) for static site generation
  - **TBD** for content management
  - [Netlify](https://www.netlify.com) for static hosting
- Database
  - **TBD** for data storage

## The API

The API is a minimal wrapper of HTTP over a series of "actions" that can be performed by the application.

The following rules apply to requests:

- The only HTTP method accepted is `POST`
- All input data is supplied in the request body
- URI segments, query string parameters, headers, and cookies are all ignored
- Endpoints requiring authentication use a JWT-like token

### Example Request

```json
{
  "action": "Delete Blog Post",
  "token": "A1B2C3.D4E5F6",
  "data": {
    "postId": 123
  }
}
```

The following rules apply to responses:

- The only HTTP status code returned is `200`
- The `ok` body property is the real indication of success or failure
- The `token` body property, when present, is an updated token to be used for future requests
- The `data` body property is the output of the action or `null` when `ok` is `false`
- The `messages` body property is an array of strings (success messages or error messages depending on `ok` value)

### Example Response (Success)

```json
{
  "ok": true,
  "token": "A1B2C3.D4E5F6",
  "data": {},
  "messages": [
    "Blog post deleted successfully."
  ]
}
```

### Example Response (Error)

```json
{
  "ok": false,
  "token": "A1B2C3.D4E5F6",
  "data": null,
  "messages": [
    "You do not have permission to delete blog posts."
  ]
}
```

## The Client

The client is a statically generated website. It renders the pages once at build time and then relies on the API to interact with dynamic data.

## The Database

**TBD**
