const fs = require('fs');
const fileRouter = require('./data');
const dataRouter = require('./statistique');
const timeRouter = require('./month');
function route(app) {
  app.use('/file', fileRouter);
  app.use('/data', dataRouter);
  app.use('/month', timeRouter);
}

module.exports = route;
