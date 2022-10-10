import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// createApp(App).use(router).mount('#app')
const app = createApp(App)

/**
 * @params {date} date to be converted to timeago
 * @returns returns timeAgo
 */
app.config.globalProperties.$filters = {
    truncate(text, length, suffix) {    
        if (text.length > length) {
            return text.substring(0, length) + suffix;
        } else {
            return text;
        }
    },
}

app.use(router)
app.mount('#app')
