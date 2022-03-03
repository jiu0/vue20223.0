<template>
    <div>
              <el-row :gutter="2">
                  <el-col :span="4">
                      <div class="label-wrap category">
                          <label for="">分类:</label>
                          <div class="wrap-content">
                               <el-select v-model="data.categoryValue" placeholder="请选择" style="width:100%">
                                    <el-option
                                      v-for="item in data.category"
                                      :key="item.id"
                                      :label="item.category_name"
                                      :value="item.id">
                                    </el-option>
                              </el-select> 
                          </div>
                      </div>     
                    </el-col>
                    <el-col :span="9">
                      <div class="label-wrap date">
                          <label for="">日期: </label>
                          <div class="wrap-content">
                               <el-date-picker style="margin-left:10px;width:100%"
                                  v-model="data.dateValue"
                                  type="datetimerange"
                                  align="right"
                                  unlink-panels
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  end-placeholder="结束日期">
                              </el-date-picker> 
                          </div>
                       </div>      
                    </el-col> 
                    <el-col :span="4">
                        <div class="label-wrap key-word">
                          <label for="">关键字:</label>
                          <div class="wrap-content">
                               <SelectVue :config="data.configOption"  />
                               <!-- <el-select v-model="data.searchKey" style="margin-left:10px;width:80%" placeholder="请选择">
                                    <el-option
                                      v-for="item in data.searchOptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                               </el-select>   -->
                            </div>
                         </div>    
                    </el-col> 
                    <el-col :span="3">
                        <el-input class="pull-right" style="margin-left:10px;width:100%;" v-model="data.searchKeyWord" placeholder="请输入内容"></el-input>   
                    </el-col> 
                    <el-col :span="2">
                        <el-button type='success' size="mini" class="pull-right" style="padding:4px 10px;" @click="getList" v-if="btnPerm('info.search')">搜索</el-button>   
                    </el-col> 
                    <el-col :span="2">
                        <el-button type='danger' size="mini" class="pull-right"  style="padding:4px 10px;" @click="data.dialog_info = true" v-if="btnPerm('info.add')">新增</el-button>   
                    </el-col> 
              </el-row>
              <!-- 表格 -->
              <div class="balck-space30"></div>
              <el-table :data="tableData.item" border @selection-change="handleSelectionChange" v-loading="data.loadingData" style="width: 100%">
                  <el-table-column  type="index"  :index="indexMethod"></el-table-column>
                  <el-table-column type="selection" width="45"></el-table-column>
                  <el-table-column  prop="title" label="标题" width="240" ></el-table-column>
                  <el-table-column  prop="id" label="类型" width="130" :formatter="toCategory"></el-table-column>
                  <el-table-column  prop="date" label="日期" width="150" :formatter="toData"> </el-table-column>
                  <el-table-column  prop="user" label="管理员" width="160"> </el-table-column>
                  <el-table-column  label="操作"> 
                      <template slot-scope="scope">
                          <el-button type="success"
                            size="mini"
                            @click="editInfo(scope.row.id,scope.$index)" v-if="btnPerm('info.edit')">编辑</el-button>
                          <el-button 
                            size="mini"
                            type="danger"
                            @click="deleteItem(scope.row.id)" v-if="btnPerm('info.del')">删除</el-button>
                            <!-- <router-link :to="{ name:'InfoDetailed',query:{id:scope.row.id,title:scope.row.title} }" class="margin-left-10">
                                 <el-button 
                                  size="mini"
                                  type="danger"
                                  >编辑详情</el-button>
                            </router-link> -->
                             <el-button 
                                  size="mini"
                                  type="success" @click="editDetail(scope.row,scope.$index)" v-if="btnPerm('info.detailed')"
                                  >编辑详情</el-button>
                        </template>
                  </el-table-column>
              </el-table> 
              <!-- 底部部分-->
              <div class="balck-space30"></div>
              <el-row>
                  <el-col :span="9">
                      <el-button size="mini" class="deteleButton" @click="deleteAll" v-if="btnPerm('info.batchDel')">批量删除</el-button>
                  </el-col>
                  <el-col :span="15">
                      <el-pagination class="pull-right"
                          background
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :page-sizes="[10, 20, 50, 100]"
                          layout="total,sizes,prev, pager, next,jumper"
                          :total="data.total">
                        </el-pagination>
                  </el-col>
               </el-row>
               <!-- 新增弹框-->
               <!--sync 使用修饰器 修改了父组件的值  回调需要处理逻辑的时候 不能使用修饰器 反之可以用修饰器 -->
               <DialogInfo :flag.sync="data.dialog_info" :category="data.category" @getListAddEmit="getList" />
               <!--<DialogInfo :flag="data.dialog_info"  @close="closeDialog"  />-->
               <!-- 编辑弹框 -->
               <DialogEditInfo :flag.sync="data.dialog_info_edit" :idIndex="data.infoId" :category="data.category" @getListEmit="getList" />
               <!-- 编辑弹框 传递多个方法-->
               <!--<DialogEditInfo :flag.sync="data.dialog_info_edit" :id="data.infoId" :category="data.category"   @callbackComponent="callbackComponent"/> -->

    </div>
