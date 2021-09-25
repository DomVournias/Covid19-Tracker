import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 150,
  },
};

export const sortAreas = (areas) => {
  const sortedAreas = [...areas];

  return sortedAreas.sort((a, b) => (a.number > b.number ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showAreasOnMap = (areas, data, casesType = "cases") =>
  areas.map((area) => (
    <Circle
      center={[area.lat, area.long]}
      color={casesTypeColors.cases.hex}
      fillColor={casesTypeColors.cases.hex}
      fillOpacity={0.4}
      radius={Math.sqrt(area.number) * casesTypeColors.cases.multiplier}
    >
      <Popup>
        <div className="info-container">
          <div className="info-name">{area.name}</div>
          <div className="info-confirmed">
            Cases: {numeral(area.number).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
