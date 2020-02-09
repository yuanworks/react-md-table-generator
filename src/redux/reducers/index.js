import { combineReducers } from "redux";
import table from './TableReducer';
import settings from './SettingsReducer';

export default combineReducers({
  table,
  settings,
});
