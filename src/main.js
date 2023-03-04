import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.css';
import router from "./routes";
import 'material-icons';

createApp(App).use(router).use(store).mount('#app')

