<template>
        <div>
           <el-table :data="data.tableData" border  style="width:100%" @selection-change="thatSelectCheckBox">
                  <!--多选-->
                  <el-table-column v-if="data.tableConfig.selection" type="selection" width="45"></el-table-column>
                  <!--表格数据-->
                  <template v-for="item in data.tableConfig.tHead">
                     <!--v-slot-->
                     <el-table-column :key="item.field" :width="item.width" :prop="item.field" :label="item.label" v-if="item.columnType === 'slot'">
                         <template slot-scope="scope">
                             <slot :name="item.slotName" :data="scope.row"></slot>
                         </template>
                     </el-table-column>
                     <!-- 文本渲染-->
                     <el-table-column :key="item.field" :width="item.width" :prop="item.field" :label="item.label" v-else></el-table-column>
                  </template>
             </el-table>
             <div class="balck-space30"></div>
             <div class="table-footer">
                 <el-row>
                     <el-col :span="4">
                         <slot name="tableFooterLeft"></slot>
                     </el-col>
                     <el-col :span="20">
                         <el-pagination class="pull-right"
                            background 
                            v-if="data.tableConfig.paginationShow"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageData.currentPage"
                            :page-sizes="pageData.pageSizes"
                            :page-size="pageData.pageSize"
                            :layout="data.tableConfig.paginationLayout"
                            :total="pageData.total">
                        </el-pagination>
                     </el-col>
                 </el-row>
             </div>
        </div>
</template>
<script>
import { onBeforeMount, onMounted, reactive,watch} from '@vue/composition-api'
//import { requestUrl } from '@/api/requestUrl.js';  //  requestUrl 这个名字不能改
//import { loadTableData } from '@/api/common'
// 加载表格数据
import { tableLoad } from './tableLoadData'
// 表格分页
import { pagination } from './paginationHook'
import { recordPage } from './recordPage'

export default{
    name:'tableVue',
    props:{
      config:{
          type:Object,
          default:()=>{}
       },
       tableRow:{
          type:Object,
          default:()=>{}
       }
    },
    setup(props,{root,emit}) {
      // 表格分页
      const { pageData,handleSizeChange,handleCurrentChange,totalCount } =  pagination();
      // 表格数据
      const { loadTabData,tableLoadData  }  =  tableLoad();
      const data = reactive({
          tableConfig:{
              selection:true,
              // 翻页记录
              recordCheckbox:false,
              // 请求接口
              requestData:{
              },
              tHead:[],
               // 分页里的按钮
               paginationLayout:"total, sizes, prev, pager, next, jumper",
               // 分页是否要
               paginationShow:true,
          },
          tableData:[
              { 
                title:'1250837811@qq.com',
                name:'123',
                phone:'182185900987',
                adress:'广州市天河区',
                role:'888888'
              },
          ]
      })
    //   const loadingData = ()=>{
    //     let requestJson = data.tableConfig.requestData;
    //     let resUrl = requestJson.url;
    //     let requestUserData = {
    //           url:requestUrl[resUrl],
    //           method:requestJson.method,
    //           data:requestJson.data,
    //       }
    //       loadTableData(requestUserData).then(res=>{
    //          let responseData = res.data.data.data;
    //          console.log('responseData',responseData)
    //          data.tableData = responseData
    //       }).catch(err=>{

    //       })
    //   }
      const initTableConfig = ()=>{
         let configData = props.config;
         let keys = Object.keys(data.tableConfig)
         for(let key in configData){
            if(keys.includes(key)){
                data.tableConfig[key] = configData[key] 
            }
         }
        //  data.tableConfig.tableHead = props.config.tHead;
        // data.tableConfig.selection = props.config.selection;
      }
    //   watch(()=> loadTabData.item,(newV)=>{
    //       data.tableData = newV
    //   })

      //勾选表格 checkbox 触发
      const thatSelectCheckBox = (val)=>{
        // 取出id 
        let rowData = {
            idItem:val.map(item=>item.id),  // 映射取出 id 
            dataItem:val
        }
        emit('update:tableRow',rowData)
      }
      // 批量删除后 刷新列表
      const refreshData = ()=>{
          tableLoadData(data.tableConfig.requestData)
      }
      // 带参数刷新列表
      const paramsLoadData = (params)=>{
         let resquestData = Object.assign({},params,{
             pageNumber:1,
             pageSize:10,
         })
         console.log('resquestData9999',resquestData)  // {undefined: '888888', pageNumber: 1, pageSize: 10}
         data.tableConfig.requestData.data = resquestData;
         tableLoadData(data.tableConfig.requestData)
      }
      // 数据渲染
      watch([
            ()=>loadTabData.item,
            ()=>loadTabData.total
        ],([tableItem,totalC])=>{
           data.tableData  = tableItem;
           totalCount(totalC)
      })
      // 页码监听
      watch([
          ()=>pageData.currentPage,
          ()=>pageData.pageSize
      ],([currentPage,pageSize])=>{
          let configData = data.tableConfig.requestData;
          if(configData.data){
               configData.data.pageNumber = currentPage
               configData.data.pageSize = pageSize
               tableLoadData(data.tableConfig.requestData)
          }
      }) 
      onMounted(()=>{
         tableLoadData(data.tableConfig.requestData)
      })
      onBeforeMount(()=>{
          initTableConfig()
          //console.log('tableConfig777777777',data.tableConfig.requestData)
          // loadingData();
      })
      return {
        data,
        pageData,
        handleSizeChange,
        handleCurrentChange,
        thatSelectCheckBox,
        refreshData,
        paramsLoadData,
       }
    },
}
</script>
<style lang="scss" scoped>

</style>
