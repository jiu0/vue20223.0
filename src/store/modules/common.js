import{  GetCategery, } from '@/api/new.js';
// 储存七牛云的图片地址
const state ={
   qiniuUrl:'http://r7ndx2ysi.hn-bkt.clouddn.com/',
   name:{ userId:'4444'}
}
const getters ={
    qiniuUrl:state=>state.qiniuUrl,
}
const actions = {
    getInfoCategory(content,requestData){
        //console.log('requestData',requestData)
        return new Promise((resolve,reject)=>{
            GetCategery(requestData).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
          })
        }
}

const mutations = {
   VuexName(state,value){
      state.name= value
   }
}

export default{
   namespaced:true,
   actions,
   state,
   getters,
   mutations,
}