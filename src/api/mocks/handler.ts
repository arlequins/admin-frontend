// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { concatEndpoint, wrapCheckAuth } from '@app/api/mocks/helper';
import ENV from '@app/constants/env.constants';
import { ApiVersionEnum, EndpointsEnum, GetDashboardListParams, GetDashboardListResponse, PostLoginParams, PostLoginResponse } from '@typings/app/api/index.types';
import { RoleEnum } from '@typings/app/index.types';

export const handlers = [
  rest.post(concatEndpoint(ENV.API_HOST, ApiVersionEnum.V1, EndpointsEnum.LOGIN), (req, res, ctx) => {
    const payload = req.body as PostLoginParams;
    const response = {
      username: payload.username,
      accessToken: 'accessToken',
      expiresIn: 10,
      idToken: 'idToken',
      refreshToken: 'refreshToken',
      scope: RoleEnum.SUPER_ADMIN,
      tokenType: 'tokenType',
    } as PostLoginResponse;

    return res(ctx.delay(1000), ctx.json(response), ctx.status(200));
  }),
  rest.get(concatEndpoint(ENV.API_HOST, ApiVersionEnum.V1, EndpointsEnum.DASHBOARD_LIST), (req, res, ctx) =>
    wrapCheckAuth(req, res, ctx, (req, res, ctx) => {
      const payload = req.body as GetDashboardListParams;
      console.log('# payload:', payload);
      const response = {
        list: [
          {
            id: 1,
            name: 'test1',
          },
          {
            id: 2,
            name: 'test2',
          },
        ],
      } as GetDashboardListResponse;

      return res(ctx.delay(1000), ctx.json(response), ctx.status(200));
    })
  ),
];
