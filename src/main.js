import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')
