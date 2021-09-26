import React from "react";

function Table({ areas }) {
  return (
    <div className="table">
      <h5>Κρούσματα ανά Νομό</h5>
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
