// Import deps
import React from "react";

const ScreenRow = (props) => {
  return (
    <tr className="table-row">
      <td className="table-item">{props.ticket.TID}</td>

      <td className="table-item">{props.ticket.CID}</td>

      <td className="table-item">{props.ticket.type}</td>

      <td className="table-item">
        {props.np[props.ticket.type] ? props.np[props.ticket.type] : 0}
      </td>
    </tr>
  );
};
export default ScreenRow;
