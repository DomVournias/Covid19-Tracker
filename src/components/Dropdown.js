import { FormControl, Select, MenuItem } from "@material-ui/core";
const [casesType, setCasesType] = useState("cases");

const [region, setRegion] = useState("ΕΛΛΑΔΑ");

const onRegionChange = async (event) => {
  const regionCode = event.target.value;

  const url =
    regionCode === "ΕΛΛΑΔΑ"
      ? "https://covid-19-greece.herokuapp.com/all"
      : `https://covid-19-greece.herokuapp.com/regions-history`;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setRegion(regionCode);
      setAreasInfo(data);
      setMapCenter([areas.areasInfo.latitude, areas.areasInfo.long]);
      console.log(setMapCenter);
    });
};

<div className="app_dropdown">
  <FormControl className="app__dropDown">
    <Select variant="outlined" value={region} onChange={onRegionChange}>
      <MenuItem value="ΕΛΛΑΔΑ">ΕΛΛΑΔΑ</MenuItem>
      {areas.map((area) => (
        <MenuItem value={area.value}>{area.name}</MenuItem>
      ))}
    </Select>
  </FormControl>
</div>;
