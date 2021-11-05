import { SET_REPORTID_STATE } from '../actions/updatedReportIdAction';

const initialState = {
  reportStatus: {
    reportIdValState: 1,
    currentReportIdName: '',
    currentReportParentId: 1,
  },
};

const reportIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTID_STATE:
      return {
        ...state,
        reportStatus: action.payload,
      };
    default:
      return state;
  }
};

export default reportIdReducer;
