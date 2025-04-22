import { createApp } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import './style.css';
import App from './App.vue';
const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(autoAnimatePlugin);
app.mount('#app');
