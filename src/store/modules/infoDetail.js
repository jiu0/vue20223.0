const state = {
   // 已经储存了值 不刷新页面的时候 一直存在 vuex 刷新页面 就会取 sessionStorage里面的值 赋值给变量
   id:'' || sessionStorage.getItem('infoId'),
   title:''|| sessionStorage.getItem('infoTitle'),
   index:''|| sessionStorage.getItem('infoIndex'),
}

const mutations = { 
    // 把state 里面要修改的值 放进一个json对象里面 一起修改
    updateStateValue(state,params){
       for(let key in params){
              state[key] = params[key].value
           // 是否储存session
           if(params[key].session){
              sessionStorage.setItem(params[key].sessionKey,params[key].value)
           }
       }
       
    }, 
    // setId(state,value){
    //     state.id = value
    //     sessionStorage.setItem('infoId',value)
    //     console.log('value',value)
    // },
    // setTitle(state,value){
    //     state.title = value
    //     sessionStorage.setItem('infoTitle',value)
    //     console.log('value',value)
    // }
}

const actions = {  
    
}
const getters = {  
    infoId:state => state.id,
    infoTitle:state => state.title,
    infoIndex:state => state.index,
}



export default{
   namespaced:true,
   state,
   mutations,
   actions,
   getters,
}