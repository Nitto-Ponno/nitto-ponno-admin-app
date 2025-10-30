import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import localforage from 'localforage';
import { baseApi } from './api/baseApi';

// reducers

import authReducer from './features/auth/authReducer';

// reducers
const getStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localforage.config({
        driver: localforage.INDEXEDDB,
        name: 'nitto-ponno-client',
      });
      return localforage;
    } catch (error) {
      console.warn(
        'IndexedDB is not available. Falling back to local storage.',
      );
      return createWebStorage('local'); // Returns an object matching redux-persist's storage API
    }
  }
  return createWebStorage('local'); // SSR fallback
};

const storage = getStorage();

// Persist configuration for auth reducer
const authPersistConfig = {
  key: 'auth',
  storage, // Use the appropriate storage
};

// Persisted auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Combine reducers
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuthReducer,
};

// Middleware configuration
export const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        'chat/addOnlineUser',
      ],
      ignoredActionPaths: [
        'meta.arg',
        'payload.timestamp',
        'calendar.currentDate',
        'baseApi.queries.getMyEvents.originalArgs',
      ],
      // Ignore these paths in the state
      ignoredPaths: ['calendar.currentDate'],
    },
  }).concat(baseApi.middleware);
