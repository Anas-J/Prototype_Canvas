import { SET_ACTIVE_STATE } from '../actions/toggleActive';

const initialState = {
  activeStatus: false,
};

const activeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_STATE:
      return {
        ...state,
        activeStatus: action.payload,
      };
    default:
      return state;
  }
};

export default activeReducer;
