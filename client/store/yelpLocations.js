import axios from 'axios';
// const yelpKey = process.env.YELP_API_KEY;
const TOKEN = 'token';
// let config = {
//   headers: {
//     Authorization: `Bearer ${yelpKey}`
//   }
// };
//ACTION TYPES
const SET_LOCATIONS = 'SET_LOCATIONS';

//ACTION CREATOR
const setLocations = (locations) => ({ type: SET_LOCATIONS, locations });

//THUNK CREATOR
export const fetchLocations = (latitude, longitude) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.get(
          `/api/activities?lat=${latitude}&long=${longitude}`,
          {
            headers: {
              authorization: token
            }
          }
        );
        dispatch(setLocations(data));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.locations;
    default:
      return state;
  }
}
