import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import productsReducer from "./slices/productsSlice";
import basketReducer from "./slices/basketSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  basket: basketReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["basket"], // Persist only the basket
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions with non-serializable values
        ignoredActions: ["some/actionType"],
        ignoredActionPaths: ["meta.arg"],
        ignoredPaths: ["items.dates"],
      },
    }),
});

export const persistor = persistStore(store);
