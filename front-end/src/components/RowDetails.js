import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function RowDetails({
  Email,
  Lastname,
  Firstname,
  Adresse,
  Phone,
  id,
  OnDelete,
}) {
  return (
    <tr>
      <th>{id}</th>
      <th>{Email}</th>
      <td>{Lastname}</td>
      <td>{Firstname}</td>
      <td>{Adresse}</td>
      <td>{Phone}</td>
      <td className="gap__actions">
        <span className="badge  m-1 bg-info">
          <Link to={`/clients/${id}`} className="text-white">
            <i className="fas fa-edit"></i>
          </Link>
        </span>

        <span
          style={{ cursor: "pointer" }}
          className="badge  m-1 bg-danger"
          onClick={() => OnDelete(id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
        <span style={{ cursor: "pointer" }} className="badge m-1 bg-info">
          <Link to={`/add-order/${id}`} className="text-white">
            <i class="fas fa-plus"></i>
          </Link>
        </span>
      </td>
    </tr>
  );
}

export default RowDetails;
