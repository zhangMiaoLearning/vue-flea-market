import axios from 'axios'
import { log } from 'console'
// 创建axios实例
export const request = axios.create({
  timeout: 80000, // 请求超时时间(毫秒)
  withCredentials: true, // 异步请求携带cookie
  headers: {
    //设置后端需要的传参类型
    // 'Content-Type': 'text/plain',
    // 'Access-Control-Allow-Origin' : '*',
    //'token': x-auth-token',//一开始就要token
    //'X-Requested-With': 'XMLHttpRequest',
  }
})

// request拦截器
request.interceptors.request.use(
  (config) => {
    // 如果你要去localStor获取token,(如果你有)
     let token = sessionStorage.getItem("auth-token");
     if (token) {
    //添加请求头
    config.headers["Authorization"]="Bearer "+ token
     }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// response 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // console.log(response)
    return response
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 添加 GET 请求
// export const $get = (url: string, params: any) => {
//   return new Promise((resolve, reject) => {
//     request
//       .get(url, {
//         params: params
//       })
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err.data)
//       })
//   })
// }
// // 添加 POST 请求
// export const $post = (url: string, params: any) => {
//   return new Promise((resolve, reject) => {
//     request
//       .post(url, params)
//       .then((res) => {
//         resolve(res)
//       })
//       .catch((err) => {
//         reject(err.data)
//       })
//   })
// }
