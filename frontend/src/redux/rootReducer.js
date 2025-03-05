import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardslice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist specific reducers (e.g., "auth")
};


const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  
});

export default persistReducer(persistConfig, rootReducer);
