import React from "react";

const InfoCard = (props) => {
  return (
    <div className="app__infoCard">
      <h3 className={props.color}>{props.stat}</h3>
      <h4>{props.title}</h4>
      <div className="app__infoBadge">
        <h5 className={props.badge}>+{props.dailystats}</h5>
      </div>
    </div>
  );
};
export default InfoCard;
