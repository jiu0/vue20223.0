<template>
    <div id="nav-wrap"> 
        <h1 class="logo" style="text-align:center;"><img style="margin:auto;display:inline-block;width:92px;" src="../../../assets/logo.png" /></h1>
        <el-menu :default-active="defaultActive" style="border-right:none;" class="el-menu-vertical-demo" background-color="transparent"
         active-text-color="#fff" text-color="#fff" :collapse="isCollapse" router>
            <template v-for="(item,index) in routers">
                <el-submenu  v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <!-- 一级菜单-->
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        <!--<svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />-->
                        <span slot="title">{{ item.meta.name}}</span>
                    </template>
                    <!-- 子级菜单-->
                    <template v-for="subItem in item.children">
                       <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name}}</el-menu-item>
                    </template>
                    <!--<el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>

                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                 </el-submenu>
              </template>  
         </el-menu>
    </div>
</template>

<script>
import { reactive,ref,isRef,toRefs, onMounted,computed } from '@vue/composition-api'
export default {
   name:'navMenu',
   setup(props,{root}){
      // data 数据
      //const isCollapse = ref(false)
      const routers = reactive(root.$router.options.routes);
      //console.log('routers',routers);
      //监听路由变化  computed 监听方法
      const defaultActive = computed(()=>{
          const route = root.$route;
          //return route.path
          //console.log('route',route);
          const { path } = route
          return path
      })
      // computed 监听值改变
      //const isCollapse = computed(()=> root.$store.state.isCollapse)
      const isCollapse = computed(()=> root.$store.state.app.isCollapse )
         
      // 打印store 
      // console.log('isCollapse',root.$store.state.app.isCollapse)
      // console.log('count',root.$store.getters['login/count'])
       root.$store.commit('app/setCount',90)
      return{
         isCollapse,
         routers,
         defaultActive,
      }
   }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
img{
  @include webkit(transition,all .3s ease 0s);
}

#nav-wrap{
   position:fixed;
   top:0;
   left:0;
   width:$navMenu;
   height:100vh;
   background-color: #344a5f;
   @include webkit(transition,all .3s ease 0s);
}
.open{
    #nav-wrap{
        width:$navMenu
    }
}
.close{
   #nav-wrap{
        width:$navMenuMin;
    }
    .logo img{
        width:70%!important;
    }
}

</style>
