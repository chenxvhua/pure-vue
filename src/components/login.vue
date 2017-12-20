<template>
    <div class="login-wraper">
        <div class="login-content">
            <h1 class="login-title">登录</h1>
            <el-form :model="formData" label-position="left" status-icon :rules="rules" label-suffix=":"  ref="loginForm"  label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model="formData.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verifyCode">
                    <el-input v-model="formData.verifyCode" placeholder="请输入验证码" :maxlength="4" style="vertical-align: middle;width: 120px;margin-right: 10px; height: 40px; line-height: 40px;" class="code-input"></el-input>
                    <img  id="code"  @click="hanlderChangeCode" :src="codeImg" title="刷新验证码" style="vertical-align: middle; height: 40px; line-height: 40px;" class="pointer"/>
                 </el-form-item>
                <div class="txt-center">
                    <el-button type="primary" @click="handleSubmit">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import requestApi from '@/commonjs/requestApi';
    import md5 from 'js-md5';
    export default {
        data () {
            var validateUserName= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if(!this.formData.userName){
                        this.$refs.loginForm.validateField('userName');
                    }
                    callback();
                }
            };

            var validatePassword= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(!this.formData.password){
                        this.$refs.loginForm.validateField('password');
                    }
                    callback();
                }
            };

            var validateVerifyCode= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if(!this.formData.verifyCode){
                        this.$refs.loginForm.validateField('verifyCode');
                    }
                    callback();
                }
            };

            return {
                codeImg:require("../images/codeflush.png"),
                formData:{
                    userName:"",
                    password:"",
                    verifyCode:"",
                },
                rules: {
                    userName: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    verifyCode: [
                        { validator: validateVerifyCode, trigger: 'blur' }
                    ],
                },
            }
        },
        mounted(){
            this.hanlderChangeCode();
        },
        methods: {
            handleSubmit:function () {
                this.$refs["loginForm"].validate((valid) => {
                    if (valid) {
                        var that=this;
                        var load = new requestApi.login.login_userLogin();
                        load.param =that.formData;
                        load.exec(function( data ){
                            if(data.success){
                                localStorage.setItem('fullName', "张三");//测试环境
                                localStorage.setItem('token', "测试token");
                                that.$router.replace({ path: '/index'});
                            }
                            else{
                                that.hanlderChangeCode();
                            }
                        },function (error) {
                            that.hanlderChangeCode();
                        });
                    }
                    else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            hanlderChangeCode:function () {
                var load = new requestApi.login.login_getVerifyCode();
                var that=this;
                load.exec(function( data ){
                    console.log("data="+JSON.stringify(data));
                    that.codeImg="data:image/png;base64,"+data.data.verifyCode;
                },function (error) {
                    that.codeImg=require("../images/codeflush.png");
                });
            }
        }
    }
</script>
<style scoped>
   .login-wraper{
       position: absolute;
       top:0px;
       left:0px;
       bottom:0px;
       right:0px;
       height: 380px;
       width: 600px;
       margin:auto;
       background: #fff;
       padding: 20px;
       background-clip: padding-box;
       box-shadow: 0 25px 40px rgba(0, 0, 0, .3);
   }
   .login-content {
       width: 400px;
       margin: auto;
   }
   .login-title {
       text-align: center;
       color:#20a0ff;
       font-size: 32px;
   }
</style>