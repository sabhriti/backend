import {createApp} from 'vue'
import App from './App.vue'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.css';
import router from "./routes";
import 'material-icons';

const mixin = {
    mounted() {
        this.$store.dispatch('hideAlert');
        //this.$store.dispatch('fullPageSpinner/hideSpinner');
    }
}

const app = createApp(App);
app.mixin(mixin)
    .use(router)
    .use(store)
    .mount('#app')

