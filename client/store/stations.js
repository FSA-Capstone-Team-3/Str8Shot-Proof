import axios from 'axios';

const TOKEN = 'token';

// ACTION TYPES
const SET_STATIONS = 'SET_STATIONS';
const ADD_STATION = 'ADD_STATION';

//ACTION CREATOR
const setStations = (stations) => ({ type: SET_STATIONS, stations });

//THUNK CREATOR

export const fetchStations = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/stations');
      dispatch(setStations(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const postStation = (stationCode) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/stations/${stationCode}`);
      dispatch(fetchStations());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteStation = (stationCode) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/stations/${stationCode}`);
      dispatch(fetchStations());
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case SET_STATIONS:
      return action.stations;
    case ADD_STATION:
      return [...state, action.station];
    default:
      return state;
  }
}
