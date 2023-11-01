const dataFile = require('./DataController');

class StatistiquesController {
  // [GET]/
  index(req, res) {
    const category = req.params.id;
    const annee = req.query.paramName;
    const fab = req.query.paramName;
    const data = dataFile.index();
    const fabData = [];
    const prodData = [];
    const magData = [];
    const prodByFab = [];
    const dateData = [];
    let topMagasin = [];
    let topMagasinByFab = [];
    let topMagasinByProd = [];
    const chartTopFab = [];
    const chartTopProd = [];
    const mag = true;
    let moyenneProdTop1;
    let moyenneProdTop2;
    const chartFab = [];
    const chartProd = [];

    data.forEach((item) => {
      if (item.catID === category) {
        if (!fabData.includes(item.fabID)) {
          // Questin 1.1
          fabData.push(item.fabID);
        } else {
          // • Question 1.2.
          if (!prodByFab.includes(item.prodID)) {
            prodByFab.push(item.prodID);
          }
        }
        if (!prodData.includes(item.prodID)) {
          prodData.push(item.prodID);
        }
        // • Question 1.3.
        if (item.magID) {
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
      if (!dateData.includes(Number(item.dateID.slice(0, 6)))) {
        dateData.push(Number(item.dateID.slice(0, 6)));
      }

      dateData.sort((a, b) => a - b);
      fabData.sort((a, b) => a - b);
    });
    if (mag) {
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
      const fabSorted = toFabMagasin.sort((a, b) => {
        return Number(Object.values(b).pop()) - Number(Object.values(a).pop());
      });
      // await sleep(100);
      const prodSorted = toProdMagasin.sort(
        (a, b) =>
          Number(Object.values(b).pop()) - Number(Object.values(a).pop())
      );
      topMagasinByFab = fabSorted.slice(0, 10);
      topMagasinByProd = prodSorted.slice(0, 10);

      handleFab(fab, category, topMagasinByFab, topMagasinByProd);
    }
    const moyenne = Math.round((prodByFab.length / fabData.length) * 100) / 100;

    function handleFab(fab, category, topMagasinByFab, topMagasinByProd) {
      // Question 1.4
      // Pose fabID = 506, catID = 5, magasin top 10
      const list10MagFab = topMagasinByFab.map((ele) => {
        return Object.keys(ele).pop();
      });
      const list10MagProd = topMagasinByProd.map((ele) => {
        return Object.keys(ele).pop();
      });
      const filteredProductByFabTop = [];
      const filteredProductByProdTop = [];
      data.forEach((item) => {
        if (item.catID === category && item.fabID === fab) {
          if (
            !filteredProductByFabTop.includes(item.prodID) &&
            list10MagFab.includes(item.magID)
          ) {
            filteredProductByFabTop.push(item.prodID);

            dateData.forEach((i2, index) => {
              if (!chartFab[index]) chartFab[index] = 0;
              if (Number(item.dateID.slice(0, 6)) === Number(i2)) {
                if (chartFab[index] !== 0) {
                  const n = chartFab[index];
                  chartFab[index] = (n + 1 / 10) * 100;
                } else {
                  chartFab[index] = (1 / 10) * 100;
                }
              }
            });
          }

          if (
            !filteredProductByProdTop.includes(item.prodID) &&
            list10MagProd.includes(item.magID)
          ) {
            filteredProductByProdTop.push(item.prodID);
            dateData.forEach((i2, index) => {
              if (!chartProd[index]) chartProd[index] = 0;
              if (Number(item.dateID.slice(0, 6)) === Number(i2)) {
                if (chartProd[index] !== 0) {
                  const n = chartProd[index];
                  chartProd[index] = (n + 1 / 10) * 100;
                } else {
                  chartProd[index] = (1 / 10) * 100;
                }
              }
            });
          }
        }
      });
      clearArray(chartTopFab);
      addArray(chartTopFab, chartFab);

      clearArray(chartTopProd);
      addArray(chartTopProd, chartProd);
      moyenneProdTop1 = (filteredProductByFabTop.length / 10) * 100;
      moyenneProdTop2 = (filteredProductByProdTop.length / 10) * 100;
      console.log(filteredProductByFabTop);
    }

    function clearArray(array) {
      while (array.length > 0) {
        array.pop();
      }
    }
    function addArray(arrayMain, arrayAdd) {
      for (const i in arrayAdd) {
        arrayMain.push(arrayAdd[i]);
      }
    }

    res.send({
      fabData: fabData.length,
      prodData: prodData.length,
      magData: magData.length,
      prodByFab: moyenne,
      topMagasinByFab: topMagasinByFab,
      topMagasinByProd: topMagasinByProd,
      moyenneProdTop1: moyenneProdTop1,
      moyenneProdTop2: moyenneProdTop2,
      chartFab: chartFab,
      chartProd: chartProd,
      fabriquant: fabData,
    });
  }
}

module.exports = new StatistiquesController();
