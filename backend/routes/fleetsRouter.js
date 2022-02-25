const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');  //w2
const fl = require('../data/fleets.json'); // w1

const fleetsRouter = express.Router();
fleetsRouter.use(bodyParser.json());

fleetsRouter.route('/')
  .get(async (req, res, next) => {
    res.statusCode = 200;
    var fleetsTable = [];

    const reading = await fs.readFile('./backend/data/fleets.json', 'utf8', async (err, data) => {
      if (err) console.error(err);
      const fleets = JSON.parse(data);
      await fleets.forEach(async function (fleet) {
        const newFleet = {
          _id: fleet._id,
          name: fleet.name,
          count: fleet.vessels.length
        };
        await fleetsTable.push(newFleet);
      });
      res.send({ fleets: fleetsTable });
    })
  })



fleetsRouter.route('/fleet/:fleetId')
  .get((req, res, next) => {
    const fleetId = req.params.fleetId;
    res.statusCode = 200;
    var fleetVessels = [];
    const reading = fs.readFile('./backend/data/fleets.json', 'utf8', (err, data) => {
      if (err) console.error(err);
      const fleets = JSON.parse(data);
      fleets.forEach(function (fleet) {
        if (fleet._id === fleetId) {
          fleetVessels = fleet.vessels;
        }
      });

      var vessels = []
      const reading = fs.readFile('./backend/data/vessels.json', 'utf8', (err, data) => {
        if (err) console.error(err);
        const vesselsData = JSON.parse(data);

        fleetVessels.forEach(function (v) {
          let match = vesselsData.find(el => el._id === v._id);
          vessels.push(match);
        });
        res.send({ vessels: vessels });
      })
    })
  })

module.exports = fleetsRouter;
