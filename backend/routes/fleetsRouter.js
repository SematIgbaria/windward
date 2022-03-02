const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');  //w2
const f1_fleets = require('../data/fleets.json'); // w1
const Veseels = require('../data/vessels.json');
const jp = require('jsonpath');

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

fleetsRouter.route('/veseels/:searchIn')
  .get((req, res, next) => {
    const searchIn = req.params.searchIn
    let myFleets = [];
    const matchedVessels = jp.query(Veseels, `$..[?(@.name=='${searchIn}' || @.flag=='${searchIn}' || @.mmsi=='${searchIn}')]`);
    const vesselsIds = jp.query(matchedVessels, '$.._id')

    f1_fleets.forEach(function (currentv, index) {

      //  let matchedFleets = jp.query(currentv, `$.[?(@.veseels[*]._id subsetof ${vesselsIds})]`)
      let currentvessels = jp.query(currentv, '$.vessels[*]._id')
      const filteredArray = currentvessels.filter(value => vesselsIds.includes(value));

      if (filteredArray.length > 0) {
        const newFleet = {
          _id: currentv._id,
          name: currentv.name,
          count: currentv.vessels.length
        };
        myFleets.push(newFleet);
      }
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send({ fleets:myFleets});
  })

module.exports = fleetsRouter;
