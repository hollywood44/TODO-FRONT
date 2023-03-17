<template>
  <h1>signIn page</h1>
  <form @submit.prevent="submitSignInForm">
    ID : <input type="text" v-model="memberId"/> <br/>
    PASSWORD : <input type="password" v-model="password"/> <br/>
    <button>제출</button>
  </form>
</template>

<script>
export default {
    name : "SignIn",
    data(){
        return{
            memberId : '',
            password : '',
        };
    },
    methods :{
        async submitSignInForm(){
            try{
                const response = await this.axios.post("/api/auth/sign-in",
                {"memberId" : this.memberId, "password" : this.password});
                console.log(response);

                localStorage.setItem("accessToken",response.data.grantType + " " + response.data.accessToken);
                localStorage.setItem("grantType",response.data.grantType);

                await this.axios.get("/api/auth/userinfo"
                ,{headers :
                {'Authorization' : localStorage.getItem("accessToken")}}
                ).then(res => {
                    localStorage.setItem("memberId",res.data);
                    localStorage.setItem('isLogin',true);
                    this.$router.go(0);
                })



            }catch(error){
                console.log("error");
                console.log(error.response.data);
                alert(error.response.data.message);
            }

            this.memberId = '';
            this.password = '';
        },
        
    }
}
</script>

<style scoped>
form input{
    border: black solid 1px;
}
</style>