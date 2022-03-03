import {reactive } from '@vue/composition-api'
import { requestUrl } from '@/api/requestUrl.js';  //  requestUrl 这个名字不能改
import { loadTableData } from '@/api/common'
export function tableLoad(){
   const loadTabData = reactive({
       item:[],
       total:0,
   })
   const tableLoadData = (params)=>{
    let requestJson = params;
    let resUrl = requestJson.url;
    let requestUserData = {
          url:requestUrl[resUrl],
          method:requestJson.method,
          data:requestJson.data,
      }
      loadTableData(requestUserData).then(res=>{
         let responseData = res.data.data.data;
         // 如果没有数据也返回一个 空数组 
         // loadTabData.item = responseData
         // loadTabData.total = responseData.length===0 ? 0 : res.data.data.total ;
         // 后台返回数据时,并不是返回一个数组 有时返回一个null 
         if(responseData && responseData.length > 0){
            loadTabData.item = responseData
            loadTabData.total = res.data.data.total;
         }
      }).catch(err=>{

      })
   }
   return {
      loadTabData,
      tableLoadData,
   }
}