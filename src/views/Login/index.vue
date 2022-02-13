<template>
  <div class="login" id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!-- form-start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="small">
        <label>邮箱
          <el-form-item prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
        </label>
        <label>密码
          <el-form-item prop="password">
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
        </label>
        <label v-if="'register'===formType">确认密码
          <el-form-item prop="repassword">
            <el-input type="text" v-model="ruleForm.repassword" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
        </label>
        <label>验证码</label>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model.number="ruleForm.code" maxlength="4"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" :disabled="vcodeStatus" class="btn-block" @click="getCode">{{vcodeText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="submitStatus" class="btn-block login-btn" @click="submitForm('loginForm')">{{formType=='login'?'登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
      <!-- form-end -->
      <el-row class="copyright">
        <p>Copy right © rufeike 2020. All rights reserved</p>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Login, GetCode, Register } from '@/api/login.js';
import sha1 from 'js-sha1';
import { reactive, ref } from '@vue/composition-api';
//import { stripscript, checkEmail } from '@/utils/validate.js';
import { stripscript,validateEmail,validatePass,validateVCode } from '@/utils/validate.js'
export default {
  name: "Login",
  setup (props, { refs, root, router }) {
    // 这里放置data数据、生命周期，自定义函数等
    // 验证账号
    let validateUsername = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式有误'));
      } else {
        callback();
      }
    };
    // 密码验证
    let validatepassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;

      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('密码位6至20位数字+字母'));
      } else {
        callback();
      }
    };

    // 确认密码验证
    let validaterepassword = (rule, value, callback) => {
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

    // 验证码验证码
    let checkCode = (rule, value, callback) => {
      let reg = /^[0-9]{4}$/;
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('验证码格式有误'));
          } else {
            callback();
          }
        }
      }, 600);
    };

    const ruleForm = reactive({
      username: '',
      password: '',
      repassword: '',
      code: '',
    });

    const rules = reactive({
      password: [
        { validator: validatepassword, trigger: 'blur' }
      ],
      repassword: [
        { validator: validaterepassword, trigger: 'blur' }
      ],
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      code: [
        { validator: checkCode, trigger: 'blur' }
      ]
    });

    const menuTab = reactive([
      { text: "登录", current: true, type: 'login' },
      { text: "注册", current: false, type: 'register' },
    ]);
    const formType = ref('login');
    const submitStatus = ref(true);
    const vcodeStatus = ref(false);
    const vcodeText = ref('验证码');
    const timer = ref(0);


    /**
     * 导航切换
     */
    const toggleMenu = (data => {
      menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      formType.value = data.type;
      resetFieldData();
      clearCountDown();
    });
   
    // 切换按钮 清除表单数据里的值
    const resetFieldData=(()=>{
        refs['loginForm'].resetFields();
    })

    // 更新按钮的状态 第2种写法
    const updateBtnStatus2 = ((params)=>{
        vcodeStatus.value = params.status
        vcodeText.value = params.text;
    })
    // 更新按钮状态
    const updateBtnStatus = ((status, text) => {
      vcodeStatus.value = status;
      vcodeText.value = text;
    });
    /**
     * 提交表单
     */
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        if (valid) {
          submitStatus.value = true;
          let requestData = {
            username: ruleForm.username,
            password: sha1(ruleForm.password), // 对密码进行前端sha1加密
            repassword: sha1(ruleForm.repassword),
            code: ruleForm.code
          };
          if (formType.value == 'login') {
            Login(requestData).then(response => {
              console.log('requestData',requestData)
              let data = response.data;
              root.$notify({
                title: '结果',
                message: data.message,
                type: 'success',
                duration: 3000
              });
              clearInterval(timer.value);
              updateBtnStatus(false, '验证码');
              refs['loginForm'].resetFields();
              root.$router.push({
                name: 'Home'
              })
            }).catch(error => {
              submitStatus.value = false;
              console.log(error);
            });
          } else if (formType.value == 'register') {
            Register(requestData).then(response => {
              let data = response.data;
              root.$notify({
                title: '结果',
                message: data.message,
                type: 'success',
                duration: 3000
              });
              refs['loginForm'].resetFields();
              clearInterval(timer.value);
              updateBtnStatus(false, '验证码');
              menuTab.forEach(element => {
                if (element.type == 'login') {
                  element.current = true;
                } else {
                  element.current = false;
                }
              });
              formType.value = 'login';
              refs['loginForm'].resetFields();
            }, function (error) {
              submitStatus.value = false;
              // console.log(error);
            })
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    })

    /**
     * 获取验证码
     */
    const getCode = (() => {
      if (ruleForm.username == '') {
        root.$message({
          message: '邮箱不能为空',
          type: 'error'
        });
        return false;
      } else if (validateEmail(ruleForm.username)) {
        root.$message({
          message: '邮箱格式不正确',
          type: 'error'
        });
        return false;
      }
      updateBtnStatus2({status:true,text:'发送中'});
      GetCode({ username: ruleForm.username, type: formType.value }).then(response => {
        let data = response.data;
        submitStatus.value = false;
        // 倒计时
        countDown(30);

        root.$notify({
          title: '验证码',
          message: data.data.vcode,
          type: 'success',
          duration: 10000
        });
      }, function (error) {
        updateBtnStatus(false, '验证码');
        console.log(error);
      })
    });

    // 登录注册切换 清除倒计时
    const clearCountDown = (()=>{
      // 还原验证码按钮默认状态
      updateBtnStatus(false,'验证码')
      clearInterval(timer.value);
    })

    

    // 定时器
    const countDown = ((numbmer) => {
      // 防止定时器重复性点击
      if(timer.value){ clearInterval(timer.value) }
      timer.value = setInterval(() => {
        numbmer--;
        if (numbmer > 0) {
          vcodeText.value = `倒计时${numbmer}秒`;
        } else {
          clearInterval(timer.value);
          vcodeStatus.value = false;
          vcodeText.value = '重新获取';
        }
      }, 1000);
    });

    return {
      menuTab,
      ruleForm,
      rules,
      formType,
      submitStatus,
      vcodeStatus,
      toggleMenu,
      submitForm,
      getCode,
      countDown,
      vcodeText
    }
  }
}
</script>

<style lang="scss" scorped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 360px;
  margin: auto;
  padding: 100px 10px;
}

.menu-tab {
  text-align: center;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.el-form-item--small .el-form-item__content,
.el-form-item--small .el-form-item__label {
  color: #fff;
}
.btn-block {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 19px;
}
.login-form {
  margin-top: 30px;
  label {
    text-align: left;
    display: block;
    color: #fff;
    font-size: 14px;
    margin-bottom: 3px;
  }
}
.copyright {
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 480px) {
  .login-wrap {
    width: 280px;
    margin: auto;
    padding: 50px 10px;
  }
}
</style>
