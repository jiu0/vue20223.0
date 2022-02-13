import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/Login/index.vue';
const router = new VueRouter({
  //history: routerHistory,//history写法不同
  routes: [
      {
        path:'/',
        redirect:'login'
      },
      {
        path:'/login',
        name:'login',
        component:Login
      },
  ],
});

export default router;