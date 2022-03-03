<template>
     <el-upload
             class="avatar-uploader"
             :action="config.uploadUrl" 
             :data="data.uploadKey"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="data.image" :src="data.image" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
</template>

<script>
import { reactive, onMounted,watch } from '@vue/composition-api';
import { QiniuToken } from '@/api/common.js'
export default {
    // 
    name:'uploadImg',
    props:{
      imgUrl:{
         type:String,
         default:'',
      },
      config:{
         type:Object,
         default:()=>{},
      }
    },
    setup(props,) {
        const data = reactive({
           image:'',
           uploadKey:{
               token:'',
               key:''
            }
        })
        const handleAvatarSuccess =(res, file)=> {
            //console.log('res',res)
            let img = `${root.$store.getters['common/qiniuUrl']}${res.key}`
            data.image = img; 
            //data.image = `${root.$store.getters['common/qiniuUrl']}${res.key}`;
            //data.image = `http://r7ndx2ysi.hn-bkt.clouddn.com/${res.key}`;
            //data.image = `${root.$store.getters['common/qiniuUrl']}g3.jpg`;
            emit("update:imgUrl",img)
        }
        const handleError =() =>{
             root.$error("上传失败,请重新上传图片!");
        }
        const beforeAvatarUpload=(file)=> {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                   root.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                   root.$message.error('上传头像图片大小不能超过 2MB!');
                }
                // 文件转码
                let suffix = file.name;
                let key = encodeURI(`${suffix}`)
                data.uploadKey.key = key 
                return isJPG && isLt2M;
         }
          // 获取七牛云token
         const getQiniuToken = ()=>{
             let responseData = {
                "accesskey":props.config.accesskey,
                "secretkey":props.config.secretkey,
                "buckety":props.config.buckety    // 空间名称
             }
             QiniuToken(responseData).then(res=>{
                 let dataToken = res.data.data
                 root.$message({
                     message:dataToken.message,
                     type:'success'
                }); 
                data.uploadKey.token = dataToken.data.token;
             }).catch(err=>{

             })
         }
         watch(()=>props.imgUrl,(value)=>{
             data.image = value
         })
        onMounted(()=>{
            getQiniuToken()
             console.log('config',props.config)
        })
        return {
            handleAvatarSuccess,
            handleError,
            beforeAvatarUpload,
            data,
        }
    },

}
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px solid red;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }

</style>