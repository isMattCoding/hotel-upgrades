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

server.get('/reservations', (req: Request, res: Response) => {

  const productAssignment = path.join(public_files, 'product_assignment.json');
  fs.readFile(productAssignment, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'File not found' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }

    let productAssignmentJsonData;
    try {
      productAssignmentJsonData = JSON.parse(data);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid JSON data' });
    }
    const productCharges = path.join(public_files, 'product_charges.json');
    fs.readFile(productCharges, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return res.status(404).json({ error: 'File not found' });
        }
        return res.status(500).json({ error: 'Internal server error' });
      }

      let productChargesJsonData;
      try {
        productChargesJsonData = JSON.parse(data);
      } catch (parseError) {
        return res.status(400).json({ error: 'Invalid JSON data' });
      }
      const groupedProductsMap = {};

      productAssignmentJsonData.forEach((item) => {
        const { reservation_uuid, id, name } = item;
        if (!groupedProductsMap[reservation_uuid]) {
          groupedProductsMap[reservation_uuid] = {
            reservation_uuid,
            products: [],
          };
        }
        const productCharges = productChargesJsonData.find((product) => {
            return product.special_product_assignment_id === id
          })
        const { active, amount } = productCharges ? productCharges : {active: null, amount: null};
        groupedProductsMap[reservation_uuid].products.push({
          id,
          name,
          active,
          amount
        });
        groupedProductsMap[reservation_uuid].product_count = groupedProductsMap[reservation_uuid].products.filter((product) => product.active).length
      });

      const groupedProductsArray = Object.values(groupedProductsMap);

      res.json(groupedProductsArray);

    })

  });
})

server.use('/api', routes)

module.exports = server;
