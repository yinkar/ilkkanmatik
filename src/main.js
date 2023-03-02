import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
});

if (typeof window !== 'undefined') {
    import('./pwa');
}

createApp(App).mount('#app');
