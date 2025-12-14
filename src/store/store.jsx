import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api, liveSupportApi } from "./features/baseQuery";
import { jobForm } from "./slices/jobform";
import settings from "./slices/settings";
import user from "./slices/user";

// Configuration for persisting the settings slice
const settingsPersistConfig = {
  key: "settings",
  storage,
  whitelist: ["theme"],
};

// Create a persisted reducer for the settings slice
const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settings
);

export const store = configureStore({
  reducer: {
    settings: persistedSettingsReducer,
    user,
    jobForm: jobForm.reducer,
    [api.reducerPath]: api.reducer,
    [liveSupportApi.reducerPath]: liveSupportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware, liveSupportApi.middleware),
});

setupListeners(store.dispatch);

// Export the persistor
export const persistor = persistStore(store);
