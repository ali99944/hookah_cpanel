import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from './auth_reducer'
import SettingsReducer from './settings_reducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  settings: SettingsReducer
});

export default rootReducer