const initialState = {
  data: {
    companyName: 'test name'
  }
}

export default function loadSettings({ method }) {
  console.info(method)
  if (method === 'GET') {
    return Promise.resolve(initialState)
  }
  return Promise.reject()
}
