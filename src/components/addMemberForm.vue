<template>
  <div>
   <el-dialog title="添加新队员" :visible.sync="dialogFormVisible" >
  <el-form :model="form">
    <el-form-item label="队员名称" :label-width="formLabelWidth">
      <el-input v-model="form.newuser" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="addMember">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
  export default{
      name:"addMemberForm",
      data(){
          return{
            dialogFormVisible:false,
            formLabelWidth:'120px',
            form:{
            },
          }
      },
    methods: {
      addMember(){
          var _this=this
          this.$axios.post('/AddMember/add',this.form)
          .then(function(response){
              if(response.data.meta.status===200){
                 _this.$message({
                  type: 'success',
                message: response.data.meta.msg
                });
                
                _this.$emit('update')
                _this.dialogFormVisible=false
                 _this.form={
                    newuser:''
                }
              }
              else{
                _this.$message.error(response.data.meta.msg)
                 _this.form={
                    newuser:''
                }
               
              }
          })
          .catch(function(error){
              _this.$message.error(error)
          })
      },
      
        
    }
    }
</script>