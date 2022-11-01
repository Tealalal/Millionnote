<template>
<div class='all'>
    <span class='title1'>SHARE</span>
 </div> 

</template>

<script>

 export default {
    name: "share",
    
    data() {
      return{
          teams:[],
      }
    },
    created(){
        // this.share()
    },
     methods:{
      
     }
    
    
 }
</script>

<style scoped>

 .all{
    
    min-height:100%;
    background-color:#93dbe4;
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
.all::after{
    
    display:block;
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    filter: blur(390px);
    
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
.title1{
    position: relative;
    z-index: 10;
    display:flex;
    min-height:90vh;
    width:100%;
    justify-content: center;
    align-items: center;
    font-size:5rem;
    color:#fab8b8;
    text-shadow:
         0px 0px 1px rgba(255,255,255, .6)
         0px 4px 4px rgba(0,0,0, .10);
    letter-spacing: .2rem;
}

</style>