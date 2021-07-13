import axios from 'axios';
const yelpKey = process.env.YELP_API_KEY;
let config = {
  headers: {
    Authorization: `Bearer ${yelpKey}`
  }
};
//ACTION TYPES
const SET_LOCATIONS = 'SET_LOCATIONS';

//ACTION CREATOR
const setLocations = (locations) => ({ type: SET_LOCATIONS, locations });

//THUNK CREATOR
export const fetchLocations = (latitude, longitude) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        // `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}radius=1609`,
        // `https://localhost:8080/https://api.yelp.com/v3/businesses/search`,
        `https://api.yelp.com/v3/businesses/search`,

        {
          headers: {
            Authorization:
              'Bearer 3VZ7oZP5SzHkoleOVtSAwlFM-wPPynAcOReWrDHcX2wn3opaJdJbBnwKS4gk5Qvc37B6DZTYlFDNfOp8dV9AX-PpPPWKwLph5rwSV0fYrqHPF1UKlWshuzEl8UbrYHYx'
          },
          params: {
            latitude: latitude,
            longitude: longitude,
            radius: 1609
          }
        }
      );
      console.log('data = ', data);
      dispatch(setLocations(data));
    } catch (err) {
      console.log(err);
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
