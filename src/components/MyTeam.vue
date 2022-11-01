<template>
<div>
    <div class='right-menu' style='width:200px'>
    <h3 class='member'>团队成员</h3>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      >
      <el-menu-item >
        <el-tooltip class="item" effect="dark" content="队长" placement="top-start" style="margin-right:10px">
        <i class="el-icon-s-flag"></i>
        </el-tooltip>
        <span slot="title" >{{creatorname}}
        <el-tooltip class="item" effect="dark" content="解散队伍" placement="top-start" style="margin-right:10px">
        <i class="el-icon-error" style="margin-left:20px" @click='disBandTeam'></i>
        </el-tooltip>
        </span>
      </el-menu-item>

      <el-menu-item :index="item.id+ ''" v-for="item in members" :key="item.id">
      <el-tooltip class="item" effect="dark" content="队员" placement="top-start" style="margin-right:8px">
        <i class="el-icon-s-custom"></i>
        </el-tooltip>
        <span slot="title">
        {{item.membername}}
        <el-tooltip class="item" effect="dark" content="删除该队员" placement="top-start">
        <i class="el-icon-minus" style="margin-left:20px" @click='disMissMembers(item.membername)'></i>
        </el-tooltip>
        </span>
      </el-menu-item>

      <el-menu-item >
        <el-tooltip class="item" effect="dark" content="添加新队员" placement="top-start" style="margin-right:10px">
        <i class="el-icon-circle-plus-outline" style="margin-left:40px" @click='addMember'></i>
        </el-tooltip>
      </el-menu-item>

      
     
    </el-menu>
  </div>
    <!-- 文件夹 -->
    <el-tabs v-model="currentCid" type="card" class='aside-tab'
      background-color="#333744"
      editable @edit="editFolder"
      :collapse-transition='false'
      text-color="#fff"
      active-text-color="#ffd04b" 
      @tab-click="getNotes"> 
    <el-tab-pane :index="item.id+ ''" v-for="item in notelist" :key="item.id" :name="item.sharefoldername" :label="item.sharefoldername">
    <span slot="label">
    <el-tooltip class="item" effect="dark" content="修改笔记本名字" placement="top-start">
    <i class="el-icon-edit" style="margin-right:5px" @click="changeFolder"></i>
    </el-tooltip>
    {{item.sharefoldername}} 
    </span>
    </el-tab-pane>
  </el-tabs>
<ShareCards ref="cards" @editInfo="handleEditInfo" @addNote="handleAddNote" @updateInfo="getNotes" @changeFolder="changeFolder"></ShareCards>
<FolderEditForm ref="folderEditForm" @update="update" @mySharefileSelect='getNotes'></FolderEditForm>
<NoteShareEditor ref="noteShareEditForm" @updateInfo="getNotes"></NoteShareEditor>
<addMemberForm ref='addMemberForm' @update='showMembers'></addMemberForm>
</div>

</template>

