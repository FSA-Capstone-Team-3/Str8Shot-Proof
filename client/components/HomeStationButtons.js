import React from 'react';
import { useDispatch } from 'react-redux';
import { postStation, deleteStation } from '../store/stations';

function HomeStationButtons({ selectedStation, homeStations }) {
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
          type="button"
          onClick={() => {
            dispatch(deleteStation(selectedStation.code));
          }}
        >
          Remove Station
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            dispatch(postStation(selectedStation.code));
          }}
        >
          Add Station
        </button>
      )}
    </React.Fragment>
  );
}

export default HomeStationButtons;
