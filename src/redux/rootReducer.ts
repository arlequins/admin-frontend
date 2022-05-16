import { combineReducers } from '@reduxjs/toolkit';

import dashboardReducer from '@app/features/dashboard/dashboard.slice';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
