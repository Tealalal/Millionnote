<template>
<div>
  <el-card  v-for="item in cards" :key="item.id" class="box-card" style="display:inline-block;width:25%" shadow='hover'>
  <div slot="header" class="clearfix">
    <span>{{item.notename}}</span>
    <el-tooltip class="item" effect="dark" content="编辑笔记内容" placement="top-start">
      <el-button style="float: right; padding: 3px 0 ;margin-right:5px" type="text" @click='editNote(item.notename)'>
      <i class="el-icon-edit"></i></el-button>
    </el-tooltip>
    
    <el-tooltip class="item" effect="dark" content="编辑标题与简介" placement="top-start">
      <el-button style="float: right; padding: 3px 0 ;margin-right:9px" type="text" @click="editInfo(item)"><i class="el-icon-edit-outline"></i></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="删除笔记内容" placement="top-start">
      <el-button style="float: right; padding: 3px 0 ;margin-right:1px" type="text" @click="deleteNote(item.notename)"><i class="el-icon-delete"></i></el-button>
    </el-tooltip>
  </div>
  <div  class="text item">
    {{restrict(item.abs)}}
  </div>
</el-card>

<el-card class="box-card" style="display:inline-block;width:25%" shadow='hover'>
  <div slot="header" class="clearfix">
    <span>新增笔记</span>
  </div>
  <div class="text item">
    <i class='el-icon-circle-plus-outline' @click='addNote'></i>
  </div>
</el-card>
      
      
      

</div>
</template>
<script>
  export default{
    name:"Cards",
    data(){
        return{
          cards:[],
        }
    },
    methods: {
      restrict(abs){
        if(abs.length<48){
          return abs
        }
        else{
          return abs.substring(0,48)+'...'
        }
      },
     editInfo(cards){
       this.$emit('editInfo',cards)
     },
     //添加笔记
     addNote(){
          this.$emit('addNote')
     },
     //删除笔记
     deleteNote(notename){
       var _this=this
       var username=window.sessionStorage.getItem('username')
       var foldername=window.sessionStorage.getItem('foldername')
       this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$axios.post('/DeleteNote/delete',{username,foldername,notename})
        .then(function(response){
            if(response.data.meta.status===200){
              _this.$message({
                  type: 'success',
                message: '删除成功!'
                });
                _this.$emit("updateInfo")
            }
            else{
                _this.$message.error(response.data.meta.msg);
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
        
     },
     
     //编辑笔记
     editNote(notename){
       window.sessionStorage.setItem('notename',notename)
          this.$router.push({path:'/note/edit',name:'NoteEdit'})
     }
    }
  }
</script>
<style scoped>
.box-card{
 
  margin-left:30px;
}
.el-card {
    min-width: 380px;
    margin-right: 20px;
    margin-top:15px;
    transition: all .5s;
  }
  .el-card:hover{
    margin-top: -5px;
  }
   
  .el-card ::v-deep .el-card__header {
  padding: 2px 10px;
  background-color: rgba(100, 190, 250, 0.3);
  padding: 12px 14px;
    font-size: 14px;
}
.el-card ::v-deep .el-card__body {
  
  background-color: rgba(56, 147, 252, 0.3);
  height:80px
}
  
</style>