
import { combineReducers } from 'redux';

const initialState = {
  components: [], 
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
});

export default rootReducer;
