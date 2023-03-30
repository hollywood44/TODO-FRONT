<template>
  <h1>signUp page</h1>
  <form @submit.prevent="signUpSubmit">
    <input type="text" v-model="memberId" />
    <input type="password" v-model="password" />
    <input type="text" v-model="name" />
    <button type="submit">회원가입</button>
    <!-- v-bind:disabled="idCheck" -->
  </form>
  <button @click="checkId()">아이디 중복확인</button>
</template>

<script>
export default {
  name: "signUp",
  data() {
    return {
      memberId: "",
      password: "",
      name: "",
      idCheck: true,
    };
  },
  methods: {
    async signUpSubmit() {
      if (this.idCheck) {
        alert("아이디 중복 확인을 해 주십시오");
      } else if (!this.memberId || !this.name || !this.password) {
        alert("빈값은 제출 하실 수 없습니다.");
      } else if(this.memberId.indexOf('admin') != -1 || this.memberId.indexOf('ADMIN') != -1){
        alert('admin 또는 ADMIN이 포함된 아이디로는 가입이 불가능 합니다.');
      } else {
        await this.axios
          .post("/api/auth/sign-up", {
            memberId: this.memberId,
            password: this.password,
            name: this.name,
          })
          .then((res) => {
            if (res.status == 200) {
              alert("회원가입이 정상적으로 완료 되었습니다.");
              this.memberId = "";
              this.password = "";
              this.name = "";
              this.$router.push("/todo/main");
            }
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    },
    async checkId() {
      await this.axios
        .get("/api/auth/signup/check", { params: { memberId: this.memberId } })
        .then((res) => {
          this.idCheck = res.data;
          if (this.idCheck) {
            alert("중복된 아이디 입니다.");
          } else {
            alert("사용 가능한 아이디 입니다.");
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  computed: {
    checkIdDup() {
      return this.checkId;
    },
  },
};
</script>

<style></style>
