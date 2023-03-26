<template>
<v-layout>
    <v-toolbar color="blue-lighten-1">
      <v-toolbar-title>
        <router-link to='/' v-if="!checkLogin">TODO!</router-link>
        <router-link to='/todo/main' v-if="checkLogin">TODO!</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="nav-item me-3"><router-link :to="{name: 'boardList',query: {page: 1}}">건의하기</router-link></div>
      <div class="nav-item me-3">Item2</div>
      <div class="nav-item me-3" v-if="checkLogin">MemberId</div>
      <div class="nav-item me-3" v-if="!checkLogin"><router-link to='/sign-in'>로그인</router-link></div>
      <button class="nav-item me-3" @click="this.$logout" v-if="checkLogin">로그아웃</button>
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