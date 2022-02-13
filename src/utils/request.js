import axios from 'axios'
import { Message } from 'element-ui';

const BASEURL = process.env.NODE_ENV === 'production' ? '': '/devApi';
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000
});

console.log('env',process.env)
console.log('VUE_APP_ABC',process.env.VUE_APP_ABC)

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 后台需要前端这边传相应的参数 (在请求头添加参数)

    // 在请求头里添加的参数
    config.headers.Tokey = '1111';
    config.headers['userId'] = '2222';
    config.headers['sui'] = '3333';
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    let data = response.data;
    if(data.resCode !== 200){
      Message.error(data.message);
      return Promise.reject(data);
    }else{
      // 对响应结果进行处理
      return response;
    }
    console.log('response',response)
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  // service.request({
  //   method: 'post',
  //   url: '/user/12345',
  //   data: {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   }
  // });
  export default service;

  // 使用  export default 导出时  import xx from '' 不用 {}
  // export  可以导出多个 import { }  from ''  用 {} 引入