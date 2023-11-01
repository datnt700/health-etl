const fs = require('fs');
const Data = require('../config/db');
class DataController {
  index(req, res) {
    const fileData = fs.readFileSync(
      '/Users/user/Desktop/Projet/etl/my-app/src/data/pointsDeVente-tous',
      'utf8'
    );
    const array = [];
    fileData.split('\n').forEach((line) => {
      const checkLine = line.split(' ');
      if (checkLine.length === 4) {
        array.push({
          dateID: checkLine[0],
          prodID: checkLine[1],
          catID: checkLine[2],
          fabID: checkLine[3],
        });
      }

      if (checkLine.length === 5) {
        array.push({
          dateID: checkLine[0],
          prodID: checkLine[1],
          catID: checkLine[2],
          fabID: checkLine[3],
          magID: checkLine[4],
        });
      }
    });
    return array;
  }
}
module.exports = new DataController();
