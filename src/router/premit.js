import router from './index.js';
import { getToken,removeToken,removeUserName } from '@/utils/app.js';
import store from '../store/index'

const whiteRouter = ['/login']  // indexOf 判断数组中是否存在指定的某个对象 不存在返回-1

// 路由守卫
router.beforeEach((to,from,next)=>{
    if(getToken()){
        // 用户登录成功进入index 页面 再URL上输入 login 页面进入 登录页时  在输入index 不让它进入 index页面
        if(to.path === '/login'){
            // 删除cookie
            removeToken()
            removeUserName()
            // 删除store中的存储
            store.commit('app/setToken','')
            store.commit('app/setUsername','')
            next();
        }else{
             //获取用户角色 
             // 动态分配路由权限
             // 什么时候处理动态路由  以什么条件处理
             if(store.getters['app/roles'].length === 0 ){
                store.dispatch('permission/getRoles').then(res=>{
                    //console.log('44444444',res)  // 用户角色 ['sale', 'technician', 'manager']  系统角色['infoSystem', 'userSystem']
                    let role = res;
                    let button = res.button;
                    let btnPerm = res.btnPerm
                    store.commit('app/setRoles',role)
                    store.commit('app/setButton',btnPerm)  // 增加按钮的权限
                    store.dispatch('permission/createRouter',role).then(res2=>{
                        let addRouters = store.getters['permission/addRouters'];
                        let allRouters = store.getters['permission/allRouters'];
                        // 路由更新
                        router.options.routes = allRouters
                        // 添加动态路由
                        router.addRoutes(addRouters)
                        next({...to,replace:true})
                        // ...to 内容发生变化 ...to  不会发生变化用 传统的方式  replace:true 不留下历史记录
                    })
                })
             }else{
                next();
             }
        }
    }else{
       if(whiteRouter.indexOf(to.path) !== -1){  // 存在
            next()
       }else{
           next('/login')
       }
    }
    //next() // 什么参数都没有 默认走 to 的路径 如果URL 上输入的路径 就是 to 的路径 会陷入死循环
    // 1 直接进入index 的时候  参数to 被改变成 /index 触发路由指向 跑 beforeEach
    // 2 再一次next 指向login 再次发生路由指向 再跑 beforeEach 参数to被改变了 /login 
    // 3 白名单判断存在 直接执行 next() 因为next() 没有参数 所以不会再次执行 beforeEach
  })