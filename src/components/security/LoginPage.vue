<template>
    <div class="login-form-container">
        <div class="card bg-transparent border-0">
            <form class="card-body" @submit="loginAction">
                <div class="form-greetings py-3">
                    <h3 class="h3">WELCOME</h3>
                </div>
                <AlertBox/>

                <div class="form-container">
                    <div class="login-form">
                        <div class="mb-3">
                            <input v-model="username" autocomplete="on" class="form-control" placeholder="Username"
                                   required type="text"/>
                        </div>

                        <div class="mb-3">
                            <input v-model="password" class="form-control" placeholder="Password"
                                   required type="password"/>
                        </div>

                        <div class="mb-3">
                            <input id="rememberMe" v-model="rememberMe" aria-labelledby="rememberMeLabel"
                                   class="form-check-input m-1"
                                   type="checkbox"
                                   value="">
                            <label id="rememberMeLabel" class="form-check-label" for="rememberMe">Remember me</label>
                        </div>

                        <div class="mb-3">
                            <button class="btn btn-info login-button" type="submit">Login</button>
                        </div>
                    </div>
                </div>

                <div class="form-register footer mt-auto">
                    <router-link class="footer-link text-info" to="/security/forget-password">Forgot Password
                    </router-link>
                    |
                    <router-link class="footer-link text-info" to="/security/register">Register</router-link>
                </div>

            </form>
        </div>
    </div>

</template>

<script>
import '@/assets/login.css';
import {mapActions} from "vuex";
import CryptoJS from 'crypto-js';
import AlertBox from "@/components/util/AlertBox";
import LocalStorage from "@/util/local_storage";
import SecurityConfig from "@/config/SecurityConfig";

export default {
    name: "LoginPage",
    components: {
        AlertBox
    },
    computed: {
        username: {
            get() {
                return this.$store.state.login.username
            },
            set(value) {
                this.$store.commit('login/USERNAME', value)
            }
        },
        password: {
            get() {
                return this.$store.state.login.password;
            },
            set(value) {
                this.$store.commit('login/PASSWORD', value)
            }
        },
        rememberMe: {
            get() {
                return this.$store.state.login.rememberMe;
            },
            set(value) {
                this.$store.commit('login/REMEMBER_ME', value)
            }
        }
    },
    methods: {
        ...mapActions({
            loginAction: 'login/loginAction',
        }),
    },
    created() {
        const itemFromLocalStorage = LocalStorage.get('remember_me');
        if (itemFromLocalStorage) {
            const bytes = CryptoJS.AES.decrypt(itemFromLocalStorage.password, SecurityConfig.PASSWORD_ENCRYPTION_SECRET);
            this.$store.commit('login/USERNAME', itemFromLocalStorage.username);
            this.$store.commit('login/PASSWORD', bytes.toString(CryptoJS.enc.Utf8));
            this.$store.commit('login/REMEMBER_ME', true);
        }
    }
}
</script>

<style scoped>
</style>