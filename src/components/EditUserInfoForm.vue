<template>
  <div>
   <el-dialog title="修改用户名称" :visible.sync="dialogFormVisible" @close='handleClose'>
  <el-form :model="form">
    <el-form-item label="用户新名称" :label-width="formLabelWidth">
      <el-input v-model="form.newname" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelUser">取消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
  export default{
      name:"EditUserInfoForm",
      data(){
          return{
            dialogFormVisible:true,
            formLabelWidth:'120px',
            form:{
            },
           
          }
      },
    methods: {
        editUser(){
            var _this=this
         var username=window.sessionStorage.getItem('username')
         var newname=_this.form.newname
        this.$axios.post('/UserRename/rename',{username,newname})
        .then(function(response){
          if(response.data.meta.status===200){
              _this.$message({
              message: response.data.meta.msg,
              type: 'success'
        });
            _this.dialogFormVisible=false
            window.sessionStorage.setItem('username',newname)
            _this.$router.push('/main')
            location.reload()
          }
          else{
                _this.$message.error(response.data.meta.msg);
                }
          
        })
        .catch(function(error){
          console.log(error)
        })
        },
        cancelUser(){
            this.$router.push('/main')
        },
        handleClose(){
          this.$router.go(-1)
        }
    }
    }
</script>