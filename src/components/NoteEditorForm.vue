<template>
  <div>
   <el-dialog title="编辑笔记本标题简介" :visible.sync="dialogFormVisible" >
  <el-form :model="form">
    <el-form-item label="笔记名称" :label-width="formLabelWidth">
      <el-input v-model="form.notename" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="笔记简介" :label-width="formLabelWidth">
       <el-input  type="textarea" :rows="3" v-model="form.abs" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="updateNote">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
  export default{
      name:"NoteEditorForm",
      data(){
          return{
            isCreate:false,
            isShare:false,
            dialogFormVisible:false,
            formLabelWidth:'120px',
            form:{
              
            },
          }
          
      },
    methods: {
      
        updateNote(){
            var _this=this
            var url
            //修改笔记名称
            if(!_this.isCreate){
                url='/NoteRename/rename'
                 console.log(this.form)
                this.$axios.post(url,this.form)
                .then(function(response){
               
                if(response.data.meta.status===200){
                _this.dialogFormVisible=false
                _this.$message.success(response.data.meta.msg)
                _this.$emit('updateInfo')
                }
                else{
                    _this.$message.error(response.data.meta.msg);
                }
            })
            .catch(function(error){
                _this.$message.error(error);
            })
            }
            else{
                url='/AddNote/add'
                this.$axios.post(url,this.form)
                .then(function(response){
                if(response.data.meta.status===200){
                _this.dialogFormVisible=false
                _this.$message.success('新建笔记成功！')
                _this.$emit('updateInfo')
                }
                else{
                    _this.$message.error(response.data.meta.msg);
                }
            })
            .catch(function(error){
                _this.$message.error(error);
            })
            }
            
        },
        
    }
  }
</script>