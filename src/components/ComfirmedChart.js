import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const ConfirmedChart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let conRate = [];
    let conDate = [];

    axios
      .get("https://covid-19-greece.herokuapp.com/all")
      .then((res) => {
        for (const dataObj of res.data.cases) {
          conDate.push(dataObj.date);
          conRate.push(parseInt(dataObj.confirmed));
        }

        var count = res.data.cases.length;
        var lastThirtyDates = conDate.slice(Math.max(count - 7, 0));
        var lastThirtyRates = conRate.slice(Math.max(count - 7, 0));

        setChartData({
          labels: lastThirtyDates,
          datasets: [
            {
              label: "Κρούσματα",
              data: lastThirtyRates,
              backgroundColor: "rgba(144, 51, 204, 0.1)",
              color: "#9033CC",
              borderWidth: 1,
              borderColor: "#9033CC",
              fill: true,
              pointBackgroundColor: "rgba(144, 51, 204, 1)",
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
        options={
          ({
            plugins: {
              legend: {
                display: false,
              },
            },
          },
          {
            responsive: true,
            scales: {
              ticks: {
                display: false,
              },

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
          })
        }
      />
    </div>
  );
};

export default ConfirmedChart;
