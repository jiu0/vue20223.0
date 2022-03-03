import { Login,Logout } from '@/api/login'
import { setToken,setUserName,getUserName,removeToken,removeUserName }  from "@/utils/app"
const state = {
    //isCollapse:JSON.parse(Cookie.get('isCollapse')) || false,
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    //isCollapse:JSON.parse(localStorage.getItem('isCollapse')) || false,
    count:10,
    to_ken:'',
    username: getUserName() || '',
    // 用户角色
    roles:[],
    // 按钮权限
    buttonPermission:[],
}

const mutations = {  // 没有回调
    setCollapse(state){
      console.log('app')
      state.isCollapse = !state.isCollapse
      //h5 本地储存
      //Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
      //localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    setCount(state,value){
      state.count = value;
      //console.log('state',state.count) 90
    },
    setToken(state,value){
      state.to_ken = value;
   },
    setUsername(state,value){
      state.username = value;
   },
   setRoles(state,value){
     state.roles = value
   },
   setButton(state,value){
    state.buttonPermission = value
  },
}

const actions = {  // 可以回调
   // 处理同步的事
   setMenuStatus(content,data){
    // content.state   content.getters content.commit content.rootGetters 
    //console.log('data',data)
    content.commit('setCollapse')
    //异步 接口a  接口b 需要接口a的参数
    },
    // 处理异步的事
    login(content,requestData){
      return new Promise((resolve,reject)=>{
          Login(requestData).then(res=>{
              let data = res.data.data;
              content.commit('setToken',data.token)
              content.commit('setUsername',data.username)
              setToken(data.token);
              setUserName(data.username);
              resolve(res)
          }).catch(err=>{
              reject(err)
          })
        })
    },
    // 退出登录
    logout({commit}){
      return new Promise((resolve,reject)=>{
          Logout().then(res=>{
            const data = res.data.data;
            removeToken();
            removeUserName();
            commit('setToken','')
            commit('setUsername','')
            commit('setRoles',[])
            resolve(data);
          })
      })
    }
}

const getters = {
    count:state => state.count + 10,
    // 处理头部 用户信息
    username:state => state.username,
    roles:state => state.roles,
    buttonPermission:state => state.buttonPermission,
}

export default {
    namespaced:true,  // 启用命名空间模式  就是app.js 和login.js 里面有相同名字的方法时 区分开来是调用了那个文件里的方法
    state,
    mutations,
    actions,
    getters
};