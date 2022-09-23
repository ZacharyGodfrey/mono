const db = require('database');
const api = require('../../index');

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
  const data = body === null ? '' : JSON.stringify(body, null, 2);

  res.status(status).send(data);
});

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});