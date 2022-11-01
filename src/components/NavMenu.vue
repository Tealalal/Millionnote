<template>
  <div class='navmenu' width='200px'>

   <el-menu
      default-active="2"
       
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="item.id+ ''" v-for="item in notelist" :key="item.id" :name="item.foldername" :label="item.foldername">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.foldername}}</span>
      </el-menu-item>
      
    </el-menu>

    </div>
</template>
<script>
  
  export default{
      name:"NavMenu",
      data(){
         return{
             notelist:[],
             usernameForm:{
                username:window.sessionStorage.getItem('username')
                },
            currentCid:''
         }
      },
      created(){
          //渲染笔记列表
          this.getNoteList()
      },
    methods: {
      async getNoteList(){
        var _this=this
         const {data:res}= await this.$axios.post('/show/show',this.usernameForm)
         if(res.meta.status!==200) return this.$message.error('数据获取失败')
         this.notelist=res.data
         if(_this.notelist.length>0){
             _this.currentCid=_this.notelist[0].foldername
              _this.$emit('myfileSelect')
         }
      },
      shownote() {
            this.$emit('myfileSelect')
      },
    }
  }
</script>
<style scoped>
.navmenu{
width:200px
}
</style>