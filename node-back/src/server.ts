const express = require('express');
import { type Request, type Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');
var path = require('path');
var public_files = path.join(__dirname, 'public');

import { routes } from './routes/routes'

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the node app server!!!')
});

server.get('/product/:json', (req: Request, res: Response) => {
  const { json } = req.params;
  res.sendFile(path.join(public_files, `product_${json}.json`));
})

server.use('/api', routes)

module.exports = server;
