<template>
     <div>
      <svg :class="svgClass"  aria-hidden="true">
           <use :xlink:href="iconName"></use>
       </svg>
        <!--<div style="color:#fff"> 
           {{ plusOne }}
           <el-button @click="getComputed()">按钮</el-button>
      </div>-->
    </div>
</template>

<script>
import { reactive,ref,isRef,toRefs, onMounted,computed } from '@vue/composition-api'
export default{
    name:'svgIcon',
    //props:['iconClass','className'],
    props:{
      iconClass:{
         type:String,
         default:'',
        //  required:true,
        //  validator:(value)=>{
        //      return value >= 0
        //  }
      },
    //   iconClass:{
    //      type:Array,
    //      default:()=>[],
    //   },
      className:{
         type:String,
         default:'',
      },
    },
    setup(props) {
         //console.log('iconClass',props.iconClass)  menu  logout
         //console.log('className',props.className)  menu  logout
         // 计算属性 得出结果 并返回
         const iconName = computed(()=> `#icon-${props.iconClass}`)
         const svgClass = computed(()=> {
            if(props.className){
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
         })
         //const number = ref(1);
        //  const plusOne = computed(()=>{
        //      return number.value * 10
        //  })
        // const plusOne = computed({
        //     get:() => number.value + 1,
        //     set:(val) => {  number.value = val - 3 } 
        // })
        //  const getComputed = ()=>{
        //      plusOne.value = 2;
        //  }
         return {
             iconName,
             svgClass,
            // plusOne,
            // getComputed
         }
    },
}
</script>

<style lang="scss" scoped>
.svg-icon{
   width:1.5em;
   height:1.5em;
   fill:currentColor;
   position:relative;
   top:5px;
   //color:#f3f3f3;
   &.font12{
      font-size:20px;
   }
}
</style>