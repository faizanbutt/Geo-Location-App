import { combineReducers } from 'redux';

function placesReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_PLACE':
      return [...state, action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  places: placesReducer,
});

export default rootReducer;
