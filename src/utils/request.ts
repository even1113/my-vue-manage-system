import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios'

const service: AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:8888',
  // baseURL: 'http://8.130.90.51:8888',
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response
    } else {
      Promise.reject()
    }
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

export default service
