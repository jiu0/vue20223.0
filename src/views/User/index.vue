<template>
    <div id="main-wrap" style="padding:30px;">
       <el-row :gutter="16">
          <el-col :span="20">
               <div class="label-wrap category">
                          <label for="">关键字:</label>
                          <div class="wrap-content">
                               <el-row :gutter="16">
                                  <el-col :span="3">
                                     <SelectVue :config="data.configOption" :selectData.sync="data.selectData" />
                                  </el-col>
                                  <el-col :span="4">
                                     <el-input size="mini" v-model="data.searchKey" placeholder="请输入搜索关键字"></el-input>
                                  </el-col>
                                  <el-col :span="10">
                                     <el-button size="mini" style="padding:4px 10px" @click="search" v-if="btnPerm('user.search')">搜索</el-button>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-button  size="mini" @click="busEvent">触发bus事件</el-button>
                                  </el-col>
                               </el-row>
                          </div>
                 </div> 
          </el-col>
          <el-col :span="4">
             <el-button type="danger" class="pull-right" size="mini" style="padding:4px 10px" @click="handlerAdd" v-if="btnPerm('user.add')">新增用户</el-button>
          </el-col>
       </el-row>
       <div class="balck-space30"></div>
       <TableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow">
          <template v-slot:status="slotData">
              <el-switch @change="handlerSwitch(slotData.data)" v-model="slotData.data.status" active-value="1"  inactive-value="2"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
               </el-switch>
              {{ slotData.data.status }}
          </template>
          <template v-slot:operation="slotData">
              <el-button  size="mini" type="success" @click="handlerEdit(slotData.data)" style="padding:0 10px;" v-if="btnPerm('user.edit')">编辑</el-button>
              <!-- <el-button size="mini" type="danger" @click="handlerDel(slotData.data)" style="padding:0 10px;" v-if="btnPerm('user.del')">删除</el-button> -->
              <el-button size="mini" type="danger" @click="handlerDel(slotData.data)" class="hide-button" style="padding:0 10px;" v-btnPerm="'user.del'">删除</el-button>
          </template>
          <template v-slot:tableFooterLeft>
              <el-button  size="mini" style="padding:4px 10px;" @click="handlerBathDel()" v-if="btnPerm('user.batchDel')">批量删除</el-button>
          </template>
       </TableVue>
       <DialogAdd :flag.sync="data.dialog_info" :editData="data.editData" @show="showA" @refreshTableData="refreshTabData" />
    </div>
</template>

