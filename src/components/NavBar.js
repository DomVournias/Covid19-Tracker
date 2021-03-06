import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangeIcon from "@mui/icons-material/DateRange";

const Date = () => {
  const [loading, setLoading] = useState(false);

  const [casesDate, setCasesDate] = useState([]);

  const fetchData = () => {
    const baseAPI = "https://covid-19-greece.herokuapp.com/all";

    const getBase = axios.get(baseAPI);

    axios.all([getBase]).then(
      axios.spread((...allData) => {
        const Date =
          allData[0].data.cases[allData[0].data.cases.length - 1].date;

        setCasesDate(Date);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dateCard">
      <span>
        <DateRangeIcon />
      </span>
      &nbsp; Τελευταία ενημέρωση: {casesDate}
    </div>
  );
};

export default Date;
