import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import router from './router/router'
import MainHeader from '@/components/MainHeader'
import VueCookies from "vue-cookies";


loadFonts()
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;

// 인터셉터 설정

axios.interceptors.response.use(
    success => success,
    async (error) => {
        // console.log("인터셉터");
        // console.log(error)

        const errorCode = error.code;
        const errorMsg = error.response.data.message;
        const customErrorCode = error.response.data.errorCode;

        // console.log("errorCode : " + errorCode)
        // console.log("customErrorCode : " + customErrorCode)
        // console.log("errorMsg : " + errorMsg)

        if(customErrorCode && customErrorCode === 'JWT_0003'){
            const msg = '리프레쉬 토큰 만료됨 엑세스토큰 리프레쉬 토큰 제거해야함 즉 로그아웃'
            console.log(msg)
            return Promise.reject(msg);
        }else if(errorCode === 'ERR_BAD_REQUEST' && errorMsg === 'Access Denied' || errorCode === 'ERR_NETWORK'){
            const originRequest = error.config;
            console.log("new token 시도")
            await axios.post('/api/auth/new-token',{},
            { headers : { Authorization : localStorage.getItem("grantType") + " " + localStorage.getItem("accessToken")}}
            )
            .then(result => {
                console.log(result);
                localStorage.setItem('accessToken',result.data.response.accessToken);
                window.location.reload()
            }).catch(error => {
                console.log("new token 시도 했는데 리프레쉬 토큰 만료됨 엑세스토큰 리프레쉬 토큰 제거해야함 즉 로그아웃")
            });
            return Promise.reject(error);

        }
        else {
            return Promise.reject(error);
        }
        // return Promise.reject(error);
    }
)


const app = createApp(App);

app.config.globalProperties.axios = axios;

app.component('MainHeader',MainHeader)

app
.use(VueCookies)
.use(vuetify)
.use(router)
.mount('#app')
