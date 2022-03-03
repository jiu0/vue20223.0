import axios from 'axios'
import { Message } from 'element-ui';
import { getToken,getUserName } from '@/utils/app.js';
// http://localhost:8080/devApi/api/main/getCode 
//const BASEURL = process.env.NODE_ENV === 'production' ? 'aaa': '/devApi';  // vue.config.js 里面设置跨域的值 和这里的值要一样
//const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ABC: process.env.VUE_APP_ABC;
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ABC: process.env.VUE_APP_ABC;
const service = axios.create({
  baseURL: BASEURL,  // baseURL值  直接 接在 8080 后面
  timeout: 10000
});

// VUE_APP_AAA  前缀必须是VUE_APP_  开头 而且必须是大写
//console.log('env',process.env)  // {NODE_ENV: 'development', VUE_APP_ABC: '/devApi', BASE_URL: '/'}
//console.log('VUE_APP_ABC',process.env.VUE_APP_ABC)  // /devApi

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 后台需要前端这边传相应的参数 (在请求头添加参数)

    // 在请求头里添加的参数
    // config.headers.Tokey = getToken();
    // config.headers['userId'] = '2222';
    // config.headers['username'] = getUserName();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    let data = response.data;
    let url = 'https://www.rufeike.top';
    if(data.resCode !== 200 && url !=='https://www.rufeike.top'){
        Message.error(data.message);
        return Promise.reject(data);
    }else{
      // 对响应结果进行处理
      return response;
    }
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