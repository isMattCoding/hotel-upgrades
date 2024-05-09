const express = require('express');
import { type Request, type Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
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

server.get('/product/:json/:limit', (req: Request, res: Response) => {
  const { json, limit } = req.params;
  const limitNumber = parseInt(limit, 10);

  const filePath = path.join(public_files, `product_${json}.json`);
   fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'File not found' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid JSON data' });
    }

    const groupedProductsMap = {};

    jsonData.forEach((item) => {
      const { reservation_uuid, id, name } = item;
      if (!groupedProductsMap[reservation_uuid]) {
        groupedProductsMap[reservation_uuid] = {
          reservation_uuid,
          products: [],
        };
      }
      groupedProductsMap[reservation_uuid].products.push({ id, name });
    });

    // Convert the map to an array for the final output
    const groupedProductsArray = Object.values(groupedProductsMap);

    res.json(groupedProductsArray);
  });
})

// server.get('/product/charges/:limit', (req: Request, res: Response) => {
//   const { json, limit } = req.params;
//   const limitNumber = parseInt(limit, 10);

//   const filePath = path.join(public_files, `product_${json}.json`);
//    fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         return res.status(404).json({ error: 'File not found' });
//       }
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     let jsonData;
//     try {
//       jsonData = JSON.parse(data);
//     } catch (parseError) {
//       return res.status(400).json({ error: 'Invalid JSON data' });
//     }

//     if (Array.isArray(jsonData)) {
//       const limitedData = jsonData.slice(0, limitNumber);
//       return res.json(limitedData);
//     }

//     res.status(400).json({ error: 'JSON data is not an array' });
//   });
// })

server.use('/api', routes)

module.exports = server;
