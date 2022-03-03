<template>
    <div id="category">
        <div style="margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #f9f9f9;">
          <el-button type="danger" size="mini"  @click="addFirst({type:'categery_first_add'})" class="hide-button" v-btnPerm="'info.firstCategoryAdd'">添加一级分类</el-button>
        </div>
        <div>
          <el-row :gutter="30">
             <el-col :span="12">
                  <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                      <!-- 一级分类-->
                      <h4>
                          <svg-icon iconClass="jia" className="jia" />
                          <span class="news">{{firstItem.category_name}} </span>
                          <div class="button-group">
                              <el-button size="mini" type="danger" @click="editCategery({dataName:firstItem,type:'categery_first_edit'})" round>编辑</el-button>
                              <el-button size="mini" type="success" round @click="handlerAddChildren({dataName:firstItem,type:'categery_children_add'})">添加子级</el-button>
                              <el-button size="mini" round @click="deleteCategeryComfirm(firstItem.id)">删除</el-button>
                          </div>
                      </h4>
                      <!-- 子级分类-->
                      <ul v-if="firstItem.children">
                        <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                            {{ childrenItem.category_name}}
                           <div class="button-group">
                              <el-button size="mini" type="danger" round>编辑</el-button>
                              <el-button size="mini" round>删除</el-button>
                          </div>
                        </li>
                      </ul>
                  </div> 
             </el-col>
             <el-col :span="12">
                  <h4 class="menu-title">一级分类编辑</h4>
                  <el-form  label-width="120px" ref="categeryForm">
                        <el-form-item label="一级分类名称" v-if="category_first" style="margin:16px 0;width:400px">
                          <el-input v-model="formLabelAlign.name" :disabled="category_first_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称" v-if="category_second" style="margin:16px 0;width:400px">
                          <el-input v-model="formLabelAlign.region" :disabled="category_second_disabled"></el-input>
                        </el-form-item>
                         <el-form-item>
                            <el-button type="danger" size="mini" @click="submit" :disabled="submit_button_disabled" :loading="submit_loading">确定</el-button>
                         </el-form-item>
                  </el-form>
             </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
