import React, { useEffect, useState } from 'react';

export default function ExploreUsers({
  setSharedLines,
  myConnections,
  setStationsOnLine,
}) {
  const [selectValues, setSelectValues] = useState({});
  const [connectionStations, setConnectionStations] = useState({});
  const [connectionLines, setConnectionLines] = useState({});

  useEffect(() => {
    // load up each connection id with that user's stations
    myConnections.forEach((connection) => {
      connectionStations[connection.id] = connection.stations;
      setConnectionStations(connectionStations);

      const matchingLines = [];
      connection.stations.forEach((station) => {
        // on each station, walk through list of lines that go through that station
        station.lines.forEach((line) => {
          // if the line isn't in our list, add it
          if (matchingLines.includes(line) === false) {
            matchingLines.push(line);
          }
        });
      });

      connectionLines[connection.id] = matchingLines;
      setConnectionLines(connectionLines);

      selectValues[connection.id] = 'Select a line';
      setSelectValues(selectValues);
    });
  });

  const handleSelectChange = (event, connectionId) => {
    // we've selected a new line
    const line = event.target.value;

    // first reset all other select boxes
    myConnections.forEach((connection) => {
      selectValues[connection.id] = 'Select a line';
    });

    // update the select we actually clicked on to reflect the new value
    selectValues[connectionId] = event.target.value;
    setSelectValues(selectValues);

    // pass up the selected line up to the explore map
    setSharedLines(line);

    // pass up this user's stations up to the explore map
    setStationsOnLine(connectionStations[connectionId]);
  };

  return (
    <div>
      {myConnections.map((connection) => {
        return (
          <div key={connection.id}>
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{connection.username}</p>
              </header>
              <div className="card-content">
                <div className="select">
                  <select
                    value={selectValues[connection.id]}
                    onChange={(event) =>
                      handleSelectChange(event, connection.id)
                    }
                  >
                    <option value={'Select a line'}>Select a line</option>
                    {connection.stations.map((station) => {
                      return station.lines.map((line) => {
                        return (
                          <option key={line} value={line}>
                            {line} train
                          </option>
                        );
                      });
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
