import axios from 'axios';
import config from '../config';

function baseUrl() {
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `http://${config.apiHost}:${config.apiPort}`;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/';
}
axios.defaults.baseURL = baseUrl();

export default axios;
