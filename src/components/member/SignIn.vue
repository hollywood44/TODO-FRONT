<template>
  <h1>signIn page</h1>
  <form @submit.prevent="submitSignInForm">
    ID : <input type="text" v-model="memberId"/> <br/>
    PASSWORD : <input type="password" v-model="password"/> <br/>
    <button>제출</button>
  </form>

  <h1>Access Token</h1>
  <h3>{{this.accessToken}}</h3>

  <button @click="test">MEMBER 만 접근 가능한 메서드에 토근2개 가지고 접근 테스트</button><br/>
  <button @click="test1">리프레쉬 토큰 만료 테스트</button>


</template>

<script>
export default {
    name : "SignIn",
    data(){
        return{
            memberId : '',
            password : '',
            accessToken : '',
            cookieData : '',
            testData : '',
        };
    },
    methods :{
        async submitSignInForm(){
            try{
                const response = await this.axios.post("/api/auth/sign-in",
                {"memberId" : this.memberId, "password" : this.password});
                console.log(response);

                localStorage.setItem("accessToken",response.data.accessToken);
                localStorage.setItem("grantType",response.data.grantType);

                await this.axios.get("/api/auth/userinfo"
                ,{headers :
                {'Authorization' : localStorage.getItem("grantType") + " " + localStorage.getItem("accessToken")}}
                ).then(res => {
                    localStorage.setItem("memberId",res.data);
                })



            }catch(error){
                console.log("error");
                console.log(error.response.data);
                alert(error.response.data.message);
            }

            this.memberId = '';
            this.password = '';
        },
        async test1(){
            await this.axios.get("/api/auth/test1"
            ,
            { headers : { 'Authorization' : localStorage.getItem("grantType") + " " + localStorage.getItem("accessToken")}}
            )
            .then(res => {
                console.log(res)
            }).catch(error => {
            })
        },
        
        test(){
            this.axios.get("/api/members/test"
            ,
            { headers : { Authorization : localStorage.getItem("grantType") + " " + localStorage.getItem("accessToken")},}
            )
            .then(res => {
                this.testData = res.data;
                console.log(this.testData)
            }).catch(error =>{
                console.log("error from test");
            })
        },
        
    }
}
</script>

<style scoped>
form input{
    border: black solid 1px;
}
</style>