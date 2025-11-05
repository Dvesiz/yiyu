import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import GameView from './view/GameView.vue'

const app = createApp(GameView)
app.use(ElementPlus)
app.mount('#app')