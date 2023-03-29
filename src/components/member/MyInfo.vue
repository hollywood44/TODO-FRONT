<template>

<div>
    <div>아이디 : {{info.memberId}}</div>
    <div>이름 : <input type="text" v-model="name"/> <button @click="changeName()">이름 변경 제출</button></div>
    <div><button @click="changeShow()">비밀번호 변경</button></div>
    <div class="password-change" v-if="this.passwordShow">
        원래 비밀번호 : <input type="password" v-model="passwordCheck"/>
        바꿀 비밀번호 : <input type="password" v-model="password"/>
        <button @click="changePassword()">바뀐 비밀번호 제출</button>
    </div>
</div>

</template>

<script>
export default {
    name : 'myInfo',
    data(){
        return{
            name : '',
            passwordCheck : '',
            password : '',
            info : {},
            passwordShow : false,
        }
    },
    methods:{
        async getInfo(){
            await this.axios.get('/api/members/info',{headers : {'Authorization' : localStorage.getItem('accessToken')}})
            .then(res => {
                this.info = res.data;
                this.name = this.info.name;
            })
            .catch(err => {
                alert(err.response.data.message);
            })
        },
        changeShow(){
            this.passwordShow = !this.passwordShow;
        },
        async changeName(){
            await this.axios.post('/api/members/modify-info',{'name' : this.name},{headers : {'Authorization' : localStorage.getItem('accessToken')}})
            .then(res => {
                if(res.status == 200){
                    alert('변경이 완료 되었습니다.');
                    this.$router.go(0);
                }
            }).catch(err => {
                alert(err.response.data.message);
            })
        },
        async changePassword(){
            await this.axios.post('/api/members/modify-password',{'passwordCheck' : this.passwordCheck,'password' : this.password},{headers : {'Authorization' : localStorage.getItem('accessToken')}})
            .then(res => {
                if(res.status == 200){
                    alert('변경이 완료 되었습니다.');
                    this.$router.go(0);
                }
            }).catch(err => {
                alert(err.response.data.message);
            })
        },
    },
    mounted(){
        this.getInfo();
    }
}
</script>

<style>

</style>