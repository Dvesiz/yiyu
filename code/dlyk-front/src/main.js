//import ... from...语句导入。从vue框架导入createApp函数
import { createApp } from 'vue'

//导入css样式，不需要from子句
//import './style.css'

//从./App.vue页面导入App组件
//import App from './App.vue'
import LoginView from './view/Loginview.vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import GameView from "./view/GameView.vue";
import App from "./App.vue";
//利用上面所导入createApp函数创建一个应用实例，并挂载到id为app的DOM元素上。mount是挂载到#app的DOM元素上
const app = createApp(LoginView)
app.use(ElementPlus)
app.mount('#app')
