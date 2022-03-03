<template>
    <el-form :model="form"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="信息分类:" prop="categoryId">
                 <el-select v-model="form.categoryId" placeholder="请选择信息分类">
                    <el-option v-for="item in data.category" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题:" prop="title">
               <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="缩略图:" prop="">
                <UploadImg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig" />
                <!-- <el-upload
                    action="uploadUrl"
                    :show-file-list="false"
                    :accept="'image/*'"
                    class="avatar-uploader"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleError"
                    :before-upload="beforeAvatarUpload"
                    >
                    <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
            </el-form-item>
            <el-form-item label="分布日期:" prop="dateTime">
                <el-date-picker
                    v-model="form.dateTime"
                    type="date" disabled
                    placeholder="选择日期">
                 </el-date-picker>
            </el-form-item>
            <el-form-item label="详细内容:" prop="content">
                 <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" style="margin-top:20px;padding:0 10px;height:30px;line-height:30px" @click="submit" :loading="data.submitLoading">保存</el-button>
            </el-form-item>
     </el-form>
</template>
<script>
import { GetList,EditInfo } from '@/api/new.js'
import { reactive, onMounted, onActivated,onDeactivated } from '@vue/composition-api';
import { timestampToTime } from '@/utils/common.js'
// 引入上传图片组件
import UploadImg from 'components/UploadImg'
// 富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css'
export default {
    name:'infoDetailed',
    components:{
        quillEditor,
        UploadImg,
    },
    setup(props,{root}) {
        // 图片上传配置
        const uploadImgConfig = reactive({
           uploadUrl:'http://up-z2.qinup.com',
           accesskey:'BBsPL9D46b_xmPucXLZBY1wSEFvYAcE0j4UcJyp2',
           secretkey:'w9DmI0OiPaw9wGf9UXnF_oBL8T26fZ-RkHmJX_xi',
           buckety:'yangcf3' 
        })
        const data = reactive({
            id:root.$route.params.id || root.$store.getters['infoDetail/infoId'],
            category:[],
            editorOption:{},
            submitLoading:false,
        })
        //let newsId = root.$route.params.newsId
        //let newsTitle = root.$route.params.newsTitle
        // 刷新页面 vuex 里面的值没有了 取值 sessionStorage里面的值
        //let id = root.$route.params.id || root.$store.getters['infoDetail/infoId'];
        //let title = root.$route.params.title || root.$store.getters['infoDetail/infoTitle']
        const form = reactive({
            categoryId:'',
            title:'',
            dateTime:'',
            content:'',
            imgUrl:'',
        })
        // 获取信息分类
        const getInfoCategory =()=>{
            root.$store.dispatch('common/getInfoCategory',{name:'jack'}).then(res=>{
              data.category = res.data.data;
            }).catch(err=>{

            })
        }
         const getEditDetailData = (params)=>{
            form.categoryId = params.id;
            form.title = params.title;
            form.dateTime = timestampToTime(params.date);
            form.content = params.category;
            form.imgUrl = params.imgUrl 
         }
         // 获取当前 id 的信息  请求接口渲染数据到弹框里面
         const getInfo = ()=>{
           let responseData = {
                id:data.id,
                pageNumber:1,
                pageSize:1,
           }
           GetList(responseData).then(res=>{
                // let responseData = res.data.data.data[0];
                // console.log('111111',res)
                // form.categoryId = responseData.id;
                // form.title = responseData.title;
                // form.dateTime = timestampToTime(responseData.date);
                // form.content = responseData.category;
                // form.imgUrl = responseData.imgUrl
                   
                    let responseData = res.data.data.data;
                    responseData.forEach(item=>{
                        if(item.id==='123' && (root.$route.params.index===0|| root.$store.getters['infoDetail/infoId']===0) || root.$route.params.index=== undefined){
                             getEditDetailData(item)
                        }else if(item.id==='456' &&  (root.$route.params.index===1||root.$store.getters['infoDetail/infoId']===1) ||root.$route.params.index=== undefined){
                             getEditDetailData(item)
                        }
                    })
           }).catch(err=>{

           })
        }
        // 保存信息
        const submit = ()=>{
           let resquestData = {
                categoryId:form.categoryId,
                title:form.title,
                content:form.category,
                id:data.id,
                imgUrl:form.imgUrl
           }
           data.submitLoading = true;
           EditInfo(resquestData).then(res=>{
                let responsedata = res.data.data;
                 root.$message({
                     message:responsedata.message,
                     type:'success'
                   }); 
                  data.submitLoading = false;
           }).catch(err=>{
                  data.submitLoading = false;
           })
        }

         onMounted(()=>{
           getInfoCategory()
           //getInfo()
         })
         // 组件用了 keep-alive 时 等于组件进行了缓存 再进缓存的组件  onActivated 会执行  onMounted 不会执行
         onActivated(()=>{   // 第2次进入同一组件时,onActivated 里面的接口会请求 其他地方的接口不会请求(用缓存)
            //第2次进缓存的组件时  只要把修改了的id 重新赋值就可以
            data.id = root.$route.params.id || root.$store.getters['infoDetail/infoId'],
            getInfo()
            //console.log('88888888888')
         })
         // onActivated 和  onDeactivated 是组件用了 keep-alive 时才有用  离开页面执行
         onDeactivated(()=>{
          
         })
         return{
             data,
             form,
             uploadImgConfig,
             submit,
         }
    },
}
</script>
<style lang="scss" scoped>


</style>