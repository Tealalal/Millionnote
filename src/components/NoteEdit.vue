<template>
  <div>
  <el-header>
    <span>{{note.notename}}</span>
    <span>
    <el-tooltip class="item" effect="dark" content="返回上级" placement="left-start">
      <i class='el-icon-refresh-left' @click='returnto'></i>
    </el-tooltip></span>
    </el-header>
    <mavon-editor ref='md' v-model="note.content_md" @save="saveNote" @imgAdd="$imgAdd"></mavon-editor>
  </div>
</template>

<script>


 export default {
     name:"NoteEdit",
    
     data() {
      return {
       usernameForm:{
          username:window.sessionStorage.getItem('username')
        },
       note:{
           content_md:''
       },
       
      }
    },
   created(){
     this.loadNote()
     
   },
    mounted(){
        if(this.$route.params.notename){
            this.loadNote(this.$route.params.notename)
        }
    },
    
    methods: {
      
      returnto(){
        this.$router.push('/note')
      },
      loadNote(){
          var _this=this
          var username=window.sessionStorage.getItem('username')
          var foldername=window.sessionStorage.getItem('foldername')
          var notename=window.sessionStorage.getItem('notename')
        this.$axios.post('/NoteRead/read',{username,foldername,notename})
        .then(function(response){
            if(response.data.meta.status===200){
                _this.note=response.data.data.note
            }
            
        })
        .catch(function(error){
            console.log(error)
        })
      },
      saveNote(){
        var _this=this
          var url='/NoteUpdate/update'
          var username=window.sessionStorage.getItem('username')
          var foldername=window.sessionStorage.getItem('foldername')
          var notename=this.note.notename
          var content_html=this.note.content_html
          var content_md=this.note.content_md
          this.$axios.post(url,{username,foldername,notename,content_html,content_md})
          .then(function(response){
              if(response.data.meta.status===200){
                _this.$message({
                  type: 'success',
                message: response.data.meta.msg
                });
              }
          })
          .catch(function(error){
              console.log(error)
          })
      },
      $imgAdd(pos,$file){
        var _this=this
          var formData = new FormData();
          
           formData.append('image', $file);
           this.$axios({
               url: '/Picture/upload',
               method: 'post',
               data: formData,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
             
             if(url.data.meta.status===200){
               _this.$message({
                  type: 'success',
                message: '图片上传成功！请及时保存'
                });
                _this.$refs.md.$img2Url(pos, url.data.data.url);
             }
               else{
                 _this.$message.error(error)
               }
               
           })
      }
      },
    
 }
 
</script>
<style scoped>
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