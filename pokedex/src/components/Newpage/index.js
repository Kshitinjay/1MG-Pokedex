import React from "react";
import "./page.css";

const Newage = ({ toShow, name, height, weight, ability, im }) => {
  return (
    <div className="pokemon-details">
        <h1>Pokemon Details</h1>
        {/* <p>{toShow}</p> */}
        <p>
          <strong>Name is:</strong> {name}
        </p>
        <p>
          <strong>Height is:</strong> {height}
        </p>
        <p>
          <strong>Weight is:</strong> {weight}
        </p>
        <p>
          <strong>Ability:</strong> {ability}
        </p>
        <img src={im} alt="" />
    </div>
  );
};

export default Newage;
