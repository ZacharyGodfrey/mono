const db = require('../../../database/src/index');
const api = require('../../src/index');
const utilities = require('../../../utilities/src/index');

const express = require('express');

const port = process.env.PORT || 3000;
const server = express();

server.use(express.json());

server.use(async (req, res, next) => {
  const now = Date.now();
  const { env } = process;
  const { method: httpMethod, body: httpBody } = req;
  const { status, body } = await api(now, env, db, utilities, httpMethod, httpBody);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Content-Type', 'application/json');
  res.header('x-powered-by', '');
  res.status(status).send(body);
});

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});