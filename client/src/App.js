import { useState, useEffect } from 'react';
import './App.scss';
import { useFile } from './store/useFile';
import Health from './component/Health';
import HealthDate from './component/HealthDate';

import Papa from 'papaparse';
import FileInput from 'react-file-reader';
import axios from 'axios';

function App() {
  const [annee, setAnnee] = useState('Tous les années');
  const [fabData, setFabData] = useState(null);
  const [magData, setMagData] = useState(null);

  const [prodByFab, setProdByFab] = useState(null);
  const [prodData, setProdData] = useState(null);
  const [topMagasinByFab, setTopMagasinByFab] = useState(null);
  const [topMagasinByProd, setTopMagasinByProd] = useState(null);
  const [data, setData] = useState(null);
  const [moyenneDate, setMoyenneDate] = useState(null);
  const [nbFab3Mois, setnbFab3MoisDate] = useState(null);
  const [topMagasinByFabDate, setTopMagasinByFabDate] = useState(null);
  const [topMagasinByProdDate, setTopMagasinByProdDate] = useState(null);
  const [moyenneProdTop1, setMoyenneProdTop1] = useState(null);
  const [moyenneProdTop2, setMoyenneProdTop2] = useState(null);
  const [chartFab, setChartFab] = useState(null);
  const [chartProd, setChartProd] = useState(null);
  const [fabriquant, setFabriquant] = useState(null);
  const [isLoading] = useState(true);
  const file = useFile();
  const categoryData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const [categorySelected, setCategorySelected] = useState('5'); // State để lưu giá trị đã chọn từ select

  const anneeOptions = ['Tous les années', '2022', '2023'];
  // const annee = 'Tous les annees';
  const dataToShow =
    '/Users/user/Desktop/etl/my-app/src/data/pointsDeVente-tous';

  const fileOptions = [
    {
      label: 'Points De Vente',
    },
    {
      label: 'Produit',
    },
  ];
  const [fab, setFab] = useState('965');

  const handleFabriquant = (id) => {
    const selected = id.target.value;
    setFab(selected);
  };
  useEffect(() => {
    handleAnneeChange();
  }, [annee, categorySelected]);
  useEffect(() => {
    handleSelectChange();
  }, [fab, categorySelected]);

  const handleAnneeSelected = (option) => {
    option.preventDefault();
    const selectedAnnee = option.target.value;
    setAnnee(selectedAnnee);
  };

  const handleSelected = (event) => {
    event.preventDefault();
    const selectedOption = event.target.value;
    setCategorySelected(selectedOption);
  };

  const handleAnneeChange = () => {
    const data = axios
      .get(`http://localhost:3001/month/${categorySelected}`, {
        params: {
          paramName: annee, // Truyền tham số
        },
      })
      .then((result) => {
        setMoyenneDate(result.data.moyenne);
        setnbFab3MoisDate(result.data.nbFab3Mois);
        setTopMagasinByFabDate(result.data.topMagasinByFab);
        setTopMagasinByProdDate(result.data.topMagasinByProd);
      });
  };
  const handleSelectChange = () => {
    const data = axios
      .get(`http://localhost:3001/data/${categorySelected}`, {
        params: {
          paramName: fab,
        },
      })
      .then((result) => {
        setFabData(result.data.fabData);
        setMagData(result.data.magData);
        setProdData(result.data.prodData);
        setProdByFab(result.data.prodByFab);
        setTopMagasinByFab(result.data.topMagasinByFab);
        setTopMagasinByProd(result.data.topMagasinByProd);
        setMoyenneProdTop1(result.data.moyenneProdTop1);
        setMoyenneProdTop2(result.data.moyenneProdTop2);
        setChartFab(result.data.chartFab);
        setChartProd(result.data.chartProd);
        setFabriquant(result.data.fabriquant);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h2>Notification du score de santé d’un fabricant sur le marché</h2>

      <div className="box-select-container">
        <div className="box-select">
          <h2 className="title">Choisir la catégorie</h2>
          <select
            value={categorySelected}
            className="select"
            onChange={handleSelected}
          >
            {categoryData.map((item, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="box-select">
          <h2 className="title">Choisir l'années</h2>
          <select className="select" onChange={handleAnneeSelected}>
            {anneeOptions.map((item, index) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="box-select">
        {annee == '2022' || annee == '2023' ? (
          <HealthDate
            moyenneDate={moyenneDate}
            nbFab3Mois={nbFab3Mois}
            topMagasinByFabDate={topMagasinByFabDate}
            topMagasinByProdDate={topMagasinByProdDate}
            annee={annee}
          />
        ) : (
          <Health
            fabData={fabData}
            magData={magData}
            prodData={prodData}
            prodByFab={prodByFab}
            topMagasinByFab={topMagasinByFab}
            topMagasinByProd={topMagasinByProd}
            moyenneProdTop1={moyenneProdTop1}
            moyenneProdTop2={moyenneProdTop2}
            chartFab={chartFab}
            chartProd={chartProd}
            fabriquant={fabriquant}
            handleFabriquant={handleFabriquant}
            fab={fab}
            handleSelectChange={handleSelectChange}
          />
        )}
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
