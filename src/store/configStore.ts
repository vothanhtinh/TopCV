import { Store, configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

export const store: Store = configureStore({
  reducer: {
    userSlice: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
