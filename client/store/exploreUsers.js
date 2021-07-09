import axios from 'axios';

const TOKEN = 'token';

// ACTION TYPES
const SET_CONNECTIONS = 'SET_CONNECTIONS';

//ACTION CREATOR
const setConnections = (connections) => ({
  type: SET_CONNECTIONS,
  connections,
});

//THUNK CREATOR
export const fetchConnections = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.get('/api/connections', {
          headers: {
            authorization: token,
          },
        });
        dispatch(setConnections(data));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const createMatch = (requesteeId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        await axios.post(`/api/matches/${requesteeId}`, null, {
          headers: {
            authorization: token,
          },
        });
        dispatch(fetchConnections());
      } catch (err) {
        console.log(err);
      }
    }
  };
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_CONNECTIONS:
      return action.connections;
    default:
      return state;
  }
}
