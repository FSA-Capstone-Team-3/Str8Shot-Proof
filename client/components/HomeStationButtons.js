import React from "react";
import { useDispatch } from "react-redux";
import { postStation, deleteStation } from "../store/stations";

function HomeStationButtons({
  selectedStation,
  homeStations,
  setSelectedLine,
}) {
  const dispatch = useDispatch();

  const homeStationsCheck = (homeStations, selectedStation) => {
    for (let i = 0; i < homeStations.length; i++) {
      let currentStation = homeStations[i];

      if (currentStation.code === selectedStation.code) {
        return true;
      }
    }
    return false;
  };

  return (
    <React.Fragment>
      {homeStationsCheck(homeStations, selectedStation) ? (
        <button
          className="button"
          type="button"
          onClick={() => {
            dispatch(deleteStation(selectedStation.code));
            setSelectedLine("");
          }}
        >
          Remove Station
        </button>
      ) : (
        <button
          className="button"
          type="button"
          onClick={() => {
            dispatch(postStation(selectedStation.code));
            setSelectedLine("");
          }}
        >
          Add Station
        </button>
      )}
    </React.Fragment>
  );
}

export default HomeStationButtons;
