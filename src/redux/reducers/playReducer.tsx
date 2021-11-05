import { SET_PLAY_STATE } from '../actions/togglePlayAction';

const initialState = {
  playStatus: false,
};

const playReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAY_STATE:
      return {
        ...state,
        playStatus: action.payload,
      };
    default:
      return state;
  }
};

export default playReducer;