<script>
import ShareCards from "../components/ShareCards.vue"
import NoteEditorForm from "../components/NoteEditorForm.vue"
import FolderEditForm from "../components/FolderEditForm.vue"
import NoteShareEditor from "../components/NoteShareEditor.vue"
import addMemberForm from '../components/addMemberForm'
 export default {
    name: "MyTeam",
    components:{ ShareCards, NoteEditorForm, FolderEditForm, NoteShareEditor, addMemberForm },
    data() {
      return{
        sharefoldernameForm:{sharefoldername:'',
            username:window.sessionStorage.getItem('username')
        },
        notenote:[],
        usernameForm:{
          username:window.sessionStorage.getItem('username')
        },
        notelist:[],
        currentCid:'',
        members:[],
        creatorname:window.sessionStorage.getItem('creatorname'),
      }
    },
    created(){
          this.getNoteList()
          this.showMembers()
      },
     methods:{
         logout() {
            window.sessionStorage.clear()
            this.$router.push('/Login')
        },
        //加载页面
        getNoteList(){
            var _this=this
            var username=window.sessionStorage.getItem('username')
            var teamname=window.sessionStorage.getItem('teamname')
            var creatorname=window.sessionStorage.getItem('creatorname')
            this.$axios.post('/ShowShare/show',{username,teamname,creatorname})
            .then(function(response){
                if(response.data.meta.status===200){
                      _this.notelist=response.data.data
                    if(_this.notelist!==null){
                        _this.currentCid=_this.notelist[0].sharefoldername
                        _this.getNotes()
                        
                    }
                    else{
                      _this.currentCid=null
                    }
                }
            })
            .catch(function(error){
                console.log(error)
            })
         
      },
      //每次操作完重新加载
        update(){
          var _this=this
          var username=window.sessionStorage.getItem('username')
            var teamname=window.sessionStorage.getItem('teamname')
            var creatorname=window.sessionStorage.getItem('creatorname')
         this.$axios.post('/showShare/show',{username,teamname,creatorname})
         .then(function(response){
           if(response.data.meta.status===200){
             _this.notelist=response.data.data
             if(_this.notelist.length>0){
             _this.currentCid=_this.notelist[0].sharefoldername
             _this.getNotes()
         }
           }
         })
        },
       //得到文件夹下的文件
        getNotes() {
          var _this=this
            window.sessionStorage.setItem('sharefoldername',null)
            window.sessionStorage.setItem('sharefoldername',_this.currentCid)
            var sharefoldername=_this.currentCid
            if(sharefoldername===null){
              return _this.$refs.cards.cards=null;
            }
            else{
                var username=window.sessionStorage.getItem('username')
                var teamname=window.sessionStorage.getItem('teamname')
                var creatorname=window.sessionStorage.getItem('creatorname') 
                this.$axios.post('/ShowShareNotes/show',{sharefoldername,username,teamname,creatorname})
                .then(function (response){
                  if(response.data.meta.status===200)
                  _this.$refs.cards.cards=response.data.data.notes
                  else
                  _this.$refs.cards.cards=null
                })
                .catch(function(error){
                  _this.$message.error(error)
                })
            }
            
        },
        //显示团队成员
        showMembers(){
            var _this=this
            var username=window.sessionStorage.getItem('username')
            var teamname=window.sessionStorage.getItem('teamname')
            var creatorname=window.sessionStorage.getItem('creatorname')
            this.$axios.post('/ShowMembers/show',{username,teamname,creatorname})
            .then(function(response){
                if(response.data.meta.status===200){
                    _this.members=response.data.data
                }
            })
            .catch(function(error){
                console.log(error)
            })
        },
        editFolder(targetName,action){
        //删除文件夹
      if(action==='remove'){
          var _this=this
        var username=window.sessionStorage.getItem('username')
        var creatorname=window.sessionStorage.getItem('creatorname')
        var teamname=window.sessionStorage.getItem('teamname')
        var sharefoldername=targetName
        console.log({username,teamname,creatorname,sharefoldername})
       this.$confirm('此操作将永久删除该笔记分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$axios.post('/DeleteShareFolder/delete',{username,teamname,creatorname,sharefoldername})
        .then(function(response){
            console.log(response)
            if(response.data.meta.status===200){
              _this.$message({
                  type: 'success',
                message: '删除成功!'
                });
                _this.update()
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
      //增加文件夹
      if(action==='add'){
          var _this=this
           this.$refs.folderEditForm.dialogFormVisible=true
           this.$refs.folderEditForm.isCreate=true
           this.$refs.folderEditForm.isShare=true
           this.$refs.folderEditForm.form.username=window.sessionStorage.getItem('username')
           this.$refs.folderEditForm.form.teamname=window.sessionStorage.getItem('teamname')
           this.$refs.folderEditForm.form.creatorname=window.sessionStorage.getItem('creatorname')
      }
      },
        
        //编辑笔记名称
         handleEditInfo(noteInfo){
           this.$refs.noteShareEditForm.dialogFormVisible=true
           this.$refs.noteShareEditForm.isCreate=false
           this.$refs.noteShareEditForm.form.sharenotename=noteInfo.notename
           this.$refs.noteShareEditForm.form.username=window.sessionStorage.getItem('username')
           this.$refs.noteShareEditForm.form.teamname=window.sessionStorage.getItem('teamname')
           this.$refs.noteShareEditForm.form.creatorname=window.sessionStorage.getItem('creatorname')
           this.$refs.noteShareEditForm.form.sharefoldername=window.sessionStorage.getItem('sharefoldername')

         },
         //添加笔记
         handleAddNote(){
            if(this.notelist===null){
                return this.$message.error('请先创建文件夹！')
           }
           else{
                this.$refs.noteShareEditForm.dialogFormVisible=true
                this.$refs.noteShareEditForm.isCreate=true
                this.$refs.noteShareEditForm.form={}
                this.$refs.noteShareEditForm.form.username=window.sessionStorage.getItem('username')
                this.$refs.noteShareEditForm.form.sharefoldername=window.sessionStorage.getItem('sharefoldername')
                this.$refs.noteShareEditForm.form.teamname=window.sessionStorage.getItem('teamname')
                this.$refs.noteShareEditForm.form.creatorname=window.sessionStorage.getItem('creatorname')
           }
           
         },
         //改变文件夹名字
         changeFolder(){
           this.$refs.folderEditForm.dialogFormVisible=true
           this.$refs.folderEditForm.isCreate=false
           this.$refs.folderEditForm.isShare=true
           this.$refs.folderEditForm.form.username=window.sessionStorage.getItem('username')
           this.$refs.folderEditForm.form.teamname=window.sessionStorage.getItem('teamname')
           this.$refs.folderEditForm.form.creatorname=window.sessionStorage.getItem('creatorname')
           this.$refs.folderEditForm.form.sharefoldername=window.sessionStorage.getItem('sharefoldername')
         },
         
        editNote(notename){
            this.$router.push({path:'/noteshare/edit',name:'NoteEdit',params:{notename:notename}})
        },
        //删除队员
        disMissMembers(membername){
            var _this=this
            var username=window.sessionStorage.getItem('username')
            var teamname=window.sessionStorage.getItem('teamname')
            var creatorname=window.sessionStorage.getItem('creatorname')
            if(creatorname!==username){
                return _this.$message.error('只有队长才可以操作队员')
            }
            if(membername===creatorname){
                return _this.$message.error('队长不可以离开队伍')
            }
            this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            _this.$axios.post('/DismissMember/dismiss',{username,membername,teamname})
            .then(function(response){
                if(response.data.meta.status===200){
                    _this.showMembers()
                    _this.$message({
                        type: 'success',
                      message: '删除成功!'
                      });
                      if(membername===username){
                        _this.$router.push('/share')
                      }
                }
            })
            })
        
        },
        //解散队伍
        disBandTeam(){
            var _this=this
            var username=window.sessionStorage.getItem('username')
            var teamname=window.sessionStorage.getItem('teamname')
            var creatorname=window.sessionStorage.getItem('creatorname')
            if(creatorname!==username){
                return _this.$message.error('只有队长才可以操作队员')
            }
            console.log({username,teamname})
            this.$confirm('此操作将解散该团队, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            _this.$axios.post('/DisbandTeam/disband',{username,teamname})
            .then(function(response){
                console.log(response)
                if(response.data.meta.status===200){
                    _this.$router.push('/share')
                    location.reload()
                    return _this.$message.success(response.data.meta.msg)
                }
            })
            })
        },
        //添加成员
        addMember(){
            var _this=this
            this.$refs.addMemberForm.dialogFormVisible=true
            this.$refs.addMemberForm.form.username=window.sessionStorage.getItem('username')
            this.$refs.addMemberForm.form.teamname=window.sessionStorage.getItem('teamname')
        }
        

         
     }
      
     
    
    
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
  background-color: #333744;
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

.refresh{
  position:absolute;
  top:5px;
  right:210px;
  font-size:35px;
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
.right-menu{
  position:absolute;
  right:0px;
  top:100px
}
.member{
    text-align: center;
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
   .el-menu-item{
     background-color: #e7f4fa;
   }
   .el-menu-item:hover{
     background-color: rgb(207, 234, 245);
   }
   .el-menu-item.is-active {
      background-color: #aee2fa;
      color: rgb(46, 76, 243);
      
    }
</style>