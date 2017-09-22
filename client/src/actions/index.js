import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  // when action creator return a function, THUNK will use dispatch to return
  // result of function(async)
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
