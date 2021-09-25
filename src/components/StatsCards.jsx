import React, { useState, useEffect } from "react";
import axios from "axios";
import LargeSpinner from "../components/LargeSpinner";
import InfoCard from "../components/InfoCard";

const StatsCards = () => {
  const [loading, setLoading] = useState(false);
  const [confirmedCases, setConfirmedCases] = useState([]);
  const [confirmedDeaths, setConfirmedDeaths] = useState([]);
  const [casesDate, setCasesDate] = useState([]);
  const [recoveredCases, setRecoveredCases] = useState([]);
  const [allVaccinated, setAllVaccinated] = useState([]);
  const [dailyCases, setDailyCases] = useState([]);
  const [dailyDeaths, setDailyDeaths] = useState([]);

  const [dailyRecovers, setDailyRecovers] = useState([]);

  const fetchData = () => {
    const baseAPI = "https://covid-19-greece.herokuapp.com/all";
    const savedAPI = "https://covid-19-greece.herokuapp.com/recovered";
    const vacAPI = "https://covid-19-greece.herokuapp.com/total-vaccinations";

    const getBase = axios.get(baseAPI);
    const getSaved = axios.get(savedAPI);
    const getVaccinated = axios.get(vacAPI);

    axios.all([getBase, getSaved, getVaccinated]).then(
      axios.spread((...allData) => {
        const allConfirmed =
          allData[0].data.cases[allData[0].data.cases.length - 1].confirmed;
        const dailyConfirmed =
          allData[0].data.cases[allData[0].data.cases.length - 1].confirmed -
          allData[0].data.cases[allData[0].data.cases.length - 2].confirmed;
        const allDeaths =
          allData[0].data.cases[allData[0].data.cases.length - 1].deaths;
        const dailyDeaths =
          allData[0].data.cases[allData[0].data.cases.length - 1].deaths -
          allData[0].data.cases[allData[0].data.cases.length - 2].deaths;
        const Date =
          allData[0].data.cases[allData[0].data.cases.length - 1].date;
        const allRecovered =
          allData[1].data.cases[allData[1].data.cases.length - 1].recovered;
        const dailyRecovered =
          allData[1].data.cases[allData[1].data.cases.length - 1].recovered -
          allData[1].data.cases[allData[1].data.cases.length - 2].recovered;
        const allVaccinations =
          allData[2].data["total-vaccinations"].totalvaccinations;

        console.log(allData[2]);

        setConfirmedCases(allConfirmed);
        setDailyCases(dailyConfirmed);
        setConfirmedDeaths(allDeaths);
        setDailyDeaths(dailyDeaths);
        setCasesDate(Date);
        setRecoveredCases(allRecovered);
        setDailyRecovers(dailyRecovered);
        setAllVaccinated(allVaccinations);
        setLoading(true);
      })
    );
  };

  const boxes = [
    {
      name: "Κρούσματα",
      color: "confirmedColor",
      colorTwo: "negativeColor",
      cases: loading ? confirmedCases : <LargeSpinner />,
      daily: loading ? dailyCases : <LargeSpinner />,
    },
    {
      name: "Θάνατοι",
      color: "deathsColor",
      colorTwo: "negativeColor",
      cases: loading ? confirmedDeaths : <LargeSpinner />,
      daily: loading ? dailyDeaths : <LargeSpinner />,
    },
    {
      name: "Εμβολιασμένοι",
      color: "vaccinatedColor",
      colorTwo: "positiveColor",
      cases: loading ? allVaccinated : <LargeSpinner />,
      daily: "ukn",
    },
    {
      name: "Θεραπευμένοι",
      color: "recoveredColor",
      colorTwo: "positiveColor",
      cases: loading ? recoveredCases : <LargeSpinner />,
      daily: loading ? dailyRecovers : <LargeSpinner />,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app__cards">
      {boxes.map((box) => (
        <div className="app__stats">
          <InfoCard
            stat={box.cases}
            title={box.name}
            color={box.color}
            dailystats={box.daily}
            badge={box.colorTwo}
          />
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
