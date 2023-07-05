import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import * as ELIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import './router/permission'

import svgIcon from "./components/SvgIcon/index.vue";
import 'virtual:svg-icons-register'

import tools from "./utils/tool";

const app = createApp(App)
for (const iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
app.config.globalProperties.$tools = tools

app.use(store).use(router).component('svg-icon', svgIcon).mount('#app')
