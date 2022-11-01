<template>
<div class='all'>
  <div class='container'>
    <div class='card'>
      <div class='content'>
        <h2>01</h2>
        <h3>我的笔记</h3>
        <p>私人不共享</p>
        <el-button @click='gotoNote'>我的笔记</el-button>
      </div>
    </div>

    <div class='card'>
      <div class='content'>
        <h2>02</h2>
        <h3>我的共享</h3>
        <p>团队共享</p>
        <el-button @click='gotoShare'>我的共享</el-button>
      </div>
    </div>
</div>

 </div> 
 
</template>
<script>
  
  export default{
    name:"Mainpage",
    methods: {
      gotoNote(){
        this.$router.push('/note')
      },
      gotoShare(){
        this.$router.push('share')
      }
    }
  }
</script>
<style scoped>
.all{
  height:100%;
  margin:0;
  padding:0;
  box-sizing: border-box;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100%;
    background-color:#aee8f0;
    background-image: 
        radial-gradient(closest-side,rgb(100, 190, 241),rgba(100, 190, 241,0)),
         radial-gradient(closest-side,rgb(146, 226, 250),rgba(146, 226, 250,0)),
         radial-gradient(closest-side,rgb(248, 232, 152),rgba(248, 232, 152,0)),
           radial-gradient(closest-side,rgb(179, 198, 250),rgba(179, 198, 250,0)),
            radial-gradient(closest-side,rgb(248, 204, 168),rgba(248, 204, 168,0));
    background-size:
        130vmax 130vmax,
        80vmax 80vmax,
        80vmax 80vmax,
        110vmax 110vmax,
        90vmax 90vmax;
    background-position:
        -80vmax -80vmax,
        60vmax 60vmax,
        0vmax -10vmax,
        -10vmax -10vmax,
        50vmax 50vmax;
    background-repeat: no-repeat;
    animation: 10s movement linear infinite;
}
.all::before{
  
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: linear-gradient(#f00,#f0f);
  clip-path:circle(30 at right 70%);
}
.all::after{
  
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: linear-gradient(#2196f3,#e91e63);
  clip-path:circle(20 at 10% 10%);
}
.container{
  position: relative;
  display: flex;
  justify-content: center;
  align-items:center;
  max-width:1200px;
  flex-wrap: wrap;
  z-index:1;
}
.card{
  position:relative;
  width: 280px;
  height:400px;
  margin:30px;
  box-shadow:20px 20px 50px rgba(0,0,0,0.5);
  border-radius:15px;
  background:  rgba(216, 238, 15, 0.068);
  overflow:hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top:1px solid rgba(255,255,255,0.5);
  border-left:1px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(5px);
}
.card.content{
  padding:20px;
  text-align: center;
  transition: 0.5s;
}

.content h2{
  position: absolute;
  top:-100px;
  right:30px;
  font-size:8em;
  color:rgba(252, 249, 249, 0.13);
  pointer-events: none;
}
.content h3{
  font-size:1.8em;
  color:#fff;
  z-index:  1;
}
.content p{
  font-size:1em;
  color:#fff;
  font-weight: 300;
}
.content .el-button{
  position:relative ;
  display: inline-block;
  padding:10px 20px;
  margin-top:15px;
  background:#fff;
  color:#000;
  border-radius:20px;
  text-decoration: none;
  font-weight:500;
  box-shadow:0 5px 15px rgba(0,0,0,0.2);
}
.content .el-button:active{
  color:#dbe1c2;
}
.content .el-button:hover{
  color:#9cd3f3;
}
@keyframes movement{
    0%,100%{
        background-size:
        130vmax 130vmax,
        80vmax 80vmax,
        80vmax 80vmax,
        110vmax 110vmax,
        90vmax 90vmax;
        background-position:
        -80vmax -80vmax,
        60vmax 60vmax,
        0vmax -10vmax,
        -10vmax -10vmax,
        50vmax 50vmax;
    }
    25%{
        background-size:
        100vmax 100vmax,
        90vmax 90vmax,
        100vmax 100vmax,
        90vmax 90vmax,
        60vmax 60vmax;
        background-position:
        -60vmax -90vmax,
        50vmax 40vmax,
        3vmax -20vmax,
        -40vmax -20vmax,
        40vmax 60vmax;
    }
    50%{
        background-size:
        80vmax 80vmax,
        110vmax 110vmax,
        80vmax 80vmax,
        60vmax 60vmax,
        80vmax 80vmax;
        background-position:
        -50vmax -70vmax,
        40vmax -30vmax,
        10vmax 0vmax,
        20vmax 10vmax,
        30vmax 70vmax;
    }
    75%{
        background-size:
        90vmax 90vmax,
        90vmax 90vmax,
        110vmax 100vmax,
        90vmax 90vmax,
        70vmax 70vmax;
        background-position:
        -50vmax -40vmax,
        50vmax -30vmax,
        20vmax 0vmax,
        -10vmax 10vmax,
        40vmax 60vmax;
    }
}

</style>