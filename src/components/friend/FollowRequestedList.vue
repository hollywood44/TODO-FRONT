<template>
  <h1>받은 팔로우 요청 목록</h1>
  <div v-for="friend in requestedList" :key="friend.friendId">
    <div>{{ friend.memberId }}</div>
    <button @click="acceptBtn(friend.memberId)">수락</button>
    <button @click="rejectBtn(friend.memberId)">거부</button>
  </div>
</template>

<script>
export default {
  name: "followRequestedList",
  data() {
    return {
      requestedList: {},
    };
  },
  methods: {
    async getList() {
      await this.axios
        .get("/api/friends/requested-list", {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          this.requestedList = res.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    async acceptBtn(followerId){
        await this.axios.post(
            '/api/friends/follow-accept',{'followerId' : followerId},{headers : {'Authorization' : localStorage.getItem('accessToken')}}
        ).then(
            res => {
                if(res.status == 200){
                    alert('수락 성공 하셨습니다.');
                    this.$router.push('/friend/list')
                }
            }
        ).catch(err => {
            alert(err.response.data.message);
        })
    },
    async rejectBtn(followerId){
        await this.axios.post(
            '/api/friends/follow-reject',{'followerId' : followerId},{headers : {'Authorization' : localStorage.getItem('accessToken')}}
        ).then(
            res => {
                if(res.status == 200){
                    alert('거절 성공 하셨습니다.');
                    this.$router.push('/friend/list')
                }
            }
        ).catch(err => {
            alert(err.response.data.message);
        })
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style></style>
