import service from '@/utils/request.js'


//获取角色
export function GetRole (data={}) {
    return service.request({
      method: 'post',
      url: '/role',
      data: data
    });
  }

//获取系统角色
export function GetSystem (data) {
  return service.request({
    method: 'post',
    url: '/system',
    data: data
  });
}


//新增用户弹框
export function UserAdd (data) {
    return service.request({
      method: 'post',
      url: '/user/add',
      data: data
    });
  }

//批量删除表格数据  单个删除
export function UserDel(data) {
    return service.request({
      method: 'post',
      url: '/user/delete',
      data: data
    });
  }


//是否激活 和禁用 
export function UserActives(data) {
  return service.request({
    method: 'post',
    url: '/user/actives',
    data: data
  });
}

//用户编辑
export function UserEdit(data) {
  return service.request({
    method: 'post',
    url: '/user/edit',
    data: data
  });
}


//获取按钮权限
export function GetPermButton(data) {
  return service.request({
    method: 'post',
    url: '/permButton',
    data: data
  });
}





