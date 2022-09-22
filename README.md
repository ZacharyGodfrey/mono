# netlify-template

**A template repo for web apps deployed to Netlify**

## Architecture

This is a mono repo - a single repository containing all of the code for each layer of the application stack.

Any code change pushed to the `main` branch of the repo will trigger a new build and deployment of both the API and client application.

## Tech Stack

- API
  - [GitHub Actions](https://github.com/features/actions) for running unit tests and coverage reports on each pull request
  - [Netlify Functions](https://www.netlify.com/products/functions) for serverless hosting
- Client
  - [Eleventy](https://www.11ty.dev) for static site generation
  - **TBD** for content management
  - [Netlify](https://www.netlify.com) for static hosting
- Database
  - **TBD** for data storage
  
## The API

The API is a minimal wrapper of HTTP over a series of "actions" that can be performed by the application. The following rules apply:

- Only the HTTP `POST` method is accepted
- All input data is supplied in the HTTP request body
- URI segments, query string parameters, headers, and cookies are all ignored
- Endpoints requiring authentication use JWT tokens

## The Client

The client is a statically generated website. It fetches the content and renders the pages once at build time and then relies on the API to interact with dynamic data.

## The Database

**TBD**
