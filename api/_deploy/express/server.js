const db = require('../../../database/src/index');
const api = require('../../src/index');

const express = require('express');

const port = process.env.PORT || 3000;
const server = express();

server.use(express.json());

server.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Content-Type', 'application/json');
  res.header('x-powered-by', '');

  const now = Date.now();
  const { status, body } = await api(now, process.env, db, req.method, req.body);

  res.status(status).send(body);
});

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});