import { reactive, ref,watch,onMounted } from '@vue/composition-api';
import { AddList,AddFirstCategery,GetCategery,DeleteCategery,EditCategery,AddChildrenCategery } from '@/api/new.js';
import { global3 } from '@/utils/global3'
import { common } from '@/api/common'
//import axios from 'axios'
export default {
    name:'category',
    setup(props,{root,refs}){

      const { getInfoCategory,categoryInfo,getInfoCategoryAll } = common(); 
      // 确定按钮的类型
      const submit_button_type = ref('');
      const category_first =ref(true)
      const category_second =ref(true)
      const category_first_disabled = ref(true)
      const category_second_disabled = ref(true)
      const submit_button_disabled = ref(true)
      // 删除Id
      const deleteId = ref('')
      const { confirm3 } = global3(); 
      const category = reactive({
          item:[
            {
               id:"4",
               category_name:'观看现象2',
               children:[
                 {
                   id:"5",
                   category_name:'子类2'
                 },
                 {
                   id:"6",
                   category_name:'子类2'
                 },
               ]
            }, 
          ],
          current:[]
      })
      // 请求接口loading
      const submit_loading = ref(false)
      const formLabelAlign= reactive({
          name: '',
          region: '',
        });
      const submit = ()=>{
          if(submit_button_type.value === 'categery_first_add'){
               addFirstCategery();
          }
          if(submit_button_type.value === 'categery_first_edit'){
               editFirstCategery()     
          }
          if(submit_button_type.value === 'categery_children_add'){
               addChildrenCategory()     
          }
      }
      const addFirstCategery = ()=>{
              // 一级分类
              if(!formLabelAlign.name){
                  root.$message({
                        message:'添加一级分类不能为空',
                        type:'danger'
                      }); 
                  return false;
              }
              // 按钮的加载状态
              submit_loading.value = true;
              AddFirstCategery({categoryName:formLabelAlign.name}).then(res=>{
              let data = res.data.data;
              if(data.resCode === 0){   
                   root.$message({
                     message:data.message,
                     type:'success'
                   }); 
                   category.item.push(data) 
                   //getCategery(); 添加一级分级分类成功 调用getCategery 接口
              }
              submit_loading.value = false;
              formLabelAlign.name = '';
              formLabelAlign.region = '';
          }).catch(err=>{
              console.log("err:", err);
              submit_loading.value = false; 
              formLabelAlign.name = '';
              formLabelAlign.region = '';
          })
      }
      // 编辑一级分类
      const editFirstCategery = ()=>{
          if(category.current.length==0){
                 root.$message({
                     message:'未选择分类',
                     type:'error'
                 }); 
                 return false;
          }
          let requestData = {
               id:category.current.id,
               categoryName:formLabelAlign.name,
          }
          EditCategery(requestData).then(res=>{
              let responseData = res.data.data; 
               root.$message({
                     message:responseData.message,
                     type:'success'
                   }); 
               category.current.category_name = responseData.data.categoryName
              //  let data = category.item.filter(item=>item.id == category.current.id)
              //  data[0].category_name = responseData.data.categoryName
               // 清空输入框
               formLabelAlign.name = ''
               category.current = []
          }).catch(err=>{

          })
      }
      // 添加一级分类
      const addFirst = (params)=>{
         submit_button_type.value = params.type;
         category_first.value = true;
         category_second.value = false;
         category_first_disabled.value = false;
         submit_button_disabled.value = false;
      }
      // 添加子级分类
      const handlerAddChildren = (params)=>{
          // 更新确定按钮的类型
          submit_button_type.value = params.type
          console.log('params',params)
          category.current = params.dataName
          // 禁用一级输入框
          category_first_disabled.value = true;
          // 启动确定按钮
          submit_button_disabled.value = false;
          // 启用子级输入框
          category_second_disabled.value = false;
          // 显示子级输入框
          category_second.value = true;
          // 显示一级分类的文本
          formLabelAlign.name = params.dataName.category_name
      }
      // 添加子级确定按钮
      const addChildrenCategory = ()=>{
          if(!formLabelAlign.region){ 
             root.$message({
                message:"子级分类名称不能为空",
                type:'error'
             })
             return false;
          }
          let responseData = {
             categoryName:formLabelAlign.region,
             parentId:category.current.id,
          }
          AddChildrenCategery(responseData).then(res=>{
             let responseData = res.data.data;
             root.$message({
                message:responseData.message,
                type:'success'
             })
             // 子级添加完成后 调用获取全部子级的接口
             getInfoCategoryAll()
             // 清空子级输入框
             formLabelAlign.region = ''
          }).catch(err=>{
          })
      }
      // 获取一级分类
      // const getCategery = ()=>{
      //     GetCategery({}).then(res=>{
      //        let data = res.data.data;
      //        category.item = data;
      //     }).catch(err=>{
      //         console.log("err:", err);
      //     })
      // }
      // 删除一级分类
      const deleteCategeryComfirm = (categoryId) =>{
         deleteId.value = categoryId;
         confirm3({
                 content:'确认删除选中的数据,确认后无法恢复',
                 type:'success',
                 data:{
                    id:99999,
                    name:'kkkkkk',
                 },
                 fn:deleteCategery,
                 catchFn:()=>{
                     deleteId.value = ''
                 }
              })
         
      }
       // 修改一级分类
      const editCategery = (params)=>{
          category_second.value = false;
          category_first_disabled.value = false;
          submit_button_disabled.value = false;
          formLabelAlign.name = params.dataName.category_name
          submit_button_type.value = params.type;
          category.current = params.dataName;
       }
      //删除一级分类
      const deleteCategery = ()=>{
         DeleteCategery({categoryId:deleteId.value}).then(res=>{
            //let index = category.item.findIndex(item => item.id == deleteId.value)
            //category.item.splice(index,1)
            let newData =  category.item.filter(item=>item.id != deleteId.value)
            category.item=newData
         }).catch(err=>{
            
         })
      }
      watch(()=>categoryInfo.item,(value)=>{
          category.item = value;
       })
      onMounted(()=>{
        // getCategery();
        // 获取一级分类
        //getInfoCategory()
        // 获取全部分类
        getInfoCategoryAll()
        AddList({name:'gggg'}).then(res=>{
        })
        // axios.post("/userInfo").then(res => {
        //      console.log("这是登入信息:", res);
        //     });
        })
      return{
        category_first,
        category_second,
        formLabelAlign,
        category,
        submit,
        addFirst,
        deleteCategeryComfirm,
        editCategery,
        handlerAddChildren,
        addChildrenCategory,
        submit_loading,
        category_first_disabled,
        category_second_disabled,
        submit_button_disabled,
      }
   },
}
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";

.menu-title{
  line-height: 44px;
  padding-left:22px;
  background-color: #f3f3f3;

}
.category{
      line-height: 44px;
      position: relative;
      cursor: pointer;
    h4{
       padding-left:11px;
       position: relative;
    }
    .news{
        position:absolute;
        left:60px;
        top:0;
        //background-color: #fff;
    }
    ul{
      margin:0;
    }
    li{
        position: relative;
       // padding-left:40px;
        margin-left:20px;
        list-style: none;
    }
    li::before{
          content:'';
          position:absolute;
          left:-38px;
          top:20px;
          width:32px;
          border-bottom:1px solid #000;
        }
     li,h4,span{
       @include webkit(transition,all .3s ease 0);
       &:hover{  background-color: #f3f3f3;
          .button-group{
             display: block;
          }
       }
     }   
}
.category::after{
        content:'';
        position:absolute;
        left:22px;
        top:0;
        bottom:0;
        width:32px;
        border-left:1px dotted #000;
      }

.category:first-child::after{
   top:20px;
}

.category:last-child::after{
   bottom:23px;
}

.button-group{
    display: none;
    position:absolute;
    z-index:2;
    right:11px;
    top:0;
}

.el-button .el-button--danger{
   line-height: 34px;
}
.el-button--mini, .el-button--mini.is-round{
  padding:0 12px;
  line-height: 28px;
}

// 自定义指令显示隐藏按钮
.hide-button{display: none;}
.show-button{display:inline-block;}

</style>
