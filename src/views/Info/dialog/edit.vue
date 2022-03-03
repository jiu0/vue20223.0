<template>
    <!-- 修改弹框-->
    <el-dialog title="修改" :visible.sync="data.dialog_info_flag" @close="close" @open="openDialog" width="580px">
        <el-form :model="data.form" ref="editForm">
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
import { GetList,EditInfo } from '@/api/new.js'
import { reactive,watch,onMounted} from '@vue/composition-api';
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
        },
        // id:{
        //     type:String,
        //     default:'',
        // }
        idIndex:{
            type:Object,
            default:()=>{},
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
         refs['editForm'].resetFields();
         //refs.editForm.resetFields();
        //    data.form.category = ''
        //    data.form.title = ''
        //    data.form.content = ''
       }
       // 取消
       const close = (()=>{
         data.dialog_info_flag = false; 
         emit('update:flag',false)
         //$emit('close',false)
         resetForm();
       })
       watch(()=> data.dialog_info_flag = props.flag )
       const openDialog = ()=>{
           data.categoryOption= props.category
           getInfo()
       }
       const getInfo = ()=>{
           let responseData = {
                //id:props.id,
                id:props.idIndex.id,
                pageNumber:1,
                pageSize:1,
           }
           // 点开编辑窗口  从后台请求接口返回数据渲染到弹框里  所有一直请求数据里的第一条数据
           GetList(responseData).then(res=>{
                // let responseData = res.data.data.data[0];
                //  data.form = {
                //         category:responseData.id,
                //         title:responseData.title,
                //         content:responseData.category
                //     }
                let resData = res.data.data.data;
                resData.forEach(item=>{
                    //console.log('999999999',item)
                    if(item.id === '123' && props.idIndex.index===0 ){
                        data.form = {
                            category:item.id,
                            title:item.title,
                            content:item.category
                        }
                    }else if(item.id ==='456'&& props.idIndex.index===1){
                        data.form = {
                            category:item.id,
                            title:item.title,
                            content:item.category
                        }
                    }
                })     
           }).catch(err=>{

           }) 
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
                content:data.form.content,
                //id:props.id,
                id:props.idIndex.id,
           }
           data.submitLoading = true;
           EditInfo(resquestData).then(res=>{
                let responsedata = res.data.data;
                 root.$message({
                     message:responsedata.message,
                     type:'success'
                   }); 
                  data.submitLoading = false;
                  // 两种刷新数据的方式  1暴力型 直接刷新接口 2 返回列表 手动修改指定的数据
                  emit("getListEmit",{name:'gggggg'})
                  // 传递多方法
                  //emit("callbackComponent",{function:'getList',data:{name:'rose'}})
                  
                  //resetForm();  // 修改的时候 不要重置表单 
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
