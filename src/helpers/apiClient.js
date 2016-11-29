import axios from 'axios'

import config from '../config'

function baseUrl() {
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    // return `http://${config.apiRemoteServer}:${config.apiRemoteServerPort}`
    // axios.defaults.headers.cookie = 'PHPSESSID=nlqnci1dkk0kqbu3tspv9smod0'
    return `http://${config.host}:${config.port}`
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/'
}

axios.defaults.baseURL = baseUrl()
axios.defaults.auth = {
  username: 'dev.moygrafik.ru',
  password: 'JndO3jdZ'
}

export default axios
