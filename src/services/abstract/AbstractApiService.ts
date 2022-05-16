import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiStatusCodes, SLASH } from '@app/constants/api.constants';
import authInfo from '@app/services/auth.service';
import { objKeyToCamelCase, objKeyToSnakeCase, setQuery } from '@app/utils/transforms/index.utils';

export default class AbstractApiService {
  private anonymousEndpoints: string[];
  public api: AxiosInstance;
  public apiHost: string;
  public version: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fetch: <T>(endpoint: string, payload: T) => Promise<AxiosResponse<any, any>>;

  constructor(apiHost: string, version: string, ignoreAuthEndpoints?: string[]) {
    this.apiHost = apiHost;
    this.version = version;

    /**
     * All the endpoint that do not require an access token
     */
    this.anonymousEndpoints = ignoreAuthEndpoints ? ignoreAuthEndpoints : [];

    this.api = this.init();
    this.fetch = <T>(endpoint: string, payload: T) => this.api.get(`${endpoint}?${setQuery(payload)}`);
  }

  private init = () => {
    /** Setup an API instance */
    const api = axios.create({
      baseURL: [this.apiHost, this.version].join(SLASH),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    api.interceptors.request.use(this.authInterceptor);
    api.interceptors.response.use(this.responseInterceptor, this.errorInterceptor);

    return api;
  };

  /**
   * Adds authorization headers to API calls
   * @param {AxiosRequestConfig} request
   */
  private authInterceptor = async (request: AxiosRequestConfig) => {
    request.params = objKeyToSnakeCase(request.params);
    request.data = objKeyToSnakeCase(request.data);

    const isAnonymous = this.anonymousEndpoints.some(endpoint => request.url?.startsWith(endpoint));

    if (!authInfo.user && !isAnonymous) {
      console.log('[Axios]', 'fail with unauthorized url');
      return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
    }

    if (authInfo.user && request.headers) {
      const accessToken = authInfo.user?.accessToken;
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    }

    return request;
  };

  private responseInterceptor = (response: AxiosResponse) => {
    response.data = objKeyToCamelCase(response.data);
    console.groupCollapsed('[Axios]', `${response.status} ${response.statusText}`);
    console.log('Response', response.data);
    console.groupEnd();
    return response;
  };

  /**
   * Axios error interceptor
   * @param {AxiosError} axiosError
   * @return {Promise<AxiosError>}
   */
  private errorInterceptor = (axiosError: AxiosError) => {
    if (axiosError?.response) {
      const statusCode = axiosError.response.status;
      if (statusCode >= ApiStatusCodes.INTERNAL_ERROR) {
        alert('時間を置いてリトライお願いします。');
      }
    }
    return Promise.reject(axiosError);
  };
}
