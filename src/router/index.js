import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../components/Home.vue'
import ShareHome from '../components/ShareHome.vue'
import Header from '../components/Header.vue'
import Maintext from '../views/Maintext'
import myFile from '../views/myFile.vue'
import share from '../views/share.vue'
import MyTeam from '../components/MyTeam.vue'
import Notes from '../views/Notes.vue'
import Register from '../views/Register.vue'
import Cards from '../components/Cards.vue'
import NoteEdit from '../components/NoteEdit'
import ShareEdit from '../components/ShareEdit'
import CreateTeamForm from '../components/CreateTeamForm.vue'
import EditUserInfoForm from '../components/EditUserInfoForm.vue'
import EditUserInfoShareForm from '../components/EditUserInfoShareForm.vue'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name:"Notes"}
  },
  {
    path: '/notes',
    name: 'Notes',
    //懒加载
    component: ()=> import('../views/Notes.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
 
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:'/note',
    children:[
      {path: '/main',name: 'Maintext',component: Maintext},
      {path: '/note',name: 'myFile',component: myFile},
      {path: '/note/edit',name: 'NoteEdit',component: NoteEdit},
      {path: '/edituser' ,name: 'EditUserInfoForm',component:EditUserInfoForm},
    ]
  },
  {
    path: '/sharehome',
    name: 'ShareHome',
    component: ShareHome,
    redirect:'/share',
    children:[
      {path: '/share',name: 'share',component: share},
      {path: '/team/' ,name: 'MyTeam',component:MyTeam},
      {path: '/createTeam' ,name: 'CreateTeamForm',component:CreateTeamForm},
      {path: '/noteshare/edit',name: 'ShareEdit',component: ShareEdit},
      {path: '/edituser' ,name: 'EditUserInfoShareForm',component:EditUserInfoShareForm},
    ]
  },
  {path: '/cards',name: 'Cards',component: Cards},
  
  
  
  
 

  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  {//to and from are Route Object,next() must be called to resolve the hook
    //to将要访问的路径
    //from 代表从哪个路径来
    //next表示放行  next()    next(/Login)
  }

  if(to.path=='/Login'||to.path=='/register') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/Login')
  next()
})
export default router
