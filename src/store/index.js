import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./UserSlice"

const persistConfig = {
  key: "persist-root",
  storage
};

const rootReducer = combineReducers({ user: userReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer
});

export let persistor = persistStore(store);

export default store;