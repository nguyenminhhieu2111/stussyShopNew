import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from './userRedux'
import productReducer from './productRedux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mailRedux from "./mailRedux";
import orderRedux from "./orderRedux";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const rootReducer = combineReducers({ user: userReducer,product: productReducer,mail:mailRedux,order:orderRedux}); 
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store= configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export let persistor = persistStore(store);