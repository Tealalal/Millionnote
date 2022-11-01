<template>
  <div class='all'>  
    
    <img class='picture2' src='../assets/noteBackground.jpg'>

            <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form">

      <h1>Login</h1>
        <!-- 用户名 -->
        <el-form-item prop="username" class='txtb'>
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="Username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" class='txtb'>
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" @keyup.enter="login">登录</el-button>
          <el-button type="info"  @click="resetLoginForm">重置</el-button>
        </el-form-item>

            <div class='bottom-text'>
               
                <div @click="register" class='register'>点击注册</div>
                <el-divider direction="vertical"></el-divider>
                <a href='/#'>忘记密码</a>
            </div>


      </el-form>
            
       
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    //绑定事件
     window.addEventListener('keydown',this.keyDown);
  },
  destroyed(){
      //销毁事件
        window.removeEventListener('keydown',this.keyDown,false);
  },
  methods: {
    keyDown(e){
        //如果是回车则执行登录方法
      if(e.keyCode == 13){
        this.login();
      }
    },
    register(){
        this.$router.push('/register')
    },
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid) return;
        const {data:res}=await this.$axios.post('/login/login',this.loginForm);
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('username',res.data.username)
        window.sessionStorage.setItem('img',res.data.img)
        // // 2. 通过编程式导航跳转到主页，路由地址是 /note
        this.$nextTick(()=>{
          this.$router.push('/main')
        })
        
      })
      
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
 .login-form {
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
    margin-left:-12px;
    margin-top:30px;
    text-align: center;
    font-size: 13px;
    display: flex;
    justify-content: flex-end;
    width:210px;
    
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
.bottom-text .el-divider{
  margin-left:8px;
  margin-right:8px;
}
.register{
  cursor:pointer;
}



  </style>