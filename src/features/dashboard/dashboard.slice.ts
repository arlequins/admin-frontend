import { createSlice } from '@reduxjs/toolkit';

import { getDashboardList } from '@app/api/v1/index.api';
import { createApiAsyncThunk } from '@app/redux/api.thunk';
import { AuthThunkEnum, SliceEnum, StatusEnum } from '@app/types/custom/stores.types';
import { GetDashboardListParams, GetDashboardListResponse, GetDashboardListResponseList } from '@app/types/typings/app/api/index.types';

export interface DashboardState {
  list: GetDashboardListResponseList[];
  status: StatusEnum;
}

const initialState: DashboardState = {
  list: [],
  status: StatusEnum.IDLE,
};

export const fetchDashboardListAsync = createApiAsyncThunk<GetDashboardListResponse, GetDashboardListParams>(AuthThunkEnum.DASHBOARD_LIST, getDashboardList);

export const dashboardSlice = createSlice({
  name: SliceEnum.DASHBOARD,
  initialState,
  reducers: {
    resetDashboard: state => {
      state.list = [];
      state.status = StatusEnum.INIT;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardListAsync.pending, state => {
        state.status = StatusEnum.LOADING;
      })
      .addCase(fetchDashboardListAsync.fulfilled, (state, action) => {
        state.list = action.payload.list;
        state.status = StatusEnum.IDLE;
      })
      .addCase(fetchDashboardListAsync.rejected, state => {
        state.status = StatusEnum.FAILED;
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
