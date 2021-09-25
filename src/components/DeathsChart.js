import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const DeathsChart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let conDeaths = [];
    let conDateDeaths = [];

    axios
      .get("https://covid-19-greece.herokuapp.com/all")
      .then((res) => {
        for (const dataObj of res.data.cases) {
          conDateDeaths.push(dataObj.date);

          conDeaths.push(parseInt(dataObj.deaths));
        }

        var count = res.data.cases.length;
        var lastThirtyDates = conDateDeaths.slice(Math.max(count - 30, 0));

        var lastThirtyDeaths = conDeaths.slice(Math.max(count - 30, 0));

        setChartData({
          labels: lastThirtyDates,
          datasets: [
            {
              label: "Θάνατοι",
              data: lastThirtyDeaths,
              backgroundColor: "rgba(204, 68, 51, 0.1)",
              color: "#CC4433",
              borderWidth: 1,
              borderColor: "#CC4433",
              fill: true,
              pointBackgroundColor: "rgba(204, 68, 51, 1)",
              pointBorderWidth: 0,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DeathsChart;
