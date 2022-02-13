<template>
   <div id="login">
     <div class="login-wrap">
         <ul class="menu-tab">
             <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)"> {{item.txt}} </li>
         </ul>
         <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
            <el-form-item prop="username" class="item-form">
                <label for="username">邮箱</label>
                <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="password" class="item-form">
                <label for="password">密码</label>
                <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
             <el-form-item  prop="repassword" class="item-form"  v-if="'register'===model">
                <label>重复密码</label>
                <el-input type="text" v-model="ruleForm.repassword" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item  prop="code" class="item-form">
                <label>验证码</label>
                <el-row :gutter="10">
                    <el-col :span="15">
                      <el-input v-model.number="ruleForm.code" minlength="4" maxlength="4"></el-input>
                    </el-col>
                    <el-col :span="9">
                      <el-button type="success" @click="getCode()" :disabled="codeBtnStatus.status" style="padding:0;display:inline-block;width:100%">{{ codeBtnStatus.text }}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="block" :disabled="loginBtnStatus">{{ model==='login' ? '登录':'注册' }}</el-button>
            </el-form-item>
        </el-form>
     </div>
   </div>
</template>

<script>
import { GetCode,Register,Login } from '@/api/login'
import sha1 from 'js-sha1';
import { xxx } from '@/api/login.js'
import { stripscript,validateEmail,validatePass,validateVCode } from '@/utils/validate.js'
import { reactive,ref,isRef,toRefs, onMounted } from '@vue/composition-api'
export default {
  name: 'index',
  /*
   attrs:(...)  == this.$attrs
   emit:(...)  == this.$emit
   listeners:(...)  == this.$listeners
   parent:(...)  == this.$parent
   refs:(...)  == this.$refs
   root:(...)  == this
  */
 // setup(props,context){
    setup(props,{ refs,root }){

     function aaaa(){
       return {
          attrstt:0,
          slots:1,
          parent:2,
          rootaa:3
       }
     }
     let { attrstt,slots,parent,rootaa  } = aaaa();
     console.log('attrstt',attrstt)  
     let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户格式有误'));
        }else{
          callback();  // true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        // 过滤特殊字符  
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('密码为6到20位的数字+字母'));
        } else {
          callback();
        }
     };
     // 验证重复密码  
    //   let validaterepassword = (rule, value, callback) => {
    //     //if(model.value === 'login'){  callback(); }
    //     // 过滤特殊字符  
    //     ruleForm.repassword = stripscript(value);
    //     value =ruleForm.repassword;
    //     if (value === '') {
    //       callback(new Error('请再次输入密码'));
    //     } else if (value != ruleForm.password) {
    //       callback(new Error('重复密码不正确'));
    //     } else {
    //       callback();
    //     }
    //  };
     
    // 确认密码验证
    let validaterepassword = (rule, value, callback) => {
      //if(model.value === 'login'){  callback(); }
      ruleForm.repassword = stripscript(value);
      value = ruleForm.repassword;
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value != ruleForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };


     // 验证验证码
     let validateCode = (rule, value, callback) => {
        if (value === '') {
            return callback(new Error('请输入验证码'));
        }else if(validateVCode(value)){
            return callback(new Error('验证码格式有误'));
        }else{
            callback();
        }
      };
    // 这里放data 数据 自定义函数 生命周期

    // 倒计时
    const timer = ref(null);
    // 表单绑定数据
    const ruleForm = reactive({
          username: '1250837819@qq.com',
          password: '',
          repassword:'',
          code: ''
        })
    // 表单的验证
    const rules = reactive({
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          repassword: [
            { validator: validaterepassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }) 
    const menuTab = reactive([
          {txt:'登录',current:true,type:'login'},
          {txt:'注册',current:false,type:'register'}
        ])
        console.log('menuTab',menuTab)  // 是对象类型
     const model = ref('login') 
     // 登录注册按钮置灰
     const loginBtnStatus = ref(true)
     const codeBtnStatus = reactive({
           status:false,
           text:'获取验证码'
       })
     const codeBtnText = ref('')
     //model.value = 'aaaa' 
        console.log('model',model.value)  // 是基础数据类型
        console.log('isRef',isRef(menuTab) ? '是基础数据类型' :'是对象类型' )  
     const obj = reactive({
        x:0,
        y:1
     })
     const torefs = toRefs(obj);
     console.log('torefs',torefs.x.value)
     
     function useMousePosition(){
      const pos = reactive({
          x:4,
          y:5
      })
      return toRefs(pos)
     }
     const { x,y } = useMousePosition()
     console.log('useMousePosition',useMousePosition().x.value)
     // 生命周期  
     // 挂载完成
     onMounted(()=>{
        console.log('VUE_APP_ABC',process.env.VUE_APP_ABC)
     })
    const toggleMenu = (data=>{
        menuTab.forEach((item)=>{
            item.current = false;
        })
        data.current = true
        model.value = data.type;
        //refs['loginForm'].resetFields();
        refs.loginForm.resetFields();
    })
    // 获取验证码
    const getCode = (()=>{
         if(ruleForm.username == ''){
            root.$message.error('邮箱不能为空');
            return false;
         }
         if(validateEmail(ruleForm.username)){
            root.$message.error('邮箱格式有误,请重新输入！');
            return false;
         }
         codeBtnStatus.status = true;
         codeBtnStatus.text = '发送中'
         // 验证码需要传递的参数
         let data = {
           username:ruleForm.username,
           type: menuTab.type
         }
         //setTimeout(()=>{
            GetCode(data).then(res=>{
              let data = res.data;
              root.$notify({
                  title: '验证码',
                  message: data.data.vcode,
                  type: 'success',
                  duration: 10000
                });
              loginBtnStatus.value = false;
              countDown(20);
          }).catch(err=>{
              console.log('err',err)
          })
         //},3000)
    })
    
    // 倒计时
    const countDown = ((number)=>{
       // 防止定时器重复性点击
       if(timer.value){ clearInterval(timer.value) }
       let time = number;
       timer.value = setInterval(()=>{
          time--;
          if(time===0){
             clearInterval(timer.value)
             codeBtnStatus.status = false;
             codeBtnStatus.text = '再次发送'
          }else{
             codeBtnStatus.text = `倒计时${time}秒`
          }
       },1000) 
    })
    // 登录注册切换 清除倒计时
    const clearCountDown = (()=>{
      // 还原验证码按钮默认状态
      codeBtnStatus.status = false;
      codeBtnStatus.text = '获取验证码';
      clearInterval(timer.value);
    })

    // 登录接口
    const login = (()=>{
        let requestData = {
               username:ruleForm.username,
               password:sha1(ruleForm.password),
               repassword:sha1(ruleForm.repassword),
               code:ruleForm.code,
        }
        console.log('requestData444',requestData)
        // Login(requestData).then(res=>{
        //     console.log('res4444',res)
        // }).catch(err=>{
        //     console.log('err',err)
        // })
          Login(requestData).then(response => {
              console.log('requestData',requestData)
              let data = response.data;
              root.$notify({
                title: '结果',
                message: data.message,
                type: 'success',
                duration: 3000
              });
            }).catch(error => {
              codeBtnStatus.status = false;
              console.log(error);
            });
    })
    // 注册接口
    const register = (()=>{
           let requestData = {
               username:ruleForm.username,
               password:sha1(ruleForm.password),
               repassword:sha1(ruleForm.repassword),
               code:ruleForm.code
            }
            Register(requestData).then(response=>{
                let data = response.data;
                root.$notify({
                    title: '结果',
                    message: data.message,
                    type: 'success',
                    duration: 3000
                });
                    toggleMenu(menuTab[0])
                    clearCountDown();
            }).catch(err=>{
                console.log('err',err)
            })
    })
    // 提交表单
    const submitForm = (formName=>{
         // 为给定 ID 的 user 创建请求
        //context.refs[formName].validate((valid) => {
          refs[formName].validate((valid) => {
            // 表单提交成功
            if (valid) {
              if(model.value === 'login'){
                  login()
              }else if(model.value === 'register'){
                  register()
              }
            } else {
              console.log('error submit!!');
              return false;
            }
        })
      })
      
  // const submitForm = (formName => {
  //     refs[formName].validate((valid) => {
  //       if (valid) {
  //        // submitStatus.value = true;
  //         let requestData = {
  //           username: ruleForm.username,
  //           password: sha1(ruleForm.password), // 对密码进行前端sha1加密
  //           repassword: sha1(ruleForm.repassword),
  //           code: ruleForm.code
  //         };
  //         if (model.value == 'login') {
  //           Login(requestData).then(response => {
  //             console.log('requestData',requestData)
  //             let data = response.data;
  //             root.$notify({
  //               title: '结果',
  //               message: data.message,
  //               type: 'success',
  //               duration: 3000
  //             });
  //             clearInterval(timer.value);
  //             //updateBtnStatus(false, '验证码');
  //             codeBtnStatus.status = false;
  //             codeBtnStatus.text = '验证码'
  //             refs['ruleForm'].resetFields();
  //             // root.$router.push({
  //             //   name: 'Home'
  //             // })
  //           }).catch(error => {
  //             //submitStatus.value = false;
  //             console.log(error);
  //           });
  //         } else if (model.value == 'register') {
  //           Register(requestData).then(response => {
  //             let data = response.data;
  //             root.$notify({
  //               title: '结果',
  //               message: data.message,
  //               type: 'success',
  //               duration: 3000
  //             });
  //             refs['ruleForm'].resetFields();
  //             clearInterval(timer.value);
  //             codeBtnStatus.status = false;
  //             codeBtnStatus.text = '验证码'
  //             // updateBtnStatus(false, '验证码');
  //             menuTab.forEach(element => {
  //               if (element.type == 'login') {
  //                 element.current = true;
  //               } else {
  //                 element.current = false;
  //               }
  //             });
  //              model.value = 'login';
  //              refs['ruleForm'].resetFields();
  //           }, function (error) {
  //              codeBtnStatus.status = false;
  //             // console.log(error);
  //           })
  //         }
  //       } else {
  //         // console.log('error submit!!');
  //         return false;
  //       }
  //     });
  //   })

      return{
         menuTab,
         model,
         ruleForm,
         rules,
         loginBtnStatus,
         codeBtnStatus,
         toggleMenu,
         submitForm,
         getCode,
      }
  },

  created(){
  },
  props:{

  },
  watch:{

  }
 
}
</script>

<style lang="scss" scoped>
#login{
    height:100vh;
    background-color: #344a5f;
}
.login-wrap{
  width:300px;
  margin:auto;
}
.menu-tab{
       
    li{
      text-align:center;
       display:inline-block;
       width:88px;
       line-height:36px;
       font-size: 14px;
       color:#fff;
       border-radius: 2px;
       cursor: pointer;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
   label{
       text-align:left;
       display:block;
       color:#fff;
       font-size:14px;
       margin-bottom:3px;
   }
   .item-form{
       margin-bottom:3px;
   }
   .block{
       padding:0;
       margin-top:10px;
       display:inline-block;
       width:100%;
   }
}

</style>
