import { boot } from 'quasar/wrappers'
import axios from 'axios'
// inicializador de axios
// tambien se puede usar fetch de forma nativa que es lo mas actual
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
