<template>
    <div id="main-wrap">
         <div class="main-content">
            <div class="content"> 
               <!-- 子路由显示区-->
               <keep-alive>
               <!-- <keep-alive max="2">  缓存的组件最多只能缓存2个   -->
               <!-- <keep-alive exclude="infoIndex"> 与 include作用相反  所有缓存组件中 除了 infoIndex组件不被缓存 其他组件都可以缓存   -->
               <!-- <keep-alive include="infoIndex"> include作用 在所有的缓存组件中 只缓存 name:infoIndex 的组件 其他有缓存标记的组件不再缓存  -->
                    <!-- 需要缓存的组件-->
                    <router-view v-if="$route.meta.keepAlive" />
               </keep-alive>
               <!-- 不需要缓存的组件-->
               <router-view v-if="!$route.meta.keepAlive" />
            </div>
         </div>
    </div>
</template>

<script>
import { ref,reactive } from '@vue/composition-api'
export default {
   name:'layoutMain',
   setup(props,{root}){

      const str = ref('{"name":"jack","title":"hello"}')  // json 格式的字符串 属性键 属性值都要""
      const arr = ref('[111,222]')
      //console.log('str',str.value)  // {"name":"jack","title":"hello"}

      // 字符串转对象
      const json = reactive(JSON.parse(str.value))
      const arr2 = reactive(JSON.parse(arr.value))
      // console.log('json',json)  // {name:"jack",title:"hello"}
      // console.log('name',json.name)  // jack
      // console.log('arr2',arr2[1])  // 222
    
      // json 对象 转字符串 
      const json2 = reactive(
        {
         "name":"aaa",
         "title":"bbb"
        }
        // [111,333]
      )
      //console.log('json2',json2)  // {name:'aaa',title:'bbb'}
      const toString = ref(JSON.stringify(json2))
      //console.log('toString',toString.value) // {"name":"aaa","title":"bbb"}

      const login = root.$store.state.login.isCollapse
      //console.log('login',login) // false
   }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
   position:fixed;
   top:75px;
   left:$navMenu;
   bottom:0;
   right:0;
   border:30px solid #f7f7f7;
   @include webkit(box-sizing,border-box);
}

.open{
  #main-wrap{
     left:$navMenu
  }
}
.close{
  #main-wrap{
     left:$navMenuMin
  }
}


// .main-content {
//    width:100%;
//    height:100%;
//    padding-top:$layoutHeader + 30;
//    padding-left:$navMenu;
//    padding-right:30px;
//    -webkit-box-sizing:border-box;
//    box-sizing:border-box;
// }

// .content{
//    width:100%;
//    height:100%;
//    padding:30px 30px 0 30px;
//    -webkit-box-sizing:border-box;
//    box-sizing:border-box;
//    background-color: #fff;
// }
  .content{
      padding:30px;
  }

</style>
