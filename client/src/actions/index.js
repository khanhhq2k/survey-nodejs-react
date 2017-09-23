import axios from 'axios';
import { FETCH_USER } from './types';

// when action creator return a function, THUNK will use dispatch to return
// result of function(async)
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
