<template>
  <div>
  <el-header>
    <span>{{note.notename}}</span>
    <span>
    <el-tooltip class="item" effect="dark" content="返回上级" placement="left-start">
      <i class='el-icon-refresh-left' @click='returnto'></i>
    </el-tooltip></span>
    </el-header>
    
    <mavon-editor ref='md' v-model="note.content_md" @save="saveNote" @imgAdd="$imgAdd" @change='changeNote'></mavon-editor>
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
       teamname:window.sessionStorage.getItem('teamname'),
       timer:null,
       ws:null,
      }
    },
    created(){
        var _this=this
        var username=window.sessionStorage.getItem('username')
        this.loadNote()
        //  this.timer=window.setInterval(()=>{
        //     setTimeout(this.loadNote(),0);
        //   },10000);
        this.ws=new WebSocket('ws://152.136.207.211:2345')

        this.ws.onopen = function(){
             _this.ws.send(JSON.stringify({type:"bind",username}));

        };
        this.ws.onclose=function(){
            
        }
        this.ws.onmessage=function(e){
            let data=JSON.parse(e.data)
            console.log(data)
                _this.note.content_md=data.md
                
        };
    },
    mounted(){
        if(this.$route.params.notename){
            this.loadNote(this.$route.params.notename)
        }
    },
    //  beforeDestroy(){
    //   clearInterval(this.timer);        
    //   this.timer = null;
    // },
    methods: {
      returnto(){
        var _this=this
        this.$router.push({name: 'MyTeam', query: {teamname:_this.teamname}})
      },
      getMd(){ 
        
          return this.$refs.md.d_value
      },
      //编辑框内变化就调用
      changeNote(){

        var md=this.getMd()
        let msg={
          teamname:window.sessionStorage.getItem('teamname'),
          creatorname:window.sessionStorage.getItem('creatorname'),
          type:'text',
          username:window.sessionStorage.getItem('username'),
          md
        }
        
        this.ws.send(JSON.stringify(msg))
        
      },
      //加载笔记
      loadNote(){
          var _this=this
          var username=window.sessionStorage.getItem('username')
          var sharefoldername=window.sessionStorage.getItem('sharefoldername')
          var teamname=window.sessionStorage.getItem('teamname')
          var creatorname=window.sessionStorage.getItem('creatorname')
          var sharenotename=window.sessionStorage.getItem('notename')
        this.$axios.post('/ShareNoteRead/read',{username,sharefoldername,sharenotename,creatorname,teamname})
        .then(function(response){
            if(response.data.meta.status===200){
              _this.note=response.data.data.note
                
            }
        })
        .catch(function(error){
            console.log(error)
        })
      },
      //保存笔记
      saveNote(){
        var _this=this
          var url='/ShareNoteUpdate/update'
          var username=window.sessionStorage.getItem('username')
          var sharefoldername=window.sessionStorage.getItem('sharefoldername')
          var teamname=window.sessionStorage.getItem('teamname')
          var creatorname=window.sessionStorage.getItem('creatorname')
          var sharenotename=window.sessionStorage.getItem('notename')
          var content_html=this.note.content_html
          var content_md=this.note.content_md
          this.$axios.post(url,{username,sharefoldername,sharenotename,creatorname,teamname,content_html,content_md})
          .then(function(response){
              if(response.data.meta.status===200){
                _this.$message({
                  type: 'success',
                message: response.data.meta.msg
                });
              }
              else{
                _this.$message.error(response.data.meta.msg)
              }
          })
          .catch(function(error){
              _this.$message.error(error)
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
  

.header-menu{
position:absolute;
top:0px;
right:400px;
height:20px;
}

</style>