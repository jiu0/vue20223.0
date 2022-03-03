<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu" /></div>
        <div class="pull-right">
            <!-- <div class="user-info pull-left">
                <img class="admin-icon" src="../../../assets/logo.png" />
                <span>{{username}}</span>
            </div> -->
            <div class="pull-left user-info">
                {{ username }}
            </div>
            <div class="pull-left header-icon" @click="logout"><svg-icon iconClass="logout" className="logout" /></div>
        </div>    
    </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
   name:'layoutHeader',
   setup(props,{root}){
    const username = computed(()=> root.$store.state.app.username)
    const navMenuState = ()=>{
         root.$store.commit('app/setCollapse')
         //root.$store.commit('login/setCollapse')  // login  app 可以区分开始调用的那个文件的js
         //root.$store.dispatch('setMenuStatus',{ 'name':'jjkkkk' } /*{ name:'jjkkkk' } */ )
        //root.$store.dispatch('app/setMenuStatus')
    }
    // 退出
    const logout = ()=>{
        root.$store.dispatch('app/logout').then((res)=>{
            root.$message({
                message:res.message,
                type:'success'
            })
            root.$router.push({
                name: 'Login'
              })
        })
    }
    return {
       navMenuState,
       username,
       logout,
     }
   }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
   position:fixed;
   top:0;
   right:0;
   left:$navMenu;
   height:75px;
   line-height: 75px;
   background-color: #fff;
   @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,.1));
   @include webkit(transition,all .3s ease 0s);
}

.open {
   #header-wrap{
      left:$navMenu
   }
}
.close{
  #header-wrap{
      left:$navMenuMin
   }
}
.header-icon {
   padding:0 32px;
   svg {  
        margin-bottom:-8px;
        cursor: pointer;
        font-size:25px!important;
    }
}
.user-info{
    height:100%;
    padding:0 32px;
    border-right:1px solid #ededed;
    + .header-icon{
         padding:0 28px;
    }
}
</style>
