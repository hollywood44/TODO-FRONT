<template>
  <h1>친구 목록</h1>
<div>
    <button><router-link :to="{name :'FollowRequestedList'}">요청받은 목록</router-link></button>
    <button><router-link :to="{name :'FollowRequestList'}">요청한 목록</router-link></button>
</div>
  <div>
    <form @submit.prevent="followRequest">
        <div>
        <input type="text" v-model="followId" placeholder="팔로우 할 아이디 입력"/>
        </div>
        <div>
            <button type="submit">요청</button>
        </div>
    </form>
  </div>

  <div>
    <div v-for="friend in friendList" :key="friend.friendId">
        친구아이디 : {{friend.memberId}} | 지난주 달성률 : {{friend.lastWeekRate}} | 이번주 달성률 : {{friend.thisWeekRate}}
        <button @click="unfollow(friend.memberId)">팔로우 취소</button>
    </div>
  </div>
</template>

<script>
export default {
    name : 'frindList',
    data(){
        return{
            friendList : {},
            followId : '',
        }
    },
    methods:{
        async getFriendList(){
            await this.axios.get(
                '/api/friends/list',{headers : {'Authorization' : localStorage.getItem("accessToken")}}
            ).then(res => {
                this.friendList = res.data.friendList;
            }).catch(err => {
                console.log(err);
            })
        },
        async followRequest(){
            await this.axios.post(
                '/api/friends/follow-request',{ 'followId' : this.followId },{headers : {'Authorization' : localStorage.getItem('accessToken')}}
            ).then(res => {
                this.followId = '';
                if(res.status == 200){
                    alert('요청이 성공적으로 완료 되었습니다.')
                }
            }).catch(err => {
                alert(err.response.data.message);
            })
        },
        async unfollow(unfollowId){
            await this.axios.post(
                '/api/friends/unfollow',{ 'followId' : unfollowId },{headers : {'Authorization' : localStorage.getItem('accessToken')}}
            ).then(res => {
                this.followId = '';
                if(res.status == 200){
                    alert('팔로우 취소 요청이 성공적으로 완료 되었습니다.')
                    this.$router.go(0)
                }
            }).catch(err => {
                alert(err.response.data.message);
            })
        }
    },
    mounted(){
        this.getFriendList();
    }
}
</script>

<style>

</style>