import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import env from '@app/constants/env.constants';
import rootReducer, { RootState } from '@app/redux/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
