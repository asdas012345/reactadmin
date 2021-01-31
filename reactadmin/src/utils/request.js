import axios from 'axios'
const isDev=process.env.NODE_ENV === 'development'
const request=axios.create({
// 因为当前react项目的端口号为3000，修改后端的端口号为3001
  // 线上的端口无需修改
    baseURL: isDev ? 'http://localhost:3001/admin':'http://175.24.113.36:3000/admin'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 --- 统一给所有的请求都加loading的效果， 头信息传递token
    // config.common.headers['token'] = localStorage.getItem('token') // 所有的请求 都会将本地的token值传递到服务器
    config.headers.common.token = sessionStorage.getItem('token') // 所有的请求 都会将本地的token值传递到服务器
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  // 响应拦截器
export default request