</template>

<script>
import { GetCategery,GetList,DeleteInfo } from '@/api/new.js';
import DialogInfo from './dialog/add'
import DialogEditInfo from './dialog/edit'
import { confirm } from '@/utils/validate'
import { global3 } from '@/utils/global3'
import { common } from '@/api/common'
import { onMounted, reactive, ref,watch } from '@vue/composition-api';
import { timestampToTime } from '@/utils/common.js'
import SelectVue from 'components/Select'
export default {
  name:'infoIndex',
  components:{ DialogInfo,DialogEditInfo,SelectVue, },
  setup(props,{root}){
    // vue3.0 定义的外部方法
    const { getInfoCategory,categoryInfo } = common(); 
    const { confirm3,str:aaaa } = global3();  // confirm3 名字取自 @/utils/global3 中的名字
   
    //watch(()=> console.log('aaaa',aaaa.value)) // aaaa 重命名
    // 弹框
    const data = reactive({
       // 关键字
       configOption:{
          init:['id','title',], 
       },
       dialog_info:false,
       dialog_info_edit:false,
       categoryValue:'',
       dateValue:'',
       searchKey:'id',
       searchKeyWord:'',      //头部数据
       total:0,               // 总页数
       loadingData:false,     // loading
       category:[],
       searchOptions:[
         { value:"id",label:"ID"},
         { value:"title",label:"标题"},
       ],
       deleteInfoId:'',
       // infoId:'',
       infoId:{
           id:'',
           index:''
       }
    })
    // 表格的key
    const indexMethod=(index)=> {
        return index;
      }
     // 页码
    const page = reactive({
        pageNumber:1,
        pageSize:10,
    })
    //  const options= reactive({
    //     category:[{
    //           value: '选项1',
    //           label: '黄金糕'
    //          },
    //     ]});
        // const searchOptions = reactive([
        //    { value:"id",label:"ID"},
        //    { value:"title",label:"标题"},
        // ])
        // 表格数据
        const tableData = reactive({
           item:[
              // {
               //    id:123,
              //     title:'hhhh',
              //     category:'kkkkk',
              //     date: '2016-05-02',
              //     user: '王小虎',
              // }, 
           ]
        })
        // 时间转格式
        const toData = (row,column,cellValue,index)=>{
             return timestampToTime(row.date)
        }
       // 类型转化
       const toCategory = (row)=>{
           // 调用一个函数  返回一个新的值 替换原来的值
           let categoryId = row.id;
           let categoryData = data.category.filter(item=> item.id == categoryId)[0]
           //console.log('categoryData',categoryData)
           // if(!categoryData){return false;}
           return categoryData && categoryData.category_name
       }
        // 搜索
       const getList = (val)=>{
          //console.log('77777',val)  // {name: 'add'}
          let responseData = formData();
          // 加载状态
          data.loadingData = true;
          GetList(responseData).then(res=>{
              let resData = res.data.data.data;
              console.log('re55555s',res)
              tableData.item = resData;
              //统计页码数量
              data.total = res.data.data.total
              // 加载状态
              data.loadingData = false;
           }).catch(err=>{
              data.loadingData = false;
           })
       }
       // 搜索条件处理
       const formData =()=>{
             let searchData = {
                 pageNumber:page.pageNumber,
                 pageSize:page.pageSize
             }
             // 分类Id
             if(data.categoryValue){ searchData.categoryId = data.categoryValue }
             // 日期
             if(data.dateValue.length >0){ 
                searchData.startTime = data.dateValue[0]
                searchData.endTime = data.dateValue[1]
             }
             // 关键字
             if(data.searchKeyWord) { searchData[data.searchKey]  = data.searchKeyWord }
             return searchData;
       }
       onMounted(()=>{
          getList()
       })
 
       // 获取分类
      //  const getCategery = (()=>{
      //     GetCategery({}).then(res=>{
      //        let data = res.data.data;
      //        data.category = data;
      //     }).catch(err=>{
      //         console.log("err:", err);
      //     })
      //  })
       // vue3.0 封装方法
      //  watch(()=>categoryInfo.item,(value)=>{
      //      data.category = value;
      //  })
       onMounted(()=>{
          //getCategery()
          // vue3.0 封装方法
         // getInfoCategory({name:'jack66'})
          // vuex 方法
          root.$store.dispatch('common/getInfoCategory',{name:'jack'}).then(res=>{
              data.category = res.data.data;
          }).catch(err=>{

          })
       })
        // 分页方法
        const handleSizeChange = (val)=>{
            console.log(`每页 ${val} 条`);
            page.pageSize = val;
            getList();
         }
        const handleCurrentChange = (val)=> {
            console.log(`当前页: ${val}`);
            page.pageNumber = val
            getList();
         }
        // const closeDialog = (()=>{
               // 逻辑的时候 需要处理逻辑时  不能使用修饰器
        //     data.dialog_info= false;
        //  })
         const deleteItem =((id)=>{
              //console.log('id',id)
              // root.confirm({
              //    content:'确认删除当前信息,确认后无法恢复',
              //    tip:'警告',
              //    id:1111,
              //    fn:confirmDelete
              // });
              data.deleteInfoId = [id]
              confirm({
                 content:'确认删除当前信息,确认后无法恢复',
                 tip:'警告',
                 //id:7777,
                 fn:confirmDelete
              });
         })
         const deleteAll =(()=>{
              if(!data.deleteInfoId || data.deleteInfoId.length ==0 ){
                    root.$message({
                        message:'请选择要删除的数据',
                        type:'error'
                    }); 
                    return false;
              }
              //this.xxxxx();  // vue2.0
              //root.xxxxx();  // vue3.0
              confirm3({
                 content:'确认删除选中的数据,确认后无法恢复',
                 type:'success',
                 data:{
                     id:99999,
                     name:'hello'
                 },
                 fn:confirmDelete
              })
              // root.confirm({
              //    content:'确认删除选中的数据,确认后无法恢复',
              //    type:'success',
              //    id:2222,
              //    fn:confirmDelete
              // });
         })
         const confirmDelete =((value,name)=>{        
           DeleteInfo({id:data.deleteInfoId}).then(res=>{
              let resData = res.data.data
               root.$message({
                     message:resData.message,
                     type:'success'
                });
                data.deleteInfoId = ''; 
                getList();
            }).catch(err=>{
              
            })
         })
         // 批量删除
         const handleSelectionChange = (val)=>{
             let id = val.map(item=>item.id)
             data.deleteInfoId = id;
         }
         // 编辑信息
         const editInfo = (id,val)=>{ 
             //console.log('id000000',id)  
             //console.log('val99999',val) 
             data.infoId.id = id;  
             data.infoId.index = val;  
             data.dialog_info_edit = true
         }
         // 传递多方法
        //  const callbackComponent = (params)=>{
        //     if(params.function){  }
        //     console.log('params',params)
        //  }
        // 编辑详情 多种传参形式  1  query  params  方法
        const editDetail =(data,value)=>{
            // root.$router.push({
            //    path:`/InfoDetailed/${data.id}/${data.title}`
            // })
            // 预先把值存进 vuex 里面  把id title 放进一个对象粒一起修改
            //root.$store.commit('infoDetail/setId',data.id);
            //root.$store.commit('infoDetail/setTitle',data.title)
            data.index = value;
            console.log('data',data)
            root.$store.commit('infoDetail/updateStateValue',{
                 id:{
                    value:data.id,
                    session:true,
                    sessionKey:'infoId',
                 },   // 这里的id  title  和 state 里面的id  title 要一样的名字
                 title:{
                    value:data.title,
                    session:true,
                    sessionKey:'infoTitle',
                 },
                 // 索引
                 index:{
                    value:data.index,
                    session:true,
                    sessionKey:'infoIndex',
                 }
            });
            // 再跳转路由
            root.$router.push({
                name:'InfoDetailed',
                params:{ 
                   id:data.id,
                   title:data.title,
                   index:data.index,
                }
            })
        }
        return{
           data,
           page,
           tableData,
           toData,
           toCategory,
           handleSizeChange,
           handleCurrentChange,
           //closeDialog,
           deleteItem,
           deleteAll,
           handleSelectionChange,
           formData,
           getList,
           editInfo,
           //callbackComponent,
           editDetail,
           indexMethod,  // 表格的key
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap{
   &.category{
      @include labelDom(left,40,30);
   }
    &.date{
      @include labelDom(right,53,30);
   }
     &.key-word{
      @include labelDom(right,73,30);
   }
}
.el-button{
  padding:0 10px;
  
}
.deteleButton{
     padding:4px 10px!important;
  }
.el-input{
  height:30px!important;
}


</style>