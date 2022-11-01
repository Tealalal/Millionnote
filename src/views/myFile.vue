<template>
<div>
<Header ref="header" @myfileSelect="getNotes" @addFolder="addFolder" @update="update" @changeFolder="changeFolder"></Header>
<Cards ref="cards" @editInfo="handleEditInfo" @addNote="handleAddNote" @updateInfo="getNotes"></Cards>
<NoteEditorForm ref="noteEditForm" @updateInfo="getNotes"></NoteEditorForm>
<FolderEditForm ref="folderEditForm" @update="update"></FolderEditForm>

</div>

</template>

<script>
import Header from "../components/Header.vue"
import Cards from "../components/Cards.vue"
import NoteEditorForm from "../components/NoteEditorForm.vue"
import FolderEditForm from "../components/FolderEditForm.vue"
import Share from './share.vue'
 export default {
    name: "myFile",
    components:{ Header, Cards, NoteEditorForm, FolderEditForm, Share},
    data() {
      return{
        foldernameForm:{foldername:'',
                        username:window.sessionStorage.getItem('username')
        },
        notenote:[],
        usernameForm:{
          username:window.sessionStorage.getItem('username')
        },
      }
    },
    
     methods:{
       //得到文件夹下的文件
        getNotes() {
          var _this=this
            this.foldernameForm.foldername=this.$refs.header.currentCid
            window.sessionStorage.setItem('foldername',this.foldernameForm.foldername)
            this.$axios.post('/ShowPersonalNotes/show',this.foldernameForm)
            .then(function (response){
              if(response.data.meta.status===200){
                   _this.$refs.cards.cards=response.data.data.notes
              }
              else
              _this.$refs.cards.cards=null
            })
        },
        //每次操作完重新加载
        update(){
          var _this=this
         this.$axios.post('/show/show',this.usernameForm)
         .then(function(response){
           console.log(response.data)
           if(response.data.meta.status===200){
             _this.$refs.header.notelist=response.data.data
             
             if(response.data.data!==null) {
                 _this.$refs.header.currentCid=_this.$refs.header.notelist[0].foldername
              _this.getNotes()
             }
            
           }
         })
        
         
        },
         handleEditInfo(noteInfo){
           this.$refs.noteEditForm.dialogFormVisible=true
           this.$refs.noteEditForm.isCreate=false
           this.$refs.noteEditForm.form.name=noteInfo.notename
           this.$refs.noteEditForm.form.username=window.sessionStorage.getItem('username')
           this.$refs.noteEditForm.form.foldername=window.sessionStorage.getItem('foldername')
         },
         //添加笔记
         handleAddNote(){
           if(this.$refs.header.notelist===null){
                return this.$message.error('请先创建文件夹！')
           }
           else{
              this.$refs.noteEditForm.dialogFormVisible=true
              this.$refs.noteEditForm.isCreate=true
              this.$refs.noteEditForm.form={}
              this.$refs.noteEditForm.form.username=window.sessionStorage.getItem('username')
              this.$refs.noteEditForm.form.foldername=window.sessionStorage.getItem('foldername')
           }
           
           
         },
         addFolder(){
           this.$refs.folderEditForm.dialogFormVisible=true
           this.$refs.folderEditForm.isCreate=true
           this.$refs.folderEditForm.form.username=window.sessionStorage.getItem('username')
         },
         changeFolder(){
           this.$refs.folderEditForm.dialogFormVisible=true
           this.$refs.folderEditForm.isCreate=false
           this.$refs.folderEditForm.form.username=window.sessionStorage.getItem('username')
           this.$refs.folderEditForm.form.foldername=window.sessionStorage.getItem('foldername')
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

</style>