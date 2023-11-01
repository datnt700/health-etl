const dataFile = require('./DataController');
const Data = require('../model/data');

class StaDateController {
  index(req, res) {
    const annee = req.query.paramName;
    const category = req.params.id;
    const data = dataFile.index();
    const nbFabJan = [];
    const nbFabFeb = [];
    const nbFabMars = [];
    const fabData = [];
    const prodByFab = [];
    const magData = [];
    const topMagasin = {};
    let nbFab3Mois = [];
    let topMagasinByFab = [];
    let topMagasinByProd = [];
    const START_SOLDES_HIVER = 20220112;
    const END_SOLDES_HIVER = 20220208;
    const START_ETE = 20220621;
    const END_ETE = 20220923;
    Data.find().then((data) => {
      data.forEach((item) => {
        if (
          item.catID === category &&
          Number(item.dateID.slice(0, 4)) === Number(annee)
        ) {
          // Question 2.1: Pour la catégorie d’identifiant 5, combien y a t il d’acteurs sur le
          // marché ayant un produit de cette catégorie en Janvier, en Février, et en Mars?
          if (
            Number(item.dateID.slice(4, 6)) === 1 &&
            !nbFabJan.includes(item.fabID)
          ) {
            nbFabJan.push(item.fabID);
          }

          if (
            Number(item.dateID.slice(4, 6)) === 2 &&
            !nbFabFeb.includes(item.fabID)
          ) {
            nbFabFeb.push(item.fabID);
          }

          if (
            Number(item.dateID.slice(4, 6)) === 3 &&
            !nbFabMars.includes(item.fabID)
          ) {
            nbFabMars.push(item.fabID);
          }
          // Question 2.2:
          if (
            Number(item.dateID) >= START_SOLDES_HIVER &&
            Number(item.dateID) <= END_SOLDES_HIVER
          ) {
            if (!fabData.includes(item.fabID)) {
              // Questin 1.1
              fabData.push(item.fabID);
            } else {
              // • Question 1.2.
              if (!prodByFab.includes(item.prodID)) {
                prodByFab.push(item.prodID);
              }
            }
          }
          // • Question 2.3.
          if (
            item.magID &&
            Number(item.dateID) >= START_ETE &&
            Number(item.dateID) <= END_ETE
          ) {
            // TOP 10 magasin: most pid, most fid
            if (!magData.includes(item.magID)) {
              magData.push(item.magID);
            } else {
              if (topMagasin[item.magID]) {
                let dataF = topMagasin[item.magID].fab;
                let dataP = topMagasin[item.magID].prod;
                if (!dataF.includes(item.fabID)) {
                  dataF.push(item.fabID);
                }

                if (!dataP.includes(item.prodID)) {
                  dataP.push(item.prodID);
                }
                topMagasin[item.magID] = { fab: dataF, prod: dataP };
              } else {
                topMagasin[item.magID] = {
                  fab: [item.fabID],
                  prod: [item.prodID],
                };
              }
            }
          }
        }
      });
      nbFab3Mois = [nbFabJan.length, nbFabFeb.length, nbFabMars.length];
      const moyenne =
        Math.round((prodByFab.length / fabData.length) * 100) / 100;
      //Q2.3
      // Sorted top magasion
      const toFabMagasin = Object.keys(topMagasin).map((item) => {
        const lenF = topMagasin[item].fab.length;
        const obj = {};
        obj[item] = lenF;
        return obj;
      });
      const toProdMagasin = Object.keys(topMagasin).map((item) => {
        const lenP = topMagasin[item].prod.length;
        const obj = {};
        obj[item] = lenP;
        return obj;
      });

      const fabSorted = toFabMagasin.sort(
        (a, b) =>
          Number(Object.values(b).pop()) - Number(Object.values(a).pop())
      );

      // await sleep(100);
      const prodSorted = toProdMagasin.sort(
        (a, b) =>
          Number(Object.values(b).pop()) - Number(Object.values(a).pop())
      );
      topMagasinByFab = fabSorted.slice(0, 10);
      topMagasinByProd = prodSorted.slice(0, 10);

      // END Q2.3
      res.send({
        nbFab3Mois: nbFab3Mois,
        moyenne: moyenne,
        topMagasinByFab: topMagasinByFab,
        topMagasinByProd: topMagasinByProd,
      });
    });
  }
}
module.exports = new StaDateController();
