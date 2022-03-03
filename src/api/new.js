import service from '@/utils/request.js'

// 测试所用
export function AddList (data) {
  return service.request({
    method: 'post',
    url: '/userInfo',
    data: data
  });
}

//获取表格列表数据
export function GetList (data) {
  return service.request({
    method: 'post',
    url: '/news/getList',
    data: data
  });
}


// 新增表格数据
export function AddInfo (data) {
    return service.request({
      method: 'get',
      url: '/news/add',
      data: data
    });
  }

// 删除表格数据
export function DeleteInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/deleteinfo',
    data: data
  });
}

// 编辑信息表格数据
export function EditInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo',
    data: data
  });
}



// 一级分类添加
export function AddFirstCategery (data) {
    return service.request({
      method: 'post',
      url: '/news/addFirstCategery',
      data: data
    });
  }

  // 子级分类添加
  export function AddChildrenCategery (data) {
    return service.request({
      method: 'post',
      url: '/news/addChildrenCategery',
      data: data
    });
  }

// 获取一级分类
export function GetCategery (data) {
    return service.request({
      method: 'post',
      url: '/news/getCategery',
      data: data
    });
}

// 获取全部分类(包含子级)
export function GetCategeryAll (data) {
  return service.request({
    method: 'post',
    url: '/news/getCategeryAll',
    data: data
  });
}


// 删除一级分类
export function DeleteCategery (data) {
    return service.request({
      method: 'post',
      url: '/news/deleteCategery',
      data: data
    })
}

// 修改一级分类
export function EditCategery (data) {
    return service.request({
      method: 'post',
      url: '/news/editCategery',
      data: data
    })
}
