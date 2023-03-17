<template>
<v-layout>
    <v-toolbar color="blue-lighten-1">
      <v-toolbar-title><router-link to='/todo/main'>TODO!</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="nav-item me-3">Item1</div>
      <div class="nav-item me-3">Item2</div>
      <div class="nav-item me-3" v-if="checkLogin">MemberId</div>
      <div class="nav-item me-3" v-if="!checkLogin"><router-link to='/sign-in'>로그인</router-link></div>
      <button class="nav-item me-3" @click="logout" v-if="checkLogin">로그아웃</button>
    </v-toolbar>
</v-layout>

</template>

<script>
export default {
  name : "MainHeader",
  data(){
    return{
      memberId : localStorage.getItem('memberId'),
      isLogin : localStorage.getItem('isLogin'),
    }
  },
  methods :{
    async logout(){
      await this.axios.post('/api/auth/sign-out',{},
        {headers : {'Authorization' : localStorage.getItem("accessToken")}}
      ).then(res => {
        console.log(res);

        if(res.status === 200){
          localStorage.setItem('isLogin',false);
          localStorage.removeItem('memberId');
          localStorage.removeItem('accessToken')
          this.isLogin = localStorage.removeItem('isLogin');
        }
      }).catch(error => {
        console.log(error)
        console.log("log out failed")
        });
    }
  },
  watch:{
    isLogin(){
      this.$router.go(0);
    }
  },
  computed:{
    checkLogin(){
      if(localStorage.getItem('isLogin')){
        return true;
      }else{
        return false;
      }
    }
  },
}
</script>

<style scoped>
</style>