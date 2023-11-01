import { useState, React, useEffect } from 'react';
import BarChartDate from './BarChartDate';
import BarChartSaison from './BarChartSaison';
export default function HealthDate({
  moyenneDate,
  nbFab3Mois,
  topMagasinByFabDate,
  topMagasinByProdDate,
  annee,
}) {
  const optionTabs = ['Statistiques', 'Top 10 magasins'];
  const [currentTab, setCurrentTab] = useState('Statistiques');
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };
  return (
    <>
      <div className="tabs">
        {optionTabs.map((item) => (
          <div
            className={`tab ${currentTab === item ? 'active' : ''}`}
            key={item}
            onClick={() => handleTabClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      {currentTab === optionTabs[0] ? (
        <>
          <h2>Moyenne dans les soldes d'hiver {annee}</h2>
          <div className="box-container">
            <div className="small-box">
              <h1>Moyenne de produits par fabricants</h1>
              <p>{moyenneDate}</p>
            </div>
          </div>
          <div className="">
            <h2>Fabricants dans Janver, Février, Mars en {annee}</h2>
            <BarChartDate nbFab3Mois={nbFab3Mois} annee={annee} />
          </div>
        </>
      ) : currentTab === optionTabs[1] ? (
        <div>
          <h2>Top 10 magasins dans l'été et les soldes d'hiver en {annee}</h2>
          <div class="box-container">
            <BarChartSaison
              topMagasinByFabDate={topMagasinByFabDate}
              topMagasinByProdDate={topMagasinByProdDate}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
