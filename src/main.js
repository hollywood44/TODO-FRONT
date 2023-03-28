import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import router from './router/router'
import MainHeader from '@/components/MainHeader'
import VueCookies from "vue-cookies";
import logout from '@/plugins/logout.js'


loadFonts()
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;




// 인터셉터 설정
axios.interceptors.response.use(
    success => success,
    async (error) => {

        const errorCode = error.code;
        const errorMsg = error.response.data.message;
        const customErrorCode = error.response.data.errorCode;
        console.log('errorCode' + errorCode)
        console.log('errorMsg' + errorMsg)
        console.log('customErrorCode' + customErrorCode)
        if (customErrorCode === 'JWT_0003' || customErrorCode === 'JWT_0002') { // 리프레쉬 토큰 만료로 로그아웃 해야 되는 상황
            console.log('errorCode in if: ' + errorCode)
            console.log('errorMsg in if: ' + errorMsg)
            console.log('customErrorCode in if: ' + customErrorCode)
            axios.post('/api/auth/sign-out', {},
                        { headers: { 'Authorization': localStorage.getItem("accessToken") } }
                    ).then(res => {
                        console.log(res);

                        if (res.status == 200) {
                            localStorage.setItem('isLogin', false);
                            localStorage.removeItem('memberId');
                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('isLogin');
                            alert('로그아웃 하셨습니다.')
                            this.$router.go(0);
                        }
                    }).catch(error => {
                        console.log(error)
                        console.log("log out failed")
                    })
            // return Promise.reject(error);
        } else if (errorMsg === 'JWT_0001') { // 엑세스 토큰 만료로 토큰 재 발급 시도 해야 하는 상황
            const originRequest = error.config;
            await axios.post('/api/auth/new-token', {},
                { headers: { 'Authorization': localStorage.getItem("accessToken") } }
            )
                .then(result => {
                    localStorage.setItem('accessToken', result.data.grantType + " " + result.data.accessToken);
                    window.location.reload()
                }).catch(error => { // 리프레쉬 토큰, 엑세스 토큰 모두 만료로 로그아웃
                    axios.post('/api/auth/sign-out', {},
                        { headers: { 'Authorization': localStorage.getItem("accessToken") } }
                    ).then(res => {
                        console.log(res);

                        if (res.status == 200) {
                            localStorage.setItem('isLogin', false);
                            localStorage.removeItem('memberId');
                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('isLogin');
                            alert('로그아웃 하셨습니다.')
                            this.$router.go(0);
                        }
                    }).catch(error => {
                        console.log(error)
                        console.log("log out failed")
                    })

                });
            return Promise.reject(error);
        }
        else {
            return Promise.reject(error);
        }
    }
)


const app = createApp(App);

app.config.globalProperties.axios = axios;

app.component('MainHeader', MainHeader)

app
    .use(VueCookies)
    .use(vuetify)
    .use(router)
    .use(logout)
    .mount('#app')
