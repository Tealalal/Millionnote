<template>
  <div>
   <el-dialog title="创建团队" :visible.sync="dialogFormVisible" @close='handleClose'>
  <el-form :model="form">
    <el-form-item label="团队名称" :label-width="formLabelWidth">
      <el-input v-model="form.teamname" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelTeam">取消</el-button>
    <el-button type="primary" @click="createTeam">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
  export default{
      name:"CreateTeamForm",
      data(){
          return{
            isCreate:false,
            isShare:true,
            dialogFormVisible:true,
            formLabelWidth:'120px',
            username:window.sessionStorage.getItem('username'),
            form:{
              
            },
          }
          
      },
    methods: {
      createTeam(){
          var _this=this
         var username=_this.username
         var teamname=_this.form.teamname
        this.$axios.post('/CreateTeam/create',{username,teamname})
        .then(function(response){
          if(response.data.meta.status===200){
              _this.$message({
              message: '创建成功',
              type: 'success'
        });
            _this.dialogFormVisible=false
            _this.$router.push({name: 'MyTeam', query: {teamname:_this.teamname}})
            
          }
          else{
                _this.$message.error(response.data.meta.msg);
                }
          
        })
        .catch(function(error){
          console.log(error)
        })
      },
      
      cancelTeam(){
          this.$router.push('/share')
      },
      handleClose(){
        this.$router.go(-1);
      }
    }
        
    }
 
</script>