"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";

const persistConfig = {
  key: "SaibMain",
  storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  // counter: counterReducer,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);
export { persistedReducer };

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
export const store = makeStore();
export const persitor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
