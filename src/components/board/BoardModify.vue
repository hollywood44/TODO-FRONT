<template>
    <form @submit.prevent="submitModify">
    <div class="form-div">
        <label for="title"><h2>제목</h2></label>
        <input type="text" class="form-title" placeholder="제목" id="title" v-model="title"/>
    </div>
    <div class="form-div">
        <label for="content"><h2>내용</h2></label>
        <textarea type="textarea" placeholder="내용" class="form-content" id="content" v-model="content"></textarea>
    </div>
    <div class="form-div-btn">
        <button type="submit" class="form-button">제출</button>
    </div>
  </form>
</template>

<script>
export default {
    name : "boardPosting",
    data(){
        return {
          detail: {},
          title: '',
          content: '',
        }
    },
    props:{
      boardId: String
    }
    ,
    methods:{
      async getDetail() {
            await this.axios
              .get("/api/boards/detail/modify/" + this.boardId, 
              {headers: { Authorization: localStorage.getItem("accessToken") }})
              .then((res) => {
                this.detail = res.data;
                this.title = this.detail.title;
                this.content = this.detail.content;
              })
              .catch((err) => {
                if(err.response.data.errorCode == 'ACCESS_DENIED'){
                  alert('권한없는 접근입니다.')
                  this.$router.push('/board?page=1')
                }
                console.log(err);
              });
          },
          async submitModify(){
            await this.axios.post(
              '/api/boards/modify',
              {'boardId' : this.boardId,'title' : this.title,'content':this.content},
              {headers: { Authorization: localStorage.getItem("accessToken") }}
            ).then(res => {
              if(res.status == 200){
                alert('수정이 성공 하였습니다.');
                this.$router.push('/board/'+this.boardId);
              }
            })
            .catch(err => {
              alert(err.response.data.message)
            })
          }
    },
    mounted(){
      this.getDetail();
    }
}
</script>

<style scoped>
@import "@/assets/css/board.css";
</style>