<template>
<div>
     
    
    <!-- 侧边栏菜单区 -->
       <el-tabs v-model="currentCid" type="card" class='aside-tab'
      background-color="#333744"
      :collapse-transition='false'
      text-color="#fff"
       editable @edit='deleteFolder'
      @tab-click="shownote"> 
    <el-tab-pane :index="item.id+ ''" v-for="item in notelist" :key="item.id" :name="item.foldername" :label="item.foldername" >
    <span slot="label">
    <el-tooltip class="item" effect="dark" content="修改笔记本名字" placement="top-start">
    <i class="el-icon-edit" style="margin-right:5px" @click="changeFolder"></i>
    </el-tooltip>
    {{item.foldername}} 
    </span>
    </el-tab-pane>

  </el-tabs>
 
</div>
</template>

<script>
 export default {
    name: "Header",
    data() {
      return{
        usernameForm:{
          username:window.sessionStorage.getItem('username')
        },
        
        //左侧菜单数据
        notelist:[],
        currentCid:'',
        //删除文件夹是否可见

      }
    },
     created(){
          this.getNoteList()
          window.sessionStorage.setItem('isshare',false)
      },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/Login')
      },
     
      //获取所有的菜单
      async getNoteList(){
        var _this=this
         const {data:res}= await this.$axios.post('/show/show',this.usernameForm)
         if(res.meta.status!==200) return this.$message.error('数据获取失败')
         _this.notelist=res.data
         if(_this.notelist!==null){
             _this.currentCid=_this.notelist[0].foldername
              _this.$emit('myfileSelect')
         }
      },
      shownote() {
          this.$emit('myfileSelect')
      },
      deleteFolder(targetName,action){
        if(action==='remove'){
             var _this=this
        let tabs = _this.notelist;
          let activeName = _this.currentCid;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          _this.currentCid = activeName;
          _this.notelist = tabs.filter(tab => tab.name !== targetName);

        var username=window.sessionStorage.getItem('username')
        var foldername=targetName
       this.$confirm('此操作将永久删除该笔记分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/DeleteFolder/delete',{username,foldername})
        .then(function(response){
            if(response.data.meta.status===200){
              _this.$message({
                  type: 'success',
                message: '删除成功!'
                });
                _this.$emit("update")
                location.reload()
            }
        })
        .catch(function(error){
          console.log(error)
        })

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
        else{
              this.$emit('addFolder');
        }
       
      },
      
      
      changeFolder(){
       this.$emit('changeFolder')
     },
    },
    
 }
</script>

<style scoped>
 .home-container {
  height: 100vh;
}
.container0{
height:100%
}

.el-header {
  background-color: #373d41;
  display:flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  color:#fff;
  font-size:30px;
  padding-bottom: 5px;
  }


.el-aside {
  background-color: #fcedf3;
  
}
.aside-menu{
    border-right:none;
}

.el-main {
  background-color: #eaedf1;
}
  
   #app>div:nth-child(7) .el-aside {
    height:100%;
  }

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}


.avatar{
position:absolute;
width:35px;
height:35px;
top:10px;
right:100px;
}
.head-button{
position:absolute;
top:10px;
right:10px;
}
.header-menu{
position:absolute;
top:0px;
right:400px;
height:20px;
}
.info-button{
  position: absolute;
  right:150px;
  top:10px;
}
/*导航条下方边框*/
   .aside-tab /deep/ .el-tabs__nav-scroll{
      border-bottom: 1px solid #000000;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }
  /* 导航条下方边框阴影*/
  .aside-tab /deep/ .el-tabs__nav-wrap {
     box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15) ;
  }
  /* 切换活动项的文字颜色*/
  .aside-tab /deep/ .el-tabs__item.is-active{    
    background-color: #a0def7;
   }
   .aside-tab /deep/ .el-tabs__item:hover{    
    color: #f8b147;  
    cursor: pointer;  
   }
   /* 切换活动项的长条颜色*/
   .aside-tab /deep/ .el-tabs__active-bar{
          background-color: #5eaaf1;   
   }
   .aside-tab /deep/ .el-tabs__new-tab{
          color:#474747;
          float:left;
          line-height:18px;  
          border:2px solid #6e6e6e;
          border-radius:3px;
          margin:6px 10px 6px 3px;
          font-size:18px
   }



</style>