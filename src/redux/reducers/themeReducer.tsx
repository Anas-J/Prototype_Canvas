import { SET_THEME_STATE } from '../actions/themeAction';

const initialState = {
  themeState: 'dark',
};

const themeStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME_STATE:
      return {
        ...state,
        themeState: action.payload,
      };
    default:
      return state;
  }
};

export default themeStateReducer;
