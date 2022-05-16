import dashboardReducer, { DashboardState, resetDashboard } from '@app/features/dashboard/dashboard.slice';
import { StatusEnum } from '@app/types/custom/stores.types';

const rawInitialState = {
  list: [],
  status: StatusEnum.IDLE,
};

describe('store - dashboard', () => {
  const initialState: DashboardState = rawInitialState;
  it('should handle initial state', () => {
    expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual(rawInitialState);
  });

  // it('should handle fetchDashboardListAsync', () => {
  //   const actual = dashboardReducer(initialState, fetchDashboardListAsync({}));
  //   expect(actual.status).toEqual(StatusEnum.IDLE);
  // });

  it('should handle userSignOut', () => {
    const actual = dashboardReducer(initialState, resetDashboard());
    expect(actual.status).toEqual(StatusEnum.INIT);
  });
});
