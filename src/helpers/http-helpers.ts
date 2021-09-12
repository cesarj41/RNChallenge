import axios, {AxiosRequestConfig} from 'axios';

type Params = {
  config?: AxiosRequestConfig;
  onRequestIntercepted?: () => Record<string, string>;
  onResponseIntercepted?: (status: number) => void;
  onNetworkErrorIntercepted?: () => void;
};
export const createHttpClient = (params?: Params) => {
  const instance = axios.create(params?.config);
  if (params?.onRequestIntercepted) {
    instance.interceptors.request.use(
      config => {
        if (!params?.onRequestIntercepted) {
          return config;
        }
        config.headers = {
          ...config.headers,
          ...params.onRequestIntercepted(),
        };
        return config;
      },
      error => {
        console.warn(error);
        return Promise.reject(error);
      },
    );
  }

  if (params?.onResponseIntercepted || params?.onNetworkErrorIntercepted) {
    instance.interceptors.response.use(
      function (response) {
        if (params?.onResponseIntercepted) {
          params.onResponseIntercepted(response.status);
        }
        return response;
      },
      function (error) {
        console.warn(error);
        if (params?.onResponseIntercepted && error.response) {
          params.onResponseIntercepted(error.response.status);
        } else if (
          params?.onNetworkErrorIntercepted &&
          error.toString()?.toLowerCase().includes('network')
        ) {
          params.onNetworkErrorIntercepted();
        }
        return Promise.reject(error);
      },
    );
  }

  return instance;
};
