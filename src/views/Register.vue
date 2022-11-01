<template>
<div class='all'>  
    
    <img class='picture2' src='../assets/noteBackground.jpg'>

            <!-- 登录表单区域 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register-form">

      <h1>Register</h1>
        <!-- 用户名 -->
        <el-form-item prop="username" class='txtb'>
          <el-input v-model="registerForm.username" prefix-icon="iconfont icon-user" placeholder="Username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" class='txtb'>
          <el-input v-model="registerForm.password" prefix-icon="iconfont icon-3702mima" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <!-- 再次输入密码 -->
        <el-form-item prop="repassword" class='txtb'>
          <el-input v-model="registerForm.repassword" prefix-icon="iconfont icon-3702mima" type="password" placeholder="rePassword" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"  @click="register">注册</el-button>
          <el-button type="info"  @click="resetRegisterForm">重置</el-button>
        </el-form-item>

            <div class='bottom-text' @click='login'>点击登录</div>


      </el-form>
            
       
  </div>
</template>

<script>


 export default {
    name: 'Register',
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
                callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.repassword !== '') {
              this.$refs.registerFormRef.validateField('repassword');
          }
          callback();
        }
      };

        var validatePass2=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('再次输入密码'))
            }else if(value !==this.registerForm.password){
                callback(new Error('两次输入密码不一样！'))
            }else{
                callback()
            }
        }
    return {
      // 这是登录表单的数据绑定对象
      registerForm: {
        username: '',
        password: '',
        repassword:''
      },
      // 这是表单的验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        // 验证密码是否合法
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' },
            { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位，密码不能包含 用户名',trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: validatePass2, message: '两次密码不相同', trigger: 'blur', required: true }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetRegisterForm() {
      
      this.$refs.registerFormRef.resetFields()
    },
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if(!valid) return;
        const {data:res}=await this.$axios.post('/register/register',this.registerForm);
        if (res.meta.status !== 200) return this.$message.error('该用户名已经注册过了！')
        this.$message.success('注册成功')
        

        // // 2. 通过编程式导航跳转到登录界面，路由地址是 /Login
        this.$router.push('/Login')
      })
      
    },
    login(){
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
.all{
     height:100%;
     
     
 }
 .picture2{
    filter: blur(15px);
    width:1700px;
    height:920px;
 }

  *{
    margin:0;
    padding:0;
    text-decoration:none;
    font-family:montsereat;
    box-sizing:border-box;
}
 .register-form {
     width:360px;
     background: #f1f1f1;
     height: 580px;
     padding:80px 40px;
     border-radius:10px;
     position: absolute;
     left:50%;
     top:50%;
     transform: translate(-50%,-50%);
 }

 .login-form h1{
    text-align: center;
    margin-bottom: 60px;
}

.txtb{
    border: bottom 2px solid #adadad;
    position:relative;
    margin: 30px 0;
}

.txtb input{
    font-size: 15px;
    color:#333;
    border:none;
    width:100%;
    outline:none;
    background: none;
    padding :0 5px;
    height: 40px;
    border-style: solid;
    border-width:1px;
}

.txtb span::before{
    content:attr(data-placeholder);
    position:absolute;
    top:50%;
    left:50%;
    color:#adadad;
    transform: translateY(-50%);
    z-index: -1;
    transition: .5s;
}

.txtb span::after{
    content: "";
    position:absolute;
    width:0%;
    height:2px;
    left:0px;
    bottom:-2px;
    background: linear-gradient(120deg,#3498db,#8e44ad);
    transition: .5s;
}

.focus+span::before{
    top:-5px;
}
.focus +span::after{
    width:100%;
}
.logbtn{
    display: block;
    width: 100%;
    height: 50px;
    border:none;
    background: linear-gradient(120deg,#8e44ad,#3498db);
    background-size: 200%;
    color:#fff;
    outline:none;
    cursor:pointer;
    transition: .5s;
}

.logbtn:hover{
    background-position: right;
}
.bottom-text{
    margin-top:30px;
    text-align: center;
    font-size: 13px;
    cursor:pointer;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
  width:210px;
  
  
}
.btns .el-button{
  position:relative ;
  display: inline-block;
  padding:10px 20px;
  margin-top:15px;
  
  color:#000;
  border-radius:10px;
  text-decoration: none;
  font-weight:500;
  box-shadow:0 5px 15px rgba(0,0,0,0.2);
}


</style>