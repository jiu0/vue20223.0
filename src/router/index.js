import Vue from "vue";
//import Vue from 'vue/dist/vue.esm.js'
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/Login/index.vue';
//import Layout from '@/views/Layout/index.vue';
import Layout from '@/views/Layout';


//导航重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {undefined
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

// 系统分配  角色分配 

// 默认路由  动态路由

// 默认路由
export const defaultRouterMap = [
      {
        path:'/',
        redirect:'/login',
        hidden:true,   // 隐藏菜单
        meta:{
          name:'主页'
        }
      },
      {
        path:'/login',
        name:'Login',
        hidden:true,
        meta:{
          name:'登录'
        },
        component:Login
      },
      // {
      //   path:'/console',
      //   name:'Console',
      //   component: () => import("../views/Console/index.vue")
      // },
      // 控制台
      {
        path:'/console',
        name:'Console',
        component: Layout,
        redirect:'index',  // 重定向到 children下的index 页面
        meta:{
          name:'控制台',
          icon:'el-icon-s-help'
        },
        children:[
          {
            path:'/index',
            name:'Index',
            meta:{
              name:'首页'
            },
            component: () => import("../views/Console/index.vue")
          }
        ]
      },
      // 404 页面
      {
        path:'/page404',
        component: Layout,
        meta:{
          name:'404',
          icon:'404'
        },
        hidden:true,
        children:[
          {
            path:'/404',
            meta:{
              name:'404'
            },
            component: () => import("../views/404.vue")
          }
        ]
      },    
]

export default new VueRouter({
  //history: routerHistory,//history写法不同
  routes: defaultRouterMap
});


// 动态路由
export const asyncRouterMap = [
  // 信息管理
  {
    path:'/info',
    name:'Info',
    component: Layout,
    meta:{
      roles:['sale'],
      system:'infoSystem',  //['infoSystem', 'userSystem'] 根据系统分配菜单  是根据登录的账号不同进行账号的分配 
      name:'信息管理',
      icon:'el-icon-help'
    },
    children:[
      {
        path:'/infoIndex',
        name:'InfoIndex',
        meta:{
          keepAlive:true,  // 组件缓存  切换路由时 缓存的路由 再返回时 不再请求接口 相当于数据全部存在浏览器缓存里一样
          roles:['sale','technician'],  // roles  中的值 只要有 ['sale','technician','manager']  里任何一个值 就会显示菜单
          name:'信息列表'
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path:'/infoCate',
        name:'InfoCate',
        meta:{
          roles:['sale'],   // 根据用户角色配置菜单 roles  中的值 只要有 ['sale','technician','manager']  里任何一个值 就会显示菜单
          name:'信息分类'
        },
        component: () => import("../views/Info/cate.vue")
      },
      {
        //path:'/infoDetailed/:newsId/:newsTitle',    // newsId  newsTitle 是传递参数的参数名  只能用 params 接收 不能用query
        path:'/infoDetailed',
        name:'InfoDetailed',
        hidden:true,
        meta:{
          keepAlive:true,
          roles:['sale',],   // ['sale','technician','manager']
          name:'信息详情'
        },
        component: () => import("../views/Info/detailed.vue")
      },

    ]
  },
  // 用户管理
  {
    path:'/user',
    name:'User',
    component: Layout,
    meta:{
      roles:['sale'],
      system:'userSystem',  // 自定义 key
      name:'用户管理',
      icon:'el-icon-remove-outline'
    },
    children:[
      {
        path:'/userIndex',
        name:'UserIndex',
        meta:{
          roles:['sale','technician'],
          name:'用户列表'
        },
        component: () => import("../views/User/index.vue")
      },
    ]
  },
  {            // {  path:'*',redirect:'/404',hidden:true,}放到路由的最后面 
    path:'*',
    redirect:'/404',
    hidden:true,
  },
]


