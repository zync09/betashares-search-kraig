import { createApp } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import './style.css';
import App from './App.vue';

const app = createApp(App);

const stylePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FED7CB',
      100: '#FEC8B7',
      200: '#FEA98F',
      300: '#FD8B67',
      400: '#FD6C3E',
      500: '#FC4D16',
      600: '#D73603',
      700: '#A02802',
      800: '#681A01',
      900: '#310C01',
      950: '#150500',
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: stylePreset,
  },
});

app.use(autoAnimatePlugin);
app.mount('#app');
