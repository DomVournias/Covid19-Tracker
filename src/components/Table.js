import React from "react";

function Table({ areas }) {
  return (
    <div className="table">
      {areas.map((area) => (
        <tr>
          <td>{area.name}</td>
          <td>{area.number}</td>
        </tr>
      ))}
    </div>
  );
}
export default Table;
