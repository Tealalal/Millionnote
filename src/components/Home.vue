<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span class='mininote'>Mininote</span>
      </div>
      <el-tooltip class="item1" effect="dark" content="刷新页面" placement="top-start">
      <span class='refresh'><i class='el-icon-refresh' @click='refresh'></i></span>
      </el-tooltip>
      <el-tooltip class="item2" effect="dark" content="修改用户名" placement="top-start">
      <el-link type="primary" :underline="false" class='info-button' @click='editUserInfo(usernameForm.username)'>{{usernameForm.username}}</el-link>
    </el-tooltip>
       <el-upload
          class="avatar-uploader"
          action="#"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG"
          :http-request="upLoad"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="headUrl" :src="headUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
     </el-upload>


      <el-button class='head-button' type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu class='navmenu-left' background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false"  :default-active="activePath" >
          <!-- 一级菜单 -->
            <el-menu-item index="1" @click='maintext'>
            <i class="el-icon-s-home"></i>
            <span style="margin-left:18px">我的主页</span>
            </el-menu-item>
           <el-menu-item index="2" @click='goback'>
            <i class="el-icon-edit"></i>
            <span style="margin-left:18px">我的笔记</span>
            </el-menu-item>
            <el-menu-item index="3" @click='share'>
            <i class="el-icon-chat-line-round"></i>
            <span style="margin-left:18px">我的团队</span>
            </el-menu-item>
            

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      
      usernameForm:{
          username:window.sessionStorage.getItem('username')
        },
      headUrl:window.sessionStorage.getItem('img'),
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      
    }
  },
  
  methods: {
      refresh(){
          location.reload();
      },
     upLoad(file) {
       var _this=this
      const formData = new FormData();
      formData.append('image', file.file);
      var username= window.sessionStorage.getItem('username')
      this.$axios({
               url: '/Picture/upload',
               method: 'post',
               data: formData,
               headers: { 'Content-Type': 'multipart/form-data' },
           })
      .then(function(res) {
        if (res.data.meta.status === 200) {
          _this.successUrl = res.data.data.url; // 请求之后将返回的URL给修改的接口在进行一次修改请求
          var headUrl = res.data.data.url; // 请求成功之后赋给头像的URL
          _this.$message({
                  type: 'success',
                message: '头像上传成功！'
                });
                window.sessionStorage.setItem('img',headUrl)
          _this.$axios.post('/Picture/avatar',{headUrl,username})
          .then(function(response){
              console.log(response)
          })
          location.reload()
        } else {
          _this.$message('头像上传失败');
        }
      });
    },
     
    handleAvatarSuccess(res, file) {
      this.headUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return isJPG && isLt3M;
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    share(){
        this.$router.push('/share')
        window.sessionStorage.setItem('isshare',true)
      },
      maintext(){
        this.$router.push('/main')
        window.sessionStorage.setItem('isshare',false)
      },
      goback(){
        this.$router.push('/note')
        window.sessionStorage.setItem('isshare',false)
      },
      editUserInfo(username){
          //编辑个人信息，用户名
          this.$router.push('/edituser')
      }
  }
}
</script>

<style scoped>
.mininote{
  font-size:40px;
  margin-left:15px;
  font-weight:bold;
}
.item1{
  margin-right:20px;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  
}

.el-aside {
  background-color: #333744;
}
.navmenu-left{
  border-right:0px
}

.el-main {
  background-color: rgba(100, 190, 241,0.2);
  padding:0px
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 12px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.refresh{
  position:absolute;
  top:5px;
  right:210px;
  font-size:35px;
}
.head-button{
  position:absolute;
  top:10px;
  right:10px;
}
.info-button{
  position: absolute;
  right:150px;
  top:12px;
}
.avatar-uploader{
  display: flex;
  justify-content: center;
  margin-bottom: 3px;
  margin-right:70px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  align-items: center;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
}
.el-icon-plus:before {
    content: "\e6d9";
    position: absolute;
    right:100px;
    top:-35px;
}
.el-button--info{
  background-color: #67c8cf;
}
.el-link.el-link--primary {
    color: #fff;
}
.el-divider__text, .el-link {
    font-weight: 500;
    font-size: 24px;
}
</style>
