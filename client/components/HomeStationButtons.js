import React from 'react';
import { useDispatch } from 'react-redux';
import { postStation, deleteStation } from '../store/stations';
import { homeStationsCheck } from '../utils/homeStationsCheck';

function HomeStationButtons({ selectedStation, homeStations }) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      {homeStationsCheck(homeStations, selectedStation) ? (
        <button
          type='button'
          onClick={() => {
            dispatch(deleteStation(selectedStation.properties['stop_id']));
          }}
        >
          Remove Station
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            dispatch(postStation(selectedStation.properties['stop_id']));
          }}
        >
          Add Station
        </button>
      )}
    </React.Fragment>
  );
}

export default HomeStationButtons;
