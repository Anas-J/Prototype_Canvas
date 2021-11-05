import { SET_TOGGLE_STATE } from '../actions/toggleStateAction';

const initialState = {
  toggleState: false,
};

const toggleStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOGGLE_STATE:
      return {
        ...state,
        toggleState: action.payload,
      };
    default:
      return state;
  }
};

export default toggleStateReducer;
