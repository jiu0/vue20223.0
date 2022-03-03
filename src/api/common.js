
import { reactive } from '@vue/composition-api';
import {GetCategery,GetCategeryAll } from '@/api/new.js';
import service from '@/utils/request.js'
export function common(){
    // 获取一级分类
    const categoryInfo = reactive({
        item:[]
    })
    const getInfoCategory = (params) =>{
        GetCategery(params).then(res=>{
           categoryInfo.item =res.data.data
        }).catch(err=>{

        })
    }
    // 获取全部分类
    const getInfoCategoryAll = (params) =>{
        GetCategeryAll(params).then(res=>{
           categoryInfo.item =res.data.data
        }).catch(err=>{

        })
    }

    return {
        getInfoCategory,
        getInfoCategoryAll,
        categoryInfo
    }
}

/*
{
 Ak:七牛云的密钥ak
 SK:七牛云的密钥ak''
 buckety:七牛云储存空间的名字
}
*/

// 获取七牛云 token
export function QiniuToken(data){
    return service.request({
        method: 'post',
        url: '/uploadimgToken',
        data: data
      });
}


// 获取用户页面的表格数据
export function loadTableData(params){
    return service.request({
        method: params.method || 'post',
        url: params.url,
        data: params.data || {}
      });
}

/*
export function loadTableData(data){
    return service.request({
        method: 'post',
        url: "/user/getList",
        data
      });
}
*/


// 获取用户页面新增里的 省市区
export function GetCityPicker(data){
    return service.request({
        method: 'post',
        url: '/cityPicker',
        data:data
      });
}