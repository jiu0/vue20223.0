<template>
    <div class="overflow-h">
          <el-row :gutter="8">
                    <el-col :span="6" v-if="init.province">
                        <el-select v-model="data.provinceValue" @change="handlerProvince">
                            <el-option v-for="item in data.provinceData" :key="item.PROVINCE_ID" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" v-if="init.city">
                        <el-select v-model="data.cityValue" @change="handlerCity">
                            <el-option v-for="item in data.cityData" :key="item.CITY_ID" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" v-if="init.area">
                        <el-select v-model="data.areaValue" @change="handlerArea">
                            <el-option v-for="item in data.areaData" :key="item.AREA_ID" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" v-if="init.street">
                        <el-select v-model="data.streetValue" @change="handlerStreet">
                            <el-option v-for="item in data.streetData" :key="item.STREET_ID" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                        </el-select>
                    </el-col>
         </el-row>            
     </div>
</template>
<script>
//import { GetCityPicker } from '@/api/common'
import { onBeforeMount, reactive,watch } from '@vue/composition-api'
import { cityPicker } from '@/mixins/cityPicker'
export default{
    name:'cityPicker',
    props:{
      cityPickerData:{
          type:Object,
          default:()=>{}
      },
      cityPickerLevel:{
          type:Array,
          default:()=>[]
      },
    },
    setup(props,{emit}) {
         // 初始化
         const init = reactive({
             province:false,
             city:false,
             area:false,
             street:false,
         })
         // 组件方法
         const {
              //getProvince,provinceData,provinceValue,cityData,cityValue,areaData,areaValue,streetData,streetValue,
              data,
              handlerProvince,
              handlerCity,
              handlerArea,
              getProvince, 
              handlerStreet,
              resultData,
              } = cityPicker();

         // 初始化省市区几个选择框
         const initCityPicker = ()=>{
             let initData = props.cityPickerLevel
             if(initData.length ===0){
                 for(let key in init){
                     init[key] = true;
                 }
             }else{
                 initData.forEach(item=>{
                     init[item] = true;
                 })    
              }
         }     
         watch([
            ()=>resultData.provinceValue,
            ()=>resultData.cityValue,
            ()=>resultData.areaValue,
            ()=>resultData.streetValue,
         ],([province,city,area,street])=>{
            emit("update:cityPickerData",resultData)
         })
        //  watch(()=>provinceValue.value,(newV)=>{  // 用了toRefs 解析成基础数据类型
        //       console.log('newV',newV)
        //  })         
    //    const data = reactive({
    //       provinceData:[],  // 获取省份数据
    //       provinceValue:'',
    //       cityData:[],      // 获取城市数据
    //       cityValue:'',
    //       areaData:[],      // 获取区域数据
    //       areaValue:'',
    //       streetData:[],    // 获取街道数据
    //       streetValue:'',
    //    })
    //   // 获取省
    //   const getProvince = ()=>{
    //         GetCityPicker({type:'province'}).then(res=>{
    //             data.provinceData = res.data.data.data;
    //         }).catch(err=>{

    //         })
    //   }
      onBeforeMount(()=> {
          // 初始化 几个框
          initCityPicker()
          // 获取省份的数据
          getProvince() 
      })
    //   // 下拉框值改变时触发 选择省份 获取城市
    //   const handlerProvince = (val)=>{
    //        GetCityPicker({type:'city',province_code:val}).then(res=>{
    //             let resData = res.data.data.data
    //             resData.forEach(item=>{
    //                 if(item.data){
    //                    data.cityData = item.data.data;
    //                 }
    //             })
    //         }).catch(err=>{

    //         })
    //    }
    //   // 获取县
    //   const handlerCity = (val)=>{
    //      GetCityPicker({type:'area',city_code:val}).then(res=>{
    //             let resData = res.data.data.data
    //             resData.forEach(item=>{
    //                 if(item.data){
    //                     item.data.data.forEach(item2=>{
    //                         if(item2.data){
    //                             data.areaData = item2.data.data;
    //                         }
    //                     })
    //                 }
    //             })
    //         }).catch(err=>{

    //         })
    //   }
    //   // 选择区县  获取街道
    //   const handlerArea = (val)=>{
    //      GetCityPicker({type:'street',area_code:val}).then(res=>{
    //             let resData = res.data.data.data
    //             resData.forEach(item=>{
    //                 if(item.data){
    //                     item.data.data.forEach(item2=>{
    //                         if(item2.data){
    //                             item2.data.data.forEach(item3=>{
    //                                   data.streetData=item3.data.data
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         }).catch(err=>{

    //         })
    //   }
      return{
          data,
          init,
        //   provinceData,
        //   provinceValue,  // 数据绑定
        //   cityData,
        //   cityValue,
        //   areaData,
        //   areaValue,
        //   streetData,
        //   streetValue,
          handlerProvince,
          handlerCity,
          handlerArea,
          handlerStreet,  
       }
    },
}
</script>
<style lang="scss" scoped>

</style>
