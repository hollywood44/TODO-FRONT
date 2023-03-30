<template>
<h1>안 읽은 알림 목록</h1>
<div v-for="notice in noticeList" :key="notice.noticeId">{{notice.notice}}</div>
<h2><router-link to="/notice/prev?page=1">이전 알림</router-link></h2>
</template>

<script>
export default {
    name : 'noticeList',
    data(){
        return {
            noticeList : [],
        }
    },
    methods:{
        async getNotice(){
            await this.axios.get(
                '/api/notice/list',
                {headers : {Authorization : localStorage.getItem('accessToken')}}
            ).then(res => {
                this.noticeList = res.data;
                this.readNotice();
            }).catch(err => {
                alert(err.response.data.message)
            })
        },
        async readNotice(){
                await this.axios.get(
                    '/api/notice/readNotice',
                    {headers : {Authorization : localStorage.getItem('accessToken')}})
                    .then(res => {

                    }).catch(err => {

                    })

        }
    },

    mounted(){
        this.getNotice();
    }
}
</script>

<style>

</style>