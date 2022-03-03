import { GetSystemRole,GetUserRole } from '@/api/login'
import { defaultRouterMap,asyncRouterMap } from '@/router/index'

function hasPremission(roles,router){
   //console.log('roles9999',roles)  // 用户角色 ['sale', 'technician', 'manager']
   //console.log('router9999999999',router) // ['sale']
   // indexOF 对大小写敏感  let str = 'aaa Abc' str.indexOf('aaa')  // 0 str.indexOf('abc')  -1  str.indexOf('Abc')  4 
   if(router.meta && router.meta.roles){
       return roles.some(item=> router.meta.roles.indexOf(item) >= 0)
   }
}
const state = {
    allRouters:defaultRouterMap,
    addRouters:[]
 }
 
 const mutations = { 
     setRouter(state,router){
        state.addRouters = router 
        state.allRouters = defaultRouterMap.concat(router)
     }
 }
 
 const actions = {  
    // 获取系统角色 通过系统分配路由 (账号)
   //  getRoles({commit},){
   //      return new Promise((resolve,reject)=>{
   //          GetSystemRole().then(res=>{
   //              let role = res.data.data.data;
   //              //console.log('000000',role)
   //              resolve(role)
   //          }).catch(err=>{
   //              reject(err)
   //          })
   //        })
   //   },
     // 通过用户 分配路由 
    getRoles({commit},){
            return new Promise((resolve,reject)=>{
                GetUserRole().then(res=>{
                    let role = res.data.data.data;
                    resolve(role)
                }).catch(err=>{
                    reject(err)
                })
              })
         },
    // 创建动态路由
    createRouter({commit},redData){
        return new Promise((resolve,reject)=>{
             // ['infoSystem', 'userSystem']
             let role = redData.data;
             let addRouters = []
             //console.log('666666',role)
             // 超管状态
             if(role.includes('admin')){
                addRouters = asyncRouterMap
             }else{
                addRouters = asyncRouterMap.filter(item=>{
                    // 用户角色
                    if(hasPremission(role,item)){
                        // 优先判断
                        if(item.children && item.children.length > 0){
                           item.children = item.children.filter(child=>{
                               if(hasPremission(role,child)){
                                  return child;
                               }
                           })
                           return item;
                        }
                        return item;
                     }
                    // 系统角色这样处理
                    // if(data.includes(item.meta.system)){
                    //     return item;
                    // }
                 })
                 addRouters.push(asyncRouterMap[asyncRouterMap.length-1]) 
             }
             //console.log('defaultRouterMap',defaultRouterMap)
             //console.log('asyncRouterMap',asyncRouterMap)
             // 更新路由
             commit('setRouter',addRouters)
             resolve();
        })
     }
 }
 const getters = {  
    allRouters:state=>state.allRouters,  // 所有的路由
    addRouters:state=>state.addRouters,  // 匹配的路由
 }
 
 
 
 export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
 }