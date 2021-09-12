import {createHttpClient} from '../helpers/http-helpers';
import {showServerErrorNotification} from '../providers/SliderProvider';
const api = createHttpClient({
  config: {
    baseURL: 'https://kitsu.io/api/edge',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  },
  onResponseIntercepted: status => {
    showServerErrorNotification();
    if (status >= 500) {
      return;
    }
  },
});

export default api;
