import React, { useState } from "react";

export default function DropDown({ connection, setSharedLines, setStationsOnLine }) {
  // state below
  const [isActive, setActive] = useState("");

  // Drop down click handler
  function activateDropDown(event) {
    if (isActive === "") {
      setActive("is-active");
    } else if (isActive === "is-active") {
      setActive("");
    }
  }

  let stationsOnLine = []
  function getStationsOnLine(line) {
    connection.stations.forEach((station) => {
      if(station.lines.includes(line)) {
        stationsOnLine.push(station)
      }
    })
  }

  let matchingLines = [];
  connection.stations.forEach((station) => {
    // on each station, walk through list of lines that go through that station
    station.lines.forEach((line) => {
      // if the line isn't in our list, add it
      if (matchingLines.includes(line) === false) {
        matchingLines.push(line);
      }
    });
  });


  return (
    <div className={`dropdown ${isActive}`}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls={`dropdown-menu${connection.id}`}
          onClick={activateDropDown}
        >
          <span>Select a Line</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div
        className="dropdown-menu"
        id={`dropdown-menu${connection.id}`}
        role="menu"
      >
        <div className="dropdown-content">
          {matchingLines.map((line) => {
            return (
              <a
                href="#"
                className="dropdown-item"
                onClick={(event) => {
                  activateDropDown(event);
                  setSharedLines(line);
                  getStationsOnLine(line)
                  setStationsOnLine(stationsOnLine)
                }}
              >
                {line}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
