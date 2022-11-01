<template>
  <div>
   <el-dialog title="编辑笔记本分类" :visible.sync="dialogFormVisible" >
  <el-form :model="form">
    <el-form-item label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="createFolder">确定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
  export default{
      name:"FolderEditorForm",
      data(){
          return{
            isCreate:false,
            dialogFormVisible:false,
            formLabelWidth:'120px',
            isShare:false,
            form:{
             
            },
          }
          
      },
    methods: {
      
        createFolder(){
            var _this=this
            var url
            //非共享
            if(_this.isShare===false){
              //修改文件夹
                if(!_this.isCreate){
                console.log(this.form)
                url='/FolderRename/rename'
                this.$axios.post(url,this.form)
                .then(function(response){
                if(response.data.meta.status===200){
                _this.dialogFormVisible=false
                _this.$message.success('笔记本重命名成功！')
                _this.form={
                  id:'',
                  name:''
                }
                _this.$emit("update")
                }
                else{
                    _this.$message.error(response.data.meta.msg);
                }
            })
            .catch(function(error){
                _this.$message.error(error);
            })
            }
            //新建文件夹
            else{
                url='/AddFolder/addfolder'
                this.$axios.post(url,this.form)
                .then(function(response){
                if(response.data.meta.status===200){
                _this.dialogFormVisible=false
                _this.$message.success('创建成功')
                _this.form={
                  id:'',
                  name:''
                }
                _this.$emit("update")
                }
                else{
                    _this.$message.error(response.data.meta.msg);
                }
            })
            .catch(function(error){
                _this.$message.error(error);
            })
            }
            }
            //共享
            else{
              //修改文件夹名称
              if(!_this.isCreate){
                  console.log(this.form)
                url='/ShareFolderRename/rename'
                this.$axios.post(url,this.form)
                .then(function(response){
                  console.log(response)
                if(response.data.meta.status===200){
                _this.dialogFormVisible=false
                _this.$message.success('成功')
                _this.form={
                  id:'',
                  name:''
                }
                _this.$emit("update")
                }
                else{
                    _this.$message.error(response.data.meta.msg)
                }
            })
            .catch(function(error){
                _this.$message.error(error);
            })
              }
              else{
                //新建文件夹
                  url='/AddShareFolder/add'
                  console.log(this.form)
                this.$axios.post(url,this.form)
                .then(function(response){
                if(response.data.meta.status===200){
                _this.dialogFormVisible=false
                _this.$message.success('创建成功')
                _this.form={
                  id:'',
                  name:''
                }
                _this.$emit("update")
                }
                else{
                    _this.$message.error(response.data.meta.msg);
                }
            })
            .catch(function(error){
                _this.$message.error(error);
            })
              }

            }
            
        },
         
    }
  }
</script>