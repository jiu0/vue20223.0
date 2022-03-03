<template>
     <el-select size="mini" v-model="data.selectValue" @change="select">
         <el-option v-for="item in data.initOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
     </el-select>
</template>
<script>
import { reactive,onMounted,} from '@vue/composition-api'
export default{
    namr:'selectIndex',
    props:{
      config:{
         type:Object,
         default:()=>{}
      },
      selectData:{
         type:Object,
         default:()=>{}
      }
    },
    setup(props,{root,emit}) {
        const data = reactive({
            selectValue:'',
            initOption:[],
            option:[
                { value:'truename',label:'姓名' },
                { value:'phone',label:'手机号' },
                { value:'email',label:'邮箱' },
                { value:'id',label:'ID' },
                { value:'title',label:'标题' },
            ]
      })
      // 初始化下拉菜单
      const initOption = ()=> {
          //console.log('props',props.config.init) ['name','phone','email']
          let initData = props.config.init;
          // 数据校验
          if(initData.length==0){
              root.$message({
                  message:'config的参数是空的,无法显示下拉菜单',
                  type:'error'
              })
              return false;
          }
          let optionArr = [];
          initData.forEach(item => {
                   let arr = data.option.filter(ele => ele.value == item)
                   if(arr.length > 0){
                      optionArr.push(arr[0])
                   }
          });
          if(optionArr.length === 0){
              root.$message({
                  message:'匹配失办,无法显示下拉菜单',
                  type:'error'
              })
              return false;
          }
          // 初始化赋值
          data.initOption = optionArr;
          data.selectValue = optionArr[0].value;
          console.log('optionArr',optionArr)
          // 进入页面初始化 下拉框里面的值
          emit('update:selectData',optionArr[0])
      }
      // 选择触发
      const select = (val)=>{
          let filterData = data.option.filter(item=> item.value == val)[0]
          emit('update:selectData',filterData)
      }
      onMounted(()=>{
          initOption();
      })
      return {
          data,
          select,
      }
    },
}
</script>

<style lang="less" scoped>

</style>