<script>
import { onMounted, reactive,ref, } from '@vue/composition-api'
import SelectVue from 'components/Select'
import TableVue from 'components/Table'
import DialogAdd from './dialog/addUser'
import { UserDel,UserActives, } from '@/api/user'
import { global3 } from '@/utils/global3'
// 中央事件 
import EventBus from '@/utils/bus'
export default {
  name:'userIndex',
  components:{
     SelectVue,TableVue,DialogAdd
  },
  setup(props,{root,refs}){
     const busEvent = ()=>{
        EventBus.$emit('showFun',{name:'123'})  // 父组件向子组件传值
        root.$store.commit('common/VuexName',{ userId:'456789'})
     }
     const { confirm3, } = global3();
     const value = ref(true)
     const userTable = ref(null)  // userTable 名字要和  ref="userTable"  名字一样
     const data = reactive({
        editStatus:1,
        // tbale 选中的数据
        tableRow:{},
        dialog_info:false,
        configOption:{
            init:['truename','phone','email'],
        },
        // 下拉菜单数据
        selectData:{},
        // 搜索框
        searchKey:'',
        configTable:{
           // 表格配置参数
           // 翻页记录
           recordCheckbox:true,
           // 多选框
           selection:true,
           // 表头
           tHead:[
             {  label:'邮箱/用户名', field:'username',width:160 },
             {  label:'真实姓名', field:'truename',width:100 },
             {  label:'手机号', field:'phone',width:120 },
             {  label:'地区', field:'region',width:220 },
             //{  label:'系统', field:'role',width:100 },
               {  label:'角色', field:'role',width:100 },
             {  label:'禁启用状态', field:'status',columnType:"slot",slotName:'status',width:120 }, 
             {  label:'操作', columnType:"slot",slotName:'operation' }, 
           ],
           // 请求接口
           requestData:{
               url:'getUserList',
               method:'post',
               // 请求的参数
               data:{
                  name:'hello',
                  pageNumber:1,
                  pageSize:10,
               },
            },
            // 防止禁用按钮重复点击
            updateUserStatusFlag:false,
            // 分页里的按钮
            paginationLayout:"total, sizes, prev, pager, next, jumper",
            // 分页是否要
            paginationShow:true,
            // 编辑的数据
            editData:{}
         }
     })
     // 搜索
     const search = ()=>{
         let resquestData = {
            //key:'hhhh'
            [data.selectData.value]:data.searchKey
         }
         refs.userTable.paramsLoadData(resquestData)
         console.log('selectData',data.selectData)
        // console.log('resquestData',resquestData)
     }
     // 新增用户
     const handlerAdd =()=>{
         data.dialog_info = true
     }
     const showA = (val)=>{
        //console.log('val',val)  // {name:'jack'}
     }
     // 批量删除
     const handlerBathDel = ()=>{
        let userId = data.tableRow.idItem;
        if(!userId || userId.length === 0){
           root.$message({
               message:'请勾选需要删除的用户',
               type:'error'
           })
            return false;
         }
          confirm3({
                 content:'确认删除选中的数据,确认后无法恢复',
                 type:'success',
                 data:{
                     id:99999,
                     name:'hello'
                 },
                 fn:userDelete
          })
          
     }
     const userDelete = ()=>{
         UserDel({id:data.tableRow.idItem}).then(res=>{
           root.$message({
              message:res.data.data.message,
              type:'success'
           })
           // 第二种写法  把 userTable 放入 data 里面 不可以 data.userTable ==> null  userTable.value ==> vue组件
           //刷新表格数据
           refreshTabData()
           //userTable.value.refreshData()
           //refs.userTable.refreshData()
         }).catch(err=>{

         })
     }
     // 刷新表格数据
     const refreshTabData = ()=>{
        userTable.value.refreshData()
     }
   
     // 单个删除
     const handlerDel =(params)=>{ 
         //批量删除 是传多个 id  单个删除 是传一个 id 
         data.tableRow.idItem = [params.id]
         confirm3({
                 content:'确认删除选中的数据,确认后无法恢复',
                 type:'success',
                 data:{
                     id:99999,
                     name:'hello'
                 },
                 fn:userDelete
          })
     }
     // 编辑
     const handlerEdit = (params)=>{
        data.dialog_info = true;
        // 把数据传到子组件  浅拷贝
        //console.log('params',params)
        data.editData = Object.assign({},params)
        // 编辑按钮添加记号
        data.editData.editStatus = 1;
        console.log('editData666',data.editData)
     }
     // 是否禁用
     const handlerSwitch = (params)=>{
        if(data.updateUserStatusFlag){  return false;}
        data.updateUserStatusFlag = true;
        let resData = {
            id:params.id,
            status:params.status
        }
        UserActives(resData).then(res=>{
          root.$message({
             message:res.data.data.message,
             type:'success'
          })
           data.updateUserStatusFlag =!data.updateUserStatusFlag;
        }).catch(err=>{
           data.updateUserStatusFlag =!data.updateUserStatusFlag;
        })
     }
     return {
       data,
       userTable,
       value,
       handlerBathDel,
       handlerDel,
       showA,
       busEvent,
       refreshTabData,
       handlerSwitch,
       handlerEdit,
       handlerAdd,
       search,
     }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap{
   @include labelDom(left,60,30);
}
// 自定义指令显示隐藏按钮
.hide-button{display: none;}
.show-button{display:inline-block;}

</style>

<!--父组件传内容到子组件显示-->