import React, { useState, useEffect } from "react";
import "./App.css";
import StatsCards from "./components/StatsCards";
import Table from "./components/Table";
import { sortAreas } from "./components/util";
import ConfirmedChart from "./components/ComfirmedChart";
import DeathsChart from "./components/DeathsChart";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import Footer from "./components/Footer";

import Date from "./components/NavBar";

function App() {
  const [areas, setAreas] = useState([]);

  const [areasInfo, setAreasInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 38.307, lng: 24.423 });
  const [mapZoom, setMapZoom] = useState(6);
  const [mapAreas, setMapAreas] = useState([]);

  useEffect(() => {
    fetch("https://covid-19-greece.herokuapp.com/regions-history")
      .then((response) => response.json())
      .then((data) => {
        setAreasInfo(data);
      });
  }, []);

  useEffect(() => {
    const getRegionsData = async () => {
      await fetch("https://covid-19-greece.herokuapp.com/regions-history")
        .then((response) => response.json())
        .then((data) => {
          const areas = data["regions-history"][
            data["regions-history"].length - 1
          ].regions.map((area) => ({
            name: area.area_gr,
            value: area.area_en,
            number: area.cases,
            lat: area.latitude,
            long: area.longtitude,
          }));

          const sortedAreas = sortAreas(areas);
          setAreas(areas);
          setTableData(sortedAreas);
          setMapAreas(areas);
        });
    };
    getRegionsData();
  }, []);

  console.log(areas);

  return (
    <section className="app__container">
      <div className="app">
        <div className="app__header">
          <h1>Στατιστικά Ελλάδας</h1>
          <h2>Covid 19</h2>
        </div>
        <div className="app__navbar">
          <div className="app_date">
            <Date />
          </div>
        </div>
        <StatsCards />
        <div className="tableAndMap">
          <Table areas={tableData} />

          <Map areas={mapAreas} center={mapCenter} zoom={mapZoom} />
        </div>
        <div className="charts">
          <div className="firstChart">
            <ConfirmedChart />
          </div>
          <div className="secondChart">
            <DeathsChart />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default App;
