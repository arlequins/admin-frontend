import { AxiosResponse } from 'axios';

import { apiV1 } from '@app/services/api.service';
import { EndpointsEnum, GetDashboardListParams, GetDashboardListResponse, PostLoginParams, PostLoginResponse } from '@typings/app/api/index.types';
import { PostLoginResult } from '@typings/app/api/usecases.types';
import { PermissionEnum } from '@typings/app/index.types';

const { api, fetch } = apiV1;

export const postUserInfo = async (payload: PostLoginParams): Promise<PostLoginResult> => {
  const response: AxiosResponse<PostLoginResponse> = await api.post(EndpointsEnum.LOGIN, payload);

  return {
    ...response.data,
    roles: [response.data.scope],
    // temp for permissions
    permissions: [PermissionEnum.DASHBOARD],
  };
};

export const getDashboardList = async (payload?: GetDashboardListParams): Promise<GetDashboardListResponse> => {
  const response: AxiosResponse<GetDashboardListResponse> = await fetch(EndpointsEnum.DASHBOARD_LIST, payload);
  return response.data;
};
