
const state = {
  //isCollapse:JSON.parse(Cookie.get('isCollapse')) || false,
  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  //isCollapse:JSON.parse(localStorage.getItem('isCollapse')) || false,
  count:10,
}

const mutations = {  // 没有回调
  setCollapse(state){
    console.log('login')
    state.isCollapse = !state.isCollapse
    //h5 本地储存
    //Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    //localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  },
  setCount(state,value){
      state.count = value;
      console.log('state',state.count)
  }
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
              resolve(res)
          }).catch(err=>{
              reject(err)
          })
        })
      }
}

const getters = {
  count:state => state.count + 10
}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
};