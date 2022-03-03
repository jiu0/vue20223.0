import { GetCityPicker } from '@/api/common'
import { reactive, toRefs } from '@vue/composition-api'
export function cityPicker(){
    const data = reactive({
        provinceData:[],  // 获取省份数据
        provinceValue:'',
        cityData:[],      // 获取城市数据
        cityValue:'',
        areaData:[],      // 获取区域数据
        areaValue:'',
        streetData:[],    // 获取街道数据
        streetValue:'',
     })
     // 获取省
     const getProvince = ()=>{
           getData({type:'province'},(resData)=>{
              data.provinceData = resData;
           })
            // GetCityPicker({type:'province'}).then(res=>{
            //     data.provinceData = res.data.data.data;
            // }).catch(err=>{
            // })
     }
     // 下拉框值改变时触发 选择省份 获取城市
     const handlerProvince = (val)=>{
        resetPickerValue({type:'city'})
        getData({type:'city',province_code:val},(resData)=>{
             resData.forEach(item=>{
                 if(item.data){
                    data.cityData = item.data.data;
                 }
             })
         })
        // GetCityPicker({type:'city',province_code:val}).then(res=>{
        //      let resData = res.data.data.data
        //      resData.forEach(item=>{
        //          if(item.data){
        //             data.cityData = item.data.data;
        //          }
        //      })
        //  }).catch(err=>{

        //  })
    }
   // 获取县
   const handlerCity = (val)=>{
      resetPickerValue({type:'area'})
      getData({type:'area',city_code:val},(resData)=>{
             resData.forEach(item=>{
                 if(item.data){
                     item.data.data.forEach(item2=>{
                         if(item2.data){
                             data.areaData = item2.data.data;
                         }
                     })
                 }
          })
      }) 
    //   GetCityPicker({type:'area',city_code:val}).then(res=>{
    //          let resData = res.data.data.data
    //          resData.forEach(item=>{
    //              if(item.data){
    //                  item.data.data.forEach(item2=>{
    //                      if(item2.data){
    //                          data.areaData = item2.data.data;
    //                      }
    //                  })
    //              }
    //          })
    //      }).catch(err=>{
    //      })
   }

   // 把 市 县 街道 的GetCityPicker 方法合并
   const getData = (params,fn)=>{
        GetCityPicker(params).then(res=>{
            let resData = res.data.data.data;
            fn(resData)
            //data[`${params.type}Data`] = res.data.data.data;
        }).catch(err=>{

        })
   }

   // 选择区县  获取街道
   const handlerArea = (val)=>{
      resetPickerValue({type:'street'})
      getData({type:'street',area_code:val},(resData)=>{
             resData.forEach(item=>{
                 if(item.data){
                     item.data.data.forEach(item2=>{
                         if(item2.data){
                             item2.data.data.forEach(item3=>{
                                   data.streetData=item3.data.data
                             })
                         }
                     })
                 }
         })
     })
    //   GetCityPicker({type:'street',area_code:val}).then(res=>{
    //          let resData = res.data.data.data
    //          resData.forEach(item=>{
    //              if(item.data){
    //                  item.data.data.forEach(item2=>{
    //                      if(item2.data){
    //                          item2.data.data.forEach(item3=>{
    //                                data.streetData=item3.data.data
    //                          })
    //                      }
    //                  })
    //              }
    //          })
    //      }).catch(err=>{
    //      })
     }
     // 
     const handlerStreet = ()=>{
        resetPickerValue({type:''})
     }
     // 重置选项
     const resetPickerValue = (params)=>{
        const valueJson = {
            city:['cityValue','areaValue','streetValue'],
            area:['areaValue','streetValue'],
            street:['streetValue']
        }
        const arrObj = valueJson[params.type]
        console.log('arrObj',arrObj)
        if(arrObj){ 
            arrObj.forEach(item=>{
                data[item] = ''
            })
        }
        // 数据集合处理
        result();
        // if(params.type==='city'){
        //     data.cityValue = ''
        //     data.areaValue = ''
        //     data.streetValue = ''
        // }
        // if(params.type==='area'){
        //     data.areaValue = ''
        //     data.streetValue = ''
        // }
        // if(params.type==='street'){
        //     data.streetValue = ''
        // }
     }
     // 返回数据集合
     const result = ()=>{
        for(let key in resultData){
            resultData[key] = data[key]
        }
     }
     const resultData =reactive({
            provinceValue:'',
            cityValue:'',
            areaValue:'',
            streetValue:'',
     })
     return {
        data,
        //...toRefs(data)   // 把对象类型转为基础数据类型  可以进行解构响应  监听值需要 .value 
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea,
        resetPickerValue,
        handlerStreet,
        resultData,
        //...toRefs(resultData),
     }
}