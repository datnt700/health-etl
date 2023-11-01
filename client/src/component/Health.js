import { React, useRef, useState, useEffect } from 'react';
import '../asset/health.scss';
import '../App.scss';

import * as d3 from 'd3';
import BarChartView from './BarChart';
import BarChartMoyenne from './BarChartMoyenne';

function Health({
  fabData,
  magData,
  prodData,
  prodByFab,
  topMagasinByFab,
  topMagasinByProd,
  moyenneProdTop1,
  moyenneProdTop2,
  chartFab,
  chartProd,
  fabriquant,
  handleFabriquant,
  fab,
  handleSelectChange,
}) {
  const optionTabs = ['Statistiques', 'Top 10 magasins', 'Moyenne de produit'];
  const [currentTab, setCurrentTab] = useState('Statistiques');
  const [currentFab, setCurrentFab] = useState('965');
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  const handleFabClick = (id) => {
    const selectedOption = id.target.value;
    setCurrentFab(selectedOption);
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
          <h2>Nombre total</h2>

          <div className="box-container">
            <div className="small-box">
              <h1>Nombre de fabricants</h1>
              <p>{fabData}</p>
            </div>

            <div className="small-box">
              <h1>Nombre de produits</h1>
              <p>{prodData}</p>
            </div>

            <div className="small-box">
              <h1>Nombre de magasins</h1>
              <p>{magData}</p>
            </div>
          </div>
          <h2>Moyenne</h2>
          <div className="box-container">
            <div className="small-box">
              <h1>Moyenne de produits par fabricants</h1>
              <p>{prodByFab}</p>
            </div>
          </div>
        </>
      ) : currentTab === optionTabs[1] ? (
        <>
          <h2>Top 10 magasins</h2>
          <div className="box-container">
            <BarChartView
              topMagasinByFab={topMagasinByFab}
              topMagasinByProd={topMagasinByProd}
            />
          </div>
        </>
      ) : currentTab === optionTabs[2] ? (
        <>
          <div className="tabs">
            <h4>Fabricants:</h4>
            <input value={fab} onChange={handleFabriquant} />
          </div>
          <h2>Moyenne de produits by fabricants dans top 10 magasins</h2>

          <div>
            <BarChartMoyenne
              moyenneProdTop1={moyenneProdTop1}
              moyenneProdTop2={moyenneProdTop2}
              chartFab={chartFab}
              chartProd={chartProd}
              currentFab={currentFab}
            />
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default Health;
