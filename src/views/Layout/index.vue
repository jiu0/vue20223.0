<template>
    <div id="layout" :class="[ menuStatus ? 'close' :'open']">
      <LayoutHeader/>
      <LayoutMain/>
      <LayoutNav/>
    </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import LayoutHeader  from './Components/Header.vue'
import LayoutMain  from './Components/Main.vue'
import LayoutNav  from './Components/Nav.vue'
export default {
   name:"layout",
   components:{
     LayoutHeader,
     LayoutMain,
     LayoutNav
   },
   setup(props,{root}){
      const menuStatus = computed(()=> {
          //console.log('store',root.$store.state)
          // return root.$store.state.isCollapse
          return root.$store.state.app.isCollapse
      })
      return {
        menuStatus,
      }
   }
}
</script>

<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>
