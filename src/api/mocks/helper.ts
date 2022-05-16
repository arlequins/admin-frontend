// eslint-disable-next-line import/no-extraneous-dependencies
import { AsyncResponseResolverReturnType, DefaultRequestBody, MockedResponse, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw';

import { SLASH } from '@app/constants/api.constants';
import { EndpointsEnum } from '@app/types/typings/app/api/index.types';

const checkAccessToken = (token?: string[]) => {
  if (!token) {
    return false;
  }
  const accessToken = token[1];
  return accessToken === 'undefined';
};

export const wrapCheckAuth = (
  req: RestRequest<DefaultRequestBody, PathParams>,
  res: ResponseComposition<DefaultRequestBody>,
  ctx: RestContext,
  flow: (req: RestRequest<DefaultRequestBody, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => AsyncResponseResolverReturnType<MockedResponse<DefaultRequestBody>>
) => {
  const token = req.headers.get('Authorization')?.split(' ');
  if (checkAccessToken(token)) {
    return res(
      ctx.status(401),
      ctx.json({
        error: 'Invalid Access Token',
      })
    );
  }

  return flow(req, res, ctx);
};

export const concatEndpoint = (host: string, version: string, endpoint: EndpointsEnum) => {
  return [host, version, endpoint].join(SLASH);
};
