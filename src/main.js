import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import './assets/global.css'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './plugins/element.js'

Vue.use(mavonEditor)

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// axios.defaults.withCredentials=false
window.addEventListener('storage', function (e) {
  sessionStorage.setItem(e.key, e.oldValue)
});


axios.defaults.baseURL='http://152.136.207.211:8000'

new Vue({
  router,
  
  render: h => h(App)
}).$mount('#app')
