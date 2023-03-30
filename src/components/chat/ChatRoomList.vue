<template>
<h1>채팅방 목록</h1>
<div v-for="room in roomList" :key="room.chatroomId">
    <button @click="goChatRoom(room)">채팅방 넘버 : {{room.chatroomId}}</button>
    </div>
</template>

<script>
export default {
    name : 'chatRoomList',
    data(){
        return{
            roomList : [],
        }
    },
    methods:{
        async getList(){
            await this.axios.get(
                '/chat/room-list',
                {headers : {Authorization : localStorage.getItem('accessToken')}}
            ).then(res => {
                this.roomList = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err)
            })
        },
        async goChatRoom(room){
            const myId = localStorage.getItem('memberId');
            let yourId = '';
            if(room.memberOneId == myId){
                yourId = room.memberTwoId;
            }else{
                yourId = room.memberOneId;
            }

            this.$router.push('/chat/' + room.chatroomId + "/" + yourId)
        }
    },

    mounted(){
        this.getList();
    }
}
</script>

<style>

</style>