<template>
    <!-- 新增弹框-->
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" @open="openDialog" width="580px">
        <el-form :model="data.form" ref="addForm">
             <el-form-item label="分类" :label-width="data.formLabelWidth" prop="category">
                <el-select v-model="data.form.category" placeholder="请选择活动区域">
                    <el-option v-for="item in data.categoryOption" :key="item.id" 
                    :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="data.formLabelWidth" prop="title">
                <el-input v-model="data.form.title" autocomplete="off" placeholder="请输入标题"></el-input>
            </el-form-item>
             <el-form-item label="概况" :label-width="data.formLabelWidth" prop="content">
                <el-input type="textarea" v-model="data.form.content" autocomplete="off" placeholder="请输入概况"></el-input>
            </el-form-item>
        </el-form> 
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" :loading="data.submitLoading" @click="submit">确 定</el-button>
        </div>      
    </el-dialog>
</template>
<script>
import { AddInfo } from '@/api/new.js'
import { reactive, ref,watch} from '@vue/composition-api';
export default{
    name:'dialoginfo',
    // 单向数据流 父级 -- 子级  不能反向修改
    props:{
        flag:{
            type:Boolean,
            default:false,
        },
        category:{
            type:Array,
            default:()=>[],
        }
    }, 
    setup(props,{root,emit,refs}){
       const data = reactive({
          dialog_info_flag:false,
          formLabelWidth:'120px',
          form:{
              category:'',
              title:'',
              content:'',
          },
          submitLoading:false,
          categoryOption:[]   // 分类下拉
       })
       const resetForm = ()=>{
           refs.addForm.resetFields();
        //    data.form.category = ''
        //    data.form.title = ''
        //    data.form.content = ''
       }
       // 取消
       const close = (()=>{
         //data.dialog_info_flag = false; 
         emit('update:flag',false)
         //$emit('close',false)
         resetForm();
       })
       watch(()=> data.dialog_info_flag = props.flag )
       const openDialog = ()=>{
           data.categoryOption= props.category
           //console.log('category',props.category)
       }
       const submit = ()=>{
           if(!data.form.category){
              root.$message({
                     message:'分类不能为空',
                     type:'error'
              }); 
              return false;
           }
           if(!data.form.title){
              root.$message({
                     message:'标题不能为空',
                     type:'error'
              }); 
              return false;
           }
           if(!data.form.content){
              root.$message({
                     message:'概况不能为空',
                     type:'error'
              }); 
              return false;
           }
           let resquestData = {
                category:data.form.category,
                title:data.form.title,
                content:data.form.content
           }
           data.submitLoading = true;
           AddInfo(resquestData).then(res=>{
                let responsedata = res.data.data;
                //console.log('res3333',res)
                 root.$message({
                     message:responsedata.message,
                     type:'success'
                   }); 
                  data.submitLoading = false;
                  // 关闭窗口  重置表单
                  close();
                  // 刷新表格
                  emit("getListAddEmit",{name:'add'})
           }).catch(err=>{
                  data.submitLoading = false;
           })
       }
      
       return {
          data,
          close,
          openDialog,
          submit,
       }
    },
    
    // watch:{
    //    flag:{
    //      handler(newV,oldV){
    //          this.dialog_info_flag = newV
    //      }
    //    }
    // },
   
}
</script>

<style lang="scss" scoped>

</style>
