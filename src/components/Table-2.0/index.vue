<template>
        <div>
           <el-table :data="tableData" border  style="width: 100%">
                  <!--多选-->
                  <el-table-column v-if="tableConfig.selection" type="selection" width="45"></el-table-column>
                  <!--表格数据-->
                  <template v-for="item in tableConfig.tHead">
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
             <el-pagination
                    background 
                    v-if="tableConfig.paginationShow"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    :layout="tableConfig.paginationLayout"
                    :total="total">
             </el-pagination>
        </div>
</template>
<script>
// vue2.0 混入加载表格数据
import tableLoadData from '@/mixins/tableLoadData'
// vue2.0 混入分页
import tablepagination from '@/mixins/tablepagination'
export default{
    name:'tableVue',
    mixins:[tableLoadData,tablepagination],
    data(){
      return{
         tableConfig:{
              selection:true,
              // 翻页记录
              recordCheckbox:false,
              // 请求接口
              requestData:{},
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
      }
    },
    props:{
      config:{
          type:Object,
          default:()=>{}
       }
    },
    methods:{
      initTableConfig(){
          let configData = this.config;
          let keys = Object.keys(this.tableConfig)
          for(let key in configData){
            if(keys.includes(key)){
                this.tableConfig[key] = configData[key] 
            }
         }
      }
    },
    beforeMount(){
        this.initTableConfig()
    },
    mounted(){
      
    },
    
}
</script>
<style lang="less" scoped>

</style>
