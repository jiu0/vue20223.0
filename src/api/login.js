import service from '@/utils/request.js'

//获取验证码的接口
// export function GetSms(data){
//     return service.request({
//         method: 'post',
//         url: '/getSms',
//         data: data
//       });
// }
export function GetCode (data) {
    return service.request({
      method: 'post',
      url: '/api/main/getCode',
      data: data
    });
  }

// 获取系统角色
export function GetSystemRole (data={}) {
  return service.request({
    method: 'post',
    url: '/systemRole',
    data: data
  });
}

// 获取用户角色
export function GetUserRole (data={}) {
  return service.request({
    method: 'post',
    url: '/userRole',
    data: data
  });
}


// 登录
export function Login (data) {
    return service.request({
      method: 'post',
      url: '/api/main/login',
      data: data
    });
  }


// 退出登录
export function Logout (data={}) {
  return service.request({
    method: 'post',
    url: '/logout',
    data: data
  });
}


//注册
export function Register (data) {
    return service.request({
      method: 'post',
      url: '/api/main/register',
      data: data
    });
  }
