import { FETCH_USER } from '../actions/types';

//when user first open app, we will return null to indicatte
//unknown login status
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
