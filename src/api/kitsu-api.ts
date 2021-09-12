import {createHttpClient} from '../helpers/http-helpers';
import {openNotification} from '../providers/SliderProvider';
const api = createHttpClient({
  config: {
    baseURL: 'https://kitsu.io/api/edge',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  },
  onResponseIntercepted: status => {
    if (status >= 500) {
      openNotification('server-error');
      return;
    }
  },
});

export default api;
