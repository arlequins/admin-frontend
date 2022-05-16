import ENV from '@app/constants/env.constants';
import AbstractApiService from '@app/services/abstract/AbstractApiService';
import { ApiVersionEnum, EndpointsEnum } from '@typings/app/api/index.types';

class ApiService extends AbstractApiService {
  constructor(version: ApiVersionEnum, ignoreAuthEndpoints: EndpointsEnum[]) {
    super(ENV.API_HOST, version, ignoreAuthEndpoints);
  }
}

export const apiV1 = new ApiService(ApiVersionEnum.V1, [EndpointsEnum.LOGIN]);
