import axios from 'axios';

const TOKEN = 'token';

// ACTION TYPES
const SET_STATIONS = 'SET_STATIONS';

//ACTION CREATOR
const setStations = (stations) => ({ type: SET_STATIONS, stations });

//THUNK CREATOR

//REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case SET_STATIONS:
      return action.stations;
    default:
      return state;
  }
}
