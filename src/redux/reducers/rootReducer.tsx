import { combineReducers } from 'redux';
import reportIdReducer from './reportIdReducer';
import themeReducer from './themeReducer';
import toggleStateReducer from './toggleReducer';
import playReducer from './playReducer';
import activeReducer from './activeReducer';

const rootReducer = combineReducers({
  theme_state: themeReducer,
  toggle_state: toggleStateReducer,
  reportId_state: reportIdReducer,
  play_state: playReducer,
  active_state: activeReducer,
});

export default rootReducer;
