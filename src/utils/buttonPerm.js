
import Vue from 'vue';
import store from "../store/index.js";
//自定义指令
Vue.directive('btnPerm',{
    bind(el,bingind,vnode){
        //console.log('8888888',bingind.value)  // 调用指令传的参数
        // 操作dom元素
        if(bingind.def.hasBtnPerm(bingind.value)){  // true
            el.className = el.className + ' show-button'
        }
    },
    // 这里操作父节点 el.parentNode
    inserted(){
 
    },
    update(){
 
    },
    componentUpdated(){
 
    },
    unbind(){
    },
    hasBtnPerm(permission){
       const button = store.getters['app/buttonPermission'];
       const roles = store.getters['app/roles']; // 获取角色
       // 超管的话 直接返回true  就不需要 去匹配 info.edit  user.del 这样的字符串了 不是超管的话 就要去匹配字符串了 
       if(roles.data.includes('admin')){ return true }
       return button.indexOf(permission) != -1  // true
    }
 })
 