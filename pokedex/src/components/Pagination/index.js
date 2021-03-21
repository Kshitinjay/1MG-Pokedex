import React, { useState, useEffect } from "react";
import "./pagination.css";
const Pagination = (props) => {
  const [counter, setCounter] = useState(1);
  const [nbuttons, setNbuttons] = useState(20);

  useEffect(() => {
    const value = props.showPerPage * counter;
    props.handlePage(value - props.showPerPage, value);
  }, [counter]);

  const handleInc = () => {
    if (counter < 20) {
      setCounter(counter + 1);
      console.log("Increased");
    }
  };

  const handleDec = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      console.log("Decreased");
    }
  };

  const handleCounter = (idx) => {
    setCounter(idx);
  };

  return (
    <div>
      <nav>
        <ul className="pagination">
          <a onClick={handleDec}>
            <li className="pagination-buttons">Prev</li>
          </a>
          {new Array(20).fill("").map((elem, idx) => (
            <a onClick={() => handleCounter(idx)}>
              <li className="pagination-buttons">{idx + 1}</li>
            </a>
          ))}

          <a onClick={handleInc}>
            <li className="pagination-buttons">Next</li>
          </a>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
