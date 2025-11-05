
<template>

    <el-container>
        <!-- 左侧边栏 -->
        <el-aside width="200px">
            <img src="../assets/logo.jpg" alt="logo" class="logo">
            <br>
            <p class="lefttext">
                欢迎使用亿语科技！
            </p>
        </el-aside>

        <!-- 右侧主内容区 -->
        <el-main>
            <div style="text-align: center; margin-top: 100px; margin-bottom: 30px; font-weight: 700;">欢迎登陆</div>

            <el-form ref="loginRefForm" :model="user" label-width="120px" :rules="loginrules">
                <el-form-item label="用户名" prop="loginAct">
                    <el-input v-model="user.loginAct" />
                </el-form-item>

                <el-form-item label="密 码" prop="loginPwd">
                    <el-input type="password" v-model="user.loginPwd" />
                </el-form-item>
                
                <el-form-item>
                    <el-button  type="primary" round @click="login">登 录</el-button>
                </el-form-item>

                <el-form-item>
                    <el-checkbox label="记住我" name="rememberMe"/>
                </el-form-item>
        
            </el-form>

        </el-main>
    </el-container>

</template>

<script >
import {doPost} from "../http/httpRequest.js";

export default {
    name: 'LoginView',
    //定义页面使用到的变量，定义时的初始值一般是空的
    data(){
        return{
            //对象变量定义，是{}
            user :{},
            //字符串变量定义，是''
            //name :'',
            //数字变量定义，是0
            //age : 0,
            //数组变量定义是，[]
            //arr :[],
            //list集合对象，是[{}]
            //userList :[{}],
            //定义登录表单中的验证规则
            loginrules : {
                //定义账号密码的验证规则，规则有多个，所以是数组
                loginAct:[
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度应该为1到100位', trigger: 'blur' },
                ],
                loginPwd:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度应该为6到16位', trigger: 'blur' },
                ]
            },
        }
    },
    //页面上需要使用的js函数，都在methods中定义
    methods: {
        //登录函数
        login(){
            //提交前验证输入框的合法性
            this.$refs.loginRefForm.validate( (isValid) => {
                //isValid是验证后的结果，true表示验证通过，否则未通过
                if (isValid) {
                  //验证通过，可以提交登录
                  let formData = new FormData();
                  formData.append("loginAct", this.user.loginAct);
                  formData.append("loginPwd", this.user.loginPwd);
                  doPost("/api/login", formData).then( (response) => {
                    console.log( response);
                  });
                }
            })
                
            
        }
    }
}
</script>

<style scoped>
.el-aside {
    background-color:white;
    width: 40%;
    height: 100vh;
    text-align: center;
}
.el-main {
    background-color: #f0f2f5;
    height: 100vh;
}
.logo {
    width: 80%;
    height: auto;
}
.lefttext{
    color: #000000;
    font-size: 36px; 
    font-weight: bold;
    margin-top: 16px;
}

.el-form{
    width: 60%;
    margin: auto;
}

.el-button{
    width: 100%;
    text-align: center;
}
</style>