<template>
  <h1>내가 보낸 팔로우 요청 목록</h1>
  <div v-for="friend in requestList" :key="friend.friendId">
    <div>{{friend.memberId}}</div>
    <button @click="cancelBtn(friend.memberId)">요청 취소</button>
    </div>
</template>

<script>
export default {
    name: 'followRequestList',
    data(){
        return{
            requestList : {}
        }
    },
    methods:{
        async getList(){
            await this.axios.get(
                '/api/friends/request-list',{headers : {'Authorization' : localStorage.getItem('accessToken')}}
            ).then(res => {
                this.requestList = res.data;
            }).catch(err => {
                alert(err.response.data.message)
            })
        },
        async cancelBtn(followId){
            await this.axios.post(
                '/api/friends/request-cancel',{'followId':followId},{headers : {'Authorization' : localStorage.getItem('accessToken')}}
            ).then(res => {
                if(res.status==200){
                    alert("팔로우 요청 취소가 정상적으로 처리 되었습니다.")
                    this.$router.push('/friend/list')
                }
            }).catch(err => {
                alert(err.response.data.message)
            })
        }
    },
    mounted(){
        this.getList();
    }
}
</script>

<style>

</